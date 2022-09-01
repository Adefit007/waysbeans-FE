import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/useContext";

export default function Auth() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [shows, setShows] = useState(false);
  const handleShows = () => setShows(true);
  const handleCloses = () => setShows(false);

  const switchLogin = () => {
    setShow(true);
    setShows(false);
  };

  const switchRegister = () => {
    setShows(true);
    setShow(false);
  };

  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      console.log(body);
      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.status === "admin") {
          navigate("/transaction");
        } else {
          navigate("/");
        }
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Button className="me-2 btn-log" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body closebutton="true">
          <h1 className="text-login text-center mb-4">Login</h1>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Control
              className="mb-3"
              type="email"
              id="email"
              name="email"
              placeholder="type your email"
              onChange={handleChange}
            />
            <Form.Control
              className="mb-3 form-Input"
              type="password"
              id="password"
              name="password"
              placeholder="type your password"
              onChange={handleChange}
            />
            <Button type="submit" className="w-100 mb-3 btn-authlogin">
              Submit
            </Button>
          </Form>
          <p>
            Don't have an account? please{" "}
            <strong className="point" onClick={switchRegister}>
              Register
            </strong>
          </p>
        </Modal.Body>
      </Modal>

      <Button className="me-5 btn-login" onClick={handleShows}>
        Register
      </Button>
      <Modal show={shows} onHide={handleCloses}>
        <Modal.Body closebutton="true">
          <h1 className="text-login text-center mb-4">Register</h1>
          <Form>
            <Form.Control
              className="mb-3 form-Input"
              type="text"
              id="name"
              name="name"
              placeholder="type your name"
            />
            <Form.Control
              className="mb-3 form-Input"
              type="email"
              id="email"
              name="email"
              placeholder="type your email"
            />
            <Form.Control
              className="mb-3 form-Input"
              type="password"
              id="password"
              name="password"
              placeholder="type your password"
            />
            <Button type="submit" className="w-100 mb-3 btn-authlogin">
              Submit
            </Button>
          </Form>
          <p>
            Don't have an account? please{" "}
            <strong className="point" onClick={switchLogin}>
              Login
            </strong>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
