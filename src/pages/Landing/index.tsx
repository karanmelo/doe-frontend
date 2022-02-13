import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../../styles/pages/landing.css';

import logoImg from '../../images/logo.svg';
import mascoteDoisImg from '../../images/mascote-2.svg';

export const Landing = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="header">
          <img src={logoImg} alt="DOE" />
          <div className="location">
            <strong>Salvador</strong>
            <span>Bahia</span>
          </div>
        </div>

        <div className="content">
          <h1>Distribua amor e vida a quem precisa</h1>
          <img width="479" height="356" src={mascoteDoisImg} alt="DOE" />
        </div>

        <div className="footer">
          <p>Visite um centro de doação de sangue e salve vidas</p>
          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>
        </div>
      </div>
    </div>
  );
};
