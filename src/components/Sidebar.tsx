import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import mascoteUm from '../images/mascote-1.svg';

import '../styles/components/sidebar.css';

export const Sidebar = () => {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mascoteUm} alt="DOE" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#438B35" />
        </button>
      </footer>
    </aside>
  );
};
