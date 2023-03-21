import StockEntryRepository from "./application/repository/StockEntryRepository";
import CalculateStock from "./application/usecase/CalculateStock";
import DecrementStock from "./application/usecase/DecrementStock";
import StockEntry from "./domain/entity/StockEntry";
import PgPromise from "./infra/database/PgPromiseAdapter";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import QueueController from "./infra/queue/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

async function main () {
	const stockEntries: StockEntry[] = [
		new StockEntry(1, "in", 20)
	];
	const stockEntryRepository: StockEntryRepository = {
		async save (stockEntry: StockEntry) {
			stockEntries.push(stockEntry);
		},
		async list (idProduct: number) {
			return stockEntries.filter((stockEntry: StockEntry) => stockEntry.idProduct === idProduct);
		}
	}
	const decrementStock = new DecrementStock(stockEntryRepository);
	const calculateStock = new CalculateStock(stockEntryRepository);
	const httpServer = new ExpressAdapter();
	new HttpController(httpServer, decrementStock, calculateStock);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new QueueController(queue, decrementStock);
	httpServer.listen(3005);
}

main();

