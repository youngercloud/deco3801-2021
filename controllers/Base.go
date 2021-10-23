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
	data.FirstName = "Keyoren"
	data.LastName = "Fernandes"
	data.Email = "KeyFer@gmail.com"
	data.PhoneNumber = "0498800147"
	data.Password = "1"
	data.ClinicOrHospital = "Brisbane GP and Travel Doctor"
	data.Specialty = "Travel medicine, Diving and underwater medicine"
	data.Language = models.EN
	data.Gender = "Male"
	data.Monday = "9:00-13:00"
	data.Tuesday = "9:00-13:00"
	data.Wednesday = "9:00-13:00"
	data.Thursday = "9:00-13:00"
	data.Friday = "9:00-14:00"
	data.Saturday = "Closed"
	data.Sunday = "Closed"
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeImage Insert fake images
func FakeImage() {
	var db = models.InitDB()
	var data models.Image
	data.Name = "Dr"
	data.Path =  "Dr.png"
	data.Type = models.GP
	data.OwnerName = "Dr. Natasha Christa"
	data.IsMain = true
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeGp Insert fake Gp

func FakeGp() {
	var db = models.InitDB()
	var data models.HospitalGp
	data.GpName = "Dr. Natasha Christa	"
	data.PostCode = "4000"
	data.LocationX = -27.460249000565096
	data.LocationY = 153.02335695804226
	data.Address = "448 Boundary St, Spring Hill QLD 4000"
	data.About = "Welcome to Our GP Medical Centre in Spring Hill, where we have friendly staff and experienced General Practitioners who care for their patients health and well-being.\nWith support of healthcare professionals including nurses, admin and internal/external management sources, our doctors strive to achieve the best for you and your family."
	data.Strengths = "full range of medical services pathology and a physiotherapist"
	data.Monday = "8:30-17:00"
	data.Tuesday = "8:30-17:00"
	data.Wednesday = "8:30-17:00"
	data.Thursday = "10:00-19:00"
	data.Friday = "10:00-13:00"
	data.Saturday = "Closed"
	data.Sunday = "Closed"
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