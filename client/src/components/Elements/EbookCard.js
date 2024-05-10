import { Link } from "react-router-dom";
import { useCart } from "../../context";
import { Rating } from "./Rating";
import { useEffect, useState } from "react";

export const EbookCard = ({ebook}) => {
    const { cartList, addToCart, removeFromCart } = useCart();
    const [ inCart , setInCart] = useState(false);
    // const {id, name, overview, poster, price, rating, best_seller} = ebook;
    const {id, name, original_price, promo_price, promo_rate, status, active, poster, rating} = ebook
    useEffect(()=>{
      const ebookInCart = cartList.find(item => item.id === ebook.id);

       if(ebookInCart){
        setInCart(true);
       }else{
        setInCart(false);
       }
    },[cartList, ebook.id]);

  return (
    <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/ebooks/${id}`} className="relative" >
            { ebook.best_seller && <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">Best Seller</span> }
            <img className="rounded-t-lg w-full h-64" src={poster} alt={name} />
        </Link>
        <div className="p-5">
            <Link to={`/ebooks/${id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            </Link>
            
            <div className="flex items-center my-2">
                <Rating rating={rating} />
            </div>

            <p className="flex justify-between items-center">
            {promo_price ? (
                <span className="text-2xl">
                    <span className="text-red-500">{promo_price} đ</span>
                    <span className="text-gray-400"><del>{original_price} đ</del></span>

                </span>
            ) : (
                <span className="text-2xl">
                    <p className="text-gray-900">{original_price} đ</p>
                </span>
                
            )}

                {!inCart && <button onClick={() => addToCart(ebook)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${ebook.active ? "" : "cursor-not-allowed"}`} disabled={ ebook.active ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>}
                {inCart && <button onClick={() => removeFromCart(ebook)}  className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${ebook.active ? "" : "cursor-not-allowed"}`} disabled={ ebook.active ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button>}
            </p>
        </div>
    </div>
  )
}