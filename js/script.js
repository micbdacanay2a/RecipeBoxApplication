// RECIPE DATABASE

const recipes = [

{
    id: 1,
    title: "Tuscan Rigatoni Bolognese",
    time: 45,
    servings: 4,

    summary: "A rich tomato sauce, tender pasta and fresh basil.",

    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",

    ingredients: [
        "400g rigatoni pasta",
        "300g ground beef",
        "1 onion, finely chopped",
        "2 cloves garlic",
        "1 can crushed tomatoes",
        "Fresh basil leaves",
        "Salt and black pepper"
    ],

    steps: [
        "Boil the rigatoni in salted water until just tender. Reserve a little pasta water.",
        "Cook the onion, garlic and ground beef in a pan until browned. Stir in crushed tomatoes and simmer.",
        "Toss the pasta with the sauce. Add a splash of pasta water, season and finish with fresh basil."
    ]
},

{
    id: 2,
    title: "Cast-Iron Lemon Thyme Chicken",
    time: 35,
    servings: 2,

    summary: "Golden chicken with lemon, thyme and buttery pan juices.",

    image: "https://images.unsplash.com/photo-1532634896-26909d0d4b3b?auto=format&fit=crop&w=900&q=85",

    ingredients: [
        "2 chicken breasts",
        "1 lemon, sliced",
        "4 sprigs fresh thyme",
        "1 tbsp salted butter",
        "Salt and cracked black pepper"
    ],

    steps: [
        "Season chicken generously with salt and pepper on both sides.",
        "Heat a skillet and cook the chicken until golden and cooked through. Add butter, lemon and thyme.",
        "Spoon the lemon-thyme butter over the chicken and serve warm."
    ]
},

{
    id: 3,
    title: "Warm White Bean & Herb Salad",
    time: 20,
    servings: 2,

    summary: "Creamy white beans tossed with fresh herbs and lemon.",

    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",

    ingredients: [
        "1 can cannellini beans, rinsed",
        "1 bunch Italian flat-leaf parsley",
        "1 lemon",
        "2 tbsp olive oil",
        "1 small garlic clove",
        "Salt and pepper"
    ],

    steps: [
        "Drain and rinse the beans, then place them in a bowl.",
        "Whisk lemon juice, olive oil, garlic, salt and pepper.",
        "Toss beans with the dressing and chopped herbs. Serve slightly warm."
    ]
},

{
    id: 4,
    title: "Classic Roman Carbonara",
    time: 25,
    servings: 2,

    summary: "Silky pasta with cheese, pepper and a creamy egg sauce.",

    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=85",

    ingredients: [
        "200g spaghetti",
        "100g guanciale, cubed",
        "2 whole eggs",
        "50g grated Pecorino Romano",
        "Freshly cracked black pepper"
    ],

    steps: [
        "Cook spaghetti in salted boiling water until al dente.",
        "Crisp the guanciale in a pan. Mix eggs, cheese and black pepper in a bowl.",
        "Toss hot pasta with guanciale, then mix in the egg mixture off the heat until glossy."
    ]
},

{
    id: 5,
    title: "Pan-Seared Salmon with Dill Butter",
    time: 18,
    servings: 2,

    summary: "A quick salmon dinner with fresh dill and lemon butter.",

    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",

    ingredients: [
        "2 salmon fillets",
        "1 tbsp unsalted butter",
        "1 tbsp fresh dill",
        "½ lemon",
        "Salt and pepper"
    ],

    steps: [
        "Pat salmon dry and season both sides.",
        "Sear salmon in a warm pan until cooked to your preference.",
        "Melt butter with dill and lemon juice, then spoon over the salmon."
    ]
}

];

let activeRecipe = null;
let currentStepIndex = 0;

const $ = id => document.getElementById(id);


// CHANGE PAGES

function showView(name) {

    document.querySelectorAll(".view").forEach(view => {
        view.classList.remove("active");
    });

    $(name + "View").classList.add("active");

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.tab === name
        );
    });

    document.querySelector(".bottom-nav")
        .classList.toggle(
            "hidden",
            ["detail", "cooking"].includes(name)
        );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// CREATE RECIPE CARD

function recipeRow(recipe) {

    return `
        <article class="recipe-row" data-id="${recipe.id}">

            <img src="${recipe.image}" alt="${recipe.title}">

            <div>

                <h3>${escapeHTML(recipe.title)}</h3>

                <div class="row-meta">
                    ${recipe.time} min · ${recipe.servings} servings
                </div>

                <p>
                    ${escapeHTML(recipe.ingredients.slice(0, 3).join(", "))}...
                </p>

            </div>

            <span class="row-arrow">›</span>

        </article>
    `;
}


// DISPLAY HOME PAGE

function renderHome() {

    const featured = recipes[0];

    $("featuredImage").src = featured.image;

    $("featuredTitle").textContent = featured.title;

    $("featuredTime").textContent = featured.time + " min";

    $("featuredServings").textContent = featured.servings;

    $("featuredSummary").textContent = featured.summary;

    $("recipeList").innerHTML =
        recipes.slice(1).map(recipeRow).join("");

    $("recipeCount").textContent =
        recipes.length + " recipes";

    $("emptyState").classList.toggle(
        "hidden",
        recipes.length > 0
    );
}


// HTML TEXT PROTECTION

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));

}


// OPEN RECIPE DETAILS

function openRecipe(id) {

    activeRecipe = recipes.find(
        recipe => recipe.id === Number(id)
    );

    if (!activeRecipe) return;

    $("detailContent").innerHTML = `

        <h1 class="detail-title">
            ${escapeHTML(activeRecipe.title)}
        </h1>

        <div class="detail-meta">
            ◷ ${activeRecipe.time} minutes
            ·
            ♧ ${activeRecipe.servings} servings
        </div>

        <p class="detail-owner">
            ✦ Saved in your Recipe Box
        </p>

        <img
            class="detail-hero"
            src="${activeRecipe.image}"
            alt="${escapeHTML(activeRecipe.title)}"
        >

        <div class="detail-actions">

            <button class="primary-button" id="startCooking">
                ♨ Start cooking
            </button>

        </div>

        <section class="detail-section">

            <h2>Ingredients</h2>

            <ul class="ingredient-list">

                ${activeRecipe.ingredients.map(item => `
                    <li>
                        <label>
                            <input type="checkbox">
                            ${escapeHTML(item)}
                        </label>
                    </li>
                `).join("")}

            </ul>

        </section>

        <section class="detail-section">

            <h2>Preparation</h2>

            ${activeRecipe.steps.map((step, index) => `
                <div class="detail-step">
                    <b>Step ${index + 1}.</b>
                    ${escapeHTML(step)}
                </div>
            `).join("")}

        </section>

    `;

    $("startCooking").addEventListener(
        "click",
        startCooking
    );

    showView("detail");
}


// START COOKING

function startCooking() {

    currentStepIndex = 0;

    $("cookingRecipeName").textContent =
        activeRecipe.title;

    renderStep();

    showView("cooking");
}


// DISPLAY COOKING STEPS

function renderStep() {

    const total = activeRecipe.steps.length;

    const step = activeRecipe.steps[currentStepIndex];

    $("stepLabel").textContent =
        Step ${currentStepIndex + 1} of ${total};

    $("currentStep").textContent =
        ${currentStepIndex + 1} / ${total};

    $("cookTime").textContent =
        activeRecipe.time + " minutes";

    $("cookServings").textContent =
        activeRecipe.servings + " portions";

    $("bigStepNumber").textContent =
        String(currentStepIndex + 1).padStart(2, "0");

    $("instructionText").textContent = step;

    $("stepIngredients").innerHTML =
        activeRecipe.ingredients.map(item => `
            <span class="ingredient-chip">
                ✧ ${escapeHTML(item)}
            </span>
        `).join("");

    $("stepProgress").style.width =
        ((currentStepIndex + 1) / total * 100) + "%";

    $("nextStepBtn").textContent =
        currentStepIndex === total - 1
            ? "Finish cooking"
            : "Next step";
}


// SEARCH RECIPES

function renderSearch(query = "") {

    const q = query.toLowerCase().trim();

    const found = recipes.filter(recipe => {

        return [
            recipe.title,
            recipe.summary,
            ...recipe.ingredients
        ]
        .join(" ")
        .toLowerCase()
        .includes(q);

    });

    $("searchResults").innerHTML = found.length
        ? found.map(recipeRow).join("")
        : '<p class="empty-state">No recipes found.</p>';
}


// NAVIGATION BUTTONS

document.addEventListener("click", event => {

    const row = event.target.closest(".recipe-row");

    if (row) {
        openRecipe(row.dataset.id);
    }

    const tab = event.target.closest("[data-tab]");

    if (tab) {

        if (tab.dataset.tab === "add") {

            showView("add");

        } else if (tab.dataset.tab === "search") {

            showView("search");

            renderSearch();

        } else {

            showView("home");

        }

    }

    const back = event.target.closest("[data-go]");

    if (back) {
        showView(back.dataset.go);
    }

});


// FEATURED RECIPE BUTTON

$("featuredOpen").addEventListener("click", () => {

    openRecipe(recipes[0].id);

});


// SEARCH BUTTON

$("topSearchBtn").addEventListener("click", () => {

    showView("search");

    renderSearch();

});

$("searchInput").addEventListener("input", event => {

    renderSearch(event.target.value);

});


// EXIT COOKING

$("exitCooking").addEventListener("click", () => {

    showView("detail");

});


// NEXT COOKING STEP

$("nextStepBtn").addEventListener("click", () => {

    if (currentStepIndex < activeRecipe.steps.length - 1) {

        currentStepIndex++;

        renderStep();

    } else {

        alert("Recipe completed! Enjoy your meal.");

        showView("detail");

    }

});


// DONE BUTTON

$("doneBtn").addEventListener("click", () => {

    $("recipeForm").requestSubmit();

});


// ADD NEW RECIPE

$("recipeForm").addEventListener("submit", event => {

    event.preventDefault();

    const ingredients = $("newIngredients")
        .value.split("\n")
        .map(item => item.trim())
        .filter(Boolean);

    const steps = $("newSteps")
        .value.split("\n")
        .map(step => step.trim())
        .filter(Boolean);

    if (!ingredients.length || !steps.length) {

        alert("Please add ingredients and preparation steps.");

        return;

    }

    const recipe = {

        id: Date.now(),

        title: $("newTitle").value.trim(),

        time: Number($("newTime").value),

        servings: Number($("newServings").value),

        summary: "A homemade recipe added to your box.",

        image: $("newImage").value.trim() ||
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",

        ingredients: ingredients,

        steps: steps

    };

    recipes.push(recipe);

    renderHome();

    event.target.reset();

    showView("home");

    alert("Your recipe has been saved!");

});


// INITIALIZE WEBSITE

renderHome();