import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoggerService } from "./user.logger";

interface User {
	id: number;
	name: string;
	email: string;
}

@Injectable()
export class UsersService {
	constructor(private readonly logger: LoggerService) {}

	private readonly users: User[] = [
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Jane Doe", email: "jane@example.com" },
	];

	findAllUsers(name: string = "") {
		// if (!name) {
		// 	return this.users;
		// }
		this.logger.log(`Searching for users with name: ${name}`);
		return this.users.filter((user) =>
			user.name.toLowerCase().includes(name.toLowerCase()),
		);
	}

	findById(id: number) {
		const user = this.users.find((user) => user.id === id);

		if (!user) throw new NotFoundException("User not found");

		return user;
	}

	create(createUserDto: CreateUserDto) {
		this.logger.log("Creating user");

		const newUser: User = { id: this.users.length + 1, ...createUserDto };
		this.users.push(newUser);

		return newUser;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		const userIndex = this.users.findIndex((user) => user.id === id);
		if (userIndex === -1) throw new NotFoundException("User not found");

		this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
		return this.users[userIndex];
	}

	delete(id: number) {
		const userIndex = this.users.findIndex((user) => user.id === id);
		if (userIndex === -1) throw new NotFoundException("User not found");

		this.users.splice(userIndex, 1);
		return { message: "User deleted successfully" };
	}
}
