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
	data.FirstName = "Han"
	data.LastName = "Li"
	data.Password = "1"
	data.ClinicOrHospital = "NB clinic"
	data.Language = models.EN
	data.Monday = "9:00-17:00"
	data.Tuesday = "9:00-17:00"
	data.Wednesday = "9:00-17:00"
	data.Thursday = "9:00-17:00"
	data.Friday = "9:00-17:00"
	data.Saturday = "9:00-17:00"
	data.Sunday = "9:00-17:00"
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeImage Insert fake images
func FakeImage() {
	var db = models.InitDB()
	var data models.Image
	data.Path = "3.png"
	data.Name = "testData"
	data.OwnerName = "NB clinic"
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
	data.GpName = "NB clinic"
	data.PostCode = "4066"
	data.LocationX = 6
	data.LocationY = 6
	data.Address = "Level 10/39 Sherwood Rd, Toowong QLD 4066"
	data.About = "Proud to be a Better Medical Practice\nWe are excited to announce that our SmartClinics centres have now joined the Better Medical group of practices.\n\nBetter Medical operates 85 high-quality practices across Australia, which all have one thing in common – we want to be the best we can be for our patients.\n\nBeing part of the Better Medical Group provides our doctors and team members with many benefits, including more opportunities for professional development and better access to enhanced technologies, meaning we are better equipped and supported to help you.\n\nBetter still, the same doctors and staff who have always provided you with the highest standard of care will continue to do so in our clinics.\n\nFor more information about Better Medical, please visit"
	data.Strengths = "1"
	data.Monday = "9:00-17:00"
	data.Tuesday = "9:00-17:00"
	data.Wednesday = "9:00-17:00"
	data.Thursday = "9:00-17:00"
	data.Friday = "9:00-17:00"
	data.Saturday = "9:00-17:00"
	data.Sunday = "9:00-17:00"
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeBooking  Insert fake book information
func FakeBooking()  {
	var db = models.InitDB()
	//db.AutoMigrate(&models.Booking{})
		var data models.Booking
		data.UserName = "Kaipeng Zhang"
		data.UserId = 1
		data.BookTime = "2021/11/2,09:00-10:00"
		fmt.Println(data.BookTime)
		data.GpName = "NB clinic"
		data.DocName = "Han Li"
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
	err := db.AutoMigrate(&models.Doctor{})
	if err != nil {
		return 
	}
}