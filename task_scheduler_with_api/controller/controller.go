package controller

import (
	"net/http"

	"schedulingproject/scheduler"
	"schedulingproject/service"

	"github.com/gin-gonic/gin"
)

type ScheduleController interface {
	FindAllSchedules(*gin.Context)
	SaveSchedule(*gin.Context)
	Schedule(*gin.Context)
}

type controller struct {
	service service.TaskService
}

func New(service service.TaskService) ScheduleController {
	return controller{
		service: service,
	}
}

func (c controller) FindAllSchedules(ctx *gin.Context) {
	allSchedules, err := c.service.FindAllSchedules()
	if err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "error in fetching schedules"})
		return
	}
	if len(allSchedules) <= 0 {
		ctx.IndentedJSON(http.StatusNoContent, gin.H{"message": "no schedule is present in list"})
		return
	}

	ctx.IndentedJSON(http.StatusOK, allSchedules)
}

func (c controller) SaveSchedule(ctx *gin.Context) {
	var task scheduler.ScheduledTask

	if err := ctx.BindJSON(&task); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"message": "taskName and taskDuration expected"})
		return
	}

	_, err := c.service.SaveSchedule(task)
	if err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"message": "taskName and taskDuration expected"})
		return

	}

	ctx.IndentedJSON(http.StatusCreated, task)

}
func (c controller) Schedule(ctx *gin.Context) {
	var task scheduler.ScheduledTask
	if err := ctx.BindJSON(&task); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "error in binding json with task struct"})
		return
	}
	ctx.BindJSON(&task)
	err := c.service.Schedule(task)
	if err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "error in running schedules"})
	}
	ctx.IndentedJSON(http.StatusCreated, task)

}
