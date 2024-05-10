import { useState,useEffect } from "react"
import { useParams } from "react-router-dom";
import { useCart } from "../context";
import { useTitle } from "../hooks/useTitle";
import { Rating } from "../components";
import { getEbook } from "../services";



export const EbookDetail = () => {
  const { cartList, addToCart, removeFromCart } = useCart();
  const [ inCart , setInCart] = useState(false);
    const [ebook, setEbook] = useState({});
    const {id} = useParams();
    useTitle(ebook.name);

    useEffect(() => {
      async function fetchEbooks(){
        const data = await getEbook(id);
        setEbook(data);
      }
      fetchEbooks();
    }, [id]);
    
      useEffect(()=>{
        const ebookInCart = cartList.find(item => item.id === ebook.id);
  
         if(ebookInCart){
          setInCart(true);
         }else{
          setInCart(false);
         }
      },[cartList, ebook.id]);
  
    return (
      <main>
          <section>
            <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{ebook.name}</h1>
            <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{ebook.overview}</p>
            <div className="flex flex-wrap justify-around">
              <div className="max-w-xl my-3">
                <img className="rounded" src={ebook.poster} alt={ebook.name} />
              </div>
              <div className="max-w-xl my-3">
                <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                  <span className="mr-1">$</span>
                  <span className="">{ebook.price}</span>
                </p>
                <p className="my-3"> 
                  <span>
                    <Rating rating ={ebook.rating} />
                  </span>
                </p>
                <p className="my-4 select-none">
                  {ebook.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span>   }
                  { ebook.in_stock &&  <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span> }
                  { !ebook.in_stock && <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> }
                  {/* <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> */}
                  <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{ ebook.size } MB</span>
                </p>
                <p className="my-3">
                { !inCart && <button onClick={()=>addToCart(ebook)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${ebook.in_stock ? "" : "cursor-not-allowed"}`} disabled={ ebook.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button> }  
                { inCart &&   <button onClick={()=>removeFromCart(ebook)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${ebook.in_stock ? "" : "cursor-not-allowed"}`}  disabled={ ebook.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> } 
                </p>
                <p className="text-lg text-gray-900 dark:text-slate-200">
                  {ebook.long_description}
                </p>
              </div>
            </div>
          </section>
        </main> 
    )
  }