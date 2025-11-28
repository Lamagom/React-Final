import React from "react";
import { X, AlertTriangle } from "lucide-react";
import "../App.css";

/**
 * 범용적인 확인 모달 컴포넌트
 */
const ConfirmationModal = React.memo(
  ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <AlertTriangle
                size={24}
                style={{ color: "#ef4444", flexShrink: 0 }}
              />
              <h4
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "var(--color-text-white)",
                }}
              >
                {title}
              </h4>
            </div>
            <button
              onClick={onClose}
              style={{
                color: "var(--color-text-muted)",
                transition: "color 0.2s",
              }}
            >
              <X size={20} />
            </button>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
              marginBottom: "1.5rem",
            }}
          >
            {message}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
            }}
          >
            <button onClick={onClose} className="modal-cancel-btn">
              취소
            </button>
            <button onClick={onConfirm} className="modal-confirm-btn">
              삭제 확인
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ConfirmationModal;
