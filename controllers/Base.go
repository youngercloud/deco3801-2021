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
	data.FirstName = "Fabrina"
	data.LastName = "Hossain"
	data.Email = "FabrinaHossain@gmail.com"
	data.PhoneNumber = "0411148123"
	data.Password = "1"
	data.ClinicOrHospital = "UQ St Lucia Medical Centre"
	data.Specialty = "Child health, Chronic disease management, Women’s health"
	data.Language = models.FR
	data.Gender = "Female"
	data.Monday = "9:00-13:00"
	data.Tuesday = "9:00-14:00"
	data.Wednesday = "9:00-14:00"
	data.Thursday = "9:00-12:00"
	data.Friday = "9:00-12:00"
	data.Saturday = "9:00-10:00"
	data.Sunday = "Closed"
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}


// FakeImage Insert fake images
func FakeImage() {
	var db = models.InitDB()
	var data models.Image
	data.Name = "Fabrina"
	data.Path = "Fabrina.png"
	data.Type = models.DOCTOR
	data.OwnerName = "Fabrina Hossain"
	data.IsMain = true
	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}

// FakeGp Insert fake Gp
func FakeGp() {
	var db = models.InitDB()
	var data models.HospitalGp
	data.GpName = "Brisbane GP and Travel Doctor"
	data.PostCode = "4000"
	data.LocationX = -27.45474988865088
	data.LocationY = 153.02546326754143
	data.Address = "4/400 Gregory Terrace, Spring Hill QLD"
	data.About = "We are a family practice that prides itself on the quality care we provide. Our patient’s health and wellbeing are – and always have been our greatest priorities. As a fully accredited general practice and travel vaccination clinic, our GPs and Allied Health professionals are all highly trained and passionate about what they do. Conveniently located close to the Brisbane CBD, our spacious and well-equipped rooms enable our experienced and friendly GPs to provide high-quality medical services, including general check-ups, vaccinations, skin checks, nutritional medicine, travel medicine, and dive medicals."
	data.Strengths = "General Medicine%Aviation and Occupational Medicine%Women’s Health"
	data.Monday = "8:30-16:30"
	data.Tuesday = "8:30-16:30"
	data.Wednesday = "8:30-16:30"
	data.Thursday = "8:00-16:30"
	data.Friday = "8:00-16:30"
	data.Saturday = "9:00-13:00"
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