import { Test, TestingModule } from "@nestjs/testing"
import { FencingTimeController } from "./fencingtime.controller"

describe("FencingtimeController", () => {
    let controller: FencingTimeController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FencingTimeController],
        }).compile()

        controller = module.get<FencingTimeController>(FencingTimeController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
