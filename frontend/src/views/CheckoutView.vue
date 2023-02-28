<script setup lang="ts">
	import { ref, onMounted, Ref, inject } from 'vue';
	import Order from '../entities/Order';
	import Product from '../entities/Product';
	import CheckoutGateway from '../gateways/CheckoutGateway';

	const products: Ref<Product[]> = ref([]);
	const order: Ref<Order> = ref(new Order("407.302.170-27"));
	const output: any = ref({});

	const checkoutGateway = inject("checkoutGateway") as CheckoutGateway;

	async function checkout (order: Order) {
		output.value = await checkoutGateway.checkout(order);
	}

	onMounted(async () => {
		products.value = await checkoutGateway.getProducts();
	});
</script>

<template>
	<div>
		<div class="title-name">Checkout</div>
		<div class="product" v-for="product in products">
			<div class="product-description">{{ product.description }}</div>
			<div class="product-price">{{ product.getFormattedPrice() }}</div>
			<button class="product-add" @click="order.addItem(product)">Add</button>
		</div>
		<div>
			<div class="total">{{ order.total }}</div>
			<div class="order-item" v-for="item in order.items">
				{{ item.idProduct }} {{ item.getQuantity() }}
			</div>
			<button class="checkout" @click="checkout(order)">Checkout</button>
			<div class="output-total">{{ output.total }}</div>
			<div class="output-freight">{{ output.freight }}</div>
		</div>
	</div>
</template>

<style scoped>
</style>
