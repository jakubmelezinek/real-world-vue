// for intro.ts to be able to import App.vue
// or use  'vuetype' to generate proper .d.ts files
declare module "*.vue" {
    import Vue from 'vue';
    export default Vue;
}
