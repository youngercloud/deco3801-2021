package main
import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type Users struct {
	Name string `gorm:"primary_key;size:256"`
	Password string `gorm:"not null;size:256"`
	Gender string `gorm:"size:256"`
	Dob string `gorm:"size:256"`
	Age int `gorm:"size:256"`
	Mail string `gorm:"not null;size:256"`
	PhoneNumber string `gorm:"size:256"`
	Address string `gorm:"size:256"`
	Language string `gorm:"size:256"`
	Nationality string `gorm:"size:256"`
}

type Doctors struct {
	DoctorId uint `gorm:"primary_key"`
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

func GetAge(Dob string) int {
	var DobList = strings.Split(Dob, "/")
	var year, err = strconv.Atoi(DobList[0])
	if err != nil {
		return -1
	}
	return time.Time{}.Year() - year
}

func SignUpHandler(c *gin.Context) {
	var db = SignUpDatabaseSetup()
	var userData Users

	err := c.Bind(&userData)
	if err != nil {
		return 
	}

	fmt.Println(userData)
	c.String(http.StatusOK, "Accept data from front-end!")
	SignUpUser(userData, *db)
}

func SignUpDatabaseSetup() *gorm.DB{
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

func SignUpUser(UserData Users, db gorm.DB) {
	if err := db.Create(&UserData).Error; err != nil {
		fmt.Println("InsertFail", err)
		return
	}
}

func SignUpDoctor(DocData Doctors, db gorm.DB) {
	if err := db.Create(&DocData).Error; err != nil {
		fmt.Println("InsertFail", err)
		return
	}
}