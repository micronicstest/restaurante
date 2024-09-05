document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceElement = document.querySelector('#total-price');
    const checkoutButton = document.querySelector('#checkout-button');

    // Función para actualizar el carrito
    function updateCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('li');
            cartItemElement.className = 'cart-item';

            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        Cantidad: <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItemElement);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Manejar la eliminación de productos
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    });

    // Manejar la actualización de cantidades
    cartItemsContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const index = event.target.getAttribute('data-index');
            const quantity = parseInt(event.target.value, 10);
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems[index].quantity = quantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    });

    // Proceder con la compra
    checkoutButton.addEventListener('click', () => {
        window.location.href = 'tarjeta.html'; // Cambia a la URL de la página de pago
    });

    // Inicializar el carrito
    updateCart();
});
