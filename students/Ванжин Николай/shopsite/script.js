const goods = [{
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/image_placeholder_1657.png'
	},
	{
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/image_placeholder_1877.png'
	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/rectangle_5_copy_3_1209.png'
	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/image_placeholder_1937.png'

	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/rectangle_5_copy_1272.png'

	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/image_placeholder_1997.png'

	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/rectangle_5_copy_1256.png'

	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/image_placeholder_2057.png'

	}, {
		title: 'Mango People T-shirt',
		price: 52.00,
		pictureLink: 'img/image_placeholder_2087.png'

	},

];
const getGoodsLayout = (title, price, pictureLink) => `
	<li class="featured-items-list">
	<div aria-label="Mango People T-shirt" class="featured-items-img">
	   <img src="${pictureLink}" alt="${title}">
		<div class="featured-items-hidden">
			<button class="featured-items-btn radius">
				<img src="img/forma_1_copy_1287.png" alt="add-cart">
				<span>Add to Cart</span>
			</button>
			<div class="featured-items-hidden-link">
				<a class="radius" href="#"><img src="img/forma_1_1895.png" alt="refresh"></a>
				<a class="radius" href="#"><img src="img/forma_1_1899.png" alt="like"></a>
			</div>
		</div>
	</div>
	<a href="#" class="featured-items-link">
		<p class="featured-items__item-name">${title}</p>
		<p class="featured-items__price">&#36;${price}</p>
	</a>
</li>
    `;

const renderGoods = (list) => {
	const goodsString = list.map(element =>
		getGoodsLayout(element.title, element.price, element.pictureLink)).join("");
	document.querySelector('.featured-items-ul').innerHTML = goodsString;
}

renderGoods(goods);