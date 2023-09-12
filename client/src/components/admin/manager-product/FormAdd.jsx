import React, { useState } from "react";
import './product.css'
import { notification } from "antd"

export default function FormAdd({ handleCloseForm, loadData }) {
  const [product, setProduct] = useState({
    product_name: '',
    price: 0,
    from: ''
  })

  //  ham lay gia tri tu cac o input
  const handleChange = (e) => {
    const { value, name } = e.target
    // bao luu tat ca gia tri cua product
    setProduct({
      ...product,
      [name]: value,
    })
  }

  // ham them moi product
  const handleSubmit = (e) => {
    e.preventDefault()
    // goi API them moi
    fetch("http://localhost:8000/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // ep kieu du lieu dau vao tu js sang json
      },
      body: JSON.stringify({ ...product, price: parseInt(product.price) }),
    })
      .then((response) => {
        // kiem tra du lieu tra ve
        if (response.status === 201) {
          // hien thi notifycation thanh cong
          notification.success({
            message: "thanh cong",
            description: ' them moi san pham thanh cong'
          })
          // an form them moi
          handleCloseForm()
          loadData()
        }
      })
      .catch((error) => console.log(error))
  }


  return (
    <>
      <div className="product-container">
        <form
          onSubmit={handleSubmit}
          className="form-container">
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="product_name"
              name="product_name" />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Giá
            </label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              id="price"
              name="price" />
          </div>
          <div className="mb-3">
            <label htmlFor="from" className="form-label">
              Xuất xứ
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="from"
              name="from" />
          </div>
          <div className="d-flex gap-3 justify-content-center">
            <button
              type="submit"
              className="btn btn-primary">
              Thêm mới
            </button>
            <button
              onClick={handleCloseForm}
              type="button"
              className="btn btn-danger">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}