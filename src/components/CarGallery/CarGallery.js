import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CamLocations from '../../cam_locations.json';

function CarGallery({ imagesList,handlelocationParam }) {
  const [receiveImagesList, setReceiveImagesList] = useState({});
  const history = useHistory();

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
    handlelocationParam({
      latitude,
      longitude
    })
    history.push('/locationOnMap')
    console.log(latitude,longitude);
  }

  


  return (
    <div style={{ height: "100vh", width: "100%" }} className="container">
      {receiveImagesList &&
        receiveImagesList.images &&
        Object.keys(receiveImagesList.images).map((img) => (
          <img
            src={`data:image/jpg;base64,${receiveImagesList.images[img]}`}
            key={receiveImagesList.names[img]}
            alt={receiveImagesList.names[img]}
            onClick={()=>handleImageClick(receiveImagesList.names[img])}
          />
        ))}
    </div>
  );
}

export default CarGallery;
