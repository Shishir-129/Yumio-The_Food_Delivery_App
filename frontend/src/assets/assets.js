// this file is used to import and export all the static assets (images) used in the frontend application. It organizes the assets into an object for easy access and also defines lists of menu items and food items with their respective details such as name, image, price, description, category, and recipe steps. This allows for centralized management of assets and data related to the food items displayed in the application.

import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.jpg'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Salad",
        menu_image: menu_1
    },
    {
        menu_name: "Rolls",
        menu_image: menu_2
    },
    {
        menu_name: "Deserts",
        menu_image: menu_3
    },
    {
        menu_name: "Sandwich",
        menu_image: menu_4
    },
    {
        menu_name: "Cake",
        menu_image: menu_5
    },
    {
        menu_name: "Pure Veg",
        menu_image: menu_6
    },
    {
        menu_name: "Pasta",
        menu_image: menu_7
    },
    {
        menu_name: "Noodles",
        menu_image: menu_8
    }]

export const food_list = [
    {
        _id: "1",
        name: "Greek salad",
        image: food_1,
        price: 380,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad",
        recipe: ["Wash and chop fresh tomatoes, cucumbers, and red onions", "Add kalamata olives and crumbled feta cheese", "Mix olive oil, lemon juice, and oregano for dressing", "Toss all ingredients together", "Serve chilled and enjoy!"]
    },
    {
        _id: "2",
        name: "Veg salad",
        image: food_2,
        price: 280,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad",
        recipe: ["Chop mixed vegetables (carrots, bell peppers, broccoli)", "Wash and tear fresh lettuce leaves", "Add cherry tomatoes and cucumber slices", "Prepare dressing with vinegar and olive oil", "Mix all ingredients and serve immediately"]
    },
    {
        _id: "3",
        name: "Clover Salad",
        image: food_3,
        price: 300,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad",
        recipe: ["Clean and wash fresh clover greens", "Chop fresh vegetables like tomatoes and radishes", "Add microgreens for extra nutrition", "Make light vinaigrette dressing", "Toss gently and serve immediately"]
    },
    {
        _id: "4",
        name: "Chicken Salad",
        image: food_4,
        price: 450,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad",
        recipe: ["Grill or bake chicken breast until cooked through", "Cool and slice the chicken into bite-sized pieces", "Mix with fresh greens and diced vegetables", "Add mayo or yogurt-based dressing", "Top with nuts or croutons and serve"]
    },
    {
        _id: "5",
        name: "Lasagna Rolls",
        image: food_5,
        price: 650,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls",
        recipe: ["Cook lasagna sheets until al dente", "Prepare ricotta filling with spinach and cheese", "Lay sheets flat and spread filling evenly", "Roll tightly from one end", "Place seam-side down, cover with sauce, and bake at 350°F for 25 minutes"]
    },
    {
        _id: "6",
        name: "Peri Peri Rolls",
        image: food_6,
        price: 350,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls",
        recipe: ["Marinate chicken in peri peri spice mix", "Grill chicken until cooked and charred", "Warm tortillas or flatbreads", "Slice grilled chicken and place in tortillas", "Add fresh vegetables and peri peri sauce, roll tight and serve"]
    },
    {
        _id: "7",
        name: "Chicken Rolls",
        image: food_7,
        price: 250,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls",
        recipe: ["Cook chicken breast and dice into small pieces", "Heat tortillas until soft and pliable", "Sauté onions and bell peppers", "Mix chicken with vegetables and season", "Roll in tortillas with cheese and sauce, bake until crispy"]
    },
    {
        _id: "8",
        name: "Veg Rolls",
        image: food_8,
        price: 150,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls",
        recipe: ["Chop mixed vegetables (carrots, cabbage, mushrooms)", "Warm tortillas or spring roll wrappers", "Sauté vegetables with soy sauce and ginger", "Place vegetables in center of wrapper", "Roll tightly and serve with sweet chili sauce"]
    },
    {
        _id: "9",
        name: "Ripple Ice Cream",
        image: food_9,
        price: 140,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts",
        recipe: ["Prepare vanilla ice cream base", "Churn in ice cream maker until soft-serve consistency", "Add ripple sauce (caramel or chocolate)", "Swirl gently to create ripple pattern", "Freeze for at least 4 hours before serving"]
    },
    {
        _id: "10",
        name: "Fruit Ice Cream",
        image: food_10,
        price: 200,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts",
        recipe: ["Blend fresh strawberries or mixed berries", "Mix with condensed milk and whipped cream", "Fold in fresh fruit pieces", "Pour into container and freeze", "Churn or stir every 30 minutes for 2-3 hours until creamy"]
    },
    {
        _id: "11",
        name: "Jar Ice Cream",
        image: food_11,
        price: 100,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts",
        recipe: ["Pour heavy cream into jar", "Add sweetened condensed milk", "Add flavoring and shake vigorously for 5-7 minutes", "Place in ice bath for 10 minutes", "Shake again and enjoy homemade ice cream!"]
    },
    {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: food_12,
        price: 150,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts",
        recipe: ["Heat milk with sugar until dissolved", "Add vanilla extract and egg yolks", "Cool mixture completely", "Whip cream until stiff peaks form", "Fold whipped cream into cooled mixture and freeze"]
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: food_13,
        price: 210,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich",
        recipe: ["Grill or fry chicken breast until cooked", "Toast bread slices until golden", "Spread mayo on both bread slices", "Add lettuce, tomato, and cucumber slices", "Place chicken on bread, top with second slice, cut diagonally and serve"]
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: food_14,
        price: 180,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich",
        recipe: ["Toast whole wheat bread", "Spread vegan mayo and hummus", "Add roasted vegetables and fresh greens", "Layer sliced avocado and tomato", "Season with salt and pepper, close sandwich and serve"]
    },
    {
        _id: "15",
        name: "Grilled Sandwich",
        image: food_15,
        price: 260,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich",
        recipe: ["Butter two slices of bread on outer sides", "Place in pan over medium heat", "Add cheese and grilled vegetables inside", "Toast until golden brown on both sides", "Cut and serve hot with a side of tomato sauce"]
    },
    {
        _id: "16",
        name: "Bread Sandwich",
        image: food_16,
        price: 140,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich",
        recipe: ["Slice fresh bread into thin pieces", "Prepare filling with meats and cheeses", "Layer ingredients between bread slices", "Toast lightly in oven", "Serve warm with pickles on the side"]
    },
    {
        _id: "17",
        name: "Cup Cake",
        image: food_17,
        price: 140,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake",
        recipe: ["Mix flour, sugar, and baking powder", "Cream butter and add eggs", "Combine wet and dry ingredients", "Add vanilla extract", "Fill cupcake liners halfway and bake at 350°F for 18-20 minutes"]
    },
    {
        _id: "18",
        name: "Vegan Cake",
        image: food_18,
        price: 150,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake",
        recipe: ["Mix plant-based milk with apple cider vinegar", "Combine flour, sugar, and cocoa powder", "Mix in oil and vanilla extract", "Combine wet and dry ingredients gently", "Pour into greased pan and bake at 350°F for 30-35 minutes"]
    },
    {
        _id: "19",
        name: "Butterscotch Cake",
        image: food_19,
        price: 200,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake",
        recipe: ["Prepare cake batter with flour and butter", "Make butterscotch sauce with brown sugar", "Pour half batter into pan", "Add butterscotch sauce", "Top with remaining batter and bake at 350°F for 40 minutes"]
    },
    {
        _id: "20",
        name: "Sliced Cake",
        image: food_20,
        price: 50,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake",
        recipe: ["Bake a sponge cake in round pans", "Cool completely before slicing", "Prepare cream filling or buttercream", "Layer cakes with filling between each layer", "Frost the outside and decorate as desired"]
    },
    {
        _id: "21",
        name: "Garlic Mushroom ",
        image: food_21,
        price: 140,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg",
        recipe: ["Slice fresh mushrooms thinly", "Mince fresh garlic cloves", "Heat butter in pan and add garlic", "Sauté mushrooms until golden", "Season with salt, pepper, and herbs, finish with fresh parsley"]
    },
    {
        _id: "22",
        name: "Fried Cauliflower",
        image: food_22,
        price: 150,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg",
        recipe: ["Cut cauliflower into florets", "Mix flour, cornstarch, and spices for coating", "Dip florets in batter", "Deep fry until golden and crispy", "Drain on paper towels and serve with garlic sauce"]
    },
    {
        _id: "23",
        name: "Mix Veg Pulao",
        image: food_23,
        price: 200,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg",
        recipe: ["Chop mixed vegetables (carrots, peas, corn)", "Sauté onions and ginger", "Add rice and toast for 2 minutes", "Add water and bring to boil", "Simmer covered for 15 minutes until rice is cooked"]
    },
    {
        _id: "24",
        name: "Rice Zucchini",
        image: food_24,
        price: 120,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg",
        recipe: ["Dice fresh zucchini into small pieces", "Sauté with oil and garlic", "Add cooked rice and stir well", "Season with soy sauce and sesame oil", "Cook for 5 minutes and serve hot"]
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: food_25,
        price: 220,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta",
        recipe: ["Boil pasta until al dente in salted water", "Drain and reserve some pasta water", "Toss hot pasta with butter and garlic", "Add grated cheese gradually", "Mix in reserved pasta water for creamy sauce and serve"]
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: food_26,
        price: 180,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta",
        recipe: ["Cook pasta according to package directions", "Sauté fresh garlic in olive oil", "Add crushed tomatoes and simmer", "Season with Italian herbs and salt", "Toss with cooked pasta and serve with fresh basil"]
    },
    {
        _id: "27",
        name: "Creamy Pasta",
        image: food_27,
        price: 160,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta",
        recipe: ["Cook pasta until tender", "Prepare cream sauce with butter and heavy cream", "Add garlic and parmesan cheese", "Season with salt and white pepper", "Toss pasta in sauce and garnish with fresh parsley"]
    },
    {
        _id: "28",
        name: "Chicken Pasta",
        image: food_28,
        price: 240,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta",
        recipe: ["Cube chicken breast and season with salt and pepper", "Sauté chicken until cooked through", "Cook pasta according to instructions", "Make cream or tomato sauce", "Combine pasta, chicken, and sauce, toss well and serve"]
    },
    {
        _id: "29",
        name: "Butter Noodles",
        image: food_29,
        price: 140,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles",
        recipe: ["Boil noodles until tender and drain", "Melt butter in a large pan", "Add sesame oil and garlic", "Toss noodles in buttery sauce", "Season with salt and garnish with green onions"]
    },
    {
        _id: "30",
        name: "Veg Noodles",
        image: food_30,
        price: 120,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles",
        recipe: ["Boil noodles until cooked", "Chop mixed vegetables finely", "Stir-fry vegetables in oil and garlic", "Add noodles and soy sauce", "Toss well and serve hot"]
    },
    {
        _id: "31",
        name: "Somen Noodles",
        image: food_31,
        price: 200,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles",
        recipe: ["Boil somen noodles for 2 minutes and drain", "Chill noodles in ice water", "Prepare dipping sauce with soy sauce and mirin", "Arrange noodles on a plate", "Serve with ice and dipping sauce on the side"]
    },
    {
        _id: "32",
        name: "Cooked Noodles",
        image: food_32,
        price: 100,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles",
        recipe: ["Boil noodles in salted water until tender", "Drain well and set aside", "Cook with sautéed garlic, ginger, and vegetables", "Add soy sauce and rice vinegar", "Stir-fry until heated through and serve immediately"]
    }
]
