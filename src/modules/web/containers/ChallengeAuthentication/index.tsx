import React from 'react';

import { logo } from 'commons/assets';

import { useChallengeAuthentication } from './hooks';
import '../../styles/pages/challengePage.css';

export const ChallengeAuthenticationContainer: React.FC = () => {
  const { value, handleSubmit, changeValue } = useChallengeAuthentication();
  return (
    <div id="page-challenge">
      <div className="content-wrapper">
        <div className="header">
          <h1>Seja bem-vinda(o)</h1>
          <p>“Esta é um previsão de subtítulo”</p>
        </div>

        <div className="content">
          <p>Toc Toc... Qual a Senha?</p>
          <input
            type="text"
            value={value}
            onChange={changeValue}
            onKeyPress={(e) => handleSubmit(e.key)}
          />
        </div>

        <div className="footer">
          <img src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};
