import BillingAddress from "./checkout/BillingAddress";
import ShippingAddress from "./checkout/ShippingAddress";
import Purchase from "./checkout/Purchase";
import Payment from "./checkout/Payment";
import UseMultiForm from "./checkout/UseMultiForm";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/ContextProvider";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import './Checkout.css';

const INITIAL_DATA = {
  'firstName': "",
  'lastName': "",
  'mobileNo': "",
  'streetAddress': "",
  'townCity': "",
  'state': "",
  'country': "",
  'zipcode': "",
  'paymentOnline': true,
  'totalPrice': 0,
  'customerId': jwtDecode(localStorage.getItem('token')).id.toString(),
  'items': [{
    'productId': '',
    'quantity': 0,
  }]
}

function CheckOut() {
  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (newFields) => {
    setData(prev => ({ ...prev, ...newFields }));
  };

  const steps = [
    <BillingAddress data={data} updateFields={updateFields} />,
    <ShippingAddress data={data} updateFields={updateFields} />,
    <Purchase data={data} updateFields={updateFields} />,
    <Payment data={data} updateFields={updateFields} />
  ];

  const { step, currentStepIndex, back, next, isFirstStep, isLastStep } = UseMultiForm(steps);
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  const stepTitles = ["Billing Address", "Shipping Address", "Review Order", "Payment"];

  async function storeOrder() {
    try {
      const token = localStorage.getItem('token');
      updateFields({ customerId: jwtDecode(token).id.toString() });
      const response = await axios.post(
        "http://localhost:3000/order/makeOrder",
        data
      );

      console.log(response);
      if (response.data.status == 'success') {
        alert("Order placed successfully!");
        clearCart();
        navigate('/');
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      console.log(`An error occured: ${e}`)
    }
  }

  async function onSubmit(e) {
    try {
      e.preventDefault();
      if (!isLastStep) {
        next();
        return;
      }


      if (isLastStep) {

        if (data.paymentOnline) {
          const ids = cart.map(item => item.id);
          const response = await axios.post(
            "http://localhost:3000/order/checkout",
            { ids: ids },
          );

          const dataPage = await response.data;

          if (dataPage) {
            console.log(data);
            const response = await axios.post(
              "http://localhost:3000/order/makeOrder",
              data
            );

            clearCart();
          }
          window.location.href = dataPage.url;
        } else {
          storeOrder();
        }
      }
    } catch (e) {
      console.log(`An error occured: ${e}`)
    }
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Complete Your Order</h1>

      <div className="progress-steps">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`step-pill ${index === currentStepIndex ? "active" : ""} ${index < currentStepIndex ? "completed" : ""}`}
          >
            {index + 1}. {title}
          </div>
        ))}
      </div>

      <div className="checkout-content">
        <div className="form-section">
          <div className="form-card">
            <form onSubmit={onSubmit}>
              {step}

              <div className="button-group">
                {isFirstStep && (
                  <button to="/addToCart" className="btn-secondary" onClick={back}>
                    Back
                  </button>
                )}

                {!isFirstStep && (
                  <Link to="/addToCart" className="btn-secondary">
                    Return to Cart
                  </Link>
                )}

                <button type="submit" className="btn-primary">
                  {isLastStep ? "Place Order" : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;