import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import FormAddUser from '../../components/admin/manager-user/FormAddUser';
import { formatDate } from '../../utils/formatData';
import debounce from "lodash.debounce"
import Loading from '../../components/base/loading/Loading';


export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [searchText, setSearchText] = useState("")
    const [showLoading, setShowLoading] = useState(false);


    // Gọi API lấy thông tin tất cả user
    const loadData = async () => {
        setShowLoading(true)

        await axios
            .get(`http://localhost:8000/users?user_name_like=${searchText}`)
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));
        setShowLoading(false)
    }

    useEffect(() => {
        const delaySearch = debounce(loadData, 500)  // dat do tre cho ham search tinh tu khi bo tay khoi ban phim
        delaySearch()

        return delaySearch.cancel;  // huy debounce khi khong thuc hien chuc nang search
    }, [searchText]);

    // Hàm xóa user
    const handleDelete = (id) => {
        // Gọi API
        axios.delete(`http://localhost:8000/users/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    notification.success({
                        message: "Thành công",
                        description: "Xóa tài khoản thành công"
                    });
                    loadData();
                }
            })
            .catch((error) => console.log(error));
    }

    // Hiển thị form thêm mới
    const handleShowFormAdd = () => {
        setShowFormAdd(true);
    }

    // Hàm đóng form
    const handleCloseFormAdd = () => {
        setShowFormAdd(false);
    }
    return (
        <>
            {/* ham Loading */}
            {showLoading && <Loading />}


            {/* form them moi user  */}
            {showFormAdd && <FormAddUser handleCloseFormAdd={handleCloseFormAdd} loadData={loadData} />}
            <div className='mt-5'>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-primary mb-3' onClick={handleShowFormAdd}>Thêm mới tài khoản</button>
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder='nhap tu khoa tim kiem'
                        style={{ width: 300, height: 36 }} />
                </div>

                <table className='table table-bordered table-hover table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>STT</th>
                            <th scope='col'>Họ và tên</th>
                            <th scope='col'>Giới tính</th>
                            <th scope='col'>Ngày sinh</th>
                            <th scope='col'>Địa chỉ</th>
                            <th scope='col'>Email</th>
                            {/* <th scope='col'>Password</th> */}
                            <th scope='col' colSpan={2}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.gender === 0 ? "Nam" : "Nữ"}</td>
                                    <td>{formatDate(user.dateOfBirth)}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    {/* <td>{user.password}</td> */}
                                    <td>
                                        <button className='btn btn-warning'>Sửa</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}