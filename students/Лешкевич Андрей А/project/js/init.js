"use strict";

function pageInit() {
    fetch(urlCatalog)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.status === 200) {
                prodCatalog = response.catalog;
                fetch(urlCart)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(response => {
                        if (response.status === 200) {
                            cart = new CCart(prodCatalog, response.cart);
                        } else {
                            throw Error('Cart load error');
                        }
                    });
                fetch(urlCatalogDisplayed)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(response => {
                        if (response.status === 200) {
                            catalog = new CPoductCatalogHTML(document.getElementById("catalog"), prodCatalog, response.displayed);
                        } else {
                            throw Error('Displayed Catalog load error');
                        }
                    });
            } else {
                throw Error('Catalog load error');
            }
        })
        .then(() => {
            console.log("All loaded sucsessfly");
        })
        .catch(alert => console.log(alert));   
    let tmp = document.getElementById("slider");
    if (null !== tmp) {
        slider = new CSliderHTML(tmp, ["https://picsum.photos/1920/1080?random=1", "img/catalog_item_22_big.png", "https://picsum.photos/1920/1080?random=2"]);
    }
}
