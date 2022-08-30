import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import logo from "../assets/logo.svg";
import Auth from "./modals/Auth";

export default function NavbarAuth() {
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between shadow">
          <NavbarBrand className="ms-5">
            <img src={logo} style={{ maxWidth: "150px" }} alt="logobrand" />
          </NavbarBrand>
          <Auth />
        </Navbar>
      </Container>
    </div>
  );
}
