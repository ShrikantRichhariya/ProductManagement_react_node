import React from 'react';

const Add = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [warranty, setWarranty] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async () => {

        if (!name || !price || !quantity || !vendor || !warranty) {
            setError(true);
            return false
        }
        //fetching api for add product
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, quantity, vendor, warranty, userId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)
        

    }
    return (
        <div className='product'>
            <h1 className="fa fa-plus">Add Product</h1>
            <div>
                
                <input type="text" placeholder='Enter product name' className='inputBox'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />
                {error && !name && <span className='invalid-product-name'>Enter valid product name</span>}

                <input type="text" placeholder='Enter product price' className='inputBox'
                    value={price} onChange={(e) => { setPrice(e.target.value) }}
                />
                {error && !price && <span className='invalid-product-price'>Enter valid price</span>}

                <input type="text" placeholder='Enter Quantity in stock' className='inputBox'
                    value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                />
                {error && !quantity && <span className='invalid-quantity-in-stock'>Enter valid Quantity in stock</span>}

                <input type="text" placeholder='Enter Vendor' className='inputBox'
                    value={vendor} onChange={(e) => { setVendor(e.target.value) }}
                />
                {error && !vendor && <span className='invalid-vendor-name'>Enter valid Vendor</span>}


                <input type="text" placeholder='Enter Warranty' className='inputBox'
                    value={warranty} onChange={(e) => { setWarranty(e.target.value) }}
                />
                {error && !warranty && <span className='invalid-warranty'>Enter valid Warranty</span>}
            </div>


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default Add;