import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Marker, Popup } from 'react-leaflet';
import { useLocation } from 'hooks';
import { mapIcon } from '../../utils/mapIcon';
import api from '../../services/api';
import { Map } from '../../components';

import logoImg from '../../images/logo.svg';

import '../../styles/pages/instituitions-map.css';

interface IInstituition {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const InstituitionsMap: React.FC = () => {
  const [institutions, setOrphanages] = useState<IInstituition[]>([]);

  const { currentePosition } = useLocation();

  useEffect(() => {
    api.get('institutions').then((res) => {
      setOrphanages(res.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logoImg} alt="DOE" />

          <h2>Escolha um banco de doação de sangue no mapa</h2>
          <p>Doe sangue, doe vida</p>
        </header>
        <footer>
          <strong>Salvador</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      {currentePosition && (
        <Map
          center={currentePosition}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
        >
          {institutions.map((institution) => {
            return (
              <Marker
                key={institution.id}
                position={[institution.latitude, institution.longitude]}
                icon={mapIcon}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className="map-popup"
                >
                  {institution.name}
                  <Link to={`/institutions/${institution.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      )}

      <Link to="/institutions/create" className="create-institution">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};
