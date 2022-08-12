package task_store

import (
	"fmt"
	"schedulingproject/helper"
)

var _ TaskStoreProvider = &FileTaskProvider{}

type FileTaskProvider struct {
	store    map[string]func()
	filePath string
}

func NewFileTaskProvider(filePath string) *FileTaskProvider {
	return &FileTaskProvider{
		store:    make(map[string]func()),
		filePath: filePath,
	}

}

func (f *FileTaskProvider) Value() map[string]func() {
	return copyMap(f.store)
}

func (f *FileTaskProvider) RegisterTask() error {
	tasksInFile := []TaskFromFile{}
	err := helper.ReadFromFile(tasksInFile, f.filePath)
	if err != nil {
		return err
	}
	for _, task := range tasksInFile {
		f.store[task.TaskName] = func() {
			fmt.Println(task.TaskStatement)
		}
	}
	return nil

}
