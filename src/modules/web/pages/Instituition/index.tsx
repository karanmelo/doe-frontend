import React, { useEffect, useState } from 'react';

import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import '../../styles/pages/instituition.css';

import { Map } from '../../components';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services';
import { mapIcon } from '../../utils/mapIcon';

interface IInstituition {
  id: number;
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: string;
    originalName: string;
    filenName: string;
    mimeType: string;
    path: string;
  }>;
}

interface InstituitionParams {
  id: string;
}

export const Instituition = () => {
  const params = useParams<InstituitionParams>();
  const [instituition, setInstituition] = useState<IInstituition>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`institutions/${params.id}`).then((res) => {
      setInstituition(res.data);
    });
  }, [params.id]);

  if (!instituition) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-institution">
      <Sidebar />

      <main>
        <h3>Centro de Doação</h3>
        <div className="institution-details">
          {instituition.images.length > 0 && (
            <>
              <img
                src={instituition.images[activeImageIndex].path}
                alt={instituition.name}
              />

              <div className="images">
                {instituition.images.map((image, index) => {
                  return (
                    <button
                      key={image.id}
                      className={activeImageIndex === index ? 'active' : ''}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(index);
                      }}
                    >
                      <img src={image.path} alt={instituition.name} />
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <div className="institution-details-content">
            <h1>{instituition.name}</h1>
            <p>{instituition.about}</p>

            <div className="map-container">
              <Map
                center={[instituition.latitude, instituition.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[instituition.latitude, instituition.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${instituition.latitude}, ${instituition.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{instituition.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {instituition.opening_hours}
              </div>
              {instituition.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
