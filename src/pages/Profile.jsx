import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarAuth from "../components/Navbar";
import imgBlank from "../assets/imgBlank.jpg";
import imageProduct from "../assets/product1.svg";
import waysbeanLogo from "../assets/waysbeans.svg";
import qrCode from "../assets/qrcode.svg";

export default function Profile() {
  const title = "Profile";
  document.title = "WaysBeans | " + title;

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
                  src={imgBlank}
                  style={{ width: "100%", borderRadius: "8px" }}
                  className=""
                  alt=""
                />
              </Col>
              <Col>
                <div className="text-primer">
                  <h4>Name :</h4>
                  <h4>Email :</h4>
                  <h4>Alamat :</h4>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <h2 className="text-primer fw-bold mb-3">My Transactions</h2>
            <Row className="bgCard rounded py-2">
              <Col xs={4} md={4}>
                <img
                  src={imageProduct}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Col>
              <Col xs={5} md={5}>
                <div className="text-primer ">
                  <h5 className="m-0">Guatemala Beans</h5>
                  <p className="m-0">Saturday, 5 march 2020</p>
                  <p className="m-0">Price : Rp. 300.900</p>
                  <p className="m-0">Qty : 2</p>
                  <p className="m-0">Subbtotal : 601.800</p>
                </div>
              </Col>
              <Col xs={3} md={3}>
                <div className="">
                  <img
                    src={waysbeanLogo}
                    style={{ width: "100%" }}
                    className=""
                  />
                  <img
                    src={qrCode}
                    style={{ width: "100%" }}
                    className="my-1"
                  />
                  <p className="text-warning text-center bg-info rounded">
                    Waiting Approve
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
