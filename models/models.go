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

type AvailableTime struct {
	Monday string `gorm:"size:256"`
	Tuesday string `gorm:"size:256"`
	Wednesday string `gorm:"size:256"`
	Thursday  string `gorm:"size:256"`
	Friday    string `gorm:"size:256"`
	Saturday string `gorm:"size:256"`
	Sunday string `gorm:"size:256"`
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
	Specialty     string `gorm:"size:256"`
	AvailableTime `gorm:"size:256"`
	Language      string `gorm:"size:256"`
}

type HospitalGp struct {
	BaseModel
	GpName string `gorm:"not null;size:256"`
	PostCode string `gorm:"not null;size:256"`
	LocationX int `gorm:"not null;size:256"`
	LocationY int `gorm:"not null;size:256"`
	Address string `gorm:"not null;size:256"`
	About string `gorm:"not null;size:65536"`
	Strengths string `gorm:"not null;size:256"`
	AvailableTime `gorm:"size:256"`
}

type Booking struct {
	BaseModel
	UserId int `gorm:"not null;size:256"`
	UserName string `gorm:"not null;size:256"`
	GpName string `gorm:"not null;size:256"`
	GpAddr string `gorm:"not null;size:256"`
	DocName string `gorm:"not null;size:256"`
	DocLang string `gorm:"not null;size:256"`
	DocGender string `gorm:"not null;size:256"`
	DocEmail string `gorm:"not null;size:256"`
	BookTime string `gorm:"not null;size:256"`
}


type ImageType int32

const (
	GP ImageType = 0
	DOCTOR ImageType = 1
	HOSPITAL ImageType = 3
	LANGUAGE ImageType = 4
)

type Image struct {
	BaseModel
	Name string `gorm:"not null;size:256"`
	Path	string `gorm:"not null;size:256"`
	Type      ImageType `gorm:"not null;size:256"`
	OwnerName string `gorm:"not null;size:256"`
	IsMain bool `gorm:"not null;size:256"`
}


const (
	CN = "Chinese"
	EN = "English"
	JP = "Japanese"
)

func InitDB() *gorm.DB {
	dsn := "stu:deco3801@tcp(34.87.198.176:3306)/users?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		println(err)
	}
	return db
}

