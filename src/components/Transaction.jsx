import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import waysbeanLogo from "../assets/waysbeans.svg";
import qrCode from "../assets/qrcode.svg";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Rupiah from "rupiah-format";

export default function Transaction() {
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/user-transaction");
    return response.data.data;
  });
  console.log(transactions);
  return (
    <>
      {transactions?.map((items, index) => (
        <Container
          className="p-4 overflow-auto rounded-4 mb-2"
          style={{ backgroundColor: "#F6DADA" }}
        >
          <Row>
            {items?.product?.map((data, idx) => (
              <Col md={8} key={idx}>
                <Row className="mb-3">
                  <Col sm={4}>
                    <img
                      src={data?.product?.Image}
                      alt="aa"
                      style={{ width: 100 }}
                    />
                  </Col>
                  <Col sm={8}>
                    <div>
                      <h5>{data?.product?.Title}</h5>
                      <p>
                        <b>Saturday</b>, <span>5 September 2022</span>{" "}
                      </p>
                      <p>Qty: {data?.qty}</p>
                    </div>
                    <div className="mt-1" style={{ fontSize: 15 }}>
                      <p className="my-1">
                        Price : {Rupiah.convert(data?.subtotal)}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}

            <Col md={4} className="text-center">
              <img className="w-50" src={waysbeanLogo} alt="" />
              <br />
              <br />
              <img src={qrCode} alt="" />
              <div
                className="text-center w-75 m-auto my-3 fw-semibold"
                style={{
                  backgroundColor: "rgba(0, 209, 255, .3)",
                  color: "#00D1FF",
                }}
              >
                {items?.status}
              </div>
              <div className="text-center w-75 m-auto my-3 fw-normal">
                Subtotal:{Rupiah.convert(items?.total)}
              </div>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
}
