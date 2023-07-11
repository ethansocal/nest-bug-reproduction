import { Module } from "@nestjs/common"
import { PoolsService } from "./pools/pools.service"
import { ScheduleService } from "./schedule/schedule.service"
import { HttpModule } from "@nestjs/axios"
import { StripService } from "./strip/strip.service"
import { EventService } from "./event/event.service"
import { FencingTimeService } from "./fencingtime.service"
import { FencingTimeController } from "./fencingtime.controller"
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';

@Module({
    imports: [HttpModule, TournamentsModule, PlayersModule],
    providers: [
        PoolsService,
        ScheduleService,
        StripService,
        EventService,
        FencingTimeService,
    ],
    controllers: [FencingTimeController],
})
export class FencingTimeModule {}
