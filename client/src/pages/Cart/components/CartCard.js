import { Link } from "react-router-dom";
import { useCart } from "../../../context";
import { Col, Container, Row } from "react-bootstrap";
import TableContainer from "@mui/material/TableContainer";
export const CartCard = ({ebook}) => {
  const { removeFromCart, modifyQuantity } = useCart();

    return (
      <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 ">
        <div className="flex">
            <Link to="">
              <img className="w-32 rounded" src={ebook.poster} alt={ebook.name} />
            </Link>
            <div className="">
              <Link to={`ebooks/${ebook.id}`}>
                <p className="text-lg ml-2 dark:text-slate-200">{ebook.name}</p>
              </Link>            
              <button onClick={()=>removeFromCart(ebook)} className="text-base ml-2 text-red-400">Remove</button>
            </div>
        </div>
        <div className="input-group">
  <div className="row g-0">
  <button type="button" className="col-auto input-group-text" onClick={() => modifyQuantity(ebook, 1, 'dec')}>-</button>
  <input 
    type="number" 
    className="form-control text-center"
    value={ebook.quantity?ebook.quantity:1}
    onChange={(e) => modifyQuantity(ebook, e.target.value, 'input')}
  />
<button type="button" className="col-auto input-group-text" onClick={() => modifyQuantity(ebook, 1, 'inc')}>+</button>

  </div>
</div>




        <div className="text-lg m-2 dark:text-slate-200">
        <span>
        {ebook.promo_price ? (
          <>
            <p className="text-red-500">{ebook.promo_price} đ</p>
            <p className="text-gray-400"><del>{ebook.original_price} đ</del></p>
          </>
        ) : (
          <p className="text-gray-900">{ebook.original_price} đ</p>
        )}
      </span>

        </div>
      </div>
    )
  }