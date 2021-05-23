import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Icon, Loader, Segment } from "semantic-ui-react";
import axios from "axios";

import "./UploadImage.css";

export default function UploadImage(props) {
  const [activeLoader, setActiveLoader] = useState(false);
  const [queryImage,setQueryImage]= useState("");
  const history = useHistory();
  console.log(props);

  const handleClick = () => {
    setQueryImage("");
    document.getElementById("car-img").click();
  };

  const toBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      setQueryImage(reader.result);
      
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };


  const handleProceedImage = async ()=> {
    setActiveLoader(true);
    const images = await axios.post("http://localhost:8000/api/query/", {
      query: queryImage,
    });
    props.handleImageSet(images.data);
    history.push("/locatedCar");
    setActiveLoader(false);
  }


  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    toBase64(file);
  };

  return (
    <div className="row upload-image-page">
      <Segment basic className="upload-image-page">
        <Dimmer active={activeLoader} inverted>
          <Loader inverted content="Running Your Image Through Our Network" />
        </Dimmer>
        {queryImage ?<img src={queryImage} alt="queryImage" width="300" height="300"/>:null } 
        {(!queryImage)? <Button animated onClick={handleClick}>
          <Button.Content>
            <input
              type="file"
              id="car-img"
              name="car-img"
              accept="image/*"
              placeholder="Upload Image"
              style={{ display: "none" }}
              onChange={(event) => handleImageUpload(event)}
            />
            <Button.Content>
              Upload Image <Icon name="upload right" />
            </Button.Content>
          </Button.Content>
        </Button>:null}
        <div>
          {queryImage? 
            <>
              <Button attached="left" onClick={handleProceedImage}>
                Proceed <Icon name="right arrow" />
              </Button> 
              <Button attached="right" onClick={()=>setQueryImage("")}>
                Cancel
              </Button>
            </>
              :null}
        </div>
        <p>Please upload the image of your query car.</p>
        <p>Dankeschon!</p>
      </Segment>
    </div>
  );
}
