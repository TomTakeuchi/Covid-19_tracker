import React from 'react'
import './Map.css';
import {MapContainer,TileLayer,} from 'react-leaflet';
// import {MapContainer,Tilelayer} from 'leaflet';

function Map({center,zoom}) {
    console.log(center);
    return (
        <div className='map'>
            <MapContainer center={center} zoom={zoom}  >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default Map;
