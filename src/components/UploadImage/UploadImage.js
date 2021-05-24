import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Icon, Loader, Message, Segment } from "semantic-ui-react";
import axios from "axios";

import "./UploadImage.css";

export default function UploadImage(props) {
  const [activeLoader, setActiveLoader] = useState(false);
  const [queryImage,setQueryImage]= useState("");
  const [fileSizeError,setFileSizeError] = useState(false);
  const history = useHistory();
  console.log(props);

  const handleClick = () => {
    setFileSizeError(false);
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
    console.log(file.size);
    if(file.size < 2086803){
      toBase64(file);
    }
    else {
      setFileSizeError(true);
    console.log("file size is greater than 2mb");
    }
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
        {  fileSizeError && 
        <Message negative>
          <Message.Header>File Size Must be Less Than 2MB</Message.Header>
        </Message>}
      </Segment>
    </div>
  );
}
