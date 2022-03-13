import { ChangeEvent, useState } from 'react';

import { useAuthContext } from '../../../stores';

export const useChallengeAuthentication = () => {
  const [value, setValue] = useState('');

  const { loading, signIn } = useAuthContext();

  const handleSubmit = (key: string | number) => {
    if (loading || value === '') return;
    if (key === 'Enter') {
      signIn(value);
    }
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, handleSubmit, changeValue };
};
