import { Route, Routes } from "react-router-dom"
import { HomePage , EbooksList , EbookDetail, CartPage, PageNotFound} from "../pages"
import { OrderPage } from "../pages/Order/OrderPage";
import DemoPayOS from "../pages/Payment/demoPayOS";
import Result from "../pages/Payment/Result";
import Payment from "../pages/Payment/Payment";
export const AllRoutes = () => {
  return (
    <>
    <Routes>
      {/* <Route path= "/" element= {<DemoPayOS />} /> */}
        <Route path= "/payment" element= {<Payment />} />
        <Route path= "/result" element= {<Result />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/ebooks" element={<EbooksList/>}  />
        <Route path="/ebooks/:id" element={<EbookDetail/>}  />

        <Route path="/cart" element={<CartPage/> }  />
        <Route path="/order-summary" element={<OrderPage/> }  />
        <Route path ="*" element={<PageNotFound />}/>
    </Routes>
    </>
  )
}
