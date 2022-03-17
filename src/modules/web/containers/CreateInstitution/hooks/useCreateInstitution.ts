import { ChangeEvent, FormEvent, useState } from 'react';

import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import { error as toastError } from '../../../components';
import { useLocation } from '../../../hooks';
import { api } from '../../../services';

export const useCreateInstitution = () => {
  const [latLng, setLatLng] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const history = useHistory();

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

    const getBlankField = () => {
      if (!name) {
        return 'Nome';
      }
      if (!about) {
        return 'Sobre';
      }
      if (!openingHours) {
        return 'Horário de funcionamento';
      }
      if (!openOnWeekends) {
        return 'Atende fim de semana';
      }
      if (!latLng) {
        return 'Localização no mapa';
      }
      if (!instructions) {
        return 'Instruções';
      }
      return null;
    };

    if (getBlankField()) {
      toastError(`É necessário preencher o campo ${getBlankField()}.`);
      return;
    }

    const data = new FormData();

    data.append('name', name);
    data.append('phone', phone);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('latitude', String(latLng?.latitude));
    data.append('longitude', String(latLng?.longitude));
    data.append('openingHours', openingHours);
    data.append('openOnWeekends', String(openOnWeekends));

    images.forEach((image) => {
      data.append('images', image);
    });

    await api
      .post('institutions', data)
      .then((res) => {
        if (res) {
          history.push('/institutions/create-sucess');
        }
      })
      // TODO: correção ortográfica após Semana Tech
      .catch(() => toastError('Erro em cadastrar centro de doação!'));
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

  return {
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
  };
};
