const cart = [];
const menuCards = document.querySelectorAll('.menu-card');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const modal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const modalItemName = document.getElementById('modal-item-name');
const modalQuantity = document.getElementById('modal-quantity');
const modalNotes = document.getElementById('modal-notes');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const modalTotalPrice = document.getElementById('modal-total-price');
const decreaseQuantity = document.getElementById('decrease-quantity');
const increaseQuantity = document.getElementById('increase-quantity');

let currentItem = null;

function updateModalPrice(){
    quantity = parseInt(modalQuantity.value) || 1;
    modalTotalPrice.innerText = (currentItem.price * quantity).toFixed(2);
}

function updateCart(){
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            ${item.notes ? `<br><small>Notes: ${item.notes}</small>` : ''}
            <button data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    removeButtons = cartItems.querySelectorAll('button');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

menuCards.forEach(card => {
    card.addEventListener('click', () => {
        currentItem = {
            name: card.querySelector('h3').innerText,
            price: parseFloat(card.querySelector('p').innerText.replace('$',''))
        };
        modalItemName.innerText = currentItem.name;
        modalQuantity.value = 1;
        modalNotes.value = '';
        modalTotalPrice.innerText = currentItem.price.toFixed(2);
        modal.style.display = 'block';
    });
});

window.addEventListener('click', (e) => {
    if(e.target === document.getElementById('cart-modal')) modal.style.display = 'none';
});

increaseQuantity.addEventListener('click', () => {
    modalQuantity.value = parseInt(modalQuantity.value) + 1;
    updateModalPrice();
});
decreaseQuantity.addEventListener('click', () => {
    if(modalQuantity.value > 1){
        modalQuantity.value = parseInt(modalQuantity.value) - 1;
        updateModalPrice();
    }
});

modalQuantity.addEventListener('input', updateModalPrice);

addToCartBtn.addEventListener('click', () => {
    quantity = parseInt(modalQuantity.value);
    notes = modalNotes.value;

    if(quantity <= 0) return;

    existingItem = cart.find(item => item.name === currentItem.name && item.notes === notes);
    if(existingItem){
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: currentItem.name, price: currentItem.price, quantity, notes });
    }

    updateCart();
    modal.style.display = 'none';
});

clearCartBtn.addEventListener('click', () => {
    cart.length = 0;
    updateCart();
});