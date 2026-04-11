import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/ContextProvider";
import { useEffect } from "react";

function PaymentSuccess() {
    const { clearCart } = useContext(CartContext);

    return (
        <div className="center-box">
            <h1
                style={{
                    color: 'green',
                    fontSize: '3rem',
                }}
            >Payment Success</h1>
            <h3 
                style={{
                    color:'blue',
                    fontSize:'1.5rem',
                }}
            >Your Order has been placed</h3>
            <Link to="/" className="home-link-btn">Return to Home</Link>
        </div>)
}

export default PaymentSuccess;