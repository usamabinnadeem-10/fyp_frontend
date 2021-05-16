import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function CarGallery ({imagesList}) {
  const [receiveImagesList,setReceiveImagesList] = useState({});
  const history = useHistory();

  useEffect(()=>{
    if(imagesList && (!imagesList.names)){
      history.push('/');
    }
    setReceiveImagesList(imagesList);
    console.log(receiveImagesList);
  },[receiveImagesList,imagesList,history])

  
  return (
    <div style={{ height: '100vh', width: '100%' }} className="container">
      {
        receiveImagesList && receiveImagesList.images &&  Object.keys(receiveImagesList.images).map((img)=>(
          <img src={`data:image/jpg;base64,${receiveImagesList.images[img]}`} key={receiveImagesList.names[img]} alt={receiveImagesList.names[img]}/>
        ))
      }
    </div>
  );
}
 
export default CarGallery;
