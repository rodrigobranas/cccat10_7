import Coord from "./Coord";

// entity
export default class Zipcode {
	coord: Coord;

	constructor (readonly code: string, readonly street: string, readonly neighborhood: string, lat: number, long: number) {
		this.coord = new Coord(lat, long);
	}
}
