"use strict";
const { createStore, mapGetters } = Vuex;
const { createApp, ref, onMounted, computed } = Vue;
function getURLs() {
  const regex = /(?<=\/)([^\/]*)(\.ht\w+)$/gm;
  let m,
    url = {
      Cart: "api/cart/get/index.json",
      CatalogCashed: "api/catalog/elements/get/all.json",
      CatalogDisplayed: "api/catalog/displayed/get/index.json",
    };
  if ((m = regex.exec(window.location.href)) !== null) {
    switch (m[1]) {
      case "":
      case "index":
        url.Cart = "api/cart/get/index.json";
        url.CatalogCashed = "api/catalog/elements/get/all.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/index.json";
        break;
      case "Checkout":
        url.Cart = "api/cart/get/checkout.json";
        url.CatalogCashed = "api/catalog/elements/get/all.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/checkout.json";
        break;
      case "Product":
        url.Cart = "api/cart/get/Product.json";
        url.CatalogCashed = "api/catalog/elements/get/Product.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/Product.json";
        break;
      case "Shopping Cart":
        case "Shopping%20Cart":
        url.Cart = "api/cart/get/Shopping Cart.jso";
        url.CatalogCashed = "api/catalog/elements/get/Shopping Cart.jso";
        url.CatalogDisplayed = "api/catalog/displayed/get/Shopping Cart.jso";
        break;
      case "Single Page":
        case "Single%20Page":
        url.Cart = "api/cart/get/Single Page.json";
        url.CatalogCashed = "api/catalog/elements/get/Single Page.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/Single Page.json";
        break;
    }
  }
  return url;
}
const store = createStore({
  state() {
    return {
      CatalogChashed: {
        isLoaded: false,
        value: [],
      },
      CatalogDisplayedItems: {
        isLoaded: false,
        value: [],
      },
      Cart: {
        isLoaded: false,
        value: [],
      },
    };
  },
  getters: {
    CatalogDisplayed: (state) => {
      if (
        state.CatalogChashed.isLoaded &&
        state.CatalogDisplayedItems.isLoaded
      ) {
        return state.CatalogDisplayedItems.value.map((item) => {
          let elem = state.CatalogChashed.value.find((obj) => {
            return obj.id === item.id;
          });
          if (elem.type[item.type] !== undefined) {
            return {
              id: item.id,
              name: elem.name,
              type: item.type,
              img: elem.type[item.type].img,
              price: elem.type[item.type].price,
              star: elem.type[item.type].star,
              color: elem.type[item.type].color,
              size: elem.type[item.type].size,
            };
          } else return {};
        });
      }
      return [];
    },
    CartDisplayed: (state) => {
      const regex = /(\..+$)/gm;
      if (state.CatalogChashed.isLoaded && state.Cart.isLoaded) {
        return state.Cart.value.map((item) => {
          let elem = state.CatalogChashed.value.find((obj) => {
            return obj.id === item.id;
          });
          if (elem.type[item.type] !== undefined) {
            return {
              id: item.id,
              name: elem.name,
              type: item.type,
              quantity: item.quantity,
              img: elem.type[item.type].img.replace(regex, "_small.png"),
              price: elem.type[item.type].price,
              star: elem.type[item.type].star,
              color: elem.type[item.type].color,
              size: elem.type[item.type].size,
            };
          } else return {};
        });
      }
      return [];
    },
    CartCount: (state) => {
      let stat = {
        products: 0,
        count: 0,
        grand_total: 0,
      };
      if (state.CatalogChashed.isLoaded && state.Cart.isLoaded) {
        for (let item of Object.values(state.Cart.value)) {
          let cat = state.CatalogChashed.value.find((obj) => {
            return obj.id === item.id;
          });
          if (cat) {
            stat.grand_total += cat.type[item.type].price * item.quantity;
            stat.count += item.quantity;
            stat.products++;
          }
        }
      }
      return stat;
    },
  },
  mutations: {
    UpdateCatalogChashed(state, catalog) {
      state.CatalogChashed.value = catalog;
      state.CatalogChashed.isLoaded = true;
    },
    UpdateCatalogDisplayedItems(state, displayed) {
      state.CatalogDisplayedItems.value = displayed;
      state.CatalogDisplayedItems.isLoaded = true;
    },
    UpdateCart(state, cart) {
      state.Cart.value = cart;
      state.Cart.isLoaded = true;
    },
  },
  actions: {
    async GetCatalogChashed(context) {
      let response = await fetch(getURLs().CatalogCashed);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      if (json.status === 200) {
        context.commit("UpdateCatalogChashed", json.catalog);
      } else {
        throw Error("Catalog load error");
      }
    },
    async GetCatalogDisplayedItems(context) {
      let response = await fetch(getURLs().CatalogDisplayed);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      if (json.status === 200) {
        context.commit("UpdateCatalogDisplayedItems", json.displayed);
      } else {
        throw Error("Displayed Catalog load error");
      }
    },
    async GetCart(context) {
      let response = await fetch(getURLs().Cart);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      if (json.status === 200) {
        context.commit("UpdateCart", json.cart);
      } else {
        throw Error("Cart load error");
      }
    },
  },
});
const RootComponent = {
  /*setup() {
        const state = ref({
            CatalogChashed: {
                isLoaded: false,
                value: []
            },
            CatalogDisplayedItems: {
                isLoaded: false,
                value: []
            }
        });
        const GetCatalogChashed = async () => {
            let response = await fetch(urlCatalog);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            let json = await response.json();
            if (json.status === 200) {
                state.value.CatalogChashed.value = json.catalog;
                state.value.CatalogChashed.isLoaded = true;
            } else {
                throw Error('Catalog load error');
            }
        }
        const GetCatalogDisplayedItems = async () => {
            let response = await fetch(urlCatalogDisplayed);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            let json = await response.json();
            if (json.status === 200) {
                state.value.CatalogDisplayedItems.value = json.displayed;
                state.value.CatalogDisplayedItems.isLoaded = true;
            } else {
                throw Error('Displayed Catalog load error');
            }
        }
        const CatalogDisplayed = computed(() => {
            if (state.value.CatalogChashed.isLoaded && state.value.CatalogDisplayedItems.isLoaded) {
                return state.value.CatalogDisplayedItems.value.map(item => {
                    let elem = state.value.CatalogChashed.value.find(obj => { return obj.id === item.id });
                    if (elem.type[item.type] !== undefined) {
                        return {
                            "id": item.id,
                            "name": elem.name,
                            "type": item.type,
                            "img": elem.type[item.type].img,
                            "price": elem.type[item.type].price,
                            "star": elem.type[item.type].star,
                            "color": elem.type[item.type].color,
                            "size": elem.type[item.type].size
                        }
                    } else return {}
                })
            }
            return [];
        });
        onMounted(GetCatalogChashed);
        onMounted(GetCatalogDisplayedItems);
        return {
            state,
            GetCatalogChashed,
            GetCatalogDisplayedItems,
            CatalogDisplayed
        }
    },*/
  methods: {
    float2str(int, fract = 2) {
      let arr = int.toString().split(".");
      if (arr[1] === undefined) {
        arr[1] = "0";
      }
      arr[1] = arr[1].substring(0, fract).padStart(fract, "0");
      return arr.join(".");
    },
    startGen(star) {
      let ret = "";
      for (let i = 0; i < Math.floor(star); i++) {
        ret += '<i class="fa fa-star"></i>';
      }
      if (0 < Math.floor(star * 10 - Math.floor(star) * 10)) {
        ret += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
      }
      return ret;
    },
  },
  computed: {
    // смешиваем результат mapGetters с внешним объектом computed
    ...mapGetters([
      "CartCount",
      // ...
    ]),
  },
};
const app = Vue.createApp(RootComponent);
app.use(store);
store.dispatch("GetCatalogChashed");
store.dispatch("GetCatalogDisplayedItems");
store.dispatch("GetCart");
const vm = app.mount("#app-brand-shop");
getURLs();
