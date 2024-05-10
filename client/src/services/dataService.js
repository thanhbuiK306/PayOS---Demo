function getSession(){
    // const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));
    return { cbid};
}
// const CUSTOMER_API = 'http://localhost:6020/api/user'
const ORDER_API = 'http://localhost:6020/api/order'

export async function getUserOrders(){
    const browserData = getSession();
    const requestOptions ={
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }
    const response = await fetch(`${ORDER_API}/get-user-order`, requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
      }
    const data = await response.json();
    return data;
}

export async function createOrder(cartList, total){
    const browserData = getSession();
    const order = {
        ebooks: cartList,
        amount: total,
        totalQuantity: cartList.length,
    }
    const requestOptions ={
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({order: order, paymentMethod: "PayOS"})
    }
    const response = await fetch(`${ORDER_API}/create-order`,requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
      }
    const data = await response.json();
    return data;
}