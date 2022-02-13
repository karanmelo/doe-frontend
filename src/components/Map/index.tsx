/* eslint-disable react/jsx-props-no-spreading */
import { LeafletMouseEvent, LatLngExpression } from 'leaflet';
import React from 'react';

import { Map as RLMap, TileLayer, MapProps as RLMapProps } from 'react-leaflet';

export type MapProps = RLMapProps & {
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
  ...rest
}) => (
  <RLMap center={center} zoom={zoom} style={style} onClick={onClick} {...rest}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {children}
  </RLMap>
);
