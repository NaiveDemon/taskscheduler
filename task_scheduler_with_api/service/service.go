package service

import (
	repo "schedulingproject/scheduler"
)

type TaskService interface {
	SaveSchedule(repo.ScheduledTask) (repo.ScheduledTask, error)
	FindAllSchedules() ([]repo.ScheduledTask, error)
	Schedule(repo.ScheduledTask) error
}

type Service struct {
	repo repo.TaskScheduler
}

func NewService(repo repo.TaskScheduler) *Service {
	return &Service{repo: repo}
}

func (service *Service) SaveSchedule(schedule repo.ScheduledTask) (repo.ScheduledTask, error) {
	return service.repo.SaveSchedule(schedule)
}

func (service *Service) FindAllSchedules() ([]repo.ScheduledTask, error) {
	return service.repo.FindAllSchedules()
}

func (service *Service) Schedule(schedule repo.ScheduledTask) error {
	return service.repo.Schedule(schedule)
}
