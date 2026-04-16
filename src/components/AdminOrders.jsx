import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminOrders.css';
import { Link } from 'react-router-dom';

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchOrders() {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/product/getAllOrders`);
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
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
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
                                        <td>
                                            {
                                                order.customer?.email ||
                                                'Unknown Customer'
                                            }
                                        </td>
                                        <td className="total">₹{order.totalPrice}</td>
                                        <td>
                                            <span className={`status payment ${order.paymentStatus ? 'paid' : 'pending'}`}>
                                                {getPaymentStatus(order.paymentStatus)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status order-status ${order.orderStatus}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="actions">
                                            <Link
                                                className="btn view-btn link-margin"
                                                to={`/viewOrder/${order._id}`}
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

export default AdminOrders;