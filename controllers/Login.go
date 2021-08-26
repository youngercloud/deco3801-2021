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
	UserName string `gorm:"not null;size:256"`
	Password string `gorm:"not null;size:256"`
}

func LoginHandler(c *gin.Context)  {
	var db = models.InitDB()
	var userLoginData userLogin
	err := c.Bind(&userLoginData)
	if err != nil {
		return 
	}
	var isValid = Login(userLoginData.UserName, userLoginData.Password, *db)

	c.JSON(http.StatusNotFound, gin.H{
		"UserName" : userLoginData.UserName,
		"isValid" : isValid,
	})
}

func Test(c *gin.Context) {
	c.String(http.StatusOK, "true")
}

func Login(UserName string, Password string, db gorm.DB) bool {
	user := models.User{}
	err := db.Where("name = ? AND password = ?",UserName,Password).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return false
	}  else{
		return true
	}
}
