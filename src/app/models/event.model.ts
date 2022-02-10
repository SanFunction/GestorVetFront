import { DayPilot } from "@daypilot/daypilot-lite-angular";

export interface Event {
    id?: number
    start?: DayPilot.Date
    end?: DayPilot.Date
    text?: string
}