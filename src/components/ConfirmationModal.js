import React from "react";

/**
 * 범용적인 확인/정보 모달 컴포넌트
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  hideCancel = false,
  confirmButtonVariant, // 새 prop
  children,
  modalClassName,
}) => {
  if (!isOpen) return null;

  // 버튼 스타일 타입 결정 (hideCancel이면 text 기본)
  const buttonVariant =
    confirmButtonVariant || (hideCancel ? "text" : "primary");

  // 버튼 클래스 이름 정의
  const confirmButtonClass = `modal-button modal-confirm-btn modal-button-${buttonVariant}`;
  const cancelButtonClass =
    "modal-button modal-cancel-btn modal-button-secondary";

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${modalClassName || ""}`}>
        <h3 className="modal-title">{title}</h3>

        {/* message 또는 children 표시 */}
        {children ? (
          <div className="modal-message-content">{children}</div>
        ) : (
          typeof message === "string" && (
            <p className="modal-message">{message}</p>
          )
        )}

        <div className="modal-actions">
          {!hideCancel && (
            <button onClick={onClose} className={cancelButtonClass}>
              취소
            </button>
          )}

          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
