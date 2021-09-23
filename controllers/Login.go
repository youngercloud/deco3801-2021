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


func LoginUser(c *gin.Context)  {
	var db = models.InitDB()
	var userLoginData userLogin
	err := c.Bind(&userLoginData)
	if err != nil {
		return 
	}
	var validation = Login(userLoginData.Name, userLoginData.Password, *db)
	fmt.Println(validation)
	c.JSON(http.StatusOK, gin.H{
		"UserName" : userLoginData.Name,
		"validation" : validation,
	})
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
