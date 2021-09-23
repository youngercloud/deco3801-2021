package controllers

import (
	_ "database/sql"
	"deco3801/models"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-playground/validator/v10/translations/en"
	"math"
)

func Booking(c *gin.Context)  {
	var db = models.InitDB()
	var booking models.Booking
	err := c.Bind(&booking)
	if err != nil {
		return
	}
	if err := db.Create(&booking).Error; err != nil {
		c.JSON(200, gin.H{
			"creation": "false",
		})
		return
	}
	c.JSON(200, gin.H{
		"creation": "true",
	})
}

func insertCl() {
	var db = models.InitDB()
	var data models.HospitalGp
	data.GpName = "SB clinic"
	data.PostCode = "4066"
	data.LocationX = 1
	data.LocationY = 1
	data.Address = "傻逼"
	data.About = "都是傻逼"
	data.OpeningTime = "assdhgdfs"
	data.Strengths = "asfdadA"

	if err := db.Create(&data).Error; err != nil {
		fmt.Println("error!")
	}
}
func calDistance(cunX int, cunY int, gpX int, gpY int) int {
	var distance = math.Cbrt(float64((cunX - gpX)*(cunX-gpX) + (cunY - gpY)*(cunY-gpY)))
	return int(distance)
}


func bookSearch()  {
	var db = models.InitDB()
	//var myLocationX = 0
	//var myLocationY = 0
	//var distance = 0
	var input =  "4066"
	var language = ""


	fmt.Println("start")
	GpInformation := models.HospitalGp{}

	//if unicode.IsNumber(input) {
		db.Raw("SELECT A.* FROM hospital_gps A, doctors B WHERE A.id = B.clinic_or_hospital AND B.language = ? AND post_code = ?", language, input).Find(&GpInformation)
	fmt.Println("end")
	fmt.Println(GpInformation.GpName)

	//} else {
	//	db.Raw("SELECT A.GpName A.LocationX A.LocationY FROM HostipalGp A, Doctor B WHERE A.id = B. ClinicOrHospital AND B.Language = ? AND GpName Like = ?", language, "%"+input+"%").Find(&GpInformation)
	//}
	//var RealDistance = calDistance(myLocationX,myLocationY, GpInformation.LocationX,GpInformation.LocationY)
	//if RealDistance > distance {
	//
	//}


}

//db.Joins("join Doctor as a on a.ClinicOrHospital = GP.ID").Where("A.Language Like ?", "%"+language+"%").Find(GpInformation)

//func findLanguages(clinicName string) []string {
//
//}
