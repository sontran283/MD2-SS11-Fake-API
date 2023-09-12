import React, { useEffect, useState } from "react";
import axios from "axios";//khong co ngoac nhon
import { notification } from "antd";
import FormAddUser from "../../components/admin/manager-user/FormAddUser";

export default function ListUser() {
    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)


    //goi ham lay thong tin tat ca user
    const loadData = () => {
        axios
            .get(`http://localhost:8000/users`)
            .then(respone => setUsers(respone.data))
            .catch(error => console.log(error.data))
    }

    useEffect(() => {
        loadData();
    }, [])

    //ham xoa
    const handleDelete = (id) => {
        //goi API
        axios
            .delete(`http://localhost:8000/users/${id}`)
            .then((respone) => {
                if (respone.status === 200) {
                    notification.success({
                        message: "thanh cong",
                        description: "xoa tai khoan thanh cong"
                    })
                    loadData()
                }
            })
            .catch(error => console.log(error))
    }
    //show form
    const handleShowForm = () => {
        setShowForm(true)
    }

    // ham dong
    const handleCloseForm = () => {
        setShowForm(false)
    }
    return (
        <>
            {showForm && <FormAddUser handleCloseForm={handleCloseForm} />}

            <div className="container mt-5">
                <button
                    onClick={handleShowForm}
                    className="btn btn-primary mb-3">
                    Thêm mới tài khoản
                </button>
                <table className="table table-bordered table-hover table-striped" >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Giới tính</th>
                            <th>nam sinh</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th colSpan={2}>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.gender === 0 ? "nam" : "nu"}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning">
                                            sua
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="btn btn-danger">
                                            xoa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}