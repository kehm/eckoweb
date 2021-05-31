import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * Show map frame
 */
const Map = ({ height }) => {
    const [viewport, setViewport] = useState({
        latitude: 28.0000272,
        longitude: 2.9999825,
        width: window.innerWidth - 15,
        height,
        zoom: 1,
    });

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/light-v10"
            scrollZoom={false}
            onViewportChange={(view) => setViewport(view)}
        />
    );
};

export default Map;
