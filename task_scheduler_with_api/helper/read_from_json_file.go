package helper

import (
	"encoding/json"
	"os"
)

func ReadFromFile[T any](tasksInFile []T, fileName string) error {

	jsonFile, err := os.Open(fileName)
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	jsonParser := json.NewDecoder(jsonFile)
	err = jsonParser.Decode(&tasksInFile)
	if err != nil {
		return err
	}
	return nil

}
