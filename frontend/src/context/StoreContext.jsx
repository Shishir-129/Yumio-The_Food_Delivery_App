/* Context provider for managing cart state including food items and cart functionality */

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {  /* If item is not already in cart */
            setCartItems((prev) => ({...prev, [itemId]:1}));
        }
        else {  /* If item is already in cart */
            setCartItems((prev)=> ({...prev, [itemId]:prev[itemId]+1}));
        }
        if (token) {
            await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
        if (token) {
            await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item); /* Find item details from food_list */
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // Function to fetch food list from database ***V V I***
    const fetchFoodList = async() => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async(token) => {
        const response = await axios.post(url + "/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); /* Fetch food list when component mounts */
            if (localStorage.getItem("token")) {// if localStorage has token then set it in context, so that user remains logged in on page refresh
              setToken(localStorage.getItem("token"));
              await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list, /* List of food items available in the store */
        cartItems, /* Current items in the cart */
        setCartItems, /* Function to update cart items */
        addToCart, /* Function to add an item to the cart */
        removeFromCart, /* Function to remove an item from the cart */
        getTotalCartAmount, /* Function to calculate total cart amount */
        url,
        token,
        setToken /* Backend server URL */
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;