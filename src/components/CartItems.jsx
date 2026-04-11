import { useState, useContext, useEffect } from "react";
import { CartContext } from '../context/ContextProvider';

function CartItems({ product, setTotal, setSavings, quantity }) {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const [count, setCount] = useState(quantity);
    const [subTotal, setSubTotal] = useState(0);
    const [save, setSave] = useState(0);
    const ogPrice = product.originalPrice;
    const sellingPrice = product.sellingPrice;

    function calculation() {
        let calculatedTotal = 0;
        let calculatedSavings = 0;

        const itemTotal = product.sellingPrice * quantity;
        calculatedTotal += itemTotal;
        calculatedSavings += (product.originalPrice - product.sellingPrice) * quantity;

        setSubTotal(calculatedTotal);
        setSave(calculatedSavings);
    }

    useEffect(() => {
        setCount(quantity);
        calculation();
    }, [quantity]);

    return (
        <>
            <tr>
                <td>{product.title}</td>
                <td>{product.sellingPrice} <br /> <strike>{product.originalPrice}</strike></td>
                <td>
                    <button className='counter-btn counter-font' onClick={() => increaseQuantity(product._id)}>
                        +
                    </button>
                    <button className='counter-font counter-btn'>{count}</button>
                    <button className='counter-btn counter-font' onClick={() => decreaseQuantity(product._id)}>
                        -
                    </button>
                </td>
                <td>{subTotal}</td>
                <td>{save}</td>
                <td><button className='red-btn' onClick={() => removeFromCart(product._id)}>Remove</button></td>
            </tr>
        </>
    )
}

export default CartItems;