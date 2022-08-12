import { render, screen } from '@testing-library/react';
import Schedule from '../../types/Schedule';
import { ScheduleList, ScheduleListProps } from '../ScheduleList';
import { createHome } from './Home';

function setup() {
  const useListSchedules = jest.fn(() => ({
    isLoading: false,
  }));
  const MockScheduleList = jest.fn((props: ScheduleListProps) => (
    <div>{ScheduleList(props)}</div>
  ));

  const Home = createHome({
    useListSchedules,
    ScheduleList: MockScheduleList,
  });

  return {
    ScheduleList: MockScheduleList,
    Home,
    useListSchedules,
  };
}

describe('Home', () => {
  describe('when the schedules are loading', () => {
    it('should display a Spinner', () => {
      const { Home, useListSchedules } = setup();

      useListSchedules.mockReturnValueOnce({
        isLoading: true,
      });

      render(<Home />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('when schedules are returned', () => {
    const schedule: Schedule = {
      taskName: 'new task',
      duration: 32,
    };
    const useListSchedulesResult = {
      data: [schedule],
      isLoading: false,
    };

    it('should display the schedules with the ScheduleList component', () => {
      const { Home, useListSchedules, ScheduleList } = setup();

      const context = expect.anything();

      useListSchedules.mockReturnValueOnce(useListSchedulesResult);

      render(<Home />);

      expect(ScheduleList).toHaveBeenCalledWith(
        expect.objectContaining({
          schedules: [schedule],
        }),
        context
      );
    });
  });
});
