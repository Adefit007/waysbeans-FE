import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

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

  return (
    <div>
      <Button className="me-2 btn-log" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body closebutton="true">
          <h1 className="text-login text-center mb-4">Login</h1>
          <Form>
            <Form.Control
              className="mb-3"
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
