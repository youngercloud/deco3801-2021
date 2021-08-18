package main
import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

type Users struct {
	UserId uint `gorm:"primary_key"`
	Password string `gorm:"not null;size:256"`
	FirstName string `gorm:"not null;size:256"`
	LastName string `gorm:"not null;size:256"`
	DOB time.Time
	Gender string `gorm:"not null;size:256"`
	Email string `gorm:"not null;size:256"`
	PhoneNumber int `gorm:"size:256"`
	Address string `gorm:"size:256"`
	Language string `gorm:"size:256"`
	Nationality string `gorm:"size:256"`
}

type Doctors struct {
	DoctorId uint `gorm:"primary_key"`
	Password string `gorm:"not null;size:256"`
	FirstName string `gorm:"not null;size:256"`
	LastName string `gorm:"not null;size:256"`
	DOB time.Time
	Gender string `gorm:"not null;size:256"`
	Email string `gorm:"not null;size:256"`
	PhoneNumber int `gorm:"size:256"`
	ClinicOrHospital string `gorm:"size:256"`
	Specialty string `gorm:"size:256"`
	Language string `gorm:"size:256"`
}


func SignUpDatabaseSetup() {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	println(1)
	if err != nil {
		println(err)
	}

	err = db.AutoMigrate(&Users{}, &Doctor{})
	if err != nil {
		return
	}
}

func SignUpUser() {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		println(err)
	}
	NewSignUp := Users{
		UserId:1,
		Password:"password",
		FirstName:"Dasima",
		LastName:"Wuhu",
		DOB:time.Now(),
		Gender:"123456",
		Email:"Roudanchongji@qq.com",
		PhoneNumber:030,
		Address:"",
		Language:"",
		Nationality:"",
	}
	db.Create(&NewSignUp)
	if err := db.Create(&NewSignUp).Error; err != nil {
		fmt.Println("InsertFail", err)
		return
	}
}

func SignUpDoctor() {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		println(err)
	}
	NewSignUpDoctor := Doctors{
		DoctorId:         1,
		Password:         "password",
		FirstName:        "Dasima",
		LastName:         "Wuhu",
		DOB:              time.Now(),
		Gender:           "123456",
		Email:            "Roudanchongji@qq.com",
		PhoneNumber:      030,
		ClinicOrHospital: "",
		Specialty:        "",
		Language:         "",
	}
	db.Create(&NewSignUpDoctor)
	if err := db.Create(&NewSignUpDoctor).Error; err != nil {
		fmt.Println("InsertFail", err)
		return
	}
}