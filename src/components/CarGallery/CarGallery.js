import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Gallery from "react-photo-gallery";

import './CarGallery.css';
import CamLocations from '../../cam_locations.json';
import { photos } from "./photos";
import ImageWithCaption from "./ImageWithGallery";

function CarGallery({ imagesList,handlelocationParam }) {
  const [receiveImagesList, setReceiveImagesList] = useState({});
  const history = useHistory();
  const [photoGallery,setPhotoGallery] = useState([]);

  const imageRenderer = ({ index, left, top, key, photo }) => (
    <ImageWithCaption
      key={key}
      margin={"2px"}
      index={index}
      photo={photo}
      left={left}
      top={top}
    />
  );

  useEffect(() => {
    console.log(imagesList);
    if (imagesList && !imagesList.names) {
      history.push("/");
    }
    setReceiveImagesList(imagesList);
    console.log(photos(imagesList));
    setPhotoGallery(photos(imagesList));
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
        receiveImagesList.images &&(
        <Gallery photos={photoGallery} renderImage={imageRenderer}></Gallery>)}
    </div>
  );
}

export default CarGallery;
