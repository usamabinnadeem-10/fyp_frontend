import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import CarGallery from './components/CarGallery/CarGallery';
import MenuBar from './components/MenuBar/MenuBar';
import UploadImage from './components/UploadImage/UploadImage';
//import jsonfile from './response.json';

function App() {
  const [imagesList,setImagesList] = useState([]);
  const [queryImage,setQueryImage] = useState("");
  const handleImageSet= (imageArray)=>{
    setImagesList(imageArray);
  }

  const handleQueryImage = (file)=>{
    console.log(file);
    setQueryImage(file);
  }


  return (
    <Router>
      <MenuBar/>
      <Route exact path="/"> 
        <UploadImage handleImageSet = {handleImageSet} handleQueryImage={handleQueryImage}/>
      </Route>
      <Route exact path="/locatedCar"> 
        <CarGallery imagesList={imagesList} queryImage={queryImage}/>
      </Route>
    </Router>
  );
}

export default App;
