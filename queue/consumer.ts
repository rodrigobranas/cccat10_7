import amqp from "amqplib";

async function main () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("decrementStock", { durable: true });
	channel.consume("decrementStock", async function (msg: any) {
		const input = JSON.parse(msg.content.toString());
		console.log(input);
		channel.ack(msg);
	});
}

main();
