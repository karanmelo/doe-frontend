import { useState, useEffect } from 'react';

import { LatLngExpression } from 'leaflet';
import Geocode from 'react-geocode';

import { useIsMounted } from '.';

type AdressType = {
  city: string | undefined;
  state: string | undefined;
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
  const [address, setAddress] = useState<AdressType>({
    city: '',
    state: '',
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
    if (!currentePosition) {
      setAddress({
        city: 'undefined',
        state: 'undefined',
      });
      return;
    }
    const [lat, log] = Object.values(currentePosition);

    Geocode.fromLatLng(lat, log).then((response) => {
      const responseAddress = response.results[0];
      setAddress({
        city: responseAddress.address_components[3].long_name,
        state: responseAddress.address_components[4].long_name,
      });
    });
  }, [currentePosition]);

  return {
    addrees: address,
    currentePosition,
    getCurrentPosition,
  };
};
