import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../../styles/components/toast.css';

const ToastComponent = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      toastClassName="toast"
    />
  );
};

export const success = (msg: string): React.ReactText =>
  toast.success(msg, {
    progressClassName: 'success',
  });

export const error = (msg: string): React.ReactText =>
  toast.error(msg, {
    progressClassName: 'error',
  });

export default React.memo(ToastComponent);
