const CartReducer = (state, action) => {
    switch (action.type) {

        case "add": {
            const existingItem = state.find(item => item.id === action.payload);

            if (existingItem) {
                alert("Product exists in cart");
                return state.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                alert("Producted added successfully");
                return [...state, { id: action.payload, quantity: 1 }];
            }
        }

        case "increase":
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case "decrease":
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            );

        case "remove":
            return state.filter(item => item.id !== action.payload);

        case "clear":
            return [];

        default:
            return state;
    }
};

export default CartReducer;