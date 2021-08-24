package main
import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"net/http"
	"time"
)

type Users struct {
	//UserId uint `gorm:"primary_key"`
	Name string `gorm:"primary_key;size:256"`
	Password string `gorm:"not null;size:256"`
	//DOB time.Time
	Gender string `gorm:"size:256"`
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
	DOB time.Time
	Gender string `gorm:"not null;size:256"`
	Email string `gorm:"not null;size:256"`
	PhoneNumber int `gorm:"size:256"`
	ClinicOrHospital string `gorm:"size:256"`
	Specialty string `gorm:"size:256"`
	Language string `gorm:"size:256"`
}

func SignUpHandler(c *gin.Context) {
	var db = SignUpDatabaseSetup();
	var userData Users
	c.Bind(&userData)
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
	db.Create(&UserData)
	if err := db.Create(&UserData).Error; err != nil {
		fmt.Println("InsertFail", err)
		return
	}
}


func SignUpDoctor(db gorm.DB) {

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