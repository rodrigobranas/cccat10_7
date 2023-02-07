export default interface CouponRepository {
	getCoupon (code: string): Promise<any>;
}
