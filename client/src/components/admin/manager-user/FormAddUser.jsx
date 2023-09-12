import React, { useState } from 'react'
import "./form.css"
import axios from 'axios';
import { notification } from 'antd';
import { validateEmail } from '../../../utils/formatData';


export default function FormAddUser({ handleCloseFormAdd, loadData }) {
    const [gender, setGender] = useState(0);

    const [user, setUser] = useState({
        user_name: "",
        address: "",
        dateOfBirth: "",
        email: "",
        password: "",
    });

    // danh sách gender
    const listGender = [
        {
            id: 0,
            title: "Nam",
        },
        {
            id: 1,
            title: "Nữ",
        },
        {
            id: 2,
            title: "Khác",
        },
    ];

    // lấy giá trị từ các ô input
    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }

    // Gửi dữ liệu từ form lên server
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.user_name) {
            notification.error({
                message: "Cảnh báo !",
                description: "Tên tài khoản không được để trống !",
            })
            return;
        } else if (!user.email) {
            notification.error({
                message: "Cảnh báo !",
                description: "Email không được để trống !",
            })
            return;
        } else if (!user.password) {
            notification.error({
                message: "Cảnh báo !",
                description: "Mật khẩu không được để trống !",
            })
            return;
        } else if (!validateEmail(user.email)) {
            notification.error({
                message: "Cảnh báo !",
                description: "Email không đúng định dạng !",
            })
            return;
        } else {
            // Gọi API register
            axios.post('http://localhost:8000/users', { ...user, gender: gender })
                .then((response) => {
                    if (response.status === 201) {
                        // Hiển thị notification
                        notification.success({
                            message: "Thành công",
                            description: "Thêm mới tài khoản thành công",
                        })
                        handleCloseFormAdd();
                        loadData();
                    }
                })
                .catch((error) => {
                    if (error.response.data === "Email already exists") {
                        notification.error({
                            message: "Cảnh báo !",
                            description: "Email đã tồn tại trong hệ thống !",
                        })
                    } else {
                        notification.error({
                            message: "Cảnh báo !",
                            description: "Lỗi hệ thống !",
                        })
                    }
                });
        }
    }
    return (
        <>
            <div className='container'>
                <form className='form-container' onSubmit={handleSubmit}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h3>Thêm mới tài khoản</h3>
                        <div className='btn btn-close' onClick={handleCloseFormAdd}></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user_name" className="form-label">Họ và tên <span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" name="user_name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giới tính</label>
                        <div className='d-flex gap-3'>
                            {
                                listGender.map((genders) => (
                                    <div className="form-check" key={genders.id}>
                                        <input
                                            checked={genders.id === gender}
                                            onChange={() => setGender(genders.id)}
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                        />
                                        <label className="form-check-label">{genders.title}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                        <input type="date" className="form-control" name="dateOfBirth" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" name="address" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
                        <input type="email" className="form-control" name="email" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu <span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" name="password" onChange={handleChange} />
                    </div>
                    <div className='d-flex justify-content-center align-item-center gap-3'>
                        <button type="submit" className="btn btn-primary">Thêm mới</button>
                        <button type="button" className="btn btn-danger" onClick={handleCloseFormAdd}>Hủy</button>
                    </div>
                </form>
            </div>
        </>
    )
}
