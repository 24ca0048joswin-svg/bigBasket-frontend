function ShippingAddress({ data, updateFields }) {
    return (
        <>
            <h1>Shipping Address:</h1>
            <label htmlFor="street-address">Street Address:</label>
            <input type="text" name="street-address" required
                value={data.streetAddress}
                onChange={(e) => updateFields({ streetAddress: e.target.value })}
            />
            <br />

            <label htmlFor="town-city">Town City:</label>
            <input type="text" name="town-city" required
                value={data.townCity}
                onChange={(e) => updateFields({ townCity: e.target.value })}
            />
            <br />

            <label htmlFor="state">State:</label>
            <input type="text" name="state" required
                value={data.state}
                onChange={(e) => updateFields({ state: e.target.value })}
            />
            <br />

            <label htmlFor="country">Country/Region:</label>
            <input type="text" name="country" required
                value={data.country}
                onChange={(e) => updateFields({ country: e.target.value })}
            />
            <br />

            <label htmlFor="zipcode">ZipCode:</label>
            <input type="text" name="zipcode" required
                value={data.zipcode}
                onChange={(e) => updateFields({ zipcode: e.target.value })}
            />
            <br />
        </>
    )
}

export default ShippingAddress;