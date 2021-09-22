import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import mapboxgl from 'mapbox-gl';

// workaround for transpiler bug in mapbox-gl
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

/**
 * Show map frame
 */
const Map = ({ height, markers, onClickMarker }) => {
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
        >
            {markers && markers.map((marker) => (
                <Marker
                    key={marker.id}
                    latitude={parseFloat(marker.latitude)}
                    longitude={parseFloat(marker.longitude)}
                    offsetLeft={-20}
                    offsetTop={-10}
                    onClick={() => onClickMarker(marker.id)}
                >
                    <RoomOutlined className="text-3xl text-red-600 cursor-pointer" />
                </Marker>
            ))}
        </ReactMapGL>
    );
};

export default Map;
