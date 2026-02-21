import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    cartId: string; // Unique ID based on id + size + color
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    size: number;
    color: string;
    colorName: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity' | 'cartId'>>) => {
            const { id, size, color } = action.payload;
            const newCartId = `${id}-${size}-${color}`;

            const existingItem = state.items.find((item) => item.cartId === newCartId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, cartId: newCartId, quantity: 1 });
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.cartId !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ cartId: string; quantity: number }>) => {
            const item = state.items.find((i) => i.cartId === action.payload.cartId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { toggleCart, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
