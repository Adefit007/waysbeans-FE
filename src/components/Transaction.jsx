import React from "react";
import { Col, Row } from "react-bootstrap";
import waysbeanLogo from "../assets/waysbeans.svg";
import qrCode from "../assets/qrcode.svg";
import imageProduct from "../assets/product1.svg";

export default function Transaction() {
  return (
    <div>
      <Row className="bgCard rounded py-2">
        <Col xs={4} md={3}>
          <img
            src={imageProduct}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Col>
        <Col xs={5} md={7}>
          <div className="text-primer ">
            <h4 className="m-0">Guatemala Beans</h4>
            <p className="mt-2 fw-bold">Saturday, 5 march 2020</p>
            <p className="m-0">Price : Rp. 300.900</p>
            <p className="m-0">Qty : 2</p>
            <p className="m-0 fw-bold">Subbtotal : 601.800</p>
          </div>
        </Col>
        <Col xs={3} md={2}>
          <div className="">
            <img src={waysbeanLogo} style={{ width: "100%" }} className="" />
            <img src={qrCode} style={{ width: "100%" }} className="my-1" />
            <p className="text-warning text-center bg-info rounded">
              Waiting Approve
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
