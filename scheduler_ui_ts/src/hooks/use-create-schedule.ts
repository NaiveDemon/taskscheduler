import { useState } from 'react'
import { CreateScheduleRequest, ScheduleService } from '../services/schedule.service.interface'
import swal from 'sweetalert';

export type UseCreateSchedule = () => {
    isLoading: boolean
    createSchedule: (request: CreateScheduleRequest) => void
    error?: Error
}

export interface UseCreateScheduleOptions {
    useScheduleService: () => ScheduleService
}

export function createUseCreateSchedule(
    { useScheduleService }: UseCreateScheduleOptions
): UseCreateSchedule {
    return () => {
        const scheduleService = useScheduleService()
        const [isLoading, setIsLoading] = useState<boolean>(false)
        const [error, setError] = useState<Error>()

        const createSchedule = async (request: CreateScheduleRequest) => {
            try {
                setIsLoading(true)
                setError(undefined)
                await scheduleService.createSchedule(request)
                swal("Good job!", "Schedule saved successfully!", "success");
            } catch (e) {
                setError(e as Error)
            } finally {
                setIsLoading(false)
            }
        }

        return {
            isLoading,
            error,
            createSchedule: request => {
                createSchedule(request)
            },

        }
    }
}