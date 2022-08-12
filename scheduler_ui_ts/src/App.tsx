import React from 'react';
import {
  Route,
  Routes,
  useNavigate as defaultUseNavigate,
} from 'react-router-dom';
import { createHome } from './Pages/Home';
import { PageNotFound } from './Pages/404/index';
import { createUseListSchedules } from './hooks/use-list-schedules';
import { ScheduleService } from './services/schedule.service.interface';
import { createCreateSchedule, UseNavigate } from './Pages/CreateSchedule';
import { createUseCreateSchedule } from './hooks/use-create-schedule';
import { NewScheduleForm } from './components/NewScheduleForm';

export interface AppOptions {
  useScheduleService: () => ScheduleService;
  useNavigate?: UseNavigate;
}

export function createApp({
  useScheduleService,
  useNavigate = defaultUseNavigate,
}: AppOptions): () => JSX.Element | null {
  const useListSchedules = createUseListSchedules({ useScheduleService });
  const useCreateSchedule = createUseCreateSchedule({ useScheduleService });
  const Home = createHome({ useListSchedules });
  const CreateSchedule = createCreateSchedule({
    useCreateSchedule,
    useNavigate,
    NewScheduleForm,
  });

  return function App(): JSX.Element | null {
    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='new' element={<CreateSchedule />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    );
  };
}
