import Schedule from "../types/Schedule";

export type CreateScheduleRequest = {
    taskName: string;
    taskDuration: string;
}

export type CreateScheduleResponse = {
    taskName: string;
    taskDuration: string;
}

export type ListScheduleResponse = {
    schedules: Schedule[]
}

export interface ScheduleService {
    createSchedule: (request: CreateScheduleRequest) => Promise<CreateScheduleResponse>;
    listSchedules: () => Promise<ListScheduleResponse>;
}