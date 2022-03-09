import { ChangeEvent, FormEvent, useState } from 'react';

import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import api from 'modules/web/services/api';

import { useLocation } from '../../../hooks';

export const useCreateInstitution = () => {
  const [latLng, setLatLng] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
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

  return {
    name,
    setName,
    about,
    setAbout,
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
