'use strict';

/*const goods = [
  { title: 'Mango People T-shirt', price: 200 },
  { title: 'Mango People T-shirt', price: 150 },
  { title: 'Mango People T-shirt', price: 150 },
];

  
const renderGoodsItem = (title, price) => {
    return `
        <div class='goods-item'>
            <h3 class='product-title'>${title}</h3>
            <p class='product-price'>${price} $</p>
            <button class="by-btn">В корзину</button>
        </div>`;
  };
  
  const renderGoodsList = (list) => {  
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend', list.map(item => renderGoodsItem(item.title, item.price)).join(''));

};
  
  renderGoodsList(goods);*/

//отрисовываем список товаров в HTML через класс
 // класса GoodsItem и запрашивать его разметку
  class GoodsItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
        <div class='goods-item'>
            <h3 class='product-title'>${this.item.title}</h3> 
            <p class='product-price'>${this.item.price} $</p>
            <button class="by-btn">В корзину</button>
        </div>
        `;
    }
}

 // Метод вывод списка товаров. Для каждого элемента массива goods будем создавать экземпляр   
class GoodsList {
    constructor(goodsArray) {
        this.goods = goodsArray;
    }

    fetchData() {
        this.goods = [
          { title: 'Mango People T-shirt', price: 200 },
          { title: 'Mango People T-shirt', price: 150 },
          { title: 'Mango People T-shirt', price: 150 },
        ];
    }

    render() {
        const goodsString = this.goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsString.join('');
    }
}

//создаем класс корзины Basket 
class Basket {
  constructor () {
    this.goods = [];
}
    //метод добавления товара в корзину
  addBasketItem(basketItem) {
      this.goods.push(basketItem);
   
  }
  deleteItem () {
    //метод удаление из корзины товар 
  }

  fetchData() {
     // метод запроса данных с сервера
        
    }
  
    render() {
      //отрисовываем корзину через let в listHtml
      let listHtml = '';
     
  
    }
    //Метод для вывода итоговой суммы всех товаров в корзине
    totalBasketPrice() {
      let totalPrice = document.getElementById('goods-list__total_price'); 
      let sum = 0;
      this.goods.forEach (goods => { 
          sum += goods.price
      });
      totalPrice.innerText = `Итого  ${sum} $`;
}




const list = new GoodsList(this.goods);
list.fetchData();
list.render();
list.totalCartPrice();