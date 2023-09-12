import React, { useEffect, useState } from 'react'
import { formatMoney } from '../../utils/formatData';
import FormAdd from '../../components/admin/manager-product/FormAdd';
import FormEdit from '../../components/admin/manager-product/FormEdit';


export default function ListProduct() {
    const [products, setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    const [idEdit, setIdEdit] = useState(null)


    // goi API lay thong tin tat ca san pham
    const loadData = () => {
        fetch("http://localhost:8000/products")
            .then((response) => response.json())  // ep kieu ve dang json
            .then((response) => setProducts(response))  // noi co du lieu tra ve
            .catch((error) => console.log(error))  // bat loi
    }

    useEffect(() => {
        loadData()
    }, [])


    /**
     * ham xoa thong tin mot product theo id
     * @param {*} id  id cua product can xoa
     * Author: SONTRAN
     */
    const handleDelete = (id) => {
        fetch(`http://localhost:8000/products/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    loadData()
                }
            })
            .catch((error) => console.log(error))
    }

    //  ham hien thi form them moi sp
    const handleShowForm = () => {
        setShowForm(true)
    }


    //  ham hien thi form them moi sp
    const handleCloseForm = () => {
        setShowForm(false)
    }

    //  hien thi form edit
    const handleEdit = (productId) => {
        setShowFormEdit(true)  // hien thi form edit
        setIdEdit(productId)   // lay ra id can edit
    }

    // ham dong form edit
    const handleCloseFormEdit = () => {
        setShowFormEdit(false)
    }

    return (
        <>
            {
                // form them moi san pham
                showForm && <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
            }

            {
                // form sua thong tin sp
                showFormEdit && <FormEdit handleCloseFormEdit={handleCloseFormEdit} idEdit={idEdit} loadData={loadData} />
            }


            <div>
                <div>
                    <button
                        onClick={handleShowForm}
                        className='btn btn-primary'>
                        thêm mới sản phẩm
                    </button>
                </div>
                <table border={1} className='table'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Xuất xứ</th>
                            <th scope="col" colSpan={2}>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.product_name}</td>
                                <td>{formatMoney(product.price)}</td>
                                <td>{product.from}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        className="btn btn-warning">
                                        Sửa
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(product.id)}>
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
