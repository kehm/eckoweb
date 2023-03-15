import React, { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import AdjustOutlined from '@material-ui/icons/AdjustOutlined';
import mapboxgl from 'mapbox-gl';

// workaround for transpiler bug in mapbox-gl
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

/**
 * Show map frame
 */
const MiniMap = ({
    selectable, onSelect, marker, scrollZoom,
}) => {
    const [viewport, setViewport] = useState({
        latitude: parseFloat(marker.latitude),
        longitude: parseFloat(marker.longitude),
        width: '384px',
        height: '300px',
        zoom: 1,
    });

    /**
     * Parse and validate latitude
     *
     * @param {string} value Latitude
     * @returns Latitude
     */
    const parseLatitude = (value) => {
        const lat = parseFloat(value);
        if (!Number.isNaN(lat) && lat >= -90 && lat <= 90) {
            return lat;
        }
        return 28.000000;
    };

    /**
     * Parse and validate longitude
     *
     * @param {string} value Longitude
     * @returns Longitude
     */
    const parseLongitude = (value) => {
        const lon = parseFloat(value);
        if (!Number.isNaN(lon) && lon >= -180 && lon <= 180) {
            return lon;
        }
        return 2.000000;
    };

    return (
        <ReactMapGL
            className="m-auto border-solid rounded"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            scrollZoom={scrollZoom}
            onClick={(e) => {
                if (selectable) {
                    try {
                        onSelect(
                            parseFloat(e.lngLat[1]).toFixed(6),
                            parseFloat(e.lngLat[0]).toFixed(6),
                        );
                    } catch (err) { }
                }
            }}
            onViewportChange={(view) => setViewport(view)}
        >
            <NavigationControl showCompass={false} />
            {marker !== undefined && marker.latitude !== undefined && (
                <Marker
                    latitude={parseLatitude(marker.latitude)}
                    longitude={parseLongitude(marker.longitude)}
                    offsetLeft={-10}
                    offsetTop={-10}
                >
                    <AdjustOutlined className="text-3xl text-yellow-500" />
                </Marker>
            )}
        </ReactMapGL>
    );
};

export default MiniMap;
