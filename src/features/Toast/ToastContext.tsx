import React from 'react';
import { FC, ReactNode, createContext, useMemo, useState } from 'react';
import Toast from '../../components/Toast';
import { createPortal } from 'react-dom';

interface ToastContextProps {
  open: (content: ReactNode, type: 'success' | 'error' | 'warning') => void;
}

export const ToastContext = createContext<ToastContextProps>(
  {} as ToastContextProps
);
interface ToastContent {
  id: string;
  content: ReactNode;
  type: 'success' | 'error' | 'warning';
}

function generateUEID(): string {
  let first: number | string = (Math.random() * 46656) | 0;
  let second: number | string = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}

export const ToastContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContent[]>([]);
  const open = (content: ReactNode, type: 'success' | 'error' | 'warning') =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), content, type },
    ]);
  const close = (id: string) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast: { id: string; content: any; type: any }) => (
            <Toast
              key={toast.id}
              close={() => close(toast.id)}
              type={toast.type}
            >
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return React.useContext(ToastContext);
};
