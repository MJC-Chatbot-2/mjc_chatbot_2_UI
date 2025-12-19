import React from 'react';
import './ConfirmDialog.css';

/**
 * 확인 다이얼로그 컴포넌트
 */
const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = '확인', cancelText = '취소' }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <h3 className="confirm-dialog-title">{title}</h3>
        </div>
        <div className="confirm-dialog-body">
          <p className="confirm-dialog-message">{message}</p>
        </div>
        <div className="confirm-dialog-footer">
          <button className="confirm-dialog-btn confirm-dialog-btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="confirm-dialog-btn confirm-dialog-btn-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

