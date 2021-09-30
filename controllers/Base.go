package controllers

import (
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func isContain(data string, dataList []string) bool{
	for _, str := range dataList {
		if data == str {
			return true
		}
	}
	return false
}

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
func GetImages(imType models.ImageType, owner string, isMain int, db gorm.DB) []models.Image {
	var images []models.Image
	if isMain != 1 && isMain != 0 {
		err := db.Where("type = ? AND owner_name = ?", imType, owner).Find(&images).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("There is no result")
			return []models.Image{}
		}
	} else {
		err := db.Where("type = ? AND owner_name = ? AND is_main = ?", imType, owner, isMain).Find(&images).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("There is no result")
			return []models.Image{}
		}
	}
	return images
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
	data.Path = "2.png"
	data.Name = "testData"
	data.OwnerName = "1213 clinic"
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

// FakeBooking  Insert fake book information
func FakeBooking()  {
	var db = models.InitDB()
	var data models.Booking
	data.UserName = "Kaipeng Zhang"
	data.UserId = 6
	data.BookTime = "09/30/2021"
	data.GpName = "SB clinic"
	data.DocName = "Weijia Tang"
	data.DocEmail = "weijiaT@gmail.com"
	data.DocGender = "Unknown"
	data.DocLang = "Chinese"
	data.GpAddr = "Scape Mars"

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

func FakeCreateTable() {
	var db = models.InitDB()
	err := db.AutoMigrate(&models.Booking{})
	if err != nil {
		return 
	}
}