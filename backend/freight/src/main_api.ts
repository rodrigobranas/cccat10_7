import ZipcodeRepository from "./application/repository/ZipcodeRepository";
import CalculateFreight from "./application/usecase/CalculateFreight";
import Zipcode from "./domain/entity/Zipcode";
import PgPromise from "./infra/database/PgPromiseAdapter";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";

const connection = new PgPromise();
const httpClient = new AxiosAdapter();
const zipcodeRepository: ZipcodeRepository = {
	async get (code: string): Promise<Zipcode | undefined> {
		if (code === "22060030") {
			return new Zipcode("22060030", "", "", -27.5945, -48.5477);
		}
		if (code === "88015600") {
			return new Zipcode("88015600", "", "", -22.9129, -43.2003);
		}
	}
}
const calculateFreight = new CalculateFreight(zipcodeRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttpServer();
new HttpController(httpServer, calculateFreight);
httpServer.listen(3002);
