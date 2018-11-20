import App from "./components/App.vue";

console.log("about to instantiate Vue #app");
window["app"] = new App({el: '#app'});