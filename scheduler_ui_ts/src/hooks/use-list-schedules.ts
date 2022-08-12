import { useEffect, useState } from 'react';
import { ScheduleService } from '../services/schedule.service.interface';
import Schedule from '../types/Schedule';

export type UseListSchedules = () => {
    isLoading: boolean;
    error?: Error;
    data?: Schedule[];
};
export interface UseListSchedulesOptions {
    useScheduleService: () => ScheduleService
}

export function createUseListSchedules(
    { useScheduleService }: UseListSchedulesOptions
): UseListSchedules {
    return () => {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<Error>();
        const [data, setData] = useState<Schedule[]>([]);
        const scheduleService = useScheduleService();

        const listSchedules = async () => {
            try {
                setError(undefined);
                setIsLoading(true);
                const result = await scheduleService.listSchedules();
                setData(result.schedules);
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        };
        useEffect(() => { listSchedules() }, [scheduleService]);
        return {
            isLoading,
            data,
            error,
        };
    };
}
