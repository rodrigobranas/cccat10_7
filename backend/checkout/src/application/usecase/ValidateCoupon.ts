import CouponRepository from "../repository/CouponRepository";
import CouponRepositoryDatabase from "../../infra/repository/CouponRepositoryDatabase";

export default class ValidateCoupon {

	constructor (
		readonly couponRepository: CouponRepository
	) {
	}

	async execute (code: string): Promise<boolean> {
		const coupon = await this.couponRepository.getCoupon(code);
		return !coupon.isExpired(new Date());
	}
}
