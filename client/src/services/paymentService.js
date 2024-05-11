import axios from "axios";

export async function createPaymentLink(formData) {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:6020/api/payment/create-payment`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function getListBank(){
    try {
        const res = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_LISTS_BANK_URL}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
}
export async function getOrder(orderId){
  try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:6020/api/order/${orderId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function cancelOrder(orderId){
  try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:6020/api/order/${orderId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
