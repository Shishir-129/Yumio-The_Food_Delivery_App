// Migration script to populate recipes in the food table
// Run this once with: node migrate-recipes.js

import pool from './config/db.js';

const recipesData = [
    { name: "Greek salad", recipe: ["Wash and chop fresh tomatoes, cucumbers, and red onions", "Add kalamata olives and crumbled feta cheese", "Mix olive oil, lemon juice, and oregano for dressing", "Toss all ingredients together", "Serve chilled and enjoy!"] },
    { name: "Veg salad", recipe: ["Chop mixed vegetables (carrots, bell peppers, broccoli)", "Wash and tear fresh lettuce leaves", "Add cherry tomatoes and cucumber slices", "Prepare dressing with vinegar and olive oil", "Mix all ingredients and serve immediately"] },
    { name: "Clover Salad", recipe: ["Clean and wash fresh clover greens", "Chop fresh vegetables like tomatoes and radishes", "Add microgreens for extra nutrition", "Make light vinaigrette dressing", "Toss gently and serve immediately"] },
    { name: "Chicken Salad", recipe: ["Grill or bake chicken breast until cooked through", "Cool and slice the chicken into bite-sized pieces", "Mix with fresh greens and diced vegetables", "Add mayo or yogurt-based dressing", "Top with nuts or croutons and serve"] },
    { name: "Lasagna Rolls", recipe: ["Cook lasagna sheets until al dente", "Prepare ricotta filling with spinach and cheese", "Lay sheets flat and spread filling evenly", "Roll tightly from one end", "Place seam-side down, cover with sauce, and bake at 350°F for 25 minutes"] },
    { name: "Peri Peri Rolls", recipe: ["Marinate chicken in peri peri spice mix", "Grill chicken until cooked and charred", "Warm tortillas or flatbreads", "Slice grilled chicken and place in tortillas", "Add fresh vegetables and peri peri sauce, roll tight and serve"] },
    { name: "Chicken Rolls", recipe: ["Cook chicken breast and dice into small pieces", "Heat tortillas until soft and pliable", "Sauté onions and bell peppers", "Mix chicken with vegetables and season", "Roll in tortillas with cheese and sauce, bake until crispy"] },
    { name: "Veg Rolls", recipe: ["Chop mixed vegetables (carrots, cabbage, mushrooms)", "Warm tortillas or spring roll wrappers", "Sauté vegetables with soy sauce and ginger", "Place vegetables in center of wrapper", "Roll tightly and serve with sweet chili sauce"] },
    { name: "Ripple Ice Cream", recipe: ["Prepare vanilla ice cream base", "Churn in ice cream maker until soft-serve consistency", "Add ripple sauce (caramel or chocolate)", "Swirl gently to create ripple pattern", "Freeze for at least 4 hours before serving"] },
    { name: "Fruit Ice Cream", recipe: ["Blend fresh strawberries or mixed berries", "Mix with condensed milk and whipped cream", "Fold in fresh fruit pieces", "Pour into container and freeze", "Churn or stir every 30 minutes for 2-3 hours until creamy"] },
    { name: "Jar Ice Cream", recipe: ["Pour heavy cream into jar", "Add sweetened condensed milk", "Add flavoring and shake vigorously for 5-7 minutes", "Place in ice bath for 10 minutes", "Shake again and enjoy homemade ice cream!"] },
    { name: "Vanilla Ice Cream", recipe: ["Heat milk with sugar until dissolved", "Add vanilla extract and egg yolks", "Cool mixture completely", "Whip cream until stiff peaks form", "Fold whipped cream into cooled mixture and freeze"] },
    { name: "Chicken Sandwich", recipe: ["Grill or fry chicken breast until cooked", "Toast bread slices until golden", "Spread mayo on both bread slices", "Add lettuce, tomato, and cucumber slices", "Place chicken on bread, top with second slice, cut diagonally and serve"] },
    { name: "Vegan Sandwich", recipe: ["Toast whole wheat bread", "Spread vegan mayo and hummus", "Add roasted vegetables and fresh greens", "Layer sliced avocado and tomato", "Season with salt and pepper, close sandwich and serve"] },
    { name: "Grilled Sandwich", recipe: ["Butter two slices of bread on outer sides", "Place in pan over medium heat", "Add cheese and grilled vegetables inside", "Toast until golden brown on both sides", "Cut and serve hot with a side of tomato sauce"] },
    { name: "Bread Sandwich", recipe: ["Slice fresh bread into thin pieces", "Prepare filling with meats and cheeses", "Layer ingredients between bread slices", "Toast lightly in oven", "Serve warm with pickles on the side"] },
    { name: "Cup Cake", recipe: ["Mix flour, sugar, and baking powder", "Cream butter and add eggs", "Combine wet and dry ingredients", "Add vanilla extract", "Fill cupcake liners halfway and bake at 350°F for 18-20 minutes"] },
    { name: "Vegan Cake", recipe: ["Mix plant-based milk with apple cider vinegar", "Combine flour, sugar, and cocoa powder", "Mix in oil and vanilla extract", "Combine wet and dry ingredients gently", "Pour into greased pan and bake at 350°F for 30-35 minutes"] },
    { name: "Butterscotch Cake", recipe: ["Prepare cake batter with flour and butter", "Make butterscotch sauce with brown sugar", "Pour half batter into pan", "Add butterscotch sauce", "Top with remaining batter and bake at 350°F for 40 minutes"] },
    { name: "Sliced Cake", recipe: ["Bake a sponge cake in round pans", "Cool completely before slicing", "Prepare cream filling or buttercream", "Layer cakes with filling between each layer", "Frost the outside and decorate as desired"] },
    { name: "Garlic Mushroom", recipe: ["Slice fresh mushrooms thinly", "Mince fresh garlic cloves", "Heat butter in pan and add garlic", "Sauté mushrooms until golden", "Season with salt, pepper, and herbs, finish with fresh parsley"] },
    { name: "Fried Cauliflower", recipe: ["Cut cauliflower into florets", "Mix flour, cornstarch, and spices for coating", "Dip florets in batter", "Deep fry until golden and crispy", "Drain on paper towels and serve with garlic sauce"] },
    { name: "Mix Veg Pulao", recipe: ["Chop mixed vegetables (carrots, peas, corn)", "Sauté onions and ginger", "Add rice and toast for 2 minutes", "Add water and bring to boil", "Simmer covered for 15 minutes until rice is cooked"] },
    { name: "Rice Zucchini", recipe: ["Dice fresh zucchini into small pieces", "Sauté with oil and garlic", "Add cooked rice and stir well", "Season with soy sauce and sesame oil", "Cook for 5 minutes and serve hot"] },
    { name: "Cheese Pasta", recipe: ["Boil pasta until al dente in salted water", "Drain and reserve some pasta water", "Toss hot pasta with butter and garlic", "Add grated cheese gradually", "Mix in reserved pasta water for creamy sauce and serve"] },
    { name: "Tomato Pasta", recipe: ["Cook pasta according to package directions", "Sauté fresh garlic in olive oil", "Add crushed tomatoes and simmer", "Season with Italian herbs and salt", "Toss with cooked pasta and serve with fresh basil"] },
    { name: "Creamy Pasta", recipe: ["Cook pasta until tender", "Prepare cream sauce with butter and heavy cream", "Add garlic and parmesan cheese", "Season with salt and white pepper", "Toss pasta in sauce and garnish with fresh parsley"] },
    { name: "Chicken Pasta", recipe: ["Cube chicken breast and season with salt and pepper", "Sauté chicken until cooked through", "Cook pasta according to instructions", "Make cream or tomato sauce", "Combine pasta, chicken, and sauce, toss well and serve"] },
    { name: "Butter Noodles", recipe: ["Boil noodles until tender and drain", "Melt butter in a large pan", "Add sesame oil and garlic", "Toss noodles in buttery sauce", "Season with salt and garnish with green onions"] },
    { name: "Veg Noodles", recipe: ["Boil noodles until cooked", "Chop mixed vegetables finely", "Stir-fry vegetables in oil and garlic", "Add noodles and soy sauce", "Toss well and serve hot"] },
    { name: "Somen Noodles", recipe: ["Boil somen noodles for 2 minutes and drain", "Chill noodles in ice water", "Prepare dipping sauce with soy sauce and mirin", "Arrange noodles on a plate", "Serve with ice and dipping sauce on the side"] },
    { name: "Cooked Noodles", recipe: ["Boil noodles in salted water until tender", "Drain well and set aside", "Cook with sautéed garlic, ginger, and vegetables", "Add soy sauce and rice vinegar", "Stir-fry until heated through and serve immediately"] }
];

const migrateRecipes = async () => {
    try {
        console.log("Starting recipe migration...");
        
        let updated = 0;
        let notFound = 0;

        for (const recipeItem of recipesData) {
            try {
                const result = await pool.query(
                    'UPDATE food SET recipe = $1 WHERE LOWER(name) = LOWER($2)',
                    [JSON.stringify(recipeItem.recipe), recipeItem.name]
                );

                if (result.rowCount > 0) {
                    console.log(`✓ Updated: ${recipeItem.name}`);
                    updated++;
                } else {
                    console.log(`✗ Not found in DB: ${recipeItem.name}`);
                    notFound++;
                }
            } catch (error) {
                console.error(`Error updating ${recipeItem.name}:`, error.message);
            }
        }

        console.log("\n========== Migration Summary ==========");
        console.log(`Total recipes to migrate: ${recipesData.length}`);
        console.log(`Successfully updated: ${updated}`);
        console.log(`Not found in database: ${notFound}`);
        console.log("========================================\n");

        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrateRecipes();
