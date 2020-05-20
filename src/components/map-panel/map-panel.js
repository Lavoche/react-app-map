import React from 'react';
import { FullscreenControl, Map, Placemark, Polyline, YMaps } from 'react-yandex-maps';

const MapPanel = ({ center, markers, onUpdateMarkerDetails, onUpdateCenter }) =>{

        const linePointCoordinates = [];
        const placeMarks= markers.map(({id, label, address, coordinates})=> {
            linePointCoordinates.push(...[coordinates]);
            return (
                <Placemark
                    geometry={coordinates}
                    key={id}
                    options={{
                        draggable:true
                    }}
                    modules={['geoObject.addon.balloon']}
                    properties={{
                        balloonContentHeader: `${label}`,
                        balloonContentBody: `${address}`
                    }}
                    onDragEnd={(e)=> {
                        onUpdateMarkerDetails({
                            id,
                            pos: e.get('target').geometry._coordinates
                        })
                    }}
                />
            );
        });
        const line =(
            <Polyline
                geometry={linePointCoordinates}
                options={{
                    balloonCloseButton: false,
                    strokeColor: '#000',
                    strokeWidth: 4,
                    strokeOpacity: 0.5,
                }}
            />
            );
        return (
            <YMaps>
                <Map
                    defaultState={{center, zoom: 9 }}
                    onActionEnd={onUpdateCenter}
                    width="100%"
                    height="400px"
                >
                    {placeMarks}{line}
                    <FullscreenControl />
                </Map>
            </YMaps>
        );
    }
export default MapPanel;