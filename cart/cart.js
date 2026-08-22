// cart.js - BrewHaven Cart Page Rendering Logic

// Render the cart items in the DOM
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return; 

    const cart = getCart();
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your shopping cart is empty.</p>';
        updateCartTotalsDisplay();
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.setAttribute('data-id', item.id); 

        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="item-quantity-controls">
                <button class="decrease-quantity-btn" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <div class="item-price-total">₹${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item"><i class='bx bx-trash'></i></button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Add event listeners to dynamic elements
    cartItemsContainer.querySelectorAll('.decrease-quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            updateItemQuantity(itemId, -1);
        });
    });

    cartItemsContainer.querySelectorAll('.increase-quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            updateItemQuantity(itemId, 1);
        });
    });

    cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonElement = e.currentTarget;
            const itemId = buttonElement.dataset.id;
            removeItemFromCart(itemId);
            showToast('Item removed from cart.', 'success');
        });
    });

    updateCartTotalsDisplay();
}

// Update subtotal, tax, and grand total in the UI
function updateCartTotalsDisplay() {
    const cart = getCart();
    const { subtotal, tax, total } = calculateCartTotals(cart);

    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = tax.toFixed(2);
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

// Redraw overall cart components
function updateCartDisplay() {
    renderCartItems(); 
    updateCartItemCount(); 
}

// Listen to the cartUpdated custom event dispatched from shared.js
window.addEventListener('cartUpdated', () => {
    updateCartDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                showToast('Your cart is empty. Add items before checking out.', 'error');
                return;
            }
            
            // Clean visual feedback instead of raw alert()
            showToast('Proceeding to checkout! Thank you for ordering.', 'success');
            
            // Optional: Clear cart after checkout simulation
            setTimeout(() => {
                saveCart([]);
            }, 1500);
        });
    }
});