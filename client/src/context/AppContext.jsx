import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;
    
    const navigate = useNavigate ();
    const[user,setUser] = useState(null)
    const[isSeller,setIsSeller] = useState(false) 
    const[showUserlogin,setShowUserlogin] = useState(false)
    const [products,setProducts] = useState([])
    const [cartItems,setCartItems] = useState({})
    const [searchQuery,setSearchQuery] = useState({})


//fetch all products from the server
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }
//add prouct to cart 
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1
        }else{
            cartData[itemId] = 1
    }
    setCartItems(cartData);
    toast.success("Added to cart")
}

//Update cart items Quantity
const updateCartItems = (itemId,quantity) => {
    let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated successfully")
}
    

//remove item from cart
const removeItemFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId] -= 1;
        if(cartData[itemId] ==0){
            delete cartData[itemId];
        }
    }
    toast.success("Item removed from cart")
    setCartItems(cartData);
}
    useEffect(()=>{
        fetchProducts()
    },[])

    const value = {navigate,user,setUser,setIsSeller,isSeller,
        showUserlogin,setShowUserlogin , products,currency,addToCart,updateCartItems,removeItemFromCart,cartItems,searchQuery,setSearchQuery}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}