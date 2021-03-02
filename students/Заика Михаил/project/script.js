class GoodsItem {
    constructor(title, price){
        this.title = title;
        this.price = price;
    }

    render (a) { return `
        <div class="item">
            <h2>${this.title}</h2>
            <p>${this.price}</p>
            <button class="product-button" type="button" data="${a}">Добавить</button>
        </div>`;
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods()  {
        this.goods = [
            { title: 'Монитор', price: 50000 },
            { title: 'Клавиатура', price: 1500 },
            { title: 'Мышь', price: 700 },
            { title: 'Ноутбук', price: 35000 },

        ];
    }

    render() {
        let listHtml = '';
        let counter = 0;
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render(counter);
            counter++;
        });
        
        let goodsList=document.querySelector('.goods');
        goodsList.innerHTML = listHtml;
        goodsList.addEventListener('click',(event) => {basket.goodsToBasket(event)
        });
    }
}


class Basket {
    constructor() {
        this.goods = [];
        this.price = 0;
        this.quantity = 0;
        this.open = false;

        const button = document.getElementsByClassName('card-button')[0];
        button.addEventListener('click', () => {
            this.buttonClik();
        });
    }

    countBasketPrice() {
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
    }

    buttonClik() {
        if (!this.open) {
            this.open = true;
            this.render();
            document.querySelector('.cart-button-counter').style.display='none';
        } else {
            this.open = false;
            document.querySelector('.basket').innerHTML = ""; 
            document.querySelector('.cart-button-counter').style.display='block';
            this.renderQuantity();
        }
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsBasket(good.title, good.price, good.quantity);
            listHtml += goodItem.render();
        });
        this.countBasketPrice(); 
        document.querySelector('.basket').innerHTML = "";  
        
        listHtml += this.renderTotal();

        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
    }
    
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
                <p> В корзине ${this.quantity} шт. на сумму ${this.price} </p>
            </div>`;
        }
        return listHtml;
    }

    renderQuantity() {
        const button = document.getElementsByClassName('card-button')[0];
        if (this.quantity)
            button.innerHTML = `Корзина (${this.quantity})`;
        else
            button.innerHTML = `Корзина`;
    }

    goodsToBasket(event) {
        let count = event.target.getAttribute('data');
        if (count === null) return;
        let productName = list.goods[count].title;
        
        for (let goods of this.goods){
            if (goods.title === productName) {
                // если добавленный товар есть в корзине, увеличиваем кол-во штук в корзине
                goods.quantity++;
                this.setOfProcessingBasket();
                return;
            } 
        }

        this.goods.push(list.goods[count]);
        this.goods[this.goods.length-1].quantity = 1;
        
        this.setOfProcessingBasket();
    }
    
    setOfProcessingBasket() {
        this.countBasketPrice();
        if (!this.open) this.renderQuantity();
        if (this.open) { 
            this.render();
            this.renderTotal();
        }
    }

    goodsRemoveBasket(num) {

    }
}


class GoodsBasket extends GoodsItem {
   constructor(title, price, quantity) {
        super(title, price);
        this.quantity = quantity;
    }

    render() { return `
        <div class="basket-item">
            <p style="width: 250px;"><b>${this.title}</b></p>
            <p style="width: 100px;">${this.price}</p>
            <p style="width: 50px;">${this.quantity}</p>
            <button class="button-remove" type="button"><p>x</p></button>
        </div>`;
    }
}


const list = new GoodsList();
list.fetchGoods();
list.render();

const basket = new Basket();
