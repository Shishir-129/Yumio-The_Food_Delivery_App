import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import RecipeModal from '../RecipeModal/RecipeModal';

const FoodItem = ({id,name,price,description,image,recipe}) => {

    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext); /* Accessing cartItems and functions from StoreContext, used to access shared datak  */
    const [showRecipe, setShowRecipe] = useState(false);

  return (
    <>
    <div className="food-item">
        <div className="food-item-img-container">
            <img className="food-item-image" src={url+"/images/"+image} alt="" />
            {!cartItems?.[id]
                ?<img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">Rs. {price}</p>
            <button className="recipe-btn" onClick={() => setShowRecipe(true)}>
                👨‍🍳 View Recipe
            </button>
        </div>
    </div>
    {showRecipe && <RecipeModal foodName={name} recipeSteps={recipe} onClose={() => setShowRecipe(false)} />}
    </>
  )
}

export default FoodItem
