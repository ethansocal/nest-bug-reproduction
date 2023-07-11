import { Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { firstValueFrom } from "rxjs"
import { Tournament } from "./tournaments.interface"

@Injectable()
export class TournamentsService {
    constructor(private readonly httpService: HttpService) {}

    async getInProgressTournaments(): Promise<Tournament[]> {
        const date = new Date()
        const { data } = await firstValueFrom(
            this.httpService.get<Tournament[]>(
                `https://www.fencingtimelive.com/tournaments/search/data?filter=All&usa=Loc&country=USA&region=0&local=All&state=CA&date=0&today=${date.getFullYear()}-${String(
                    date.getMonth() + 1,
                ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
            ),
        )
        return data
    }
}
