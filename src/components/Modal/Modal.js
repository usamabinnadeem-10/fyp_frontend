import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useHistory } from "react-router-dom";

export default function ModalComponent ({locationParam}){
    const {latitude,longitude} = locationParam;
    const history = useHistory();

    useEffect(()=>{
      if(latitude === undefined || longitude === undefined) {
        history.push('/');
      }
    })
    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
          position: { lat:latitude, lng: longitude },
          map,
          title: 'Hello World!'
        });
        
        return marker;
       };

    return(
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM" }}
            defaultCenter={{lat:latitude,lng:longitude}}
            defaultZoom={16}
            yesIWantToUseGoogleMapApiInternals="true"
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          >
          </GoogleMapReact>
    )
}