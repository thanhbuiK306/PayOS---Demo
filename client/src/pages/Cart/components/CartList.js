
import { CartCard } from "./CartCard";
import { Checkout } from "./Checkout";
import { useCart } from "../../../context";
import { Link } from "react-router-dom";
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createPaymentLink } from '../../../services/paymentService';
import {createOrder} from '../../../services/dataService'
import useScript from "react-script-hook";
// import { createOrder } from "../../../services";
export const CartList = () => {
    const [checkout, setCheckout] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const { cartList, total, clearCart } = useCart();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [openUICustomLoading, setOpenUICustomLoading] = useState(false);
    const [redirectLoading, setRedirectLoading] = useState(false);
    const [openDialogLoading, setOpenDialogLoading] = useState(false);
  
    const [loading, error] = useScript({
      src: process.env.REACT_APP_PAYOS_SCRIPT,
      checkForExisting: true,
    });
    const RETURN_URL = `http://localhost:3001/order-summary/`;
    const CANCEL_URL = `${window.location.href}result/`;
    
    const createPaymentLinkHandle = async function (
      callbackFunction,
      setLoading
    ) {
      setLoading(true);
      try {
        const order = await createOrder(cartList, total);
        const body = JSON.stringify({
          orderCode: order.order_number,
          description: "thanh toan don hang",
          ebooks: cartList,
          total: order.total,
          returnUrl: RETURN_URL,
          cancelUrl: CANCEL_URL,
          buyerName: order.name,
          buyerEmail: order.email,
          buyerPhone: order.phone
        });
        let response = await createPaymentLink(body);
        if (response.status !== 200) throw new Error("Call Api failed: ");
          callbackFunction(response.data);
          setLoading(false);
      } catch (error) {

        setLoading(false);
        toast.error("Có lỗi xảy ra");
      }
    };

    async function handleOrderSubmit(event){
      event.preventDefault();
      try {
          const data = await createOrder(cartList, total);
          clearCart();
          navigate("/order-summary", { state: {data: data, status: true} });
      } catch(error) {
          navigate("/order-summary", { state: {status: false} });
      }
    }
    const redirectPaymentLink = async function (checkoutResponse) {
      console.log(checkoutResponse)
      if (checkoutResponse) {
        let url = checkoutResponse.checkoutUrl;
        // if (checkoutResponse.checkoutUrl.startsWith("https://dev.pay.payos.vn")) {
        //   url = checkoutResponse.checkoutUrl
        // }
  
        // if (checkoutResponse.checkoutUrl.startsWith("https://pay.payos.vn")) {
        //   url = checkoutResponse.checkoutUrl
        // }
        console.log(url)
        window.location.href = url;
      }
    };
    return (
      <>
        <section>
          <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
            My Cart ({cartList.length})
          </p>
        </section>
        
        <section>
          { cartList.map((ebook)=>(
            <CartCard key={ebook.id} ebook={ebook}/>
          ))}
        </section>
        
        {/* <section className="max-w-4xl m-auto">
          <div className="flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100">
            <p className="flex justify-between my-2">
              <span className="font-semibold">Total Amount:</span>
              <span>${total}</span>
            </p>
          </div>
          <div className="text-right my-5">
            <Link to="/onestepcheckout" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
              PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
            </Link>
          </div>
        </section> */}

        <section className="max-w-4xl m-auto">
          <div className="flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100">
            <p className="flex justify-between my-2">
              <span className="font-semibold">Total Amount:</span>
              <span>${total}</span>
            </p>
          </div>
          <div className="text-right my-5">
          <Button
              variant="contained"
              onClick={() =>
                createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading)
              }
              disabled={redirectLoading}
              className="!bg-[#5D5FEF] !normal-case"
            >
              Đến trang thanh toán
              {redirectLoading ? (
                <>
                  {" "}
                  &nbsp; <CircularProgress className="!text-white" size={20} />
                </>
              ) : (
                ""
              )}
            </Button>
          </div>
        </section>

      </>
    )
  }