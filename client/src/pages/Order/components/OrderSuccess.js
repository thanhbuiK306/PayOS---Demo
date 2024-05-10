import { Link } from "react-router-dom";
import { getOrder } from "../../../services/paymentService";

import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Toolbar } from "@mui/material";
import PaymentFieldsTableDemo from "../../../components/PaymentFieldsTableDemo";
import OrderTableDemo from "../../../components/OrderTableDemo";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
export const OrderSuccess = (response) => {
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    let orderCode = response.data.orderCode
    useEffect(() => {
        if (orderCode !== null) {
        getOrder(orderCode)
            .then(data => {
            if (data) {
                setOrder(data);
            } else{
                toast.warning('Không tìm thấy đơn hàng');
            }
            setLoading(false);
            })
            .catch(error => {
            toast.error('Có lỗi xảy ra');
            setLoading(false);
            });
        } else {
        setLoading(false);
        }
    }, []);
    return (
        <Box>
        {/* <Header/> */}
        <ToastContainer />
        {loading ? (
          <LinearProgress />
        ) : (
          <Box>
            <OrderTableDemo data={order} />
          </Box>
        )}
      </Box>
    )
  }