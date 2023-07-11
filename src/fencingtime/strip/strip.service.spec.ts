import { Test, TestingModule } from "@nestjs/testing"
import { StripService } from "./strip.service"
import { HttpModule } from "@nestjs/axios"

describe("StripsService", () => {
    let service: StripService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [StripService],
        }).compile()

        service = module.get<StripService>(StripService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
