import { ApiScheduleService } from "./services/schedule.service";
import { ScheduleService } from "./services/schedule.service.interface";
const baseUrl = 'http://localhost:8082';

export interface Config {
    services: {
        schedule: ScheduleService;
    }
}

export const config: Config = {
    services: {
        schedule: new ApiScheduleService(baseUrl),
    },
}