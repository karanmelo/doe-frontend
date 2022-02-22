/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useState, ChangeEvent } from 'react';

import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import { Marker } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import { Map } from '../../components';
import { Sidebar } from '../../components/Sidebar';
import { useLocation } from '../../hooks';
import api from '../../services/api';
import { mapIcon } from '../../utils/mapIcon';

import '../../styles/pages/create-instituition.css';

export const CreateInstituition: React.FC = () => {
  const history = useHistory();

  const [latLng, setLatLng] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { currentePosition } = useLocation();

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setLatLng({
      latitude: lat,
      longitude: lng,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { latitude, longitude } = latLng;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));

    images.forEach((image) => {
      data.append('images', image);
    });

    await api.post('institutions', data);

    // eslint-disable-next-line no-alert
    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  };

  return (
    <div id="page-create-institution">
      <Sidebar />

      <main>
        <form className="create-institution-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            {currentePosition && (
              <Map
                center={currentePosition}
                zoom={15}
                style={{ width: '100%', height: 280 }}
                onClick={handleMapClick}
              >
                {latLng.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[latLng.latitude, latLng.longitude]}
                  />
                )}
              </Map>
            )}

            <div className="input-block">
              <label htmlFor="name">Nome </label>
              <input
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={(event) => {
                  setAbout(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={name} />;
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input
                  multiple
                  onChange={handleSelectImages}
                  type="file"
                  id="image[]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => {
                  setInstructions(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={(event) => {
                  setOpeningHours(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="attend_weekend">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};
