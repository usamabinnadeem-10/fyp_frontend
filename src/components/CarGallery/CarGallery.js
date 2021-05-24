import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

import CamLocations from '../../cam_locations.json';
import './CarGallery.css';

function CarGallery({ imagesList,handlelocationParam }) {
  const [receiveImagesList, setReceiveImagesList] = useState({});
  const [direction,setDirections] = useState([]);
  const history = useHistory();


  const Marker = (props) => {
    const { name } = props;
    return (
      <>
        <div class='pin'><p>{name}</p></div>
        <div class='pulse'></div>
      </>
    );
  };

  const getMapOptions = (maps) => {
    return {
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  useEffect(() => {
    console.log(imagesList);
    if (imagesList && !imagesList.names) {
      history.push("/");
    }
    setReceiveImagesList(imagesList);
  }, [receiveImagesList, imagesList, history]);

  const handleImageClick = (imageName)=>{
    let reqCameraId = imageName.split("_")[1];
    const latitude = Number(CamLocations[reqCameraId].latitude);
    const longitude = Number(CamLocations[reqCameraId].longitude);
    setDirections([
      ...direction,
      {
        latitude,
        longitude
      }]
    )
    console.log(direction);
  }


  return (
    <div style={{ height: "100vh", width: "100%" }} className="container">
      {receiveImagesList &&
        receiveImagesList.images && (
          <div className="row">
            <div className="col-6">
              <div className="row">
                {
                  Object.keys(receiveImagesList.images).map((img,index) => (
                    <div className="col-12 col-md-5 mt-2">
                      <p>{`Rank ${index}`}</p>
                      <img
                        src={`data:image/jpg;base64,${receiveImagesList.images[img]}`}
                        key={receiveImagesList.names[img]}
                        alt={receiveImagesList.names[img]}
                        onLoad={()=>handleImageClick(receiveImagesList.names[img])}
                        width="200"
                        height="200"
                      />
                  </div>
                  ))
                }
              </div>
            </div>
            <div className="col-6 mt-5" style={{height:500}}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM" }}
                defaultCenter={{lat:33.647200,lng:72.990114}}
                defaultZoom={14}
                options={getMapOptions}
              >
                  {
                    direction.length >0 && direction.map((dir,index)=>(
                      <Marker
                        lat={dir.latitude}
                        lng={dir.longitude}
                        name={index}
                        color="blue"
                      />
                    ))
                  } 
              </GoogleMapReact>
            </div>
          </div>
        )}
    </div>
  );
}

export default CarGallery;


