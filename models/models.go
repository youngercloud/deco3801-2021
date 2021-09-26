package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

type BaseModel struct {
	ID        uint `gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type User struct {
	BaseModel
	Name string `gorm:"index:idx_name,unique;size:256"`
	Password string `gorm:"not null;size:256"`
	Gender string `gorm:"size:256"`
	DoB string `gorm:"size:256"`
	Mail string `gorm:"not null;size:256"`
	PhoneNumber string `gorm:"size:256"`
	Language string `gorm:"size:256"`
	Nationality string `gorm:"size:256"`
}

type Doctor struct {
	BaseModel
	Password string `gorm:"not null;size:256"`
	FirstName string `gorm:"not null;size:256"`
	LastName string `gorm:"not null;size:256"`
	DOB string `gorm:"size:256"`
	Gender string `gorm:"not null;size:256"`
	Email string `gorm:"not null;size:256"`
	PhoneNumber int `gorm:"size:256"`
	ClinicOrHospital string `gorm:"size:256"`
	Specialty string `gorm:"size:256"`
	Language string `gorm:"size:256"`
}


type Booking struct {
	BaseModel
	DoctorID uint
	Doctor Doctor
	Date time.Time
	UserID uint
	User User
	AcceptOrNot bool
}

type HospitalGp struct {
	BaseModel
	GpName string `gorm:"not null;size:256"`
	PostCode string `gorm:"not null;size:256"`
	LocationX int `gorm:"not null;size:256"`
	LocationY int `gorm:"not null;size:256"`
	Address string `gorm:"not null;size:256"`
	About string `gorm:"not null;size:256"`
	OpeningTime string `gorm:"not null;size:256"`
	Strengths string `gorm:"not null;size:256"`
}

func InitDB() *gorm.DB {
	dsn := "stu:deco3801@tcp(34.87.198.176:3306)/users?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		println(err)
	}
	err = db.AutoMigrate(&User{}, &Doctor{}, &Booking{}, &HospitalGp{})
	return db
}

