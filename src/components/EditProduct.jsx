import './AddProduct.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProduct(
) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [selectedHarDinSasta, setSelectedHarDinSasta] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null); const [msgs, setMsgs] = useState([]);
    const navigate = useNavigate();

    const { productId } = useParams();

    async function fetchData() {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/product/displayOneProduct`, { id: productId });
            const product = res.data.product;
            setTitle(product.title);
            setOriginalPrice(product.originalPrice);
            setSellingPrice(product.sellingPrice);
            setSelectedCategory(product.category);
            setSelectedHarDinSasta(product.isHarDinSasta);
            setPreviewUrl(`${import.meta.env.VITE_BACKEND_URI}/static/${product.productUrl}`)
        } catch (err) {
            console.log(`An error occured: ${err}`)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
        formData.append('id', productId);

        console.log("edit product");
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/product/editProduct`, formData,
                {
                    'Content-Type':'multipart/form-data'
                },
            );
            const data = res.data;
            // navigate('/manageProducts');

            if (data.status == 'success') {
                alert("Product updated successfully");
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
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        const objectUrl = URL.createObjectURL(selectedFile);

        setFile(selectedFile);
        setPreviewUrl(objectUrl);
    }

    return (
        <>
            <div className='center-modal-no-height'>
                <div className="modal-content">
                    <div className="right-panel">
                        <h2 className='center-text'>
                            Edit Product
                        </h2>

                        <div className="display-center">
                            <label>
                                <img src={previewUrl} width="200px" />
                            </label>
                        </div>

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
                                    checked={selectedHarDinSasta === true}
                                    onChange={() => setSelectedHarDinSasta(true)}
                                />
                                <span className="white-text">True</span>
                            </div>
                            <div className="display-column">
                                <input
                                    type="radio"
                                    name="harDinSasta"
                                    value="False"
                                    checked={selectedHarDinSasta === false}
                                    onChange={() => setSelectedHarDinSasta(false)}
                                />
                                <span className="white-text">False</span>
                            </div>
                        </div>
                        <input type="button" value="Submit" className="continue-btn" onClick={handleSubmit} />

                        {msgs.map((msg, index) => ((
                            < span className='red-text center-text'>{msg}</span>
                        )))}

                    </div>
                </div>
            </div >
        </>
    );
}

export default EditProduct;