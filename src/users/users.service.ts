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
		return { data: createUserDto, message: "User created successfully" };
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return {
			data: { id, ...updateUserDto },
			message: "User updated successfully",
		};
	}
}
