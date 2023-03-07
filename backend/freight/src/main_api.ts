import CalculateFreight from "./application/usecase/CalculateFreight";
import PgPromise from "./infra/database/PgPromiseAdapter";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";

const connection = new PgPromise();
const httpClient = new AxiosAdapter();
const calculateFreight = new CalculateFreight();
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttpServer();
new HttpController(httpServer, calculateFreight);
httpServer.listen(3002);
