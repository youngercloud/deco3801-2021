package controllers

import (
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type userLogin struct {
	Name string `gorm:"not null;size:256"`
	Password string `gorm:"not null;size:256"`
}

//LoginUser Functionality that can allow user to login
func LoginUser(c *gin.Context)  {
	var db = models.InitDB()
	var userLoginData userLogin
	err := c.Bind(&userLoginData)
	if err != nil {
		return 
	}
	var user, validation = Login(userLoginData.Name, userLoginData.Password, *db)
	c.JSON(http.StatusOK, gin.H{
		"User" : user,
		"validation" : validation,
	})
}

//Login Check if the user is already signed up
func Login(UserName string, Password string, db gorm.DB) (models.User, bool) {
	user := models.User{}
	err := db.Where("name = ? AND password = ?",UserName,Password).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return models.User{}, false
	}  else{
		return user, true
	}
}
