import React, { Component } from 'react';
import MapPanel from "../map-panel";
import InputPanel from "../input-panel";
import MarkerList from "../marker-list";
import AppHeader from "../app-header";
import YaGeocode from "../../service/ya-geocode";

import './app.css';
import ErrorIndicator from "../error-indicator";

export default  class App extends Component {
    maxId = 5;
    state = {
        markers: [],
        center:[],
        isReady: false,
        hasError: false
    }
    yaGeocode = new YaGeocode();

    createMarkerItem(label) {
        const id = this.maxId++;
        const { center } = this.state;
        return {
            id,
            label,
            address: '',
            coordinates: center
        }
    }
    addMarker = (label) => {
        if (!label.trim()) return;
        const { getAddress } = this.yaGeocode;
        const newMarker = this.createMarkerItem(label);
        const { center } = this.state;

        getAddress(center.slice(0))
            .then((address)=>{
                this.setState(({markers}) => {
                    newMarker.address = address;
                    const newArray = [
                        ...markers,
                        newMarker
                    ];
                    return {
                        markers: newArray
                    }
                });
            })
            .catch(this.onError);
    }
    deleteMarker = (id) => {
        this.setState(({markers}) => {
            const idx = markers.findIndex((el) => el.id===id)
            const newArray = [
                ...markers.slice(0, idx),
                ...markers.slice(idx+1)
            ]
            return {
                markers: newArray
            }
        });
    };
    updateCenter = (e) => {
        const center = e.get('target').getCenter();
        if (!center) return;
        this.setState({center: center});
    }
    changeList = ({startId, endId}) =>{
        if (endId===startId) return;
        this.setState(({markers})=>{
            const newArray = [...markers];
            const [removed] = newArray.splice(startId, 1);
            newArray.splice(endId, 0, removed);
            return {
                markers: newArray
            }
        });
    }
    updateMarkerDetails = ({id, pos}) => {
        const { getAddress } = this.yaGeocode;
        getAddress(pos.slice(0))
            .then((address)=>{
                this.setState(({markers})=> {
                    const idx = markers.findIndex((el) => el.id===id)
                    let newItem = {
                        ...markers[idx]
                    }
                    newItem['coordinates'] = pos;
                    newItem['address'] = address;
                    return {
                        markers: [
                            ...markers.slice(0, idx),
                            newItem,
                            ...markers.slice(idx + 1)
                        ]
                    }
                });
            })
            .catch(this.onError);
    }

    onError = () => {
        this.setState({hasError: true})
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({coords})=>{
                this.setState({
                    center: [coords.latitude, coords.longitude],
                    isReady: true
                })
            },
            ()=>{
                this.setState({
                    center: [55.751574, 37.573856],
                    isReady: true
                })
            }
        );
    }

    render() {
        const { markers, center, isReady, hasError } = this.state;

        const content = (!hasError && isReady) ? <MapPanel
                                        center={center}
                                        onUpdateCenter={this.updateCenter}
                                        markers={markers}
                                        onUpdateMarkerDetails={this.updateMarkerDetails}
                                    />
                                 : null;
        const errorMessage = hasError ? <ErrorIndicator /> : null;
        return (
            <div className="test-app">
                <AppHeader />
                <div className="row">
                    <div className="col-md-7">
                        {content}
                        {errorMessage}
                    </div>
                    <div className="col-md-5">
                        <InputPanel
                            onMarkerAdd={this.addMarker}
                        />
                        <MarkerList
                            markers={markers}
                            onDeleteMarker={this.deleteMarker}
                            onChangeList={this.changeList}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

