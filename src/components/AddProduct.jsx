import AdminNav from "./AdminNav";
import './AddProduct.css';
import { useState } from 'react';
import axios from 'axios';

function AddProduct() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [selectedHarDinSasta, setSelectedHarDinSasta] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [msgs, setMsgs] = useState([]);

    function addMessage(text) {
        setMsgs([...msgs, text]);
    }

    function clearMessage() {
        setMsgs([]);
    }

    async function handleSubmit() {
        let discountAmount = originalPrice - sellingPrice;
        let discountPercentage = (discountAmount / originalPrice) * 100;
        discountPercentage = discountPercentage.toFixed(0);
        
        clearMessage();

        if (file == null) {
            addMessage('Please upload a file');
            console.log('true');
        }

        if (title == '') {
            addMessage('Please provide product title');
        }

        if (originalPrice <= 0) {
            addMessage('Please put proper original price value');
        }

        if (sellingPrice <= 0) {
            addMessage('Please put proper o selling price value');
        }

        if (selectedCategory == '') {
            addMessage('Please select a category for this product');
        }

        const formData = new FormData();
        formData.append('productImage', file);
        formData.append('title', title);
        formData.append('originalPrice', originalPrice);
        formData.append('sellingPrice', sellingPrice);
        formData.append('discountPercentage', discountPercentage);
        formData.append('isHarDinSasta', selectedHarDinSasta);
        formData.append('category', selectedCategory);

        console.log("Login");
        try {
            const res = await axios.post('http://localhost:3000/admin/addProduct', formData, {});
            const data = res.data;

            if (data.status == 'success') {
                alert("Product added successfully");
                setFile(null);
                setTitle('');
                setOriginalPrice(0);
                setSellingPrice(0);
                setSelectedHarDinSasta(false);
                setSelectedCategory('');
            } else {
                alert("Unable to add the product");
            }
        } catch (err) {
            console.log(`An error occured: ${err}`);
        }
    }

    function handleFileChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <>
            <div className='center-modal-no-height'>
                <div className="modal-content">
                    <div className="right-panel">
                        <h2 className='center-text'>
                            Add Product
                        </h2>

                        <label>
                            Enter product image:
                        </label>

                        <input
                            type="file"
                            className="input-field"
                            name="productImage"
                            // value={file}
                            onChange={handleFileChange}
                        />


                        <label>
                            Enter product title:
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product title"
                            className="input-field"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label>
                            Enter category:
                        </label>

                        <select className="input-field" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value='' disabled>Choose an category</option>
                            <option value='Exotic Fruits'>Exotic Fruits</option>
                            <option value='Tea'>Tea</option>
                            <option value='Ghee'>Ghee</option>
                            <option value='Nandini'>Nandini</option>
                            <option value='Fresh Vegetables'>Fresh Vegetables</option>
                        </select>

                        <label>
                            Enter original price:
                        </label>

                        <input
                            type="number"
                            placeholder="Enter original price"
                            className="input-field"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                        />

                        <label>
                            Enter selling price:
                        </label>

                        <input
                            type="number"
                            placeholder="Enter selling price"
                            className="input-field"
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(e.target.value)}
                        />

                        <label>
                            Is Har Din Sasta:
                        </label>

                        <div>
                            <div className="display-column">
                                <input
                                    type="radio"
                                    name="harDinSasta"
                                    value="True"
                                    onChange={(e) => setSelectedHarDinSasta(e.target.value)}
                                /><span className="white-text">True</span>
                            </div>
                            <div className="display-column">
                                <input
                                    type="radio"
                                    name="harDinSasta"
                                    value="False"
                                    onChange={(e) => setSelectedHarDinSasta(e.target.value)}
                                /><span className="white-text">False</span>
                            </div>
                        </div>
                        <input type="button" value="Submit" className="continue-btn" onClick={handleSubmit} />

                        { msgs.map((msg, index) => ((
                        < span className='red-text center-text'>{msg}</span>
                        )))}


                    {/* <span className='link-cursor-text center-text'>
              <Link to="/adminRegister">
                Don't have an account? Sign Up
              </Link>
            </span> */}
                </div>

            </div>
        </div >
        </>
    );
}

export default AddProduct;