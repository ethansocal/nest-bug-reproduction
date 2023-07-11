import { Test, TestingModule } from "@nestjs/testing"
import { PoolsService } from "./pools.service"
import { HttpModule } from "@nestjs/axios"

describe("PoolsService", () => {
    let service: PoolsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PoolsService],
            imports: [HttpModule],
        }).compile()

        service = module.get<PoolsService>(PoolsService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("should return results", async () => {
        expect(
            await service.getResults(
                "17BD74855ED849578F6DC35C003271C7",
                "10B306C583394BFAAA05ED48C143C256",
            ),
        ).toBeDefined()
    })
})
