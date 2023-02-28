import Coupon from "../../domain/entity/Coupon";
import CouponRepository from "../../application/repository/CouponRepository";
import Connection from "../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {

	constructor (readonly connection: Connection) {
	}

	async getCoupon (code: string): Promise<Coupon> {
		const [couponData] = await this.connection.query("select * from cccat10.coupon where code = $1", [code]);
		return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
	}
}
