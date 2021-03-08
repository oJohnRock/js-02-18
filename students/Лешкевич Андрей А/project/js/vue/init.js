"use strict";

const { createApp, ref, onMounted, computed } = Vue;
const RootComponent = {
    setup() {
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
    },
    methods: {
        float2str(int, fract = 2) {
            let arr = int.toString().split('.');
            if (arr[1] === undefined) {
                arr[1] = '0';
            }
            arr[1] = arr[1].substring(0, fract).padStart(fract, '0');
            return arr.join('.');
        }
    }
}
const app = Vue.createApp(RootComponent);
const vm = app.mount('#app-brand-shop');
