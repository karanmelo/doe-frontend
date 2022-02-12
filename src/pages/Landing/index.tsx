import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../../styles/pages/landing.css';

import logoImg from '../../images/logo.svg';

export const Landing = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="DOE" />

        <main>
          <h1>Distribua amor e vida a quem precisa</h1>
          <p>Visite um centro de doação de sangue e salve vidas</p>
        </main>

        <div className="location">
          <strong>Salvador</strong>
          <span>Bahia</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
};
