const goods = [
    { title: 'Монитор', price: 50000 },
    { title: 'Клавиатура', price: 1500 },
    { title: 'Мышь', price: 700 },
    { title: 'Ноутбук', price: 35000 },
];

const getGoodsLayout = (title = "didn't set", price = 0) => {
    return `
        <div class="item">
            <h2>${title}</h2>
            <p>${price}</p>
        </div>
    `;
}

const renderGoods = (list) => {
    //Transforme reduce:
    //const goodsString = list.map(element => getGoodsLayout(element.title, element.price)).reduce((acc, str) => acc + str);

    //Transform join
    const goodsString = list.map(element => getGoodsLayout(element.title, element.price)).join('');
    document.querySelector('.goods').innerHTML = goodsString;
}
renderGoods(goods);