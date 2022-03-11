import React from 'react';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../../styles/components/toast.css';

export const success = (msg: string): React.ReactText =>
  toast.success(msg, {
    progressClassName: 'success',
  });

export const error = (msg: string): React.ReactText =>
  toast.error(msg, {
    progressClassName: 'error',
  });
