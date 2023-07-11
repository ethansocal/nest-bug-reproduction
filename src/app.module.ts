import { Module } from "@nestjs/common"
import { FencingTimeModule } from "./fencingtime/fencingtime.module"
import { ScheduleModule } from "@nestjs/schedule"
import { RedisModule } from "nestjs-redis"

@Module({
    imports: [
        FencingTimeModule,
        ScheduleModule.forRoot(),
        RedisModule.register({
            url: "redis://localhost:6379",
        }),
    ],
})
export class AppModule {}
