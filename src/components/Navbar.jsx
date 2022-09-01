import React, { useContext } from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/useContext";
import Auth from "./modals/Auth";
import NavUser from "./NavUser";

export default function NavbarAuth({ setShow, show }) {
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between shadow">
          <NavbarBrand className="ms-5">
            <Link to={"/"}>
              <img src={logo} style={{ maxWidth: "150px" }} alt="logobrand" />
            </Link>
          </NavbarBrand>
          {isLogin ? <NavUser /> : <Auth show={show} setShow={setShow} />}
        </Navbar>
      </Container>
    </div>
  );
}
