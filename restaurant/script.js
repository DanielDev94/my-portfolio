// --- 1. THE DATA (Our Menu) ---
const menu = [
    { id: 1, name: "Special Moin-moin", price: 500, category: "Mains" },
    { id: 2, name: "Spicy Akara (5 pcs)", price: 300, category: "Sides" },
    { id: 3, name: "Hot Pap (Ogi)", price: 200, category: "Drinks" },
    { id: 4, name: "Jollof Rice & Chicken", price: 1500, category: "Mains" },
    { id: 5, name: "Fried Plantain (Dodo)", price: 400, category: "Sides" },
    { id: 6, name: "Chilled Zobo", price: 300, category: "Drinks" }
];

// --- 2. THE STATE (Our Cart) ---
let cart = [];

// --- 3. DOM ELEMENTS ---
const menuGrid = document.getElementById('menu-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');

// --- 4. RENDER THE MENU ---
// This function loops through our array and builds HTML for each item
function displayMenu() {
    // Clear the grid first
    menuGrid.innerHTML = ''; 

    menu.forEach(item => {
        // Create a new div
        const card = document.createElement('div');
        card.classList.add('menu-card');
        
        // Inject the HTML with the item's data
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p class="category">${item.category}</p>
            <p class="price">₦${item.price}</p>
            <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        
        // Attach it to the screen
        menuGrid.appendChild(card);
    });
}

// --- 5. ADD TO CART LOGIC ---
function addToCart(itemId) {
    // Find the item in our menu array based on the ID
    const selectedItem = menu.find(item => item.id === itemId);
    
    // Push it into our cart array
    cart.push(selectedItem);
    
    // Log it to the console so we can see it working behind the scenes
    console.log("Cart updated:", cart);
    
    // Update the red counter tag in the header
    cartCount.textContent = cart.length;

    // NEW LINE: Tell the cart to redraw itself every time an item is added
    updateCartUI();
}

// --- 6. START THE APP ---
displayMenu();

// --- 7. UPDATE THE CART SIDEBAR ---
function updateCartUI() {
    // Clear the cart panel first so we don't get duplicates
    cartItemsContainer.innerHTML = '';

    // If the cart is empty, show the empty message and set total to 0
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        totalPriceEl.textContent = '₦0';
        return; // Stop running the function here
    }

    let total = 0; // Create a math counter

    // Loop through the cart array
    cart.forEach((item, index) => {
        total += item.price; // Add this item's price to the total

        // Create the visual HTML for the item
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-item-display');
        
        cartRow.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>₦${item.price}</p>
            <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
        `;
        
        // Attach it to the sidebar
        cartItemsContainer.appendChild(cartRow);
    });

    // Finally, update the total price text on the screen
    totalPriceEl.textContent = `₦${total}`;
}

// --- 8. REMOVE ITEMS LOGIC ---
function removeFromCart(index) {
    // Splice removes 1 item from the array at the specific index
    cart.splice(index, 1); 
    
    // Update the red counter
    cartCount.textContent = cart.length; 
    
    // Redraw the cart UI to reflect the deleted item
    updateCartUI(); 
}

// --- 9. CHECKOUT LOGIC ---
const checkoutBtn = document.getElementById('checkout-btn');

checkoutBtn.addEventListener('click', () => {
    // 1. Check if the cart is empty first
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some items first.");
        return;
    }

    // 2. Calculate final total for the receipt
    let finalTotal = 0;
    cart.forEach(item => finalTotal += item.price);

    // 3. Simulate sending to a server with an alert
    alert(`Success! Your order for ₦${finalTotal} has been placed. Your food is being prepared!`);

    // 4. Empty the cart and update the screen
    cart = [];
    cartCount.textContent = '0';
    updateCartUI();
});