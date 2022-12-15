import { addToCart } from './js/cart';
import { createItemUi } from './js/item';
import { removeloader, showLoader } from './js/loader';
import * as bootstrap from 'bootstrap'
import './style.scss';

/* loader */
showLoader();

export let items = [];
export const itemRows = document.querySelector('.items-row');
export const cartBtn = document.querySelector('.cart-btn');
export const cartCounter = document.querySelectorAll('.cart-counter');
export const cartBox = document.querySelector('#cartBox');
export const total = document.querySelector('#total');

fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                items = json;
                // console.log(json)
                items.forEach(item => {
                    // console.log(item)
                    
                    itemRows.append(createItemUi(item))
                })
                removeloader()
            });



/** event deligation */            
itemRows.addEventListener('click',function(e){
    if(e.target.classList.contains('add-cart')){
        addToCart(e);
    }
})