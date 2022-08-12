package task_store_test

import (
	"fmt"
	"schedulingproject/helper"
	"schedulingproject/task_store"
	"testing"
)

func TestRegisterTask(t *testing.T) {
	fileTaskProvider := task_store.NewFileTaskProvider("demo_task_store.json")
	err := fileTaskProvider.RegisterTask()
	if err != nil {
		t.Fatalf("Not able to register task: %v", err)
	}
	gotMap := fileTaskProvider.Value()
	want := []task_store.TaskFromFile{}

	_ = helper.ReadFromFile(want, "demo_task_store.json")
	wantMap := make(map[string]func())
	for _, task := range want {
		wantMap[task.TaskName] = func() {
			fmt.Println(task.TaskStatement)
		}
	}
	for index := range wantMap {
		if _, found := gotMap[index]; !found {
			t.Fatalf("error in registering task")
		}
	}

}
