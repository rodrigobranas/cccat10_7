export default interface AuthGateway {
	verify (token: string): Promise<any>;
}
