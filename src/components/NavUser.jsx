import React, { useContext } from "react";
import { Dropdown, Image, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/useContext";
import profile from "../assets/profileToggle.png";
import profile1 from "../assets/profileVector.png";
import logoutImg from "../assets/logout.png";
import cart from "../assets/cart.png";

export default function NavUser() {
  const profilToggle = (
    <Image src={profile} width="35" height="35" className=" rounded-circle" />
  );

  const profileVector = <Image src={profile1} width="15" height="15" />;

  const logoutIcon = <Image src={logoutImg} width="15" height="15" />;

  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div>
      <Nav>
        <Nav.Link className="me-3 mt-2 text-danger">
          <Link to="#" className="text-decoration-none">
            <div className="cart">
              <img src={cart} alt="" style={{ maxWidth: "40px" }} />
              <span className="notif" style={{ backgroundColor: "red" }}></span>
            </div>
          </Link>
        </Nav.Link>
        <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-primer">
          <NavDropdown title={profilToggle}>
            <Dropdown.Item className="text-danger">
              <Link to="/profile" className="text-primer text-decoration-none">
                {profileVector}
                <span> Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-primer">
              {logoutIcon}
              <span onClick={logout}> Logout</span>
            </Dropdown.Item>
          </NavDropdown>
        </Nav.Link>
      </Nav>
    </div>
  );
}
