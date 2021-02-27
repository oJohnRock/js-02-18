const goods = [
    { title: 'Монитор', price: 50000 },
    { title: 'Клавиатура', price: 1500 },
    { title: 'Мышь', price: 700 },
    { title: 'Ноутбук', price: 35000 },
];

const getGoodsLayout = (title = goods.title, price = goods.price) =>
    `
        <div class="item">
            <h2>${title}</h2>
            <p>${price}</p>
        </div>
    `;
// Здесь убрала return, так как по стандарту, если функция только возрващает значение, то можно его опустить. 
// Как и скобки. не совсем разобралась зачем использовать фиксированые значения и видит ли конкретно мои значения функция, как тут, так и ниже.

const renderGoods = (list = goods) => {
    document.querySelector('.goods').innerHTML = list.map(element => getGoodsLayout(element.title, element.price)).join('');

}
// Запятые пояивлялись, как следствие приведения массива к строке. Возвращались элементы массива, разделённые запятыми.
//  Для этого воспользовалась методом join(), так как он объединяет все элементы массива (или массивоподобного объекта) в строку.

renderGoods(goods);
