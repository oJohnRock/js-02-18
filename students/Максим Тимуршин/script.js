'use strict';

const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const request = (path = '', method = 'GET', body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log({ response: xhr.responseText });
          resolve( JSON.parse(xhr.responseText) );
        } else {
          console.error(xhr.responseText);
          reject(xhr.responseText);
        }
      }
    };

    xhr.open(method, `${API_ROOT}/${path}`);

    xhr.send(body);
  });
}

class GoodsItem {
  constructor(item) {
    this.item = item;
  }

  render() {
    return `
      <div class="item" data-id="${this.item.id_product}">
          <h2>${this.item.title}</h2>
          <p>${this.item.price}</p>
          <button class="item-btn">Добавить в корзину</button>
      </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      request('catalogData.json')
        .then((goods) => {
          this.goods = goods;
          resolve();
        });
    });
  }

  getTotalPrice() {
    const totalPrice = this.goods.reduce((sum, item) => sum + item.price, 0);

    document.querySelector('.total-price').innerHTML = `Сумма корзины: ${totalPrice}`;
  }

  render() {
    const goodsString = this.goods.map(element => {
      const item = new GoodsItem(element);
      return item.render();
    });
    document.querySelector('.goods').innerHTML = goodsString.join('');
  }
}

class Basket {
  constructor() {
    this.goods = [];
  }

  fetchData() {
    request('getBasket.json')
      .then((goods) => {
        this.goods = goods;
        resolve();
      })
      .catch((error) => {
        console.log(`Basket data error`, error);
      });
  }

  addItem(item) {
    this.goods.push(item);
    console.log(this.goods);
  } 
}

const list = new GoodsList();

list.fetchData();
list.render();
list.getTotalPrice();

