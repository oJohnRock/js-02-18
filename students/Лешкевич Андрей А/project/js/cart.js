"use strict";
class CCart {
    items = [];
    catalog = [];
    html = {};
    stat = {
        products: 0,
        count: 0,
        grand_total: 0
    };
    constructor(cat, init = []) {
        let tmp = document.getElementById("cartSmall");
        if (null !== tmp) {
            this.html["small"] = new CCartSmallHTML(tmp, this);
        }
        tmp = document.getElementById("cartBig");
        if (null !== tmp) {
            this.html["big"] = new CCartBigHTML(tmp, this);
        }
        this.items = init;
        this.catalog = cat;
        this.statUpdate();
        for (let html of Object.values(this.html)) {
            html.clear();
            html.listFillByItems();
        }
    }
    statUpdate() {
        this.stat = {
            products: 0,
            count: 0,
            grand_total: 0
        };
        for (let item of Object.values(this.items)) {
            this.stat.grand_total += this.catalog.find(obj => { return obj.id === item.id }).price * item.amount;
            this.stat.count += item.amount;
            this.stat.products++;
        }
        for (let html of Object.values(this.html)) {
            html.updateStat();
        }
        return this.stat;
    }

    itemAdd(_id) {
        if (!this.itemInc(_id)) {
            this.items.push({
                "id": _id,
                "amount": 1
            });
            this.statUpdate();
            for (let html of Object.values(this.html)) {
                html.itemAdd(_id);
            }
        }
    }

    itemInc(_id) {
        if (this.items.find(obj => { return obj.id === _id })) {
            this.items.find(obj => { return obj.id === _id }).amount++;
            this.statUpdate();

            for (let html of Object.values(this.html)) {
                html.updateItem(_id);
            }
            return true;
        }
        return false;
    }

    itemDec(_id) {
        let item = this.items.find(obj => { return obj.id === _id });
        if (item) {
            if (1 < item.amount) {
                item.amount--;
                for (let html of Object.values(this.html)) {
                    html.updateItem(_id);
                }
            } else {
                this.items.splice(this.items.findIndex(obj => obj.id === _id), 1)
                for (let html of Object.values(this.html)) {
                    html.itemRemove(_id);
                }
            }
            this.statUpdate();
            return true;
        }
        return false;
    }

    itemRemove(_id) {
        let item = this.items.find(obj => { return obj.id === _id });
        if (item) {
            this.items.splice(this.items.findIndex(obj => obj.id === _id), 1)
            for (let html of Object.values(this.html)) {
                html.itemRemove(_id);
            }
            this.statUpdate();
            return true;
        }
        return false;
    }
    updateItem(_id, _val) {
        _val = parseInt(_val);
        if (0 > _val) {
            _val = 0;
        }
        this.items[_id].amount = _val;

        this.statUpdate();
        for (let html of Object.values(this.html)) {
            html.updateItem(_id);
        }
    }
    clear() {
        this.items = {};
        this.statUpdate();
        for (let html of Object.values(this.html)) {
            html.clear();
        }
    }
}
class CCartSmallHTML {
    html = null;
    cart = {};
    list = null;
    constructor(obj, cart) {
        if (null !== obj) {
            this.html = obj;
            this.cart = cart;
            this.list = this.html.getElementsByClassName("btn-cart__ddc-list")[0];
        } else {
            return null;
        }
    }
    itemGen(_obj) {
        return `<li id="cartSmallItem-${_obj.id}" class="btn-cart__ddc-item">
                        <div class="col"><a href="#"><img src="${_obj.img}" alt=""></a></div>
                        <div class="col">
                            <p>${_obj.name}</p>
                            <p>${startGen(_obj.star)}</p>
                            <div>
                                <p class="price-count">${_obj.amount} <span class="x-txt">x</span> $${float2str(_obj.price)}</p>
                                <p class="sub-total clear-fix"> = $${float2str(_obj.price * _obj.amount)}</p>
                            </div>
                        </div>
                        <div class="col">
                            <a href="cart/itemInc/${_obj.id}" onclick="cart.itemInc(${_obj.id});return false;">
                                <i class="fas fa-plus-circle"></i>
                            </a>
                            <a href="cart/itemRemove/${_obj.id}" onclick="cart.itemRemove(${_obj.id});return false;">
                                <i class="fa fa-times-circle"></i>
                            </a>
                            <a href="cart/itemDec/${_obj.id}" onclick="cart.itemDec(${_obj.id});return false;">
                                <i class="fas fa-minus-circle"></i>
                            </a>
                        </div>
                    </li>`;
    }
    clear() {
        this.list.innerHTML = '';
    }
    updateStat() {
        this.html.getElementsByClassName("btn-cart__count")[0].innerText = this.cart.stat.count;
        this.html.getElementsByClassName("total-grand-summ")[0].innerText = `$${float2str(this.cart.stat.grand_total)}`;
        if (0 < this.cart.stat.count) {
            this.html.getElementsByClassName("btn-cart__count")[0].style.display = "block";
        } else {
            this.html.getElementsByClassName("btn-cart__count")[0].style.display = "none";
        }
    }
    itemAdd(_id) {
        const regex = /(\..+$)/gm;
        let item = this.cart.catalog.find(obj => { return obj.id === _id });
        this.list.insertAdjacentHTML('beforeend', this.itemGen({
            id: _id,
            img: item.img.replace(regex, '_small.png'),
            name: item.name,
            star: 4.5,
            price: item.price,
            amount: this.cart.items.find(obj => { return obj.id === _id }).amount
        }));
    }
    itemRemove(_id) {
        document.getElementById(`cartSmallItem-${_id}`).remove();
    }
    listFillByItems() {
        for (let item of Object.values(this.cart.items)) {
            this.itemAdd(item.id);
        }
    }
    redraw(_obj) {
        this.clear();
        this.listFillByItems();
    }

    updateItem(_id) {
        let item = document.getElementById(`cartSmallItem-${_id}`);
        item.getElementsByClassName("price-count")[0].innerHTML = `${this.cart.items.find(obj => { return obj.id === _id }).amount} <span class="x-txt">x</span> $${float2str(this.cart.catalog.find(obj => { return obj.id === _id }).price)}`;
        item.getElementsByClassName("sub-total")[0].innerText = ` = $${float2str(this.cart.catalog.find(obj => { return obj.id === _id }).price * this.cart.items.find(obj => { return obj.id === _id }).amount)}`;
    }

}
class CCartBigHTML {
    html = null;
    cart = {};
    list = null;
    constructor(obj, cart) {
        if (null !== obj) {
            this.html = obj;
            this.cart = cart;
            this.list = this.html.getElementsByClassName("table-footer")[0];
        } else {
            return null;
        }
    }
    itemGen(_obj) {
        return `      <div id="cartBigItem-${_obj.id}" class="product-item table-line">
                            <div class="table-line__wrap">
                                <div class="table-line-item table-line-item-prod">
                                    <div class="col"><a href="" class="item-img"><img src="${_obj.img}" alt=""></a></div>
                                    <div class="col">
                                        <h3>Mango People T-shirt</h3>
                                        <p><span class="item-title">
                                                Color:</span> ${_obj.color}</p>
                                        <p><span class="item-title">Size:</span> ${_obj.size}</p>
                                    </div>
                                </div>
                                <div class="table-line-item table-line-item-price">$${_obj.price}</div>
                                <div class="table-line-item table-line-item-quant"><input class="item-quant" type="number" value="${_obj.amount}" onchange="cart.updateItem(${_obj.id},this.value);return false;" onblur="cart.updateItem(${_obj.id},this.value);return false;" min="0"></div>
                                <div class="table-line-item table-line-item-ship">FREE</div>
                                <div class="table-line-item table-line-item-subt">$${float2str(_obj.price * _obj.amount)}</div>
                                <div class="table-line-item table-line-item-act"><a href="cart/itemRemove/${_obj.id}" onclick="cart.itemRemove(${_obj.id});return false;"><i class="fa fa-times-circle"></i></a></div>
                            </div>
                        </div>`;
    }
    clear() {
        Array.from(this.html.getElementsByClassName("product-item")).forEach(element => element.remove());
    }
    updateStat() {
        let cart_obj = document.getElementById("form-shipping");
        cart_obj.getElementsByClassName("total-sub")[0].innerText = `$${float2str(this.cart.stat.grand_total)}`;
        cart_obj.getElementsByClassName("total-grand")[0].innerText = `$${float2str(this.cart.stat.grand_total)}`;
    }
    itemAdd(_id) {
        const regex = /(\..+$)/gm;
        let item = this.cart.catalog.find(obj => { return obj.id === _id });
        this.list.insertAdjacentHTML('beforebegin', this.itemGen({
            id: _id,
            img: item.img.replace(regex, '_small.png'),
            name: item.name,
            star: 4.5,
            price: item.price,
            size: item.size,
            color: item.color,
            amount: this.cart.items.find(obj => { return obj.id === _id }).amount
        }));
    }
    itemRemove(_id) {
        document.getElementById(`cartBigItem-${_id}`).remove();
    }
    listFillByItems() {
        for (let item of Object.values(this.cart.items)) {
            this.itemAdd(item.id);
        }
    }
    redraw(_obj) {
        this.clear();
        this.listFillByItems();
    }

    updateItem(_id) {
        let item = document.getElementById(`cartBigItem-${_id}`);
        item.getElementsByClassName("item-quant")[0].value = this.cart.items.find(obj => { return obj.id === _id }).amount;
        item.getElementsByClassName("table-line-item-subt")[0].innerText = `$${float2str(this.cart.catalog.find(obj => { return obj.id === _id }).price * this.cart.items.find(obj => { return obj.id === _id }).amount)}`;
    }

}
