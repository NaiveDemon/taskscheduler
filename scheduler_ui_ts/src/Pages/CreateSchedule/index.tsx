import { NavigateFunction } from 'react-router-dom';
import {
  NewScheduleForm as DefaultNewScheduleForm,
  NewScheduleFormProps,
} from '../../components/NewScheduleForm';
import { UseCreateSchedule } from '../../hooks/use-create-schedule';

export type UseNavigate = () => NavigateFunction;
export interface CreateScheduleOptions {
  useCreateSchedule: UseCreateSchedule;
  useNavigate: UseNavigate;
  NewScheduleForm?: (props: NewScheduleFormProps) => JSX.Element;
}

export function createCreateSchedule({
  useCreateSchedule,
  useNavigate,
  NewScheduleForm = DefaultNewScheduleForm,
}: CreateScheduleOptions): () => JSX.Element {
  return function CreateSchedule() {
    const navigate = useNavigate();
    const { isLoading, createSchedule, error } = useCreateSchedule();
    return (
      <div className='container'>
        <NewScheduleForm
          onCancel={() => navigate(-1)}
          onSave={createSchedule}
          isLoading={isLoading}
          error={error}
        />
      </div>
    );
  };
}
