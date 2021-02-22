const goods = [{
		title: 'Монитор',
		price: 50000
	},
	{
		title: 'Клавиатура',
		price: 1500
	},
	{
		title: 'Мышь',
		price: 700
	},
	{
		title: 'Ноутбук',
		price: 35000,
		picture: `img/notebook.jpg`
	},
];

const getGoodsLayout = (title, price, picture = `img/NOFOTO.jpg`) => `
		<div class="item">
		<img src="${picture}" alt="${title}">
            <h2>${title}</h2>
            <p>${price}</p>
        </div>
    `;

const renderGoods = (list) => {
	const goodsString = list.map(element => //запятая выводилась т.к. метод map создает новый массив,а элементы массива разделены запятой по умолчанию
		getGoodsLayout(element.title, element.price, element.picture)).join("");
	document.querySelector('.goods').innerHTML = goodsString;
}

renderGoods(goods);