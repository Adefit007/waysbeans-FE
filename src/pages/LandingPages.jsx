import React from "react";
import { Card, CardImg, Container } from "react-bootstrap";
import landingimage from "../assets/landingimage.svg";
import ListProduct from "../components/ListProduct";
import NavbarAuth from "../components/Navbar";

export default function LandingPages() {
  return (
    <div>
      <NavbarAuth />
      <Container className="mt-5 pt-5">
        <Card className="bgWhite imageHome">
          <CardImg src={landingimage} alt="landingimage" />
        </Card>
      </Container>
      <Container className="mt-5 mb-3 ">
        <ListProduct />
      </Container>
    </div>
  );
}
