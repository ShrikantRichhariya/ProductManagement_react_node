import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const auth = localStorage.getItem("user");
const Listtable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }
    //fetch delete api
    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
      //search api
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }

    return (
        <>
            <div className="product-list">
                <h3 id="greet"><b>Welcome {JSON.parse(auth).name}</b></h3>
                <h3>Product List</h3>
                <input type="" className='search-product-box' placeholder='Search Product'
                    onChange={searchHandle}
                /><button className="five" ><i className="fa fa-search" aria-hidden="true"></i></button>
                <table className='protable'>
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Vendor</th>
                        <th>Warranty</th>

                    </tr>
                    {
                        products.length > 0 ? products.map((item, index) =>
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <th>{item.name}</th>
                                <th>{item.price}</th>
                                <th>{item.quantity}</th>
                                <th>{item.vendor}</th>
                                <th>{item.warranty}</th>
                                <th id="four">
                                    <button className="btn btn-success" id="btn10" onClick={() => deleteProduct(item._id)}>Delete</button>
                                    <button className="btn btn-danger" id="btn11"> <Link to={"/update/" + item._id} >Update </Link></button>
                                </th>

                            </tr>

                        )
                            : <h5>No Result Found</h5>

                    }
                </table>
            </div>

        </>
    )
}

export default Listtable;