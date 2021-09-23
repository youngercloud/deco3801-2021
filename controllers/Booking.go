package controllers

import (
	"deco3801/models"
	"github.com/gin-gonic/gin"
)

func Booking(c *gin.Context)  {
	var db = models.InitDB()
	var booking models.Booking
	err := c.Bind(&booking)
	if err != nil {
		return
	}
	if err := db.Create(&booking).Error; err != nil {
		c.JSON(200, gin.H{
			"creation": "false",
		})
		return
	}
	c.JSON(200, gin.H{
		"creation": "true",
	})
}

func bookSearch(c *gin.Context)  {
	var db = models.InitDB()
	var clinicInfo models.Institution
	err := c.Bind(&clinicInfo)
	if err != nil {
		return
	}

	if err := db.Create(&clinicInfo).Error; err != nil {
		c.JSON(200, gin.H{
			"creation": "false",
		})
		return
	}
	c.JSON(200, gin.H{
		"creation": "true",
	})
}

//func findLanguages(clinicName string) []string {
//
//}
