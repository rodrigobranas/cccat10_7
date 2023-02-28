import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './infra/http/AxiosAdapter';
import CheckoutGatewayHttp from './gateways/CheckoutGatewayHttp';
import FetchAdapter from './infra/http/FetchAdapter';

const app = createApp(App);
// const httpClient = new AxiosAdapter();
const httpClient = new FetchAdapter();
const checkoutGateway = new CheckoutGatewayHttp(httpClient, "http://localhost:3000");
app.provide("checkoutGateway", checkoutGateway);
app.mount('#app');
