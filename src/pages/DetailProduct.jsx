import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import NavbarAuth from "../components/Navbar";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

export default function DetailProduct() {
  const title = "Product";
  document.title = "WaysBeans | " + title;

  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });
  console.log(product);

  return (
    <div>
      <NavbarAuth />
      <Container className="mt-5 pt-5 px-5">
        <Row>
          <Col xs={12} md={4} className="container-fluid ">
            <img
              className="rounded"
              src={product?.image}
              alt="detailProduct"
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={12} md={8}>
            <h1 className="text-primer fw-bold mt-2">{product?.title}</h1>
            <h5 className="text-primer2 my-3">Stock : {product?.stock}</h5>
            <p className="text-primer2 text-justified">{product?.desc}</p>
            <h3 className="text-end text-primer2 mt-5">
              {convertRupiah.convert(product?.price)}
            </h3>
            <Link to={"/cart"}>
              <Button className="w-100 mt-5 btn-authlogin">Add Cart</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
