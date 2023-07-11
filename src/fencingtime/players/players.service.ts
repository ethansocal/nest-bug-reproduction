import { Injectable } from "@nestjs/common"
import { firstValueFrom } from "rxjs"
import axios from "axios"
import { HttpService } from "@nestjs/axios"
import { Player } from "./players.interface"

@Injectable()
export class PlayersService {
    constructor(private readonly httpService: HttpService) {}
    async getPlayers(eventId: string): Promise<Player[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Player[]>(
                `https://fencingtimelive.com/events/competitors/data/${eventId}?sort=name`,
            ),
        )
        return data
    }
}
