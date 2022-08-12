import { mock } from 'jest-mock-extended';
import { renderHook } from '@testing-library/react-hooks';
import { ListScheduleResponse, ScheduleService } from '../services/schedule.service.interface';
import { createUseListSchedules } from './use-list-schedules';

function setup() {
    const scheduleService = mock<ScheduleService>();
    const useListSchedules = createUseListSchedules({ useScheduleService: () => scheduleService });
    return {
        useListSchedules,
        scheduleService,
    };
}

describe('useListSchedules()', () => {
    it('should return isLoading as true while in progress and false once done', async () => {
        const { useListSchedules } = setup();
        const { result, waitForNextUpdate } = renderHook(() => useListSchedules());
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
    });

    describe('when schedules loading fails', () => {
        it('should return an error', async () => {
            const { useListSchedules, scheduleService } = setup();
            const error = new Error('Error occurred while fetching schedules');
            scheduleService.listSchedules.mockRejectedValueOnce(error);
            const { result, waitForNextUpdate } = renderHook(() => useListSchedules());
            await waitForNextUpdate();
            expect(result.current.error).toEqual(error);
        });
    });

    describe('when list schedules loaded successfully', () => {
        it('should return a list of schedules', async () => {
            const scheduleList: ListScheduleResponse = {
                schedules: [{
                    taskName: 'first task',
                    taskDuration: '1',
                },
                {
                    taskName: 'second task',
                    taskDuration: '2',
                },
                {
                    taskName: 'next task',
                    taskDuration: '3',
                }],
            };

            const { useListSchedules, scheduleService } = setup();
            scheduleService.listSchedules.mockResolvedValueOnce(scheduleList);
            const { result, waitForNextUpdate } = renderHook(() => useListSchedules());
            await waitForNextUpdate();
            expect(result.current.data).toEqual(scheduleList.schedules);
        });
    });
});