import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApiKeyMiddleware } from "./middleware/api-key.middleware";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(ApiKeyMiddleware).forRoutes(UsersController);
	}
}
