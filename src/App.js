import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import CarGallery from './components/CarGallery/CarGallery';
import MenuBar from './components/MenuBar/MenuBar';
import ModalComponent from './components/Modal/Modal';
import UploadImage from './components/UploadImage/UploadImage';

function App() {
  const [imagesList,setImagesList] = useState([]);
  const [locationParam,setLocationParam] = useState({});

  const handleImageSet= (imageArray)=>{
    setImagesList(imageArray);
  }

  const handlelocationParam = (params)=>{
    setLocationParam(params);
  }


  return (
    <Router>
      <MenuBar/>
      <Route exact path="/"> 
        <UploadImage handleImageSet = {handleImageSet} />
      </Route>
      <Route exact path="/locatedCar"> 
        <CarGallery imagesList={imagesList} handlelocationParam={handlelocationParam}/>
      </Route>
      <Route exact path="/locationOnMap">
        <ModalComponent locationParam={locationParam}/>
      </Route>
    </Router>
  );
}

export default App;
