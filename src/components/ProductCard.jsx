import { Link } from 'react-router-dom';
import './ProductCard.css';
import axios from 'axios';

function ProductCard({
    name,
    imageUrl,
    id,
    currentPrice,
    originalPrice,
    category,
    fetchProduct,
    isHarDinSasta = false,
}) {
    const url = `${import.meta.env.VITE_BACKEND_URI}/static/${imageUrl}`
    const editUrl = `/editProduct/${id}`

    function showId() {
        console.log(id);
    }

    async function onDelete() {
        try {
            const isDeleted = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/admin/RemoveProduct`, { id });
            if (isDeleted) {
                fetchProduct();
            }
        } catch (err) {
            console.log(`An error occured:${err}`);
        }
    }

    return (
        <>
            <td>
                <div className="image-container">
                    <img src={url} alt={name} className="product-image" />
                </div>
            </td>
            <td>
                {name}
            </td>

            <td>
                {category}
            </td>

            <td>
                ₹{originalPrice}
            </td>

            <td>
                ₹{currentPrice}
            </td>


            <td>
                {isHarDinSasta ? 'True' : 'False'}
            </td>

            <td>
                <div className="product-name">
                    <Link to={editUrl} className="add-btn add-btn-margin">Edit</Link>
                    <button className="add-btn add-btn-margin" onClick={onDelete}>Remove</button>
                </div>
            </td>
        </>

    );
}
export default ProductCard;