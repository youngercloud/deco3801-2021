package controllers

import (
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func isContain(data string, dataList []string) bool{
	fmt.Println("完成医生多重语言的list检测！")
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
	data.FirstName = "GEETHA "
	data.LastName = "DHILEEPAN"
	data.Email = "geeDh@gmail.com"
	data.PhoneNumber = "0458523533"
	data.Password = "1"
	data.ClinicOrHospital = "MyHealth"
	data.Specialty = "Women’s health, Child Health, Travel Medicine, Skin Cancer Checks and Surgery, Chronic Medical conditions including Preventative health\n"
	data.Language = models.TA
	data.Gender = "Female"
	data.Monday = "9:00-13:00"
	data.Tuesday = "9:00-14:00"
	data.Wednesday = "9:00-14:00"
	data.Thursday = "9:00-12:00"
	data.Friday = "9:00-12:00"
	data.Saturday = "9:00-10:00"
	data.Sunday = "9:00-11:00"
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeImage Insert fake images
func FakeImage() {
	var db = models.InitDB()
	var data models.Image
	data.Name = "MyHealth_NotMain3"
	data.Path =  "MyHealth_NotMain3.png"
	data.Type = models.GP
	data.OwnerName = "MyHealth"
	data.IsMain = false

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeGp Insert fake Gp

func FakeGp() {
	var db = models.InitDB()
	var data models.HospitalGp
	data.GpName = "MyHealth"
	data.PostCode = "4066"
	data.LocationX = -27.483970183572385
	data.LocationY = 152.9925428430241
	data.Address = "Shop 17, Level 1 Toowong Village 9 Sherwood Road Toowong QLD 4066"
	data.About = "Myhealth Toowong is a mixed billing clinic which is conveniently situated on Level 1 (the Kmart Level) in Toowong Village Shopping Centre.\nOur doctors strive to provide utmost quality care to their patients. We welcome new patients and also accommodate walk-in patients where possible. We are RACGP 4th edition standard accredited.\nWe offer a full range of medical services with pathology and a physiotherapist onsite for added convenience. We also offer Travel Vaccines, and are also Yellow Fever and Q Fever accredited.\n"
	data.Strengths = "full range of medical services%pathology and a physiotherapist"
	data.Monday = "8:00-17:00"
	data.Tuesday = "8:00-17:00"
	data.Wednesday = "8:00-17:00"
	data.Thursday = "8:00-17:00"
	data.Friday = "8:00-17:00"
	data.Saturday = "9:00-15:00"
	data.Sunday = "9:00-15:00"
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