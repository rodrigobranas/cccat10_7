import StockEntry from "../../domain/entity/StockEntry";

export default interface StockEntryRepository {
	save (stockEntry: StockEntry): Promise<void>;
	list (idProduct: number): Promise<StockEntry[]>;
}