const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const request = (path = '', method = 'GET', body) => {

    // return new Promise;
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log({ response: xhr.responseText });
                callback(JSON.parse(xhr.responseText));
            } else {
                console.error(xhr.responseText);
            }
        }
    }

    xhr.open(method, `${API_ROOT}/${path}`);

    xhr.send(body);
}

class GoodsItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <div class="item">
                <h2>${this.item.product_name}</h2>
                <p>${this.item.price}</p>
            </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchData(callback) {
        request('catalogData.json', (goods) => {
            this.goods = goods;
            callback();
        });
    }

    // fetchData() {
    //     return new Promise((resolve, reject) => {
    //         if (code === 200) {
    //             request('catalogData.json', (goods) => {
    //                 this.goods = goods;
    //                 resolve(data);
    //             });
    //         }
    //         else {
    //             reject('Error');
    //         }
    //     })
    // }

    render() {
        const goodsString = this.goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods').innerHTML = goodsString.join('');
    }
}


class Cart {
    items = []

    constructor(items = []) {
        this.items = items
    }
    findItem(main) {
        return this.items.filter(item => item.name === main.name)[0]
    }
    addItem() {
        const exists = this.findItem(item)
        if (exists) {
            exists.inc()
        } else {
            this.items.push(item)
        }
        this.render()

    }
    removeItem() {
        const exists = this.findItem(item)
        if (!exists) {
            return
        }

        if (exists.count > 1) {
            exists.dec()
        } else {
            this.items = this.items.filter(main => item.name !== main.name)
        }
        this.render()
    }
    BasketTemplate() {
        const RenderSpace = document.querySelector('.basket')
        if (!RenderSpace) {
            return
        }
        RenderSpace.innerHTML = ''
        this.items.forEach(item => {
            const template = item.Brender()
            RenderSpace.appendChild(template)
        })
    }
    fetchData() {
        // запрос данных с сервера
    }

    render() {

    }
    calcTotalPrice() {
        const how = this.items.reduce((result, cur) => {
            return result + cur.price * cur.count
        }, 0)
        const totalPrice = document.createElement('div')
        totalPrice.innerHTML = `<p> Итоговая цена: ${how} р.</p>`
        totalPrice.classList.add('totalPrice')
        return totalPrice
    }
    // показалось логичным добавить метод, определяющий суммарную стоимость всех товаров
    // не для GoodList, а для корзины (Cart)
}


class CartItem {
    name = ''
    price = 0
    count = 1

    constructor(name, price) {
        this.name = name
        this.price = price
    }
    inc() {
        this.count++
    }

    dec() {
        this.count--
    }
    Brender() {
        const { name, price, count } = this
        const product = document.createElement('div')
        product.innerHTML = `<h1>${name}</h1><p>${price} x ${count} = ${price * count}</p>`
        product.classList.add('basket_product')

        return product
    }
    inCartButton() {
        // кнопка добавления в корзину
    }
    minusButton() {
        // кнопка удаления итема из корзины
    }
}


const list = new GoodsList();
list.fetchData(() => {
    list.render();
});
