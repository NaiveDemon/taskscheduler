import {
  ScheduleList as DefaultScheduleList,
  ScheduleListProps,
} from '../ScheduleList';
import { Link } from 'react-router-dom';
import { UseListSchedules } from '../../hooks/use-list-schedules';
import { Alert, CircularProgress } from '@mui/material';

export interface HomeOptions {
  useListSchedules: UseListSchedules;
  ScheduleList?: (props: ScheduleListProps) => JSX.Element;
}

export function createHome({
  useListSchedules,
  ScheduleList = DefaultScheduleList,
}: HomeOptions): () => JSX.Element | null {
  return function Home() {
    const { data, error, isLoading } = useListSchedules();

    if (isLoading && !data) {
      return <CircularProgress role='progressbar' size={14} />;
    }

    if (error) {
      <Alert severity='error'>{error.message}</Alert>;
    }

    return (
      <div className='container'>
        <h2 className='container-header'>Task Scheduler</h2>
        <ScheduleList schedules={data!} isLoading={isLoading} error={error} />
        <Link to='/new' className='btn btn-primary'>
          Create Schedule
        </Link>
      </div>
    );
  };
}
