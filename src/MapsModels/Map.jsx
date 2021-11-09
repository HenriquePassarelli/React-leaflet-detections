import React, { useEffect, useState } from "react";
import { places } from "../data";

import {
  MapContainer,
  TileLayer,
  LayerGroup,
  Circle,
  MapConsumer,
  Rectangle,
  Popup,
  useMapEvent,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [hidden, setHidden] = useState(false);
  const defaultCenter = [-23.036419833482327, -45.57936042111503];

  // Recenter is called when click on the button or by clicking in the exactly position
  function Recenter(e) {
    const map = useMapEvent("click", (a) => {
      map.setView(defaultCenter);
      setHidden(false);
      console.log(e, a);
    });
    return null;
  }

  function GetPosition() {
    useMapEvents({
      dragend: (e) => {
        const { lat, lng } = e.target.getCenter();
        if (lat != defaultCenter[0] || lng != defaultCenter[1]) {
          setHidden(true);
        }
      },
    });
    return null;
  }

  return (
    <Container>
      <MapContainer
        center={defaultCenter}
        zoom={17}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='<a href="https://www.intelie.com.br/">Intelie</a> contributors &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          {places.map((place) => {
            let { id, description, positions, color, size } = place;

            return (
              <LayerGroup key={id}>
                <Circle center={positions} pathOptions={color} radius={size}>
                  <Popup>{description}</Popup>
                </Circle>
              </LayerGroup>
            );
          })}
        </LayerGroup>

        <GetPosition />
        <Center show={hidden}>
          <span> Redirect </span>
          <Recenter
            value={"center"}
            disable={false}
            style={{ width: "5%", height: "5%" }}
          />
        </Center>
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  overflow: hidden;
`;

const Center = styled.button`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  border-radius: 2rem;
  cursor: pointer;
  border: none;
  background-color: green;
  z-index: 800;
  padding: 1rem 2rem;
  margin: 2px;
  span {
    color: white;
    font-size: 16px;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export default Map;

/* <LayerGroup>
          <Circle
            center={[-23.036024853208367, -45.58355537781097]}
            pathOptions={greenOptions}
            radius={100}
          >
            <Popup>Hello world</Popup>
          </Circle>
        </LayerGroup>
        <FeatureGroup pathOptions={purpleOptions}>
          <Popup>You can write whatever you want</Popup>
          <Circle center={center} radius={200} />
        </FeatureGroup> */
