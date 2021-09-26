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
	var data models.Image
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
func GetImages(imType models.ImageType, owner string, db gorm.DB) []models.Image {
	var image []models.Image
	err := db.Where("type = ? AND owner_name = ?", imType, owner).First(&image).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return []models.Image{}
	}
	return image
}

// MainImage Check which image is the main one and return it
func MainImage(images []models.Image) models.Image {
	for _, image := range images {
		if image.IsMain == true {
			return image
		}
	}
	return models.Image{}
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
	var data models.Image
	data.Path = "../../Images/4.png"
	data.Name = "testData"
	data.OwnerName = "test clinic1"
	data.Type = models.GP
	data.IsMain = true

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeGp Insert fake Gp
func FakeGp() {
	var db = models.InitDB()
	var data models.HospitalGp
	data.GpName = "test clinic1"
	data.PostCode = "4066"
	data.LocationX = 4
	data.LocationY = 4
	data.Address = "d1"
	data.About = "A1"
	data.OpeningTime = "1"
	data.Strengths = "1"

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

func FakeCreateTable() {
	var db = models.InitDB()
	err := db.AutoMigrate(&models.Image{})
	if err != nil {
		return 
	}
}