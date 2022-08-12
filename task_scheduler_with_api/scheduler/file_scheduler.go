package scheduler

import (
	"errors"
	"fmt"
	"schedulingproject/task_store"
	"sync"
	"time"
)

// This is a scheduler implementation where the schedules are persisted/saved in json file.

var _ TaskScheduler = &FileScheduler{}

type FileScheduler struct {
	taskMap  map[string]func()
	wg       sync.WaitGroup
	now      func() time.Time
	filePath string
}

func NewFileScheduler(filePath string, tsp task_store.TaskStoreProvider) *FileScheduler {
	return &FileScheduler{
		taskMap:  tsp.Value(),
		filePath: filePath,
	}
}

func getLittleNap() {
	time.Sleep(10 * time.Nanosecond)
}
func (repo *FileScheduler) Schedule(schedule ScheduledTask) error {
	if _, ok := repo.taskMap[schedule.TaskName]; !ok {
		return errors.New(fmt.Sprintf(schedule.TaskName, "is not present"))
	}
	repo.SaveSchedule(schedule)

	repo.RunSchedule(schedule)
	return nil

}

func (repo *FileScheduler) RunSchedule(schedule ScheduledTask) {
	repo.wg.Add(1)
	go func() {
		defer repo.wg.Done()
		for {
			repo.taskMap[schedule.TaskName]()
			startSleeping, endSleeping := repo.now(), repo.now()
			scheduleDuration, _ := time.ParseDuration(schedule.Duration)
			for endSleeping.Sub(startSleeping) < scheduleDuration {
				getLittleNap()
				thisTime := repo.now()
				endSleeping = startSleeping.Add(thisTime.Sub(startSleeping))

			}
		}
	}()
}

func (repo *FileScheduler) Sync() {
	repo.wg.Wait()
}
