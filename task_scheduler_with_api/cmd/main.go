package main

import (
	"schedulingproject/controller"
	repo "schedulingproject/scheduler"
	"schedulingproject/service"
	"schedulingproject/task_store"

	"github.com/gin-gonic/gin"
)

var fileName = "scheduler/data.json"

func main() {

	initialTaskStore := task_store.NewSimpleTaskProvider()
	repo := repo.NewFileScheduler(fileName, initialTaskStore)
	taskService := service.NewService(repo)
	taskController := controller.New(taskService)
	server := gin.Default()
	cors := func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}

	server.Use(cors)
	server.Static("/swaggerui/", "swaggerui")

	server.GET("/schedules", taskController.FindAllSchedules)

	server.POST("/schedules", taskController.SaveSchedule)

	server.POST("/schedules/run", taskController.Schedule)

	server.Run("localhost:8082")

	repo.Sync()

}
