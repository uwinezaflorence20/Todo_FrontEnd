import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: number) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const autoClose = setTimeout(() => {
      setIsExiting(true);
    }, 4000);

    return () => clearTimeout(autoClose);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const removeTimer = setTimeout(() => onRemove(toast.id), 400);
      return () => clearTimeout(removeTimer);
    }
  }, [isExiting, toast.id, onRemove]);

  const handleClose = () => {
    setIsExiting(true);
  };

  const isSuccess = toast.type === 'success';

  return (
    <div
      className={`toast-item ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px 20px',
        borderRadius: '14px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: isSuccess
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))'
          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))',
        color: '#fff',
        boxShadow: isSuccess
          ? '0 8px 32px rgba(16, 185, 129, 0.35), 0 2px 8px rgba(0,0,0,0.1)'
          : '0 8px 32px rgba(239, 68, 68, 0.35), 0 2px 8px rgba(0,0,0,0.1)',
        minWidth: '320px',
        maxWidth: '420px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          borderRadius: '14px 14px 0 0',
        }}
      />

      {/* Icon */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.2)',
          marginTop: '2px',
        }}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5" style={{ color: '#fff' }} />
        ) : (
          <XCircle className="w-5 h-5" style={{ color: '#fff' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: '0.01em',
          }}
        >
          {toast.title}
        </p>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            margin: '4px 0 0',
            opacity: 0.9,
            lineHeight: 1.4,
          }}
        >
          {toast.message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          border: 'none',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background 0.2s',
          marginTop: '2px',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '0 0 14px 14px',
          animation: 'toast-progress 4s linear forwards',
        }}
      />
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <ToastItem toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
};

// Hook for managing toasts
let toastCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastType, title: string, message: string) => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (title: string, message: string) => addToast('success', title, message);
  const error = (title: string, message: string) => addToast('error', title, message);

  return { toasts, removeToast, success, error };
};
