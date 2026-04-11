import { Link } from "react-router-dom";

function PaymentCancel() {
    return (
        <div className="center-box">
            <h1 
            style={{
                color: 'red',
                fontSize: '3rem',
            }}  
            >Payment Cancelled</h1>
            <Link to="/" className="home-link-btn">Return to Home</Link>
        </div>)
}

export default PaymentCancel;