import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import CarGallery from './components/CarGallery/CarGallery';
import MenuBar from './components/MenuBar/MenuBar';
import UploadImage from './components/UploadImage/UploadImage';

function App() {
  const [imagesList,setImagesList] = useState([]);

  const handleImageSet= (imageArray)=>{
    setImagesList(imageArray);
  }


  return (
    <Router>
      <MenuBar/>
      <Route exact path="/"> 
        <UploadImage handleImageSet = {handleImageSet} />
      </Route>
      <Route exact path="/locatedCar"> 
        <CarGallery imagesList={imagesList}/>
      </Route>
    </Router>
  );
}

export default App;
