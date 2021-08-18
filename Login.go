package main

import (
	"errors"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Login(UserId int, Password string) bool {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		println(err)
	}

	user := Users{};
	db.Where("UserId = ? and Password = ?",UserId,Password).Take(&user)
	errType := db.Take(&user).Error
	if errors.Is(errType, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return false
	} else if err != nil {
		fmt.Println("Search Fail, There is an error", err)
		return false
	} else{
		return true
	}
}
