import { useIsMounted } from 'hooks';
import { LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [currentePosition, setCurrentPosition] = useState<LatLngExpression>();

  const isMounted = useIsMounted();

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

  useEffect(() => {
    getCurrentPosition().then(
      (position: LatLngExpression) =>
        isMounted.current && setCurrentPosition(position)
    );
  }, []);

  return {
    currentePosition,
    getCurrentPosition,
  };
};
