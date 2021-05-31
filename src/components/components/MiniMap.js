import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import RoomOutlined from '@material-ui/icons/RoomOutlined';

/**
 * Show map frame
 */
const MiniMap = ({
    selectable, onSelect, defaultMarker, scrollZoom,
}) => {
    const [viewport, setViewport] = useState({
        latitude: defaultMarker && defaultMarker.latitude
            ? parseFloat(defaultMarker.latitude)
            : 28.000000,
        longitude: defaultMarker && defaultMarker.longitude
            ? parseFloat(defaultMarker.longitude)
            : 2.000000,
        width: '384px',
        height: '300px',
        zoom: 1,
    });

    const [marker, setMarker] = useState(undefined);

    return (
        <ReactMapGL
            className="m-auto"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            scrollZoom={scrollZoom}
            onClick={(e) => {
                if (selectable) {
                    onSelect(e);
                    setMarker({
                        latitude: parseFloat(e.lngLat[1]),
                        longitude: parseFloat(e.lngLat[0]),
                    });
                }
            }}
            onViewportChange={(view) => setViewport(view)}
        >
            {marker !== undefined && marker.latitude !== undefined && (
                <Marker
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <RoomOutlined className="text-3xl text-red-600" />
                </Marker>
            )}
            {marker === undefined
                && defaultMarker !== undefined
                && defaultMarker.latitude !== undefined
                && (
                    <Marker
                        latitude={parseFloat(defaultMarker.latitude)}
                        longitude={parseFloat(defaultMarker.longitude)}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <RoomOutlined className="text-3xl text-red-600" />
                    </Marker>
                )}
        </ReactMapGL>
    );
};

export default MiniMap;
