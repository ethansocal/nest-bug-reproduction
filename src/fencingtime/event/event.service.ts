import { Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { firstValueFrom } from "rxjs"
import { parse } from "node-html-parser"
import unescape from "lodash.unescape"
import { EventIds } from "./event.interface"

function normalizeText(text: string): string {
    text = unescape(text.trim())

    // Remove extra spaces between words
    text = text.replace(/\s+/g, " ")

    return text
}

@Injectable()
export class EventService {
    constructor(private readonly httpService: HttpService) {}

    async getEvent(id: string): Promise<EventIds> {
        const { data } = await firstValueFrom(
            this.httpService.get(
                `https://fencingtimelive.com/events/view/${id}`,
            ),
        )
        const html = parse(data)
        const navElements = html.querySelectorAll(".nav > li")
        const event: EventIds = {
            eventId: id,
            poolsId: undefined,
            tableauId: undefined,
        }
        for (const element of navElements) {
            switch (element.innerText.trim()) {
                case "Pools":
                    event.poolsId = element
                        .querySelector("a")
                        .attributes["href"].split("/")
                        .at(-1)
                    break
                case "Tableau":
                    event.tableauId = element
                        .querySelector("a")
                        .attributes["href"].split("/")
                        .at(-1)
                    break
            }
        }

        return event
    }
}
