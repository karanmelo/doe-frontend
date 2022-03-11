import React from 'react';

import { Link } from 'react-router-dom';

import '../../styles/containers/sucess.css';
import { mascot } from '../../../../commons/assets';

export const SucessContainer: React.FC = () => {
  return (
    <div id="sucess-container">
      <div className="container">
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <Link to="/app" className="link">
          Voltar para o mapa
        </Link>
      </div>
      <div className="image">
        <img src={mascot} alt="Doe" />
      </div>
    </div>
  );
};
