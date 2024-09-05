document.addEventListener('DOMContentLoaded', () => {
    // Slider de Imágenes
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelector('.hero-container');
    const totalSlides = document.querySelectorAll('.hero-slide').length;
    let currentIndex = 0;

    function updateSlidePosition() {
        const offset = -currentIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateSlidePosition();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateSlidePosition();
    });

    // Auto-slide
    setInterval(() => {
        nextButton.click();
    }, 5000);

    // Carrito de Compras
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.getElementById('cart-container');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');

    // Inicializar carrito
    cartContainer.style.display = 'none'; // Ocultar carrito inicialmente
    updateCart();

    cartIcon.addEventListener('click', () => {
        cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    });

    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <span>${item.name} - $${item.price}</span>
                <button class="remove-item" data-name="${item.name}">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });

        // Añadir eventos de eliminar
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                removeItemFromCart(button.getAttribute('data-name'));
            });
        });
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function removeItemFromCart(name) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== name);
        saveCart(cart);
        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const image = button.getAttribute('data-image');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.name === name);

            if (itemIndex === -1) {
                cart.push({ name, price, image });
                saveCart(cart);
                updateCart();
            } else {
                alert('Ingrese a tienda y haga su pedido');
            }
        });
    });

    checkoutButton.addEventListener('click', () => {
        alert('Ingrese a tienda y haga su pedido');
        localStorage.removeItem('cart'); // Limpiar carrito
        updateCart(); // Actualizar carrito visualmente
        cartContainer.style.display = 'none'; // Ocultar carrito
    });
});

// Animación de aparición de productos destacados
document.addEventListener('scroll', function() {
    const featuredItems = document.querySelectorAll('.featured-item');
    const windowHeight = window.innerHeight;

    featuredItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemHeight = item.clientHeight;

        if (itemTop < windowHeight && itemTop + itemHeight > 0) {
            item.classList.add('appear');
        } else {
            item.classList.remove('appear');
        }
    });
});
