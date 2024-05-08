/*users */

export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	avatar?: string;
	role: UserRole;
}
export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN",
}

/*for products*/
export interface IMovie {
	id: number;
	title: string;
	year: number;
	description: string;
	genre: string;
	trailer: string;
	image: string;
	rating?: {
		rate: number;
		count: number;
	};
}
