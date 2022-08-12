import { Alert, CircularProgress } from '@mui/material';
import Schedule from '../../types/Schedule';
import './index.css';

export interface ScheduleListProps {
  schedules: readonly Schedule[];
  isLoading?: boolean;
  error?: Error;
}

export function ScheduleList({
  schedules,
  isLoading,
  error,
}: ScheduleListProps): JSX.Element {
  if (!schedules || !schedules.length) {
    return <div>No schedules present</div>;
  }
  return (
    <div className='container'>
      <h2>Schedules</h2>
      {isLoading || (
        <table className='heading'>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration (In Hrs.)</th>
            </tr>
          </thead>
          <tbody>
            {schedules &&
              schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.taskName}</td>
                  <td>{schedule.taskDuration}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {isLoading && <CircularProgress role='progressbar' size={14} />}
      {error && <Alert severity='error'>{error.message}</Alert>}
    </div>
  );
}
