import React, { useState } from "react";
import "./Form.css";

export default function FormAddUser(handleCloseForm) {
    // gender la dang so, tao ra 1 state de luu tru dang so day
    const [gender, setGender] = useState(0)

    // lay gia tri cho tung o input
    const [user, setUser] = useState({
        user_name: "",
        address: "",
        email: "",
        password: "",
    });


    //  danh sach gender
    const listGender = [
        {
            id: 0,
            title: "nam",
        },
        {
            id: 1,
            title: "nu",
        },
        {
            id: 2,
            title: "khac",
        }
    ];


    return (
        <>
            <div className="container-1">
                <form className="form-container">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3>Thêm mới tài khoản</h3>
                        <button
                            onClick={handleCloseForm}
                            type="button"
                            className="btn btn-secondary">
                            X
                        </button>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giới tính</label>
                        <div className="d-flex gap-3">

                            {listGender.map((genders) => (
                                <div div className="form-check" key={genders.id}>
                                    <input
                                        checked={(genders.id === gender)}
                                        onChange={() => setGender(genders.id)}
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                    />
                                    <label className="form-check-label">{genders.title}</label>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <button
                            onClick={handleCloseForm}
                            type="submit"
                            className="btn btn-secondary">
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary">
                            Lưu
                        </button>
                    </div>
                </form >
            </div >
        </>
    );
}