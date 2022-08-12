import { CreateScheduleResponse, ScheduleService } from "../services/schedule.service.interface";
import { createUseCreateSchedule } from "./use-create-schedule";
import { renderHook, act } from "@testing-library/react-hooks/pure";
import { mock } from 'jest-mock-extended';

function setup() {
    const scheduleService = mock<ScheduleService>();
    const useCreateSchedule = createUseCreateSchedule({
        useScheduleService: () => scheduleService,
    });
    return {
        useCreateSchedule,
        scheduleService,
    };
}

describe("useCreateSchedule()", () => {
    test("should return isLoading as false", () => {
        const { useCreateSchedule } = setup();
        const { result } = renderHook(() => useCreateSchedule());
        expect(result.current.isLoading).toBeFalsy();
    });
});

describe("when createSchedule() is called", () => {
    test("should return isLoading as true while schedule is being created", async () => {
        const { useCreateSchedule, scheduleService } = setup();
        const createScheRes: CreateScheduleResponse = { taskName: "new", taskDuration: '10' }
        await scheduleService.createSchedule.mockResolvedValue(createScheRes)
        const { result, waitForNextUpdate } = renderHook(() => useCreateSchedule());
        act(() => result.current.createSchedule({
            taskName: "Schedule",
            taskDuration: '10',
        }));
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
    })

    test("should call createScheudle() of Service", async () => {
        const { useCreateSchedule, scheduleService } = setup();
        const { result, waitForNextUpdate } = renderHook(() => useCreateSchedule());
        act(() => result.current.createSchedule({
            taskName: "Schedule",
            taskDuration: '10',
        }));
        await waitForNextUpdate();
        expect(scheduleService.createSchedule).toHaveBeenCalled();
    });
})


