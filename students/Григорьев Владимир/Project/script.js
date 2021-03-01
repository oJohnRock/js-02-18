const goods = [
    { title: 'Bf109', price: 150, pict:'src="img/1s.jpg"' },
    { title: 'P-40', price: 250, pict:'src="img/2s.jpg"' },
    { title: 'Tornado', price: 300, pict:'src="img/3s.jpg"' },
    { title: 'Hawk T1', price: 200, pict:'src="img/4s.jpg"' },
  ];

  const renderGoodsItem = (title, price, pict) => {
    return `
     <div class="goods_item">
    <h3>Модель ${title}</h3>
     <p>Цена: ${price} руб.</p>
     <img ${pict}>
     <button class="buy_btn">Купить</button>
     </div>
     `;
  };
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.pict));
    document.querySelector('.goods__list').innerHTML = goodsList.join('');
  }
  
  renderGoodsList(goods);