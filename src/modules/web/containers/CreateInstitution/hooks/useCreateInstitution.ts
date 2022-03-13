import { ChangeEvent, FormEvent, useState } from 'react';

import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import { error as toastError } from '../../../components';
import { useLocation } from '../../../hooks';
import { api } from '../../../services';

export const useCreateInstitution = () => {
  const [latLng, setLatLng] = useState({ latitude: 0, longitude: 0 });
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

    const { latitude, longitude } = latLng;

    if (!(name && about && openingHours && openOnWeekends)) {
      toastError('Preencha os campos corretamente!');
      return;
    }

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
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
