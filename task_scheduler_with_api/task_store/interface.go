package task_store

type TaskStoreProvider interface {
	Value() map[string]func()
}

type NamedTask struct {
	TaskName string
	TaskBody func()
}
type TaskFromFile struct {
	TaskName      string
	TaskStatement string
}

func copyMap(originalMap map[string]func()) map[string]func() {
	copiedMap := make(map[string]func())
	for name, statement := range originalMap {
		copiedMap[name] = statement

	}
	return copiedMap
}
