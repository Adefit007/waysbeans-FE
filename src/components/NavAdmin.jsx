import React, { useContext } from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/useContext";
import { Dropdown, Image, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/imgBlank.jpg";
import profile1 from "../assets/beansvector.png";
import logoutImg from "../assets/logout.png";

export default function NavAdmin() {
  const [state, dispatch] = useContext(UserContext);

  const profilToggle = (
    <Image src={profile} width="35" height="35" className=" rounded-circle" />
  );

  const profileVector = <Image src={profile1} width="15" height="15" />;

  const logoutIcon = <Image src={logoutImg} width="15" height="15" />;

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between shadow">
          <NavbarBrand className="ms-5">
            <Link to={"/transaction"}>
              <img src={logo} style={{ maxWidth: "150px" }} alt="logobrand" />
            </Link>
          </NavbarBrand>
          <Nav>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-primer">
              <NavDropdown title={profilToggle}>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/add-product"
                    className="text-primer text-decoration-none"
                  >
                    {profileVector}
                    <span className="text-primer"> Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/list-product"
                    className="text-primer text-decoration-none"
                  >
                    {profileVector}
                    <span className="text-primer"> List Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-primer">
                  {logoutIcon}
                  <span className="text-primer" onClick={logout}>
                    {" "}
                    Logout
                  </span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
}
