
import axios, { AxiosInstance } from "axios";
import Schedule from "../types/Schedule";
import {
  ScheduleService,
  CreateScheduleRequest,
  CreateScheduleResponse,
  ListScheduleResponse,
} from "./schedule.service.interface";

export class ApiScheduleService implements ScheduleService {
  http: AxiosInstance
  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
  }

  async createSchedule(request: CreateScheduleRequest): Promise<CreateScheduleResponse> {
    try {
      return await this.http.post("/schedules", request)
    }
    catch (err) {
      throw new Error(`Failed to create schedule: ${err}`);
    }
  };

  async listSchedules(): Promise<ListScheduleResponse> {
    try {
      const response = await this.http.get(`/schedules`);
      return { schedules: response.data as Schedule[] };
    } catch (err) {
      throw new Error(`Failed to list schedules: ${err}`);
    }
  }
}



