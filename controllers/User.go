package controllers

import (
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//ChangeUserInfo Update a new user information into database
func ChangeUserInfo(c *gin.Context) {
	type Info struct {
		Name string
		Password string
		Gender string
		Language string
		DoB string
		Mail string
		PhoneNumber string
	}
	var db = models.InitDB()
	var info Info
	var user models.User
	err := c.Bind(&info)
	if err != nil {
		return
	}
	fmt.Println(info)
	err = db.Where("name = ? AND password = ?", info.Name, info.Password).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return
	}
	user.Language = info.Language
	user.Gender = info.Gender
	user.Mail = info.Mail
	user.PhoneNumber = info.PhoneNumber
	user.DoB = info.DoB

	db.Save(&user)

}
