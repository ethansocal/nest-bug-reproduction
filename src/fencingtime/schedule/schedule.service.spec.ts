import { Test, TestingModule } from "@nestjs/testing"
import { ScheduleService } from "./schedule.service"
import { HttpModule } from "@nestjs/axios"

describe("ScheduleService", () => {
    let service: ScheduleService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [ScheduleService],
        }).compile()

        service = module.get<ScheduleService>(ScheduleService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
