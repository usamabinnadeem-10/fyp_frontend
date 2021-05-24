import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Dimmer,
  Icon,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import axios from "axios";

import "./UploadImage.css";
import Logo from '../../assets/logo.png';

export default function UploadImage(props) {
  const [activeLoader, setActiveLoader] = useState(false);
  const [queryImage, setQueryImage] = useState("");
  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const history = useHistory();
  console.log(props);

  const handleClick = () => {
    setFileSizeError(false);
    setFileTypeError(false);
    setQueryImage("");
    props.handleQueryImage("");
    document.getElementById("car-img").click();
  };

  const toBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      setQueryImage(reader.result);
      props.handleQueryImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleProceedImage = async () => {
    setActiveLoader(true);
    const images = await axios.post("http://localhost:8000/api/query/", {
      query: queryImage,
    });
    props.handleImageSet(images.data);
    history.push("/locatedCar");
    setActiveLoader(false);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file.type.includes("image"));
    if (file.size < 2086803 && file.type.includes("image")) {
      toBase64(file);
    }
    if (file.size >= 2086803) {
      setFileSizeError(true);
      console.log("file size is greater than 2mb");
    }
    if (!file.type.includes("image")) {
      setFileTypeError(true);
      console.log("file type must be image");
    }
  };

  return (
    <div className="row top_row">
      <div className="col-6">
        <div className="upload-image-page">
          <img src={Logo} alt="Logo" height="200"/>
          <p class="logoHeading">Vehicle Re-identification FYP Web Portal</p>
        </div>
      </div>
      <div className="col-6">
    <div className="row upload-image-page">
      <Segment basic className="upload-image-page">
        <Dimmer active={activeLoader} inverted>
          <Loader inverted content="Running Your Image Through Our Network" />
        </Dimmer>
        <p className="description">This web portal hosts our Vehicle Re-identification deep CNN model.
             Once you upload query car image, our model will search it in our 
             database and display top 10 matches along with their location on Google Maps.</p>
        {queryImage ? (
          <img src={queryImage} alt="queryImage" width="300" height="300" />
        ) : null}
        {!queryImage ? (
          <Button animated onClick={handleClick}>
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
          </Button>
        ) : null}
        <div>
          {queryImage ? (
            <>
              <Button attached="left" onClick={handleProceedImage}>
                Proceed <Icon name="right arrow" />
              </Button>
              <Button
                attached="right"
                onClick={() => {
                  setQueryImage("");
                  props.handleQueryImage("");
                }}
              >
                Cancel
              </Button>
            </>
          ) : null}
        </div>
        <p>Please upload the image of your query car.</p>
        {fileSizeError && (
          <Message negative>
            <Message.Header>File Size Must be Less Than 2MB</Message.Header>
          </Message>
        )}
        {fileTypeError && (
          <Message negative>
            <Message.Header>File Type Must be Image</Message.Header>
          </Message>
        )}
      </Segment>
    </div>
    </div>
    </div>
  );
}
