import React from "react";
import { Container } from "react-bootstrap";
import NavbarAuth from "../components/Navbar";

export default function Cart() {
  return (
    <div>
      <NavbarAuth />
      <Container className="pt-5 mt-5">
        <h1 className="text-primer fw-bold mb-3"> My Cart</h1>
        <p className="text-primer2">Review Your Order</p>
      </Container>
    </div>
  );
}
