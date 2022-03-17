/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { FiPlus } from 'react-icons/fi';
import { Marker } from 'react-leaflet';

import { Map } from '../../components';
import { Sidebar } from '../../components/Sidebar';
import { mapIcon } from '../../utils';
import '../../styles/pages/create-instituition.css';
import { useCreateInstitution } from './hooks';

export const CreateInstituitionContainer: React.FC = () => {
  const {
    name,
    setName,
    about,
    setAbout,
    phone,
    setPhone,
    previewImages,
    currentePosition,
    latLng,
    handleSubmit,
    handleMapClick,
    handleSelectImages,
    instructions,
    setInstructions,
    openingHours,
    setOpeningHours,
    openOnWeekends,
    setOpenOnWeekends,
  } = useCreateInstitution();

  return (
    <div id="page-create-institution">
      <Sidebar />

      <main>
        <h3>Centro de Doação</h3>
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
                {latLng && latLng.latitude !== 0 && (
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
                Sobre
                <span
                // TODO: adicionar acentuação na descrição após o desafio da Semana Tech
                >
                  Maximo de 300 caracteres
                </span>
              </label>
              <textarea
                id="about"
                // TODO: habilitar limite de caracteres após o desafio da Semana Tech
                // maxLength={300}
                value={about}
                onChange={(event) => {
                  setAbout(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label
                // TODO: adicionar acentuação na descrição após o desafio da Semana Tech
                htmlFor="phone"
              >
                Numero de Whatsapp
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
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
