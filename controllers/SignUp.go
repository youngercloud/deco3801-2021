package controllers

import (
	"deco3801/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"strings"
	"time"
)


func GetAge(Dob string) int {
	var DobList = strings.Split(Dob, "/")
	var year, err = strconv.Atoi(DobList[0])
	if err != nil {
		return -1
	}
	return time.Time{}.Year() - year
}

func SignUpUser(c *gin.Context) {
	var db = models.InitDB()
	var userData models.User
	err := c.Bind(&userData)
	if err != nil {
		return
	}
	fmt.Println(userData)
	if err := db.Create(&userData).Error; err != nil {
		c.JSON(200, gin.H{
			"creation": "false",
		})
		return
	}
	c.JSON(200, gin.H{
		"creation": "true",
	})
}

func SignUpDoctor(c *gin.Context) {
	var db = models.InitDB()
	var doctorData models.Doctor
	err := c.Bind(&doctorData)
	if err != nil {
		return
	}
	c.String(http.StatusOK, "Accept data from front-end! USER")
	if err := db.Create(&doctorData).Error; err != nil {
		c.JSON(200, gin.H{
			"creation": "false",
		})
		return
	}
	c.JSON(200, gin.H{
		"creation": "true",
	})
}