import { Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { firstValueFrom } from "rxjs"
import { parse } from "node-html-parser"
import unescape from "lodash.unescape"
import { Event } from "./schedule.interface"

function normalizeText(text: string): string {
    text = unescape(text.trim())

    // Remove extra spaces between words
    text = text.replace(/\s+/g, " ")

    return text
}

@Injectable()
export class ScheduleService {
    constructor(private readonly httpService: HttpService) {}

    async getSchedule(id: string): Promise<Event[]> {
        const { data } = await firstValueFrom(
            this.httpService.get(
                `https://fencingtimelive.com/tournaments/eventSchedule/${id}`,
            ),
        )
        const html = parse(data)
        const eventsHtml = html.querySelectorAll(
            "#mainContent h5, #mainContent table",
        )
        const events: Event[] = []
        let date = ""
        for (const i of eventsHtml) {
            if (i.rawTagName === "h5") {
                date = normalizeText(i.innerText)
                continue
            }
            const rows = i.querySelectorAll("tbody > tr")
            for (const event of rows) {
                const tds = event.querySelectorAll("td")
                events.push({
                    date,
                    start: normalizeText(tds.at(0).textContent),
                    name: normalizeText(tds.at(1).textContent),
                    status: normalizeText(tds.at(2).textContent),
                    id: event.id.slice(3),
                })
            }
        }
        return events
    }
}
