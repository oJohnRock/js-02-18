class GoodsItem {
    constructor (title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `
        <div class="goods-item">
            <h3>
                ${this.title}
            </h3>
            <p>
                ${this.price}
            </p>
        </div>
        `;
    }
}

class GoodsList {
    constructor(){
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250}
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title,good.price);
            listHtml += goodItem.render();
        });

        //Добавим вывод стоимости всех товаров на страницу
        listHtml += `                                                               
            <p>Стоимость всех товаров равна: ${this.calcFullPrice()} рублей.</p>  
        `;
        document.querySelector('.goods-list').innerHTML = listHtml;
    }


    // метод возвращающий стоимость всех товаров
    calcFullPrice() {   
        return this.goods.reduce((acc, curr) => {return acc + curr.price}, 0);
    }
}

class Cart {
    constructor() {
        this.goods = [];
    }
    // Опишем методы корзины:
    renderCart() {  // - метод для отрисовки корзины

    };     

    addItemToCart() { // - метод для добавления элемента в корзину

    };

    removeItemFromCart() { // - метод удаления элемента из корзины

    };

    calcItems() {  // - метод для подсчета количества элементов в корзине и их стоимости 

    };

    clearCart() { // - метод для очистки корзины

    };

    cartToBuy() {  // - метод продолжения покупки

    };

}

class CartItem {
    constructor(title, price, quantity = 1, discount = 0) { // Я бы ввел еще ID элемента, так как названия могут совпадать, в прошлом курсе так и делал.
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
    }

    //  Опишем методы элемента корзины
    changeItemQuantity() { // - Изменение количества данного элемента в корзине

    };

    changeItemChars() {  // - Изменение характеристик элемента (например, размера)

    };

    renderItem() {  // - отрисовка элемента

    };

    calcDiscount() { // - расчет скидки

    };
}


const list = new GoodsList();
list.fetchGoods();
list.render();



