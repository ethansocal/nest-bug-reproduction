import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { TournamentsService } from "./tournaments/tournaments.service"
import { EventService } from "./event/event.service"
import { ScheduleService } from "./schedule/schedule.service"
import { PlayersService } from "./players/players.service"
import { RedisService } from "nestjs-redis"
import { RedisClient } from "nestjs-redis/dist/redis-client.provider"

@Injectable()
export class FencingTimeService {
    constructor(
        private readonly tournamentsService: TournamentsService,
        private readonly scheduleService: ScheduleService,
        private readonly eventService: EventService,
        private readonly playersService: PlayersService,
        private readonly redisService: RedisService,
    ) {}

    private async playersEventMap() {
        const client = this.redisService.getClient("fencingtime")
        if (client.exists("playersEventMap")) {
            return JSON.parse(await client.get("playersEventMap"))
        }

        const tournaments =
            await this.tournamentsService.getInProgressTournaments()

        // Map of player names to their list of event ids
        const playersMap = new Map<string, string[]>()

        for (const tournament of tournaments) {
            const schedule = await this.scheduleService.getSchedule(
                tournament.id,
            )
            for (const event of schedule) {
                const players = await this.playersService.getPlayers(event.id)
                for (const player of players) {
                    playersMap.set(player.name, [
                        ...(playersMap.get(player.name) || []),
                        event.id,
                    ])
                }
            }
        }
        client.set(
            "playersEventMap",
            JSON.stringify(Object.fromEntries(playersMap)),
        )
        // expire next day at 12:00 am
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 1)
        currentDate.setHours(0, 0, 0, 0)
        const unixTimeNextDayAt12AM = Math.floor(currentDate.getTime() / 1000)

        client.expireat("playersEventMap", unixTimeNextDayAt12AM)
        return playersMap
    }
}
