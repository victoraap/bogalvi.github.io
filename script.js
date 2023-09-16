// Función para abrir el modal de inicio de sesión
document.getElementById('loginBtn').addEventListener('click', function () {
    document.getElementById('loginModal').classList.remove('hidden');
});

// Función para cerrar el modal de inicio de sesión
document.getElementById('loginModal').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});

// Función para abrir el modal de registro
document.getElementById('registerBtn').addEventListener('click', function () {
    document.getElementById('registerModal').classList.remove('hidden');
});

// Función para cerrar el modal de registro
document.getElementById('registerModal').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    const cart = document.getElementById('cart');
    const cartTotal = document.getElementById('cartTotal');

    const li = document.createElement('li');
    li.textContent = `${productName} - $${productPrice}`;
    cart.appendChild(li);

    // Actualizar el total del carrito
    const currentTotal = parseFloat(cartTotal.textContent.replace('$', ''));
    const newTotal = currentTotal + parseFloat(productPrice);
    cartTotal.textContent = `$${newTotal.toFixed(2)}`;
}

// Ejemplo de uso de addToCart:
document.querySelector('.grid').addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const productName = e.target.parentElement.querySelector('h2').textContent;
        const productPrice = e.target.parentElement.querySelector('p').textContent.replace('$', '');
        addToCart(productName, productPrice);
    }
});

// Función para procesar el pago
document.getElementById('checkoutBtn').addEventListener('click', function () {
    const cartTotal = document.getElementById('cartTotal').textContent;
    alert(`¡Gracias por tu compra! Total: ${cartTotal}`);
});
