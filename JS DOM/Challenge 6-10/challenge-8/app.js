/**
 * Write your challenge solution here
 */
document.addEventListener('DOMContentLoaded', addToCart)

const cartSection = document.getElementById('cart-items')
const cartTotal = document.querySelector('#cart-total')
const emptyCart = document.querySelector('.empty-cart')
const cartItems = [
        
]
function addToCart(name, price){
    const cart_item = {
        name: name,
        price: price,
        quantity: 1,
    }
    if(emptyCart && cartItems){
        emptyCart.style.display = "none";
    }else{
        emptyCart.style.display = "block";
    }
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item'

    const itemSpan =  document.createElement('span')
    itemSpan.textContent = cart_item.name

    const quantitySection = document.createElement('div')
    quantitySection.className = 'quantity-controls'
    const minusButton = document.createElement('button')
    minusButton.textContent = "-"
    minusButton.addEventListener('click', ()=>
        cart_item.quantity--
    )
    const quantitySpan = document.createElement('span')
    quantitySpan.textContent = `${cart_item.quantity}`
    const plusButton = document.createElement('button')
    plusButton.addEventListener('click', ()=>
        cart_item.quantity++
    )
    plusButton.textContent ="+"
    const priceSpan = document.createElement('span')
    priceSpan.textContent = `${cart_item.price * cart_item.quantity}`
    const removeButton = document.createElement('button')
    removeButton.classList.add("removeButton")
    removeButton.textContent = "Remove"
    
    

    quantitySection.appendChild(minusButton)
    quantitySection.appendChild(quantitySpan)
    quantitySection.appendChild(plusButton)
    quantitySection.appendChild(priceSpan)
    quantitySection.appendChild(removeButton)
    
    cartItem.appendChild(itemSpan)
    cartItem.appendChild(quantitySection)

    cartSection.appendChild(cartItem)
}