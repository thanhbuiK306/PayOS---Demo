import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer";

const cartInitialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    function modifyQuantity(ebook, quantity, type) {
        const price = ebook.promo_price ? ebook.promo_price : ebook.original_price;
        let updateTotal = state.total;
    
        // Find the ebook in the cart list
        const cartEbook = state.cartList.find(item => item.id === ebook.id);
    
        if (cartEbook) {
            // Update ebook quantity
            if (type === 'inc') {
                cartEbook.quantity += 1;
                updateTotal += price;
            } else if (type === 'dec' && cartEbook.quantity > 0) {
                cartEbook.quantity -= 1;
                updateTotal -= price;
            } else if (type === 'input') {
                cartEbook.quantity = parseInt(quantity); // Ensure quantity is an integer
                updateTotal = price * parseInt(quantity); // Update total based on new quantity
            }
    
            // Dispatch the action to update the cart
            dispatch({
                type: "MODIFY_QUANTITY",
                payload: {
                    ebooks: [...state.cartList], // Make sure to create a new array to trigger re-render
                    total: updateTotal
                }
            });
        }
    }
    
    
    
    function addToCart(ebook){
        ebook.quantity = 1;

        const price = ebook.promo_price? ebook.promo_price : ebook.original_price;
        ebook.price= price
        const updatedList = state.cartList.concat(ebook);
        const updatedTotal = state.total + price;
        state.cartList = updatedList
        console.log(state.cartList)
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ebooks: updatedList,
                total: updatedTotal
            }
        })
    }

    function removeFromCart(ebook){
        const updatedList = state.cartList.filter(item => item.id !== ebook.id);
        const price = ebook.promo_price? ebook.promo_price : ebook.original_price;
        const updatedTotal = state.total - price;

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                ebooks: updatedList,
                total: updatedTotal
            }
        })
    }

    function clearCart(){
        dispatch({
            type: "CLEAR_CART",
            payload: {
                ebooks: [],
                total: 0
            }
        })
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        modifyQuantity,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    console.log(context)
    return context;
}