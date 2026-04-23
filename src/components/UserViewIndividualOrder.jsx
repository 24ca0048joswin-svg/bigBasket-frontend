import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewOrder.css";
import { useNavigate } from "react-router-dom";

function UserViewIndividualOrder() {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savingStatus, setSavingStatus] = useState(false);
    const [savingPayment, setSavingPayment] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const orderStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

    async function fetchDetails() {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/order/getOneOrder`, { id });
            setOrderData(response.data);
            // console.log(response.data);
        } catch (err) {
            console.error("Error fetching order:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [id]);

    function onHandleBackPage(){
        navigate(-1);
    }

    if (loading) {
        return <h2>Loading order details...</h2>;
    }

    if (!orderData) {
        return <h1>No data exists</h1>;
    }

    return (
        <div className="view-order-container">
            <button className="back-btn" onClick={onHandleBackPage}>Back</button>
            <h1>View Order</h1>

            <div className="order-info-card">
                <h2>Order No: #{orderData.orderNo}</h2>
                <h2>Total Price: ₹{orderData.totalPrice}</h2>

            </div>

            <h3>Ordered Items</h3>
            <table className="order-items-table">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Title</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.items.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={`${product.productId.productUrl}`}
                                    alt={product.productId.title}
                                    className="product-image"
                                />
                            </td>
                            <td>{product.productId.title}</td>
                            <td>{product.productId.category}</td>
                            <td><strong>{product.quantity}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserViewIndividualOrder;