package controllers

import (
	"deco3801/models"
	"fmt"
	"github.com/gin-gonic/gin"
)

func HandleDocSearch(c *gin.Context) {
	type docInfo struct {
		Doctor models.Doctor
		Image []models.Image
	}
	var db = models.InitDB()
	var gpName string
	var docInfos []docInfo
	err := c.Bind(&gpName)
	if err != nil {
		fmt.Println("error booking require")
	}

	var doctors []models.Doctor
	db.Where("clinic_or_hospital = ?", gpName).Find(&doctors)

	for _, doctor := range doctors {
		var images []models.Image
		var docInfo docInfo
		db.Where("owner_name = ? AND type = ?", doctor.FirstName + " " + doctor.LastName, models.DOCTOR).Find(&images)
		docInfo.Doctor = doctor
		docInfo.Image = images
		docInfos = append(docInfos, docInfo)
	}

	c.JSON(200, gin.H{
		"docInfos": docInfos,
	})

}
