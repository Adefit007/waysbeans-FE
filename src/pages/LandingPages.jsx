import React, { useContext, useState } from "react";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import landingimage from "../assets/landingimage.svg";
import ListProduct from "../components/ListProduct";
import NavbarAuth from "../components/Navbar";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";

export default function LandingPages() {
  document.title = "WaysBeans";

  //modal Login
  const [show, setShow] = useState(false);
  const [state] = useContext(UserContext); //user data
  const handleClick = () => setShow(true);

  console.log(state.user);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  console.log(products);

  return (
    <div>
      <NavbarAuth setShow={setShow} show={show} />
      <Container className="mt-5 pt-5 container-fluid">
        <Card className="bgWhite imageHome">
          <CardImg src={landingimage} alt="landingimage" />
        </Card>
      </Container>
      <Container className="mt-5 mb-3 container-fluid">
        <Row>
          {products?.map((item, index) => (
            <Col className="mb-2">
              <Link
                className="text-decoration-none"
                to={state.isLogin === true ? `/detail-product/${item.id}` : ""}
                onClick={state.isLogin === false ? handleClick : ""}
              >
                <ListProduct item={item} key={index} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
