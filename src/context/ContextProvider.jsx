import { createContext, useReducer, useEffect } from "react";
import CartReducer from "./CartReducer";

export const CartContext = createContext();

const ContextProvider = ({ children }) => {
    
    const initialCart = () => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    };

    const [cart, dispatch] = useReducer(CartReducer, initialCart());

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId) => {
        dispatch({ type: "add", payload: productId });
    };

    const increaseQuantity = (productId) => {
        dispatch({ type: "increase", payload: productId });
    };

    const decreaseQuantity = (productId) => {
        dispatch({ type: "decrease", payload: productId });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: "remove", payload: productId });
    };

    const clearCart = () => {
        dispatch({ type: "clear" });
    };

    return (
        <CartContext.Provider value={{
            cart,                    
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart,

            totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default ContextProvider;