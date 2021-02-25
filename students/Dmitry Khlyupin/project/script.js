const goods = [
    { title: 'Монитор', price: 50000 },
    { title: 'Клавиатура', price: 1500 },
    { title: 'Мышь', price: 700 },
    { title: 'Ноутбук', price: 35000 },
];

const getGoodsLayout = (title="GoodTitle", price="GoodPrice") =>  //упрощаем функцию, убирая return и скобки
     `
        <div class="item">
            <h2>${title}</h2>
            <p>${price}</p>
        </div>
    `;


const renderGoods = list => {  // одна переменная, можно без скобок
    const goodsString = list.map(element => getGoodsLayout(element.title, element.price)).join('');// убираем разделитель
    document.querySelector('.goods').innerHTML = goodsString;
}

renderGoods(goods);
