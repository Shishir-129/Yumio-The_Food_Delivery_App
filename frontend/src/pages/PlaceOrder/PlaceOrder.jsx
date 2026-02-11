import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {

    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

    const [data,setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({...data,[name]:value}))
    }

    // function to place order
    const placeOrder = async(event) => {
      event.preventDefault(); // prevent reload of webpage when we submit the form
      console.log("placeOrder function called!");
      
      if (!token) {
        alert("Please log in first to place an order");
        console.log("No token found");
        return;
      }
      
      let orderItems = [];
      food_list.map((item)=>{
        if (cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo['quantity'] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      
      if (orderItems.length === 0) {
        alert("Please add items to your cart");
        return;
      }
      
      let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount() + 2 // including delivery charges
      }
      
      try {
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        if (response.data.success) {
          const {session_url} = response.data;
          window.location.replace(session_url);
        } else {
          alert("Error: this " + response.data.message);
        }
      } catch (error) {
        console.error("Order error:", error.response?.data?.message || error.message);
        alert("Failed to place order: " + (error.response?.data?.message || "Connection error"));
      }
    }

    const navigate = useNavigate();  // for navigation

    useEffect(() => {  // redirect to cart if not logged in or cart is empty
      if (!token) {
        navigate('/cart')
      }
      else if (getTotalCartAmount() === 0) {
        navigate('/cart') // redirect to cart if cart is empty
      }
    },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Details</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone Number" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder
