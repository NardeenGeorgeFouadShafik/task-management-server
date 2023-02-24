import { Module, Injectable } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./config.schema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get("STAGE") === "prod";

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: "postgres",
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE"),
        };
      },
    }),

    TaskModule,

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
