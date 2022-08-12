package task_store_test

import (
	"fmt"
	"schedulingproject/task_store"
	"testing"
)

func TestSimpleRegisterTask(t *testing.T) {

	taskProvider := task_store.NewSimpleTaskProvider()
	task := task_store.NamedTask{
		TaskName: "Test_task",
		TaskBody: func() {
			fmt.Println("test_func")
		},
	}
	taskProvider.RegisterTask(task)
	if _, found := taskProvider.Value()["Test_task"]; !found {
		t.Fatalf("Error in registering task")
	}

}
