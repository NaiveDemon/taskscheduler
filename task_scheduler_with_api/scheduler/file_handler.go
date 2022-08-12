package scheduler

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

func (f *FileScheduler) SaveSchedule(schedule ScheduledTask) (ScheduledTask, error) {
	previousSchedules, err := f.FindAllSchedules()
	if err != nil {
		return ScheduledTask{}, err
	}
	previousSchedules = append(previousSchedules, schedule)

	content, err := json.Marshal(previousSchedules)
	if err != nil {
		return ScheduledTask{}, err
	}
	err = ioutil.WriteFile(f.filePath, content, 0644)
	if err != nil {
		return ScheduledTask{}, err
	}
	return schedule, nil
}

func (f *FileScheduler) FindAllSchedules() ([]ScheduledTask, error) {

	var schedulesAlreadyPresent []ScheduledTask

	jsonFile, err := os.Open(f.filePath)
	if err != nil {
		return []ScheduledTask{}, err
	}
	defer jsonFile.Close()

	jsonParser := json.NewDecoder(jsonFile)
	err = jsonParser.Decode(&schedulesAlreadyPresent)
	if err != nil {
		return []ScheduledTask{}, err
	}
	return schedulesAlreadyPresent, nil
}
