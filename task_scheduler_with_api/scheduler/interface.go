package scheduler

type ScheduledTask struct {
	TaskName string `json:"taskName"`
	Duration string `json:"taskDuration"`
}

type TaskScheduler interface {
	SaveSchedule(ScheduledTask) (ScheduledTask, error)
	FindAllSchedules() ([]ScheduledTask, error)
	Schedule(ScheduledTask) error
	Sync()
}
