import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers(@Query("name") name?: string): unknown {
		return this.usersService.findAllUsers(name);
	}

	@Get(":id")
	getUserById(@Param("id", ParseIntPipe) id: number): unknown {
		return this.usersService.findById(id);
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): unknown {
		return this.usersService.create(createUserDto);
	}

	@Put(":id")
	updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}
}
