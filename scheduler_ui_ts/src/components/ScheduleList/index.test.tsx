import { ScheduleList } from '.';
import { render, screen } from '@testing-library/react';
import Schedule from '../../types/Schedule';

function setup() {
  const getSchedules: (count: number) => Schedule[] = (count) => {
    const schedules: Schedule[] = [];
    for (let i = 1; i <= count; i += 1) {
      const schedule = {
        taskName: `test-task-name-${i}`,
        taskDuration: Math.floor(Math.random() * 100).toString(),
      };
      schedules.push(schedule);
    }
    return schedules;
  };

  return {
    getSchedules,
  };
}

describe('ScheduleList', () => {
  it('should render "no schedules present" when there are no schedules', () => {
    render(<ScheduleList schedules={[]} />);
    expect(screen.getByText(/No schedules present/i)).toBeInTheDocument();
  });

  it('should display the passed schedules', () => {
    const { getSchedules } = setup();
    const schedules = getSchedules(10);
    render(<ScheduleList schedules={schedules} />);
    schedules.forEach((schedule) => {
      expect(screen.getByText(schedule.taskName)).toBeInTheDocument();
    });
  });

  describe('when isLoading is true', () => {
    it('should display Spinner', () => {
      const { getSchedules } = setup();
      const schedules = getSchedules(1);

      render(<ScheduleList schedules={schedules} isLoading={true} />);

      expect(screen.getByRole('progressbar')).toBeVisible();
    });
  });

  describe('when isLoading is false', () => {
    it('should not display Spinner', () => {
      const { getSchedules } = setup();
      const schedules = getSchedules(1);
      render(<ScheduleList schedules={schedules} isLoading={false} />);
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('when an error occurs', () => {
    it('should display an alert with the error message', () => {
      const { getSchedules } = setup();
      const schedules = getSchedules(1);
      const error = new Error('unable to load data due to some error');
      render(<ScheduleList schedules={schedules} error={error} />);
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });
});
