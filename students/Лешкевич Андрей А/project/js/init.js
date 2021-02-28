"use strict";

function pageInit() {
    cart = new CCart(prodCatalog, cart2Render);
    if ('undefined' !== typeof prodCatalog2Render) {
        catalog = new CPoductCatalogHTML(document.getElementById("catalog"), prodCatalog, prodCatalog2Render);
    }
    let tmp = document.getElementById("slider");
    if (null !== tmp) {
        slider = new CSliderHTML(tmp, ["https://picsum.photos/1920/1080?random=1", "img/catalog_item_22_big.png", "https://picsum.photos/1920/1080?random=2"]);
    }
}
