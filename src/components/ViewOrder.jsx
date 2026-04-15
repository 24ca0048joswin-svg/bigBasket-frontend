import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewOrder.css";   

function ViewOrder() {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savingStatus, setSavingStatus] = useState(false);
    const [savingPayment, setSavingPayment] = useState(false);
    const { id } = useParams();

    const orderStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

    async function fetchDetails() {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/order/getOneOrder`, { id });
            setOrderData(response.data);
            console.log(response.data);
        } catch (err) {
            console.error("Error fetching order:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [id]);

    function handleOrderStatusChange(e){
        setOrderData(prev => ({
            ...prev,
            orderStatus: e.target.value
        }));
    };

    function handlePaymentStatusChange(e){
        setOrderData(prev => ({
            ...prev,
            paymentStatus: e.target.value === "true"
        }));
    };

    async function saveOrderStatus() {
        if (!orderData) return;
        setSavingStatus(true);

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URI}/order/updateOrderStatus`, {
                orderStatus: orderData.orderStatus,
                id: orderData._id,
                username: orderData.customer.username,
                email: orderData.customer.email,
                orderNo: orderData.orderNo,
            });
            alert("Order status updated successfully!");
        } catch (err) {
            console.error("Error updating order status:", err);
            alert("Failed to update order status.");
        } finally {
            setSavingStatus(false);
        }
    }

    async function savePaymentStatus() {
        if (!orderData) return;
        setSavingPayment(true);

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URI}/order/updatePaymentStatus`, {
                paymentStatus: orderData.paymentStatus,
                id: orderData._id,
            });
            alert("Payment status updated successfully!");
        } catch (err) {
            console.error("Error updating payment status:", err);
            alert("Failed to update payment status.");
        } finally {
            setSavingPayment(false);
        }
    }

    if (loading) {
        return <h2>Loading order details...</h2>;
    }

    if (!orderData) {
        return <h1>No data exists</h1>;
    }

    return (
        <div className="view-order-container">
            <h1>View & Manage Order</h1>

            <div className="order-info-card">
                <h2>Order No: #{orderData.orderNo}</h2>
                <h2>Customer Email: {orderData.customer.email}</h2>
                <h2>Customer Name: {orderData.customer.username}</h2>
                <h2>Total Price: ₹{orderData.totalPrice}</h2>

                <div className="status-section">
                    <strong>Order Status: </strong>
                    <select
                        value={orderData.orderStatus}
                        onChange={handleOrderStatusChange}
                        className="status-select"
                    >
                        {orderStatuses.map(status => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={saveOrderStatus}
                        disabled={savingStatus}
                        className="save-btn save-order-btn"
                    >
                        {savingStatus ? "Saving..." : "Save Order Status"}
                    </button>
                </div>

                <div className="status-section">
                    <strong>Payment Status: </strong>
                    <select
                        value={orderData.paymentStatus}
                        onChange={handlePaymentStatusChange}
                        className="status-select"
                    >
                        <option value={true}>Paid</option>
                        <option value={false}>Pending</option>
                    </select>
                    <button
                        onClick={savePaymentStatus}
                        disabled={savingPayment}
                        className="save-btn save-payment-btn"
                    >
                        {savingPayment ? "Saving..." : "Save Payment Status"}
                    </button>
                </div>
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
                                    src={`${import.meta.env.VITE_BACKEND_URI}/static/${product.productId.productUrl}`}
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

export default ViewOrder;