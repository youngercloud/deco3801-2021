package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

type Institution struct {
	IId uint `gorm:"primary_key"`
	InstitutionName string `gorm:"not null;size:256"`
	Classify string `gorm:"not null;size:256"`
	Location string `gorm:"not null"`
}

type Doctor struct {
	DId uint `gorm:"primary_key;"`
	FirstName string `gorm:"not null;size:128"`
	LastName string `gorm:"not null;size:128"`
	Institution Institution `gorm:"ForeignKey:IId"`
	InstitutionId uint
	Specialty string `gorm:"type:text"`
}

type Patient struct {
	PId uint `gorm:"primary_key;"`
	FirstName string `gorm:"size:128"`
	LastName string `gorm:"size:128"`
	Dob time.Time
	Gender uint
	Case string `gorm:"type:text"`
}

type Reverse struct {
	ReverseId uint `gorm:"primary_key;"`
	Doctor Doctor `gorm:"foreignKey: DId"`
	DoctorId uint
	Date time.Time
	Patient Patient `gorm:"foreignKey: PId"`
	PatientId uint
	AcceptOrNot bool
}




func databaseSetup() {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	println(1)
	if err != nil {
		println(err)
	}

	err = db.AutoMigrate(&Reverse{}, &Doctor{}, &Institution{}, &Patient{})
	if err != nil {
		return
	}


}