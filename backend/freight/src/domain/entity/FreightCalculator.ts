export default class FreightCalculator {
	static calculate (width: number, height: number, length: number, weight: number, quantity: number = 1) {
		const volume = width/100 * height/100 * length/100;
		const density = weight/volume;
		const itemFreight = 1000 * volume * (density/100);
		return Math.max(itemFreight, 10) * quantity;
	}
}
