import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { Card, Image } from "semantic-ui-react";

import CamLocations from "../../cam_locations.json";
import "./CarGallery.css";

const imgHeight = "300px";

function CarGallery({ imagesList, queryImage }) {
  const [receiveImagesList, setReceiveImagesList] = useState({});
  const [direction, setDirections] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(queryImage);
  }, [queryImage]);

  const Marker = (props) => {
    const { name } = props;
    return (
      <>
        <div class="pin">
          <p style={{ marginLeft: name === 10 ? 0 : 10 }}>{name}</p>
        </div>
        <div class="pulse"></div>
      </>
    );
  };

  const getMapOptions = (maps) => {
    return {
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  useEffect(() => {
    console.log(imagesList);
    if (imagesList && !imagesList.names) {
      history.push("/");
    }
    setReceiveImagesList(imagesList);
  }, [receiveImagesList, imagesList, history]);

  const handleImageClick = (imageName) => {
    let reqCameraId = imageName.split("_")[1];
    const latitude = Number(CamLocations[reqCameraId].latitude);
    const longitude = Number(CamLocations[reqCameraId].longitude);
    setDirections([
      ...direction,
      {
        latitude,
        longitude,
      },
    ]);
    console.log(direction);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }} className="container">
      {queryImage && (
        <Card
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            margin: "auto",
          }}
        >
          <Image src={queryImage} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Your Query Image</Card.Header>
          </Card.Content>
        </Card>
      )}
      {receiveImagesList && receiveImagesList.images && (
        <>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 1</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[0]}`}
                  key={receiveImagesList.names[0]}
                  alt={receiveImagesList.names[0]}
                  onLoad={() => handleImageClick(receiveImagesList.names[0])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[0].latitude,
                      lng: direction[0].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[0].latitude}
                      lng={direction[0].longitude}
                      name={1}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 2</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[1]}`}
                  key={receiveImagesList.names[1]}
                  alt={receiveImagesList.names[1]}
                  onLoad={() => handleImageClick(receiveImagesList.names[1])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[1].latitude,
                      lng: direction[1].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[1].latitude}
                      lng={direction[1].longitude}
                      name={2}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 3</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[2]}`}
                  key={receiveImagesList.names[2]}
                  alt={receiveImagesList.names[2]}
                  onLoad={() => handleImageClick(receiveImagesList.names[2])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[2].latitude,
                      lng: direction[2].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[2].latitude}
                      lng={direction[2].longitude}
                      name={3}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 4</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[3]}`}
                  key={receiveImagesList.names[3]}
                  alt={receiveImagesList.names[3]}
                  onLoad={() => handleImageClick(receiveImagesList.names[3])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[3].latitude,
                      lng: direction[3].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[3].latitude}
                      lng={direction[3].longitude}
                      name={4}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 5</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[4]}`}
                  key={receiveImagesList.names[4]}
                  alt={receiveImagesList.names[4]}
                  onLoad={() => handleImageClick(receiveImagesList.names[4])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[4].latitude,
                      lng: direction[4].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[4].latitude}
                      lng={direction[4].longitude}
                      name={5}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 6</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[5]}`}
                  key={receiveImagesList.names[5]}
                  alt={receiveImagesList.names[5]}
                  onLoad={() => handleImageClick(receiveImagesList.names[5])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[5].latitude,
                      lng: direction[5].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[5].latitude}
                      lng={direction[5].longitude}
                      name={6}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 7</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[6]}`}
                  key={receiveImagesList.names[6]}
                  alt={receiveImagesList.names[6]}
                  onLoad={() => handleImageClick(receiveImagesList.names[6])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[6].latitude,
                      lng: direction[6].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[6].latitude}
                      lng={direction[6].longitude}
                      name={7}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 8</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[7]}`}
                  key={receiveImagesList.names[7]}
                  alt={receiveImagesList.names[7]}
                  onLoad={() => handleImageClick(receiveImagesList.names[7])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[7].latitude,
                      lng: direction[7].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[7].latitude}
                      lng={direction[7].longitude}
                      name={8}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 9</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[8]}`}
                  key={receiveImagesList.names[8]}
                  alt={receiveImagesList.names[8]}
                  onLoad={() => handleImageClick(receiveImagesList.names[8])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[8].latitude,
                      lng: direction[8].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[8].latitude}
                      lng={direction[8].longitude}
                      name={9}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
          <Card
            fluid
            style={{
              padding: 10,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Content>
              <Card.Header>Rank 10</Card.Header>
            </Card.Content>
            <div className="row">
              <div className="col-12 col-md-7">
                <img
                  src={`data:image/jpg;base64,${receiveImagesList.images[9]}`}
                  key={receiveImagesList.names[9]}
                  alt={receiveImagesList.names[9]}
                  onLoad={() => handleImageClick(receiveImagesList.names[9])}
                  width="auto"
                  height={imgHeight}
                />
              </div>
              <div className="col-12 col-md-5" style={{ height: 300 }}>
                {direction.length === 10 && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCch-zHeJGA2YVaByPKBPDTMYTCLIY3TEM",
                    }}
                    defaultCenter={{
                      lat: direction[9].latitude,
                      lng: direction[9].longitude,
                    }}
                    defaultZoom={18}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={direction[9].latitude}
                      lng={direction[9].longitude}
                      name={10}
                      color="blue"
                    />
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default CarGallery;
