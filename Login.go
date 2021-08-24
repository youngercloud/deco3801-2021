package main

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"net/http"
)

type userLogin struct {
	UserName string `gorm:"not null;size:256"`
	Password string `gorm:"not null;size:256"`
}

func LoginHandler(c *gin.Context)  {
	var db = LoginDatabaseSetup()
	var userLoginData userLogin
	c.Bind(&userLoginData)
	var isValid = Login(userLoginData.UserName, userLoginData.Password, *db)

	c.JSON(http.StatusNotFound, gin.H{
		"UserName" : userLoginData.UserName,
		"isValid" : isValid,
	})

}

func LoginDatabaseSetup() *gorm.DB{
	dsn := "stu:deco3801@tcp(34.87.198.176:3306)/users?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		println(err)
	}

	err = db.AutoMigrate(&Users{}, &Doctor{})
	if err != nil {
		return nil
	}
	return db
}

func Login(UserName string, Password string, db gorm.DB) bool {
	user := Users{}
	err := db.Where("name = ? AND password = ?",UserName,Password).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return false
	}  else{
		return true
	}
}
