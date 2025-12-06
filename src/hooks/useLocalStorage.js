import { useState, useCallback } from "react";

/**
 * 로컬 스토리지를 사용하여 상태를 영구적으로 저장하는 커스텀 훅
 * @param {string} key Local Storage 키
 * @param {*} initialValue 초기 값 (Local Storage에 해당 키가 없을 경우 사용)
 * @returns {Array} [storedValue, setValue] - React의 useState와 동일한 형태
 */
export const useLocalStorage = (key, initialValue) => {
  // 상태를 Local Storage에서 읽어 초기화
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Local Storage에서 값 가져오기
      const item = window.localStorage.getItem(key);

      // 값이 있으면 JSON.parse 후 반환
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // setValue: 상태와 Local Storage 동기 업데이트
  const setValue = useCallback(
    (value) => {
      try {
        // 함수형 업데이트 대응
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // 상태 업데이트
        setStoredValue(valueToStore);

        // localStorage 저장
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error writing localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};
