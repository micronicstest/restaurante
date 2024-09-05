// tienda.js
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const categoriesButtons = document.querySelectorAll('.category-btn');

    // Ejemplo de productos
    const products = {
        bebidas: [
            { name: 'Fresa 250.ml', price: 8.90, image: 'imagenes/250mli.png' },
            { name: 'Pera 250.ml', price: 8.90, image: 'imagenes/250ml.png' },
            { name: 'Fresa 350.ml', price: 11.90, image: 'imagenes/350ml.png' },
            { name: 'Pera 350.ml', price: 11.90, image: 'imagenes/350.ml.png' },
            { name: 'Fresa 500.ml', price: 15.90, image: 'imagenes/500ml.png' },
            { name: 'Pera 500.ml', price: 15.90, image: 'imagenes/500.ml.png' },
            { name: 'Fresa 750.ml', price: 20.90, image: 'imagenes/750ml.png' },
            { name: 'Pera 750.ml', price: 20.90, image: 'imagenes/750.ml.png' },
            { name: 'Fresa 1.lt', price: 27.90, image: 'imagenes/1lt.png' },
            { name: 'Pera 1.lt', price: 27.90, image: 'imagenes/1lto.png' },
            { name: 'Fresa 1.5 lt', price: 40.90, image: 'imagenes/1,5lt.png' },
            { name: 'Pera 1.5 lt', price: 40.90, image: 'imagenes/1.5lt.png' }
        ],
        snacks: [
            { name: 'Gomitas Surtido', price: 3.00, image: 'imagenes/gomita.png' },
            { name: 'Gomitas Fresa', price: 3.50, image: 'imagenes/gomita1.png' },
            { name: 'Gomitas de Pera y Fresa', price: 4.00, image: 'imagenes/gomita2.png' }
        ],
        postres: [
            { name: 'Mermelada de Fresa de 250g', price: 20.80, image: 'imagenes/mermeladaf.png' },
            { name: 'Mermelada de Fresa de 500g', price: 25.80, image: 'imagenes/mermelada1.png' },
            { name: 'Mermelada de Fresa de 800g', price: 30.80, image: 'imagenes/mermelada2.png' },
            { name: 'Mermelada de Fresa de 1k', price: 32.80, image: 'imagenes/mermelada3.png' },
            { name: 'Mermelada de Pera de 250g', price: 20.80, image: 'imagenes/mermeladap.png' },
            { name: 'Mermelada de Pera de 500g', price: 25.80, image: 'imagenes/mermeladap1.png' },
            { name: 'Mermelada de Pera de 800g', price: 30.80, image: 'imagenes/mermeladap2.png' },
            { name: 'Mermelada de Pera de 1k', price: 32.00, image: 'imagenes/mermeladap3.png' }
        ]
    };

    function displayProducts(category) {
        productsContainer.innerHTML = '';
        const categoryProducts = products[category];

        categoryProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Precio: S/${product.price.toFixed(2)}</p>
                <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Añadir al carrito</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Mostrar productos de la primera categoría por defecto
    displayProducts('bebidas');

    categoriesButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });
});

// Función para añadir productos al carrito
function addToCart(name, price, image) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProduct = cartItems.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cartItems.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
