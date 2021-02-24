const goods = [
  { id: 1, title: "Монитор", price: 50000, imageList: [] },
  { id: 2, title: "Клавиатура", price: 1500, imageList: [] },
  { id: 3, title: "Мышь", price: 700, imageList: [] },
  { id: 4, title: "Ноутбук", price: 35000, imageList: [] },
];

const getMainProductImage = (goodImages) => {
  const imageName = goodImages.length > 0 ? goodImages[0] : "default.png";
  return imageName;
};

const createProductListHtmlElement = (good) =>
  `<div class="showcase__product">
    <img src="assets/img/${getMainProductImage(good.imageList)}">
    <h2>${good.title}</h2>
    <p>${good.price}</p>
    <button id="addToCart">В корзину</button>
  </div>`;

const renderGoods = (list) => {
  const htmlCode = list
    .map((good) => createProductListHtmlElement(good))
    .join("");

  const showcase = document.getElementById("showCase");
  showcase.innerHTML = htmlCode;
};

const createModalCartHtmlElement = () => {};

const renderModalCartHtmlElement = () => {
  const showcase = document.getElementById("showCase");
  const modalCartElement = createModalCartHtmlElement();
  showcase.insertAdjacentHTML("beforeend", modalCartElement);
};

const render = () => {
  renderGoods(goods);
  renderModalCartHtmlElement();
};

render();
