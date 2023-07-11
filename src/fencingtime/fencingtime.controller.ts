import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from "@nestjs/common"
import { FencingTimeService } from "./fencingtime.service"
import { Tournament } from "./tournaments/tournaments.interface"
import { TournamentsService } from "./tournaments/tournaments.service"
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util"

@Controller()
export class FencingTimeController {
    constructor(
        private fencingTimeService: FencingTimeService,
        private tournamentsService: TournamentsService,
    ) {}
}
