'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
  
const renderGoodsItem = (title, price) => `
    <div class="goods-item">
        <h3>${title}</h3>
        <p>${price}$</p>
        <button class="product-button" type="button">Добавить</button>
    </div>`;
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    
    document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
    
    console.log(document.querySelector('.wrap_header'));
  
}
  
renderGoodsList();

//<div class="cart-button-counter"><p>0</p></div>