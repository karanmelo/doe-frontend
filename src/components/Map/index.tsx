import { LeafletMouseEvent, LatLngExpression } from 'leaflet';
import React from 'react';

import { Map as RLMap, TileLayer } from 'react-leaflet';

export type MapProps = {
  center?: LatLngExpression;
  zoom?: number | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: (event: LeafletMouseEvent) => void;
};

export const Map: React.FC<MapProps> = ({
  children,
  center,
  zoom,
  style,
  onClick,
}) => (
  <RLMap center={center} zoom={zoom} style={style} onClick={onClick}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {children}
  </RLMap>
);
