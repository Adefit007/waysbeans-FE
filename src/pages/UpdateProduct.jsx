import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavAdmin from "../components/NavAdmin";
import paperclip from "../assets/paperclip.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useEffect } from "react";

export default function UpdateProduct() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({});
  const [labelName, setLabelName] = useState("");
  const [form, setForm] = useState({
    title: "",
    stock: "",
    price: "",
    desc: "",
    image: "",
  });

  let { data: products } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      // setLabelName(products.image.slice(15));
      setForm({
        ...form,
        title: products.title,
        stock: products.stock,
        price: products.price,
        desc: products.desc,
      });
      setProduct(products);
    }
  }, [products]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setLabelName(e.target.files[0].name);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("desc", form.desc);

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <NavAdmin />
      <Container className="mt-5 pt-5">
        <h1 className="text-primer my-3">Update Product</h1>
        <Row>
          <Col>
            <Row>
              <Col xs={12} md={7}>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="title"
                      id="title"
                      value={form.title}
                      placeholder="Name"
                      className="mb-3"
                      onChange={handleChange}
                    />
                    <Form.Control
                      type="number"
                      name="stock"
                      id="stock"
                      value={form.stock}
                      placeholder="Stock"
                      className="mb-3"
                      onChange={handleChange}
                    />
                    <Form.Control
                      type="number"
                      name="price"
                      id="price"
                      value={form.price}
                      placeholder="Price"
                      className="mb-3"
                      onChange={handleChange}
                    />
                    <Form.Control
                      as="textarea"
                      name="desc"
                      id="desc"
                      value={form.desc}
                      placeholder="Description Product"
                      className="mb-3"
                      rows={3}
                      onChange={handleChange}
                    />
                    <div
                      className="input-group  mb-4"
                      style={{ borderRadius: "5px" }}
                    >
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        id="inputgroupfile2"
                        onChange={handleChange}
                        hidden
                      />
                      <label
                        className="d-flex justify-content-between ai-center input-group-text form-box"
                        htmlFor="inputgroupfile2"
                        style={{ width: "100%", borderRadius: "5px" }}
                      >
                        {labelName === "" ? "Add Product" : labelName}
                        <img src={paperclip} alt="" className="" />
                      </label>
                    </div>
                  </Form.Group>
                  <Button
                    className="btn-authlogin "
                    style={{ width: "100%" }}
                    type="submit"
                  >
                    Update Product
                  </Button>
                </Form>
              </Col>
              <Col xs={12} md={5}>
                {preview && (
                  <img
                    src={preview}
                    alt="view"
                    style={{ width: "70%", borderRadius: "10px" }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
