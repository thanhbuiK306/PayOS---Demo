export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){

        case "ADD_TO_CART":
            return {...state, cartList: payload.ebooks, total: payload.total}
        case "MODIFY_QUANTITY":
            return {...state, cartList: payload.ebooks, total: payload.total}
        case "REMOVE_FROM_CART":
            return {...state, cartList: payload.ebooks, total: payload.total}
        
        case "CLEAR_CART":
            return {...state, cartList: payload.ebooks, total: payload.total}

        default:
            throw new Error("No case found!");
    }
}