package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type UserInfo struct {
	ID uint
	BookingName string
}

func main() {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&UserInfo{})
	if err != nil {
		return
	}

	u1 := UserInfo{1, "预约1"}
	u2 := UserInfo{2, "预约2"}
	// 创建记录
	db.Create(&u1)
	db.Create(&u2)

	// 查询
	var u = new(UserInfo)
	db.First(u)
	fmt.Printf("%#v\n", u)
}