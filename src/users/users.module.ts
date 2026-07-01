import { Module } from "@nestjs/common";
import { LoggerService } from "./user.logger";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, LoggerService],
})
export class UsersModule {}
