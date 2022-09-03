import React from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import NavAdmin from "../components/NavAdmin";
import { API } from "../config/api";

export default function Transaction() {
  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  return (
    <div>
      <NavAdmin />
      <Container className="mt-5 pt-5">
        <h1 className="text-primer my-3">Income Transaction</h1>
        <Table responsive striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Post Code</th>
              <th>Product Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">1</td>
              <td>
                <img
                  src=""
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </td>
              <td className="align-middle">a</td>
              <td className="align-middle text-truncate">b</td>
              <td className="align-middle">c</td>
              <td className="align-middle">d</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
