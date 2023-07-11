import { Module } from "@nestjs/common"
import { PlayersService } from "./players.service"
import { HttpModule } from "@nestjs/axios"

@Module({
    providers: [PlayersService],
    imports: [HttpModule],
})
export class PlayersModule {}
