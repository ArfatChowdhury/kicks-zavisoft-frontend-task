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
        updateSize: (state, action: PayloadAction<{ cartId: string; newSize: number }>) => {
            const { cartId, newSize } = action.payload;
            const existingItemIndex = state.items.findIndex((i) => i.cartId === cartId);
            if (existingItemIndex === -1) return;

            const item = state.items[existingItemIndex];
            const newCartId = `${item.id}-${newSize}-${item.color}`;

            // Check if changing to this new size means merging with another item
            const targetItemIndex = state.items.findIndex((i) => i.cartId === newCartId);

            if (targetItemIndex !== -1 && targetItemIndex !== existingItemIndex) {
                // Merge quantities and remove the original item
                state.items[targetItemIndex].quantity += item.quantity;
                state.items.splice(existingItemIndex, 1);
            } else {
                // Just update size and cartId in place
                item.size = newSize;
                item.cartId = newCartId;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { toggleCart, addItem, removeItem, updateQuantity, updateSize, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
