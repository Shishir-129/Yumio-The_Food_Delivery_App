/* Context provider for managing cart state including food items and cart functionality */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list as staticFoodList } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://yumio-backend-zs2j.onrender.com";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const currentCart = prev || {}; /* Ensure cart is not undefined */
            if (!currentCart[itemId]) {  /* If item is not already in cart */
                return {...currentCart, [itemId]:1};
            } else {  /* If item is already in cart */
                return {...currentCart, [itemId]:currentCart[itemId]+1};
            }
        });
        
        if (token) {
            try {
                await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const currentCart = prev || {}; /* Ensure cart is not undefined */
            const newCart = {...currentCart};
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
        
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}})
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    }

    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
        if (!cartItems || !food_list) return 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product.id == item); /* Find item details from food_list */
                if (itemInfo) {
                    totalAmount += Number(itemInfo.price) * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    // Function to fetch food list from database ***V V I***
    const fetchFoodList = async() => {
        const response = await axios.get(url + "/api/food/list");
        let foodData = response.data.data;
        
        // Merge with recipe data from static assets by matching food names
        foodData = foodData.map(item => {
            const staticItem = staticFoodList.find(staticItem => 
                staticItem.name.toLowerCase().trim() === item.name.toLowerCase().trim()
            );
            
            // Use recipe from database if available, otherwise use from static assets
            return {
                ...item,
                recipe: item.recipe && Array.isArray(item.recipe) && item.recipe.length > 0 
                    ? item.recipe 
                    : (staticItem ? staticItem.recipe : [])
            };
        });
        
        setFoodList(foodData);
    }

    const loadCartData = async(token) => {
        try {
            const response = await axios.post(url + "/api/cart/get",{},{headers:{token}})
            const dbCart = response.data.cartData || {};
            setCartItems(dbCart);
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({});
        }
    }

    // Load cart and food list on mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); /* Fetch food list when component mounts */
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // User is logged in - load cart from database
                setToken(storedToken);
                await loadCartData(storedToken);
            } else {
                // User not logged in - start with empty cart
                setCartItems({});
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
        setToken, /* Backend server URL */
        searchTerm,
        setSearchTerm
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
