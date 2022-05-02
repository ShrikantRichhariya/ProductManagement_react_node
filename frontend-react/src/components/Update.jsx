import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [warranty, setWarranty]= React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setQuantity(result.quantity);
        setVendor(result.vendor);
        setWarranty(result.warranty);
    }

    const updateProduct = async () => {
        console.warn(name, price, quantity, vendor, warranty)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, quantity, vendor, warranty }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder='Enter product quantity' className='inputBox'
                value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
            />

            <input type="text" placeholder='Enter product vendor' className='inputBox'
                value={vendor} onChange={(e) => { setVendor(e.target.value) }}
            />

            <input type="text" placeholder='Enter product Warranty' className='inputBox'
                value={warranty} onChange={(e) => { setWarranty(e.target.value) }}
            />


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default Update;