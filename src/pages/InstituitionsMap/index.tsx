import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { mapIcon } from '../../utils/mapIcon';
import api from '../../services/api';

import logoImg from '../../images/logo.svg';

import '../../styles/pages/instituitions-map.css';

interface IInstituition {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const InstituitionsMap = () => {
  const [orphanages, setOrphanages] = useState<IInstituition[]>([]);

  useEffect(() => {
    api.get('orphanages').then((res) => {
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

      <Map
        center={[-12.8752949, -38.5716907]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};
