// ===============================================
// WanderGo Travels - Practical 6
// Asynchronous JavaScript
// ===============================================

// DOM Elements
const themeToggle = document.getElementById("themeToggle");

const promoTitle = document.getElementById("promoTitle");
const promoMessage = document.getElementById("promoMessage");
const welcomeMessage = document.getElementById("welcomeMessage");

const destinationPreference = document.getElementById("destinationPreference");
const savePreferenceButton = document.getElementById("savePreference");
const preferenceMessage = document.getElementById("preferenceMessage");
const sessionMessage = document.getElementById("sessionMessage");

const destinationFilter = document.getElementById("destinationFilter");
const refreshPackagesButton = document.getElementById("refreshPackages");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");
const destinationsGrid = document.getElementById("destinationsGrid");

// Store fetched destinations
let allDestinations = [];

// ===============================================
// 1. LOCAL STORAGE - Save Theme Preference
// ===============================================

function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");

    themeToggle.textContent =
        theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Load saved theme when the page opens
const savedTheme = localStorage.getItem("wanderGoTheme") || "light";

applyTheme(savedTheme);

// Save theme preference when the button is clicked
themeToggle.addEventListener("click", function () {
    const isDarkMode = document.body.classList.contains("dark-mode");

    const newTheme = isDarkMode ? "light" : "dark";

    applyTheme(newTheme);

    localStorage.setItem("wanderGoTheme", newTheme);
});

// ===============================================
// 2. SESSION STORAGE - Maintain Browser Session
// ===============================================

let sessionStart = sessionStorage.getItem("wanderGoSessionStart");

if (!sessionStart) {
    sessionStart = new Date().toLocaleTimeString();

    sessionStorage.setItem("wanderGoSessionStart", sessionStart);
}

sessionMessage.textContent =
    `Your current browser session started at ${sessionStart}.`;

// ===============================================
// 3. CALLBACK - Execute Tasks in Sequence
// ===============================================

function initializeTravelPortal(callback) {
    setTimeout(function () {
        const message = "Welcome! Your travel adventure starts here.";

        // Execute the callback after the timer finishes
        callback(message);
    }, 700);
}

// First show the welcome message, then load packages
initializeTravelPortal(function (message) {
    welcomeMessage.textContent = message;

    loadTravelPackages();
});

// ===============================================
// 4. setTimeout() - Display a Promotional Offer
// ===============================================

setTimeout(function () {
    promoTitle.textContent = "Special Holiday Deals!";

    promoMessage.textContent =
        "Explore beautiful destinations and plan your next getaway.";
}, 1500);

// ===============================================
// 5. setInterval() - Rotate Promotional Messages
// ===============================================

const promotions = [
    {
        title: "Discover Your Next Adventure!",
        message: "Explore beautiful destinations with WanderGo Travels."
    },
    {
        title: "Special Holiday Deals!",
        message: "Find exciting packages for your next vacation."
    },
    {
        title: "Your Dream Destination Awaits!",
        message: "Choose a destination and start planning your journey."
    }
];

let promotionIndex = 0;

setInterval(function () {
    promotionIndex = (promotionIndex + 1) % promotions.length;

    promoTitle.textContent = promotions[promotionIndex].title;
    promoMessage.textContent = promotions[promotionIndex].message;
}, 7000);

// ===============================================
// 6. FETCH API - Retrieve Local JSON Data
// ===============================================

async function loadTravelPackages() {
    loadingMessage.hidden = false;
    errorMessage.hidden = true;
    emptyMessage.hidden = true;

    errorMessage.textContent = "";

    refreshPackagesButton.disabled = true;

    try {
        // Fetch data from the local JSON file
        const response = await fetch("destinations.json");

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error("Unable to retrieve travel packages.");
        }

        // Convert JSON response into JavaScript data
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("The travel data format is incorrect.");
        }

        allDestinations = data;

        // Update dropdowns and cards
        populateDestinationDropdowns();
        renderDestinationCards();

    } catch (error) {
        console.error("Fetch Error:", error);

        destinationsGrid.replaceChildren();

        errorMessage.textContent =
            "Sorry, travel packages could not be loaded. Please check your connection or JSON file and try again.";

        errorMessage.hidden = false;
    } finally {
        loadingMessage.hidden = true;
        refreshPackagesButton.disabled = false;
    }
}

// ===============================================
// 7. Populate Destination Dropdowns
// ===============================================

function populateDestinationDropdowns() {
    destinationPreference.replaceChildren();
    destinationFilter.replaceChildren();

    const preferencePlaceholder = document.createElement("option");
    preferencePlaceholder.value = "";
    preferencePlaceholder.textContent = "Choose a destination";

    destinationPreference.appendChild(preferencePlaceholder);

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Destinations";

    destinationFilter.appendChild(allOption);

    allDestinations.forEach(function (destination) {
        const preferenceOption = document.createElement("option");

        preferenceOption.value = destination.name;
        preferenceOption.textContent =
            `${destination.name}, ${destination.country}`;

        destinationPreference.appendChild(preferenceOption);

        const filterOption = document.createElement("option");

        filterOption.value = destination.name;
        filterOption.textContent = destination.name;

        destinationFilter.appendChild(filterOption);
    });

    // Restore the saved destination preference
    const savedDestination = localStorage.getItem("wanderGoDestination");

    if (savedDestination) {
        const destinationExists = allDestinations.some(function (destination) {
            return destination.name === savedDestination;
        });

        if (destinationExists) {
            destinationPreference.value = savedDestination;

            preferenceMessage.textContent =
                `Your saved destination is ${savedDestination}.`;
        }
    }
}

// ===============================================
// 8. Display Travel Packages Dynamically
// ===============================================

function renderDestinationCards() {
    destinationsGrid.replaceChildren();

    const selectedFilter = destinationFilter.value || "all";

    const filteredDestinations = allDestinations.filter(
        function (destination) {
            return (
                selectedFilter === "all" ||
                destination.name === selectedFilter
            );
        }
    );

    emptyMessage.hidden = filteredDestinations.length !== 0;

    filteredDestinations.forEach(function (destination) {
        const card = document.createElement("article");
        card.className = "destination-card";

        const image = document.createElement("img");
        image.className = "destination-image";
        image.src = destination.image;
        image.alt = `Travel destination: ${destination.name}`;
        image.loading = "lazy";

        image.addEventListener("error", function () {
            image.alt = `${destination.name} image unavailable`;
            image.hidden = true;
        });

        const content = document.createElement("div");
        content.className = "card-content";

        const title = document.createElement("h3");
        title.textContent =
            `${destination.name}, ${destination.country}`;

        const description = document.createElement("p");
        description.textContent = destination.description;

        const details = document.createElement("div");
        details.className = "package-details";

        const duration = document.createElement("span");
        duration.className = "package-duration";
        duration.textContent = destination.duration;

        const price = document.createElement("span");
        price.className = "package-price";

        price.textContent =
            `₹${Number(destination.price).toLocaleString("en-IN")}`;

        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.className = "book-button";
        selectButton.textContent = "Save This Destination";

        selectButton.addEventListener("click", function () {
            destinationPreference.value = destination.name;
            saveDestinationPreference();
        });

        details.append(duration, price);

        content.append(title, description, details, selectButton);
        card.append(image, content);

        destinationsGrid.appendChild(card);
    });
}

// ===============================================
// 9. Filter Travel Packages
// ===============================================

destinationFilter.addEventListener("change", function () {
    renderDestinationCards();
});

// ===============================================
// 10. LOCAL STORAGE - Save Destination Preference
// ===============================================

function saveDestinationPreference() {
    const selectedDestination = destinationPreference.value;

    if (!selectedDestination) {
        preferenceMessage.textContent =
            "Please select a destination first.";

        return;
    }

    localStorage.setItem("wanderGoDestination", selectedDestination);

    preferenceMessage.textContent =
        `Your preference for ${selectedDestination} has been saved.`;
}

savePreferenceButton.addEventListener(
    "click",
    saveDestinationPreference
);

// ===============================================
// 11. Refresh Packages
// ===============================================

refreshPackagesButton.addEventListener("click", function () {
    loadTravelPackages();
});