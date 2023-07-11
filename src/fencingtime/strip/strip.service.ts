import { Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { firstValueFrom } from "rxjs"
import { Strip } from "./strip.interface"

@Injectable()
export class StripService {
    constructor(private readonly httpService: HttpService) {}

    async getStrips(eventId: string, roundId: string): Promise<Strip[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Strip[]>(
                `https://fencingtimelive.com/rounds/strips/data/${eventId}/${roundId}`,
            ),
        )
        return data
    }
}
