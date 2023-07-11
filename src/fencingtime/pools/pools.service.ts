import { Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { firstValueFrom } from "rxjs"
import { PoolResult } from "./pools.interface"

@Injectable()
export class PoolsService {
    constructor(private readonly httpService: HttpService) {}

    async getResults(eventId: string, roundId: string): Promise<PoolResult[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<PoolResult[]>(
                `https://fencingtimelive.com/pools/results/data/${eventId}/${roundId}`,
            ),
        )
        return data
    }
}
