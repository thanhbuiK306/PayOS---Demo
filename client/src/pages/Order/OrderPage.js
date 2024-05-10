import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { OrderSuccess } from "./components/OrderSuccess";
import { OrderFail } from "./components/OrderFail";

export const OrderPage = () => {
  useTitle("Order Summary");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const status = queryParams.get("status");
  const orderCode = queryParams.get("orderCode");

  return (
    <main>
      {status === "PAID" ? <OrderSuccess data={ {orderCode: orderCode} } /> : <OrderFail />}
    </main>
  );
};
