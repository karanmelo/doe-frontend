import { useState, useEffect } from 'react';

import { LatLngExpression } from 'leaflet';
import Geocode from 'react-geocode';

import { useIsMounted } from '.';

type AdressType = {
  city: string;
  state: string;
};

const getCurrentPosition = async (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => reject(new Error('Geolocation was rejected.'))
    );
  });
};

export const useLocation = () => {
  const [currentePosition, setCurrentPosition] = useState<LatLngExpression>();
  const [addrees, setAddress] = useState<AdressType>({
    city: 'Salvador',
    state: 'Bahia',
  });

  const isMounted = useIsMounted();

  useEffect(() => {
    getCurrentPosition().then(
      (position: LatLngExpression) =>
        isMounted.current && setCurrentPosition(position)
    );
  }, [isMounted]);

  useEffect(() => {
    Geocode.setApiKey('AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4');

    if (!currentePosition) return;
    const [lat, log] = Object.values(currentePosition);

    Geocode.fromLatLng(lat, log).then((response) => {
      const address = response.results[0];
      setAddress({
        city: address.address_components[3].long_name,
        state: address.address_components[4].long_name,
      });
    });
  }, [currentePosition]);

  return {
    addrees,
    currentePosition,
    getCurrentPosition,
  };
};
