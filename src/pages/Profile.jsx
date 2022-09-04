import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarAuth from "../components/Navbar";
import imgBlank from "../assets/imgBlank.jpg";
import Transaction from "../components/Transaction";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";

export default function Profile() {
  const title = "Profile";
  document.title = "WaysBeans | " + title;

  const [state] = useContext(UserContext);

  return (
    <div>
      <NavbarAuth />
      <Container className="mt-5 pt-5 container-fluid">
        <Row>
          <Col xs={12} md={6}>
            <h2 className="text-primer fw-bold mb-3">My Profile</h2>
            <Row>
              <Col xs={12} md={6}>
                <img
                  src={
                    Profile?.image === "http://localhost:5000/uploads/"
                      ? Profile?.image
                      : imgBlank
                  }
                  style={{ width: "100%", borderRadius: "8px" }}
                  className=""
                  alt=""
                />
              </Col>
              <Col>
                <div className="text-primer">
                  <h4>Name : {state.user.name}</h4>
                  <h4>Email : {state.user.email}</h4>
                  <h4>Alamat :</h4>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <h2 className="text-primer fw-bold mb-3">My Transactions</h2>
            <Transaction />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
