import Coupon from "../../domain/entity/Coupon";

export default interface CouponRepository {
	getCoupon (code: string): Promise<Coupon>;
}
