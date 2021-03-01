'use strict';

const goods = [
    { title: 'Mango People T-shirt', price: 42, image: 'image/catalog/product9.jpg' },
    { title: 'Yellow People T-shirt', price: 32, image: 'image/catalog/product8.jpg' },
    { title: 'Green People T-shirt', price: 22, image: 'image/catalog/product7.jpg' },
    { title: 'Blue People T-shirt', price: 152, image: 'image/catalog/product6.jpg' },
    { title: 'White People T-shirt', price: 62, image: 'image/catalog/product13.jpg' },
    { title: 'Brown People T-shirt', price: 42, image: 'image/catalog/product14.jpg' },
    { title: 'Orange People T-shirt', price: 72, image: 'image/catalog/product3.jpg' },
    { title: 'red People T-shirt', price: 12, image: 'image/catalog/product12.jpg' },
    { title: 'Pink People T-shirt', price: 52, image: 'image/catalog/product1.jpg' },
];
  
const renderGoodsItem = (title, price, image) => `
    <div class="block__item">
        <div class="block__img">
            <img src="${image}" alt="${title}">
            <div class="block__item-hover">
                <a href="#">
                    <i class="block__cart-icon"></i>
                    <span>Add to Cart</span>
                </a>
            </div>
        </div>
        <a href="#">
            <h4 class="block__title">${title}</h4>
        </a>
        <p class="block__prise">$${price}</p>
    </div>    
`;
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image));
    
    document.querySelector('.product__block').innerHTML = goodsList.join(' ');
}
  
renderGoodsList();