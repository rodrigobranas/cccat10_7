export default function format (amount: number) {
	return new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(amount);
}