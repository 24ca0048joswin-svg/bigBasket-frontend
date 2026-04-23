import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function UserViewOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchOrders() {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/order/getCustomerOrders`, {custId: '69a1768d4ac58319af6e03fb'});
            console.log(response.data)
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getPaymentStatus = (isPaid) => {
        return isPaid ? 'Paid' : 'Pending';
    };

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <div className="admin-container">
                <h1>Manage Orders</h1>

                <div className="table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="no-data">No orders found.</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="order-no">
                                            #{order.orderNo}
                                        </td>
                                        <td>{formatDate(order.date)}</td>
                                        <td className="total">₹{order.totalPrice}</td>
                                        <td className="actions">
                                            <Link
                                                className="btn view-btn link-margin"
                                                to={`/viewOneOrder/${order._id}`}
                                            >
                                                View Order
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserViewOrder;