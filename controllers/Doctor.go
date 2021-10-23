package controllers

import (
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DocInfo struct {
	Doctor models.Doctor
	Image []models.Image
}

func HandleDocSearch(gpName string, db gorm.DB) []DocInfo {
	var docInfos []DocInfo
	var doctors []models.Doctor
	db.Where("clinic_or_hospital = ?", gpName).Find(&doctors)

	for _, doctor := range doctors {
		var images []models.Image
		var docInfo DocInfo
		db.Where("owner_name LIKE ? AND type = ?", doctor.FirstName + " " + doctor.LastName, models.DOCTOR).Find(&images)
		docInfo.Doctor = doctor
		docInfo.Image = images
		docInfos = append(docInfos, docInfo)
	}
	return docInfos
}

func GetDoctorsByUser(c *gin.Context) {
	type info struct {
		name string
		password string
	}
	var db = models.InitDB()
	var userInfo info
	var user models.User
	var bookings []models.Booking

	err := c.Bind(&userInfo)
	if err != nil {
		fmt.Println("error booking require")
	}
	err = db.Where("name = ? AND password = ?", userInfo.name, userInfo.password).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is such user")
		return
	}

	err = db.Where("user_id = ? AND user_name = ?", user.ID, user.Name).Find(&bookings).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no bookings of this user")
		return
	} else if len(bookings) == 0 {
		fmt.Println("There is no bookings of this user")
		return
	}


}

