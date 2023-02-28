import CLIHandler from "./CLIHandler";

export default class CLIHandlerNode extends CLIHandler {

	constructor () {
		super();
		process.stdin.on("data", async (chunk: any) => {
			const command = chunk.toString().replace(/\n/g, "");
			await this.type(command);
		});
	}

	write(text: string): void {
		console.log(text);
	}

}