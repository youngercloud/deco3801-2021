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
	data.Path = ".png"
	data.Name = "UQ St Lucia Medical Centre.main"
	data.OwnerName = "UQ St Lucia Medical Centre"
	data.Type = models.GP
	data.IsMain = true

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}

	data.Path = ".png"
	data.Name = "Toowong Gps.main"
	data.OwnerName = "Toowong Gps"
	data.Type = models.GP
	data.IsMain = true

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}

	data.Path = ".png"
	data.Name = "MyHealth.main"
	data.OwnerName = "MyHealth"
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
	data.GpName = "UQ St Lucia Medical Centre"
	data.PostCode = "4072"
	data.LocationX = -27.496472451479686
	data.LocationY = 153.01557213301874
	data.Address = "The University of Queensland Level 1, Gordon Greenwood Building (Blg 32, St Lucia QLD 4067)"
	data.About = "The UQ St Lucia Medical Centre offers quality care for the University’s domestic students, international students and their dependents as well as staff right here on campus. Our experienced doctors and allied health professionals care about issues that affect student and staff health, from mental health to sexual health, skin checks and travel consults.\n"
	data.Strengths = "General medical consults%Immunisation%Mental health%Sexual health%Paediatric consults%Psychological counselling and psychiatric care%"
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
	err := db.AutoMigrate(&models.HospitalGp{})
	if err != nil {
		return 
	}
}