'use strict';
 
class GoodsItem {   // товар
    constructor(title, price){
        this.title = title;
        this.price = price;
    }

    render () { return `
        <div class="goods-item">
            <h3>${this.title}</h3>
            <p>${this.price}$</p>
            <button class="product-button" type="button">Добавить</button>
        </div>`;
    }

}

class GoodsList {   // список товаров
    constructor() {
        this.goods = [];
    }

    fetchGoods()  {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {  // отрисовка списка товаров
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
                
        document.querySelector('.goods-list').innerHTML = listHtml;
                
    }
    
}

class Basket {  // корзина
    constructor() {
        this.goods = [];
        this.price = 0;
        this.quantity = 0;
    }

    countBasketPrice() {   // подсчет стоимости товара в корзине
        const total = {
            price: 0,
            quantity: 0,
        }
        this.goods.forEach(good => {
            total.price += good.price;
            total.quantity += good.quantity;
        });
        this.price = total.price;
        this.quantity = total.quantity;
        console.log(this);
    }

    render() {   // отрисовка корзины
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsBasket(good.title, good.price);
            goodItem.quantity(good.quantity);
            listHtml += goodItem.render();
        });
        this.countBasketPrice()       
        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
        document.getElementById('basket_count').innerHTML = this.quantity;
    }

    goodsToBasket(num) {     // добавление товара в корзину
        this.goods.push(list.goods[num]);
        this.goods[this.goods.length-1].quantity = 1;
        console.log(this);
    }

    goodsRemoveBasket(num){      // удалить товар из корзины
         
    }

}

class GoodsBasket extends GoodsItem {   // товар для корзины
   
    quantity(qw){
        this.quantity = qw;
    }

    render() { return `
        <div class="basket-item">
            <h3>${this.title}</h3>
            <p>${this.price}$</p>
            <p>${this.quantity}</p>
            <button class="basket-button" type="button"><p>x</p></button>
        </div>`;
    }

}

const list = new GoodsList();
list.fetchGoods();
list.render();

const basket = new Basket();
basket.goodsToBasket(1);
basket.goodsToBasket(2);
basket.goodsToBasket(3);
basket.countBasketPrice()
basket.render();

  



//<div class="cart-button-counter"><p>0</p></div>