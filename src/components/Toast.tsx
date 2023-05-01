import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTimeout } from '../features/hooks/useTimeout';

const Toast = (props: {
  close: () => void;
  children: any;
  type?: 'success' | 'error' | 'warning';
}) => {
  useTimeout(props.close, 5000);
  if (true) {
    return (
      <div
        className={`toast ${
          props.type === 'success'
            ? 'bg-blue-500'
            : props.type === 'error'
            ? 'bg-red-500'
            : 'bg-orange-400'
        } bg-blue-400 rounded-lg flex items-center text-white`}
      >
        <div className="toast__text">{props.children}</div>
        <div>
          <button onClick={props.close} className="toast__close-btn">
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
      </div>
    );
  }
};

export default Toast;
