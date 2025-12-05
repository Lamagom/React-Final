import React from "react";

/**
 * 범용적인 확인/정보 모달 컴포넌트
 * @param {boolean} isOpen - 모달 표시 여부
 * @param {function} onClose - 모달 닫기 핸들러 (취소 동작)
 * @param {function} onConfirm - 확인 동작 핸들러
 * @param {string} title - 모달 제목
 * @param {string|React.ReactNode} [message] - 기본 메시지 텍스트 또는 렌더링할 JSX 노드 (children이 없을 때 사용)
 * @param {string} [confirmText='확인'] - 확인 버튼 텍스트
 * @param {boolean} [hideCancel=false] - 취소 버튼 숨김 여부
 * @param {'primary' | 'secondary' | 'text'} [confirmButtonVariant] - 확인 버튼 스타일 타입 (추가됨)
 * @param {React.ReactNode} [children] - message Prop 대신 사용할 상세 내용 (JSX)
 * @param {string} [modalClassName] - modal-content에 추가할 커스텀 CSS 클래스
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  hideCancel = false,
<<<<<<< HEAD
  confirmButtonVariant,
=======
  confirmButtonVariant, // 새 prop
>>>>>>> 881e8bfd9fb4eb791f71991e8b40e2a0ea3b1e1b
  children,
  modalClassName,
}) => {
  if (!isOpen) return null;

<<<<<<< HEAD
  const buttonVariant =
    confirmButtonVariant || (hideCancel ? "text" : "primary");

  // 버튼 클래스 이름 동적 생성
  const confirmButtonClass = `modal-button modal-confirm-btn modal-button-${buttonVariant}`;
  const cancelButtonClass =
    "modal-button modal-cancel-btn modal-button-secondary"; // 취소 버튼

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${modalClassName || ""}`}>
        <h3 className="modal-title">{title}</h3>

=======
  // 1. 버튼 스타일 타입 결정
  // hideCancel이 true이고 Variant가 지정되지 않았다면 'text'를 기본값으로 사용
  const buttonVariant =
    confirmButtonVariant || (hideCancel ? "text" : "primary");

  // 2. 버튼 클래스 이름 동적 생성
  const confirmButtonClass = `modal-button modal-confirm-btn modal-button-${buttonVariant}`;
  const cancelButtonClass =
    "modal-button modal-cancel-btn modal-button-secondary"; // 취소 버튼도 명확히 정의

  return (
    <div className="modal-overlay">
      {/* modalClassName Prop을 modal-content 클래스에 적용 */}
      <div className={`modal-content ${modalClassName || ""}`}>
        <h3 className="modal-title">{title}</h3>

        {/* message 또는 children 중 하나를 표시 */}
>>>>>>> 881e8bfd9fb4eb791f71991e8b40e2a0ea3b1e1b
        {children ? (
          <div className="modal-message-content">{children}</div>
        ) : (
          typeof message === "string" && (
            <p className="modal-message">{message}</p>
          )
        )}

        <div className="modal-actions">
<<<<<<< HEAD
=======
          {/* hideCancel이 true가 아닐 때만 취소 버튼 표시 */}
>>>>>>> 881e8bfd9fb4eb791f71991e8b40e2a0ea3b1e1b
          {!hideCancel && (
            <button
              onClick={onClose}
              className={cancelButtonClass} // 클래스 적용
            >
              취소
            </button>
          )}

<<<<<<< HEAD
          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmText}
=======
          <button
            onClick={onConfirm}
            className={confirmButtonClass} // 동적 클래스 적용
          >
            {confirmText} {/* confirmText Prop 사용 */}
>>>>>>> 881e8bfd9fb4eb791f71991e8b40e2a0ea3b1e1b
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
