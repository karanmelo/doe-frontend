import React, { useEffect, useState } from 'react';

import { LatLngExpression } from 'leaflet';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { Map } from '../../components';
import { useLocation } from '../../hooks';
import logoImg from '../../images/logo.svg';
import api from '../../services/api';
import { mapIcon } from '../../utils/mapIcon';

import '../../styles/pages/instituitions-map.css';

interface IInstituition {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const InstituitionsMap: React.FC = () => {
  const [institutions, setInstitutions] = useState<IInstituition[]>([]);

  const { addrees, currentePosition } = useLocation();
  useEffect(() => {
    api.get('institutions').then((res) => {
      setInstitutions(res.data);
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
          <strong>{addrees?.city}</strong>
          <span>{addrees?.state}</span>
        </footer>
      </aside>

      {currentePosition && (
        <Map
          center={currentePosition}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
        >
          {institutions.map((institution: IInstituition) => {
            const latLng: LatLngExpression = [
              institution.latitude,
              institution.longitude,
            ];

            return (
              <Marker key={institution.id} position={latLng} icon={mapIcon}>
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
