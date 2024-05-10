import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducer";

const filterInitialState = {
    ebookList: [],
    onlyInStock: false,
    bestSellerOnly: false,
    sortBy: null,
    ratings: null
}

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState);

    function initialEbookList(ebooks){
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                ebooks: ebooks
            }
        });
    }

    function bestSeller(ebooks){
        return state.bestSellerOnly ? ebooks.filter(ebook => ebook.best_seller === true) : ebooks;
    }

    function inStock(ebooks){
        return state.onlyInStock ? ebooks.filter(ebook => ebook.in_stock === true) : ebooks;
    }
    
    function sort(ebooks){
        if(state.sortBy === "lowtohigh"){
            return ebooks.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if(state.sortBy === "hightolow"){
            return ebooks.sort((a, b) => Number(b.price) - Number(a.price));
        }
        return ebooks;
    }

    function rating(ebooks){
        if(state.ratings === "4STARSABOVE"){
            return ebooks.filter(ebook => ebook.rating >= 4);
        }
        if(state.ratings === "3STARSABOVE"){
            return ebooks.filter(ebook => ebook.rating >= 3);
        }
        if(state.ratings === "2STARSABOVE"){
            return ebooks.filter(ebook => ebook.rating >= 2);
        }
        if(state.ratings === "1STARSABOVE"){
            return ebooks.filter(ebook => ebook.rating >= 1);
        }
        return ebooks;
    }

    const filteredEbookList = rating(sort(inStock(bestSeller(state.ebookList))));

    const value = {
        state, 
        dispatch,
        ebooks: filteredEbookList,
        initialEbookList
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const context = useContext(FilterContext);
    return context;
}