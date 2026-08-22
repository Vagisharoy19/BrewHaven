document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1200,
        once: true,
    });

    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                item.style.display = (category === 'all' || itemCategory === category) ? 'flex' : 'none';
            });
        });
    });

    updateCartItemCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItemElement = event.target.closest('.menu-item');

            if (menuItemElement) {
                const itemId = menuItemElement.dataset.id;
                const itemName = menuItemElement.querySelector('h3').textContent;
                const itemPriceText = menuItemElement.querySelector('.item-price').textContent;
                const itemPrice = parseFloat(itemPriceText.replace('₹', '').replace('$', ''));
                const itemImg = menuItemElement.querySelector('img').src;

                if (itemId && itemName && !isNaN(itemPrice) && itemImg) {
                    const itemToAdd = {
                        id: itemId,
                        name: itemName,
                        price: itemPrice,
                        img: itemImg,
                        quantity: 1
                    };

                    addItemToCart(itemToAdd);
                    updateCartItemCount();
                } else {
                    console.error('Invalid item data', menuItemElement);
                }
            }
        });
    });
});

function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateCartItemCount() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('cart-item-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
    }
}
