"use strict";
var prodCatalog = [
    {
        id: 1,
        img: "img/catalog_item_01.png",
        name: "Mango People T-shirt #1",
        price: 52.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 2,
        img: "img/catalog_item_02.png",
        name: "Mango People T-shirt #2",
        price: 32.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 3,
        img: "img/catalog_item_03.png",
        name: "Mango People T-shirt #3",
        price: 42.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 4,
        img: "img/catalog_item_04.png",
        name: "Mango People T-shirt #4",
        price: 62.34,
        color: "red",
        size: "XLL"
    },
    {
        id: 5,
        img: "img/catalog_item_05.png",
        name: "Mango People T-shirt #5",
        price: 54.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 6,
        img: "img/catalog_item_06.png",
        name: "Mango People T-shirt #6",
        price: 53.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 7,
        img: "img/catalog_item_07.png",
        name: "Mango People T-shirt #7",
        price: 58.60,
        color: "red",
        size: "XLL"
    },
    {
        id: 8,
        img: "img/catalog_item_08.png",
        name: "Mango People T-shirt #8",
        price: 50.00,
        color: "red",
        size: "XLL"
    },

    {
        id: 9,
        img: "img/catalog_item_09.png",
        name: "Mango People T-shirt #9",
        price: 52.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 10,
        img: "img/catalog_item_10.png",
        name: "Mango People T-shirt #10",
        price: 32.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 11,
        img: "img/catalog_item_11.png",
        name: "Mango People T-shirt #11",
        price: 42.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 12,
        img: "img/catalog_item_12.png",
        name: "Mango People T-shirt #12",
        price: 62.34,
        color: "red",
        size: "XLL"
    },
    {
        id: 13,
        img: "img/catalog_item_13.png",
        name: "Mango People T-shirt #13",
        price: 54.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 14,
        img: "img/catalog_item_14.png",
        name: "Mango People T-shirt #14",
        price: 53.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 15,
        img: "img/catalog_item_15.png",
        name: "Mango People T-shirt #15",
        price: 150,
        color: "red",
        size: "XLL"
    },
    {
        id: 16,
        img: "img/catalog_item_16.png",
        name: "Mango People T-shirt #16",
        price: 120.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 17,
        img: "img/catalog_item_17.png",
        name: "Mango People T-shirt #17",
        price: 149.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 18,
        img: "img/catalog_item_18.png",
        name: "Mango People T-shirt #18",
        price: 32.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 19,
        img: "img/catalog_item_19.png",
        name: "Mango People T-shirt #19",
        price: 42.00,
        color: "red",
        size: "XLL"
    },
    {
        id: 20,
        img: "img/catalog_item_20.png",
        name: "Mango People T-shirt #20",
        price: 62.34,
        color: "red",
        size: "XLL"
    },
    {
        id: 21,
        img: "img/catalog_item_21.png",
        name: "Mango People T-shirt #21",
        price: 54.00,
        color: "red",
        size: "XLL"
    }

];
class CPoductCatalogHTML {
    html = null;
    items = [];
    catalog = [];
    constructor(obj, cat, init = []) {
        if (null !== obj) {
            this.html = obj;
            this.catalog = cat;
            this.items = init;
            this.clear();
            this.listFillByItems();
        } else {
            return null;
        }
    }
    clear() {
        this.html.innerHTML = '';
    }
    listFillByItems() {
        this.html.innerHTML = this.items.map(item => this.itemGen(this.catalog.find(obj => { return obj.id === item }))).join('');
    }

    itemGen(_obj) {
        return `<li id="catalogItem-${_obj.id}" class="products-grid_item">
                        <div class="top-block">
                            <div class="visible"><img src="${_obj.img}" alt=""></div>
                            <div class="hovered">
                                <div class="btn-sqr_adcw"><a href="cart/itemAdd/${_obj.id}" onclick="cart.itemAdd(${_obj.id});return false;" class="btn-sqr_adcw__link clear-fix">
                                        <div class="btn-sqr_adcw__wrap"><img src="img/cart_white.png" alt="" class="btn-sqr_adcw__icon"><span class="btn-sqr_adcw__text">Add to Cart</span></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="products-grid_link">
                            <h3>${_obj.name}</h3>
                            <p>$${float2str(_obj.price)}</p>
                        </a>
                    </li>`;
    }
}
