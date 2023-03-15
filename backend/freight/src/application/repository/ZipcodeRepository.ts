import Zipcode from "../../domain/entity/Zipcode";

export default interface ZipcodeRepository {
	get (code: string): Promise<Zipcode | undefined>;
}
