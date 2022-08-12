import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CreateScheduleRequest } from '../../services/schedule.service.interface';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import './index.css';

export interface NewScheduleFormProps {
  isLoading?: boolean;
  onSave: (req: CreateScheduleRequest) => void;
  onCancel?: () => void;
  error?: Error;
}

export function NewScheduleForm({
  isLoading,
  onSave,
  onCancel,
  error,
}: NewScheduleFormProps): JSX.Element {
  const [taskName, setTaskName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  return (
    <form className='container'>
      <h2>Create Schedule</h2>
      <div className='input'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          placeholder='Enter task name'
          autoFocus
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className='input'>
        <label htmlFor='duration'>Duration in hour</label>
        <input
          type='number'
          id='duration'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className='btn-group'>
        <Button
          variant='contained'
          onClick={() => onSave({ taskName, taskDuration: duration })}
          disabled={isLoading || !taskName}
        >
          {isLoading && <CircularProgress size={14} />}
          {!isLoading && 'Save'}
        </Button>
        <Button
          type='button'
          variant='outlined'
          disabled={isLoading}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
      {error && <Alert severity='error'>{error.message}</Alert>}
    </form>
  );
}
