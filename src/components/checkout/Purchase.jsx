import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../context/ContextProvider";

function Purchase({ data, updateFields }) {
    const { cart, removeFromCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [savings, setSavings] = useState(0);

    async function fetchProducts() {
        if (cart.length === 0) {
            setProducts([]);
            return;
        }

        try {
            const productIds = cart.map(item => item.id);
            updateFields({
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            });

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/product/prodUsingIds`, {
                ids: productIds
            });

            setProducts(res.data.products || []);

            let calculatedTotal = 0;
            let calculatedSavings = 0;
            console.log("calculation called");
            res.data.products.forEach(prod => {
                const cartItem = cart.find(item => item.id === prod._id);
                if (cartItem) {
                    const itemTotal = prod.sellingPrice * cartItem.quantity;
                    calculatedTotal += itemTotal;
                    calculatedSavings += (prod.originalPrice - prod.sellingPrice) * cartItem.quantity;
                }
            });

            setTotal(calculatedTotal);
            setSavings(calculatedSavings);
            updateFields({totalPrice: calculatedTotal});
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function handleCartChange() {
        updateFields({
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }))
        });
    }

    function calculation() {
        let calculatedTotal = 0;
        let calculatedSavings = 0;
        products.forEach(prod => {
            const cartItem = cart.find(item => item.id === prod._id);
            if (cartItem) {
                const itemTotal = prod.sellingPrice * cartItem.quantity;
                calculatedTotal += itemTotal;
            }
        });
        setTotal(calculatedTotal);
    }

    useEffect(() => {
        handleCartChange();
        calculation();
    }, [cart]);

    return (
        <div className="purchase-review">
            <h2 className="review-heading">Review Your Order</h2>

            <div className="items-list">
                {cart.map((cartItem) => {
                    const product = products.find(p => p._id === cartItem.id);
                    if (!product) return null;

                    const itemTotal = product.sellingPrice * cartItem.quantity;

                    return (
                        <div key={cartItem.id} className="review-item">
                            <div className="item-main">
                                <img
                                    src={product.productUrl}
                                    alt={product.name}
                                    className="item-img"
                                    width="100px"
                                />
                                <div className="item-name-qty">
                                    <h3>{product.title}</h3>
                                    <p className="quantity-text">Qty: {cartItem.quantity}</p>
                                </div>
                            </div>

                            <div className="item-total">
                                ₹{itemTotal}
                            </div>

                            <button
                                onClick={() => removeFromCart(cartItem.id)}
                                className="remove-btn"
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: '1rem',
                                    margin: '5px',
                                    borderRadius: '4px',
                                    border: 'None',
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-details">

                    {savings > 0 && (
                        <div className="summary-row savings">
                            <span>You Save</span>
                            <span>-₹{savings}</span>
                        </div>
                    )}

                    <hr />

                    <div className="summary-row grand-total">
                        <strong>Total Amount: </strong>
                        <strong>₹{total}</strong>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Purchase;