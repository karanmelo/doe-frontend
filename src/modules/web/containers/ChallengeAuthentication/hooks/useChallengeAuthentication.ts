import { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useAuth } from 'modules/web/hooks/useAuth';

export const useChallengeAuthentication = () => {
  const [value, setValue] = useState('');
  const { loading, authenticationProvider, isSignedIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn) {
      history.push('/inicio');
    }
  }, [isSignedIn, history]);

  const handleSubmit = (key: string | number) => {
    if (loading || value === '') return;
    if (key === 'Enter') {
      authenticationProvider(value);
    }
  };

  const changeValue = (e: any) => {
    setValue(e.target.value);
  };

  return { value, handleSubmit, changeValue };
};
