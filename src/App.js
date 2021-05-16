import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import CarGallery from './components/CarGallery/CarGallery';
import MenuBar from './components/MenuBar/MenuBar';
import ProgressBar from './components/ProgressBar/ProgressBar';
import UploadImage from './components/UploadImage/UploadImage';

function App() {
  const [imagesList,setImagesList] = useState([]);
  const [image64,setImage64] = useState("");

  const handleImageSet= (imageArray)=>{
    setImagesList(imageArray);
  }

  const handleImageBase64 = (base64)=>{
    console.log(base64);
    setImage64(base64);
  }
  return (
    <Router>
      <MenuBar/>
      <Route exact path="/"> 
        <UploadImage handleImageSet = {handleImageSet} handleImageBase64={handleImageBase64} />
      </Route>
      <Route exact path="/checking" > 
        <ProgressBar image64={image64}/>
      </Route>
      <Route exact path="/locatedCar"> 
        <CarGallery imagesList={imagesList}/>
      </Route>
    </Router>
  );
}

export default App;
