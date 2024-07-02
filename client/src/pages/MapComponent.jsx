import React, { useCallback, useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.5204,
  lng: 74.3587,
};

const MapComponent = ({ onMarkerDragEnd }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI', // Replace with your actual API key
    libraries: ['places'], // This is required for Places library
  });

  const [markerPosition, setMarkerPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      // Initialize the places autocomplete
      const autocomplete = new window.google.maps.places.Autocomplete(searchBoxRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(newCenter);
        setMapCenter(newCenter);
        if (onMarkerDragEnd) {
          onMarkerDragEnd(newCenter);
        }
      });
    }
  }, [isLoaded, onMarkerDragEnd]);

  const onDragEnd = (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    setMapCenter({ lat: newLat, lng: newLng });
    if (onMarkerDragEnd) {
      onMarkerDragEnd({ lat: newLat, lng: newLng });
    }
  };

  const onLoad = useCallback((map) => {
    map.addListener("click", (e) => {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      setMarkerPosition({ lat: newLat, lng: newLng });
      setMapCenter({ lat: newLat, lng: newLng });
    });
  }, [onMarkerDragEnd]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={14}
          onLoad={onLoad}
        >
          <div>
            <MarkerF
              position={markerPosition}
              draggable={true}
              onDragEnd={onDragEnd}
            />
            <InfoWindow position={markerPosition}>
              <div>
                <p>Location Details:</p>
                <p>Latitude: {markerPosition.lat.toFixed(4)}</p>
                <p>Longitude: {markerPosition.lng.toFixed(4)}</p>
              </div>
            </InfoWindow>
          </div>
        </GoogleMap>
        <input ref={searchBoxRef} type="text" placeholder="Search places..." style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: '5', marginBottom: '10px', width: '300px', height: '20px' }} />
      </div>
    </>
  );
};

export default MapComponent;