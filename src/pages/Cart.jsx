import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavbarAuth from "../components/Navbar";
import iconDelete from "../assets/trash.png";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import imageTrans from "../assets/notFound.webp"

export default function Cart() {
  const title = "Cart";
  document.title = "Waysbeans | " + title;

  const navigate = useNavigate;

  //cart
  let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-id");
    return response.data.data;
  });

  //subtotal
  let resultTotal = cart?.reduce((x, y) => {
    return x + y.qty * y.subtotal;
  }, 0);

  //qty
  let resultQty = cart?.reduce((x, y) => {
    return x + y.qty;
  }, 0);

  //remove
  let handleDelete = async (id) => {
    await API.delete(`/cart/` + id);
    refetch();
  };

  //update
  const increaseCart = async (idProduct) => {
    try {
      const result = cart.find(({ id }) => id === idProduct);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        qty: result.qty + 1,
      });

      await API.patch("/cart/" + idProduct, body, config);
      refetch();
    } catch (error) {}
  };

  const decreaseCart = async (idProduct) => {
    try {
      const result = cart.find(({ id }) => id === idProduct);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        qty: result.qty - 1,
      });

      await API.patch("/cart/" + idProduct, body, config);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // pay midtrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    // const myMidtransClientKey = "Client key here ...";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // handlebuy

  const form = {
    total: resultTotal,
  };
  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(form);
    const response = await API.post("/transaction", body, config);
    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function () {
        alert("you closed the popup without finishing the payment");
      },
    });
    await API.patch("/cart", body, config);
  });

  console.log(cart);
  return (
    <div>
      <NavbarAuth />
      <Container className="pt-5 mt-5">
        <h1 className="text-primer fw-bold mb-3"> My Cart</h1>
        <p className="text-primer2">Review Your Order</p>
        {cart?.length !== 0 ? (
        <Row className="justify-content-between">
          <Col md={8}>
            <div className="lines my-3" />
            <Container className="justify-content-between ">
              {cart?.map((item, index) => (
                <Row style={{ fontSize: 14 }}>
                  <Col md={8} className="d-flex">
                    <div
                      className="rounded"
                      style={{
                        width: 80,
                        height: 80,
                        marginRight: 13,
                        marginBottom: 29,
                      }}
                    >
                      <img
                        src={item?.product?.Image}
                        className="rounded"
                        alt="img"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div>
                      <p className="text-primer" style={{ fontWeight: 900 }}>
                        {item?.product?.Title}
                      </p>
                      <Button
                        className="btn-increase fw-bold rounded-circle"
                        onClick={() => decreaseCart(item.id)}
                      >
                        -
                      </Button>
                      <p className="d-inline mx-3 text-primer">{item.qty}</p>
                      <Button
                        className="btn-increase fw-bold rounded-circle"
                        onClick={() => increaseCart(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col
                    md={4}
                    className="justify-content-end"
                    style={{ textAlign: "end" }}
                  >
                    <p className="text-primer">
                      {convertRupiah.convert(item?.qty * item?.product?.Price)}
                    </p>
                    <img
                      src={iconDelete}
                      alt="img"
                      onClick={() => handleDelete(item.id)}
                      style={{ cursor: "pointer", width: 16, height: 20 }}
                    />
                  </Col>
                </Row>
              ))}
            </Container>
            <div className="lines my-3" />
          </Col>

          <Col md={4} className="text-center">
            <div className="lines my-3" />
            <Row>
              <Col>
                <p className="text-primer">Subtotal</p>
                <p className="text-primer">QTY</p>
              </Col>
              <Col>
                <p className="text-primer">
                  {convertRupiah.convert(resultTotal)}
                </p>
                <p className="text-primer">{resultQty}</p>
              </Col>
            </Row>
            <div className="lines my-3" />
            <Row className="fw-bolder">
              <Col>
                <p className="text-primer">Total</p>
              </Col>
              <Col>
                <p className="text-primer">
                  {convertRupiah.convert(resultTotal)}
                </p>
              </Col>
            </Row>
            <Button
              className="btn-authlogin w-100"
              type="submit"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              {" "}
              PAY
            </Button>
          </Col>
        </Row>
        ) : (
          <div className="text-center">
          <img
            src={imageTrans}
            alt=""
            className="img-fluid"
            style={{ width: "40%" }}
          />
          <div className="text-primer fw-bold">
            No data Cart, let's Shopping
          </div>
        </div>
        )}
      </Container>
    </div>
  );
}
