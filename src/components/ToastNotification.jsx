import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast || !toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-success me-2" />;
      case 'error':
        return <AlertCircle size={18} className="text-danger me-2" />;
      default:
        return <Info size={18} className="text-primary me-2" />;
    }
  };

  const getBg = () => {
    switch (toast.type) {
      case 'success': return 'border-success';
      case 'error': return 'border-danger';
      default: return 'border-primary';
    }
  };

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast 
        onClose={onClose} 
        show={toast.show} 
        delay={4000} 
        autohide 
        className={`shadow-lg bg-white ${getBg()} border-start border-4`}
      >
        <Toast.Header closeButton>
          {getIcon()}
          <strong className="me-auto text-dark">{toast.title || 'Thông báo hệ thống'}</strong>
          <small className="text-muted">Vừa xong</small>
        </Toast.Header>
        <Toast.Body className="text-secondary fw-medium">
          {toast.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
