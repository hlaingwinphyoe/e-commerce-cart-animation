import { cartBox, cartBtn, cartCounter, items, total } from "../main";

export const cartCounterUpdate = function(){
    let count = parseInt(cartCounter[0].innerText);
    cartCounter.forEach(current => current.innerText = count+1)
}

export const createItemInCart = function({id,title,image,price}){
    const div = document.createElement('div')
    div.classList.add('item-in-cart')
    div.innerHTML = `
                    <div class="p-3 border-0 border-top border-2 border-success rounded mb-3 shadow">
                        <div class="mb-2">
                            <img src="${image}" class="cart-item-img" alt="">
                        </div>
                        <p>${title}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="col-4">
                                <p class="mb-0">$ <span class="cart-cost">${price}</span></p>
                            </div>
                            <div class="col-6">
                                <div class="cart-item-quantity input-group input-group-sm">
                                    <button class="btn btn-success" onclick="dec(event,${price})">
                                        <i class="bi bi-dash pe-none"></i>
                                    </button>
                                    <input type="number" class="form-control text-end cart-quantity" value="1" min="1" />
                                    <button class="btn btn-success" onclick="inc(event,${price})">
                                        <i class="bi bi-plus pe-none"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    `;

    cartBox.append(div)

}

export const costTotal = function(){
    total.innerHTML = [...document.querySelectorAll('.cart-cost')].reduce((pv,cv) => pv+parseFloat(cv.innerHTML),0).toFixed(2)
}

/** increment */
window.inc = function(e,price){
    // console.log(e.target)
    let currentCart = e.target.closest('.item-in-cart');
    let cartQuantity = currentCart.querySelector('.cart-quantity')
    let cartCost = currentCart.querySelector('.cart-cost')
    cartQuantity.valueAsNumber +=1;

    cartCost.innerText = cartQuantity.valueAsNumber * price;
    costTotal()
}


export const addToCart = function(e){
    let currentItemCard = e.target.closest('.item-card');
    let itemId = currentItemCard.getAttribute('item-id');
    let itemDetail = items.find(item => item.id === parseInt(itemId));
        let currentImg = currentItemCard.querySelector('.item-img')
        
        let newImg = new Image();
        newImg.src = currentImg.src;
        
        newImg.style.position = "fixed";
        newImg.style.height = 100+"px";
        newImg.style.zIndex = 2000;
        newImg.style.transition = 0.6+"s";
        newImg.style.top = currentImg.getBoundingClientRect().top +"px";
        newImg.style.left = currentImg.getBoundingClientRect().left+"px";

        document.body.append(newImg)

        setTimeout(_=>{
            newImg.style.transform = 'rotate(360deg)';
            newImg.style.top = (cartBtn.getBoundingClientRect().top+10)+"px";
            newImg.style.left = (cartBtn.getBoundingClientRect().left+30)+"px";
            newImg.style.height = 0+"px";

        },10)

        setTimeout(_=>{
            cartBtn.classList.add('animate__tada');
            cartCounterUpdate();
            newImg.remove();
            createItemInCart(itemDetail);
            costTotal()
        },500)

        cartBtn.addEventListener('animationend',function(){
            cartBtn.classList.remove('animate__tada');
            
        })
        
}
