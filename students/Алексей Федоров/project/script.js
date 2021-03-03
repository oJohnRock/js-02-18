'use strict';
 
class GoodsItem {   // товар
    constructor(title, price){
        this.title = title;
        this.price = price;
    }

    render (a) { return `
        <div class="goods-item">
            <h3>${this.title}</h3>
            <p>${this.price}$</p>
            <button class="product-button" type="button" data="${a}">Добавить</button>
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
        let counter = 0;
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render(counter);
            ++counter;
        });
        
        let goodsList=document.querySelector('.goods-list');
        goodsList.innerHTML = listHtml;
        goodsList.addEventListener('click',(event) => {basket.goodsToBasket(event)
        });        
    }

    
    
}

class Basket {  // корзина
    constructor() {
        this.goods = [];
        this.price = 0;
        this.quantity = 0;
        this.open = false;
    }

    countBasketPrice() {   // подсчет стоимости товара в корзине
        const total = {
            price: 0,
            quantity: 0,
        }
        this.goods.forEach(good => {
            total.price += good.price * good.quantity;
            total.quantity += good.quantity;
        });
        this.price = total.price;
        this.quantity = total.quantity;
       //console.log(this);
    }

    buttonClik() {  // клик по кнопке корзина
        if (!this.open) {
            this.open = true;
            this.render();
            document.querySelector('.cart-button-counter').style.display='none';
        } else {
            this.open = false;
            document.querySelector('.basket').innerHTML = ""; 
            document.querySelector('.cart-button-counter').style.display='block';
            this.renderQuantity(); // отрисовка колличества товаров на кнопке
        }
    }

    render() {   // отрисовка корзины
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsBasket(good.title, good.price, good.quantity);
            //goodItem.quantity(good.quantity);
            listHtml += goodItem.render();
        });
        this.countBasketPrice(); 
        document.querySelector('.basket').innerHTML = "";  
        
        listHtml += this.renderTotal(); //добавление в разметку общего количества и стоимости

        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
        
    }
    
    // отрисовка количества товаров и общей стоимости товаров в корзине
    renderTotal() {
        let listHtml;
        if (this.quantity===0){
            listHtml = `
            <div class="basket-item">
                <p> Корзина пуста </p>
            </div>`;
        } else {
            listHtml = `
            <div class="basket-item">
                <p> В корзине ${this.quantity} шт. на сумму ${this.price}$ </p>
            </div>`;
        }
        return listHtml;
    }

    renderQuantity() {           // отрисовка колличества товаров в корзине на кнопке
        document.getElementById('basket_count').innerHTML = this.quantity;
    }

    goodsToBasket(event) {      // добавление товара в корзину
        let count = event.target.getAttribute('data');
        if (count === null) return;
        let productName = list.goods[count].title;
        
        for (let goods of this.goods){
            if (goods.title === productName) {  // если добавленный товар есть в корзине
                ++goods.quantity;               // увеличиваем кол-во штук в корзине
                                
                this.setOfProcessingBasket();
                
                return;
            } 
        }

        this.goods.push(list.goods[count]);
        this.goods[this.goods.length-1].quantity = 1;
        
        this.setOfProcessingBasket();
    }
    
    setOfProcessingBasket() {  // набор функций для обработки корзины
        this.countBasketPrice(); // обсчет стоимости и количества товаров в корзине
        if (!this.open) this.renderQuantity();  // отрисовка количества товаров на кнопке
        if (this.open) { 
            this.render();  // отрисовка наполнения корзины
            this.renderTotal(); // отрисовка количества товаров
        }
    }

    goodsRemoveBasket(num){      // удалить товар из корзины
         
    }

}

class GoodsBasket extends GoodsItem {   // товар для корзины
   constructor(title,price,quantity){
        super(title,price);
        this.quantity = quantity;
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
//basket.goodsToBasket(1);
//basket.goodsToBasket(2);
//basket.goodsToBasket(3);
//basket.countBasketPrice()
//basket.render();