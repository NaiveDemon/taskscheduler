package task_store

import (
	"fmt"
)

var _ TaskStoreProvider = &SimpleTaskProvider{}

type SimpleTaskProvider struct {
	store map[string]func()
}

func NewSimpleTaskProvider() *SimpleTaskProvider {

	stp := &SimpleTaskProvider{}
	stp.store = make(map[string]func())

	stp.RegisterTask(NamedTask{
		TaskName: "simple_print",
		TaskBody: func() {
			fmt.Println("simple print task was invoked")

		},
	})

	stp.RegisterTask(NamedTask{
		TaskName: "print_with_param",
		TaskBody: func() { //figure out how to pass param
			fmt.Printf("print with param task was invoked with param")

		},
	})

	return stp
}

func (s *SimpleTaskProvider) Value() map[string]func() {
	return copyMap(s.store)

}

func (s *SimpleTaskProvider) RegisterTask(task NamedTask) {
	s.store[task.TaskName] = task.TaskBody
}
