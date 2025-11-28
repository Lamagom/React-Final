import { useState, useCallback } from "react";

/**
 * 로컬 스토리지를 사용하여 상태를 영구적으로 저장하는 커스텀 훅입니다.
 * * @param {string} key Local Storage 키
 * @param {*} initialValue 초기 값 (Local Storage에 해당 키가 없을 경우 사용)
 * @returns {Array} [storedValue, setValue] - React의 useState와 동일한 형태
 */
export const useLocalStorage = (key, initialValue) => {
  // 상태를 Local Storage에서 읽어 초기화합니다.
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // 1. Local Storage에서 해당 키의 값을 가져옵니다.
      const item = window.localStorage.getItem(key);

      // 2. 값이 있으면 JSON.parse를 통해 객체/배열 형태로 변환하여 반환합니다.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 에러 발생 시 (예: Local Storage 접근 불가), 초기 값을 사용합니다.
      console.error("Error reading localStorage key “" + key + "”:", error);
      return initialValue;
    }
  });

  // setValue 함수는 상태와 Local Storage를 동시에 업데이트합니다.
  // useCallback을 사용하여 이 함수가 리렌더링 시마다 재생성되는 것을 방지합니다.
  const setValue = useCallback(
    (value) => {
      try {
        // 1. 값이 함수 형태일 경우, 이전 값을 이용해 새로운 값을 계산합니다.
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // 2. React 상태를 업데이트합니다.
        setStoredValue(valueToStore);

        // 3. Local Storage에 저장합니다.
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error writing localStorage key “" + key + "”:", error);
      }
    },
    [key, storedValue]
  ); // 의존성 배열에는 key와 storedValue가 필요합니다.

  return [storedValue, setValue];
};
