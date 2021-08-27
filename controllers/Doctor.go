package controllers

import (
	"deco3801/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetAvailableDoctor(c *gin.Context)  {
	type Result struct {
		FirstName string
		LastName string
	}
	var docs []Result
	var db = models.InitDB()
	db.Table("doctors").Select([]string{"first_name", "last_name"}).Limit(3).Scan(&docs)
	c.JSON(http.StatusOK, docs)
}

