import amqp from "amqplib";

async function main () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("decrementStock", { durable: true });
	const input = {
		items: [
			{ idProduct: 1, quantity: 10 }
		]
	}
	channel.sendToQueue("decrementStock", Buffer.from(JSON.stringify(input)));
}

main();
