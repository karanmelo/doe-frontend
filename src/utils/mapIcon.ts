import L from 'leaflet';

import mapMarkerImg from '../images/mascote-1.svg';

export const mapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});
