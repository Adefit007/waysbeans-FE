import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Product } from "./Dummy";

export default function ListProduct() {
  return (
    <div>
      <Row>
        {Product?.map((item, index) => (
          <Col className="mb-2">
            <Card style={{ width: "16rem" }} key={index}>
              <Card.Img
                variant="top"
                src={item.image}
                className="imageProduct"
              />
              <Card.Body className="text-danger bgCard">
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text className="m-0 ">Rp : {item.price}</Card.Text>
                <Card.Text className="m-0">Stock : {item.stock}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
