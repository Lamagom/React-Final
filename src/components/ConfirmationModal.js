import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  hideCancel = false,
  confirmButtonVariant,
  children,
  modalClassName,
}) => {
  if (!isOpen) return null;

  const buttonVariant = confirmButtonVariant || (hideCancel ? "text" : "primary");
  const confirmButtonClass = `modal-button modal-confirm-btn modal-button-${buttonVariant}`;
  const cancelButtonClass = "modal-button modal-cancel-btn modal-button-secondary";

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${modalClassName || ""}`}>
        <h3 className="modal-title">{title}</h3>
        {children ? (
          <div className="modal-message-content">{children}</div>
        ) : (
          typeof message === "string" && <p className="modal-message">{message}</p>
        )}
        <div className="modal-actions">
          {!hideCancel && (
            <button onClick={onClose} className={cancelButtonClass}>취소</button>
          )}
          <button onClick={onConfirm} className={confirmButtonClass}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;