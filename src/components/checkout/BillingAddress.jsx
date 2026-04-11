function BillingAddress({ data, updateFields }) {
  return (
    <>
      <h2>Billing Address</h2>

      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        id="first-name"
        value={data.firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
        required
      />

      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        id="last-name"
        value={data.lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
        required
      />

      <label htmlFor="mobile-no">Mobile No:</label>
      <input
        type="tel"
        id="mobile-no"
        value={data.mobileNo}
        onChange={(e) => updateFields({ mobileNo: e.target.value })}
        required
      />
    </>
  );
}

export default BillingAddress;