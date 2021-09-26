package controllers

import (
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//Inserting to databases

//InsertImage Insert images
func InsertImage(c *gin.Context)  {
	var db = models.InitDB()
	var data models.Images
	err := c.Bind(&data)
	if err != nil {
		return
	}
	fmt.Println(data)
	if err := db.Create(&data).Error; err != nil {
		c.JSON(200, gin.H{
			"isSuccess": "false",
		})
		return
	}
	c.JSON(200, gin.H{
		"isSuccess": "true",
	})
}

//Get from databases

// GetImages Get images
func GetImages(imType models.ImageType, owner string, db gorm.DB) []models.Images {
	var image []models.Images
	err := db.Where("type = ? AND owner_name = ?", imType, owner).First(&image).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return []models.Images{}
	}
	return image
}


//Testing method

// FakeCl Insert fake client
func FakeCl() {
	var db = models.InitDB()
	var data models.Doctor
	data.FirstName = "data7"
	data.LastName = "testData"
	data.Password = "1"
	data.ClinicOrHospital = "test clinic1"
	data.Language = models.CN

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeImage Insert fake images
func FakeImage() {
	var db = models.InitDB()
	var data models.Images
	data.Path = "data7"
	data.Name = "testData"
	data.OwnerName = "1"
	data.Type = models.GP

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}