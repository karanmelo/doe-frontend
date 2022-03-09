import React from 'react';

import { Link } from 'react-router-dom';

import '../../styles/pages/not-found.css';
import logoImg from '../../images/logo.svg';

export const NotFoundContainer: React.FC = () => {
  return (
    <div id="page-not-found">
      <img src={logoImg} alt="Doe" />
      <div className="texts">
        <h1>404</h1>
        <span>PÁGINA NÃO ENCONTRADA</span>
        <Link to="/inicio" className="link">
          Voltar para página principal
        </Link>
      </div>
    </div>
  );
};
