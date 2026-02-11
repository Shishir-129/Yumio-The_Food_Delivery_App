import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list, searchTerm} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index) => {
          const matchesCategory = category==='All' || category===item.category;
          const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                item.description.toLowerCase().includes(searchTerm.toLowerCase());
          
          if (matchesCategory && matchesSearch) {
            return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} />;
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
