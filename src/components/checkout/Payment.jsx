function Payment({ data, updateFields }) {

    const onlinePaymentMethod = () => {
        updateFields({
            paymentOnline: true
        });
    };

    const cashOnDelivery = () => {
        updateFields({
            paymentOnline: false
        });
    };

    return (
        <>
            <h1>Payment Address:</h1>
            <div>
                <h3>Pay through</h3>
                <input type="radio" name="payment-method"
                    checked={data.paymentOnline === true}
                    onChange={onlinePaymentMethod}
                />  Card
                <br />
                <input type="radio" name="payment-method"
                    checked={data.paymentOnline === false}
                    onChange={cashOnDelivery}
                /> Cash on Delivery
                <br />
            </div>
        </>
    )
}

export default Payment;