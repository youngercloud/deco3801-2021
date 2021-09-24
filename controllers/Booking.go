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
	data.GpName = "1213 clinic"
	data.PostCode = "4066"
	data.LocationX = 1
	data.LocationY = 1
	data.Address = "sb"
	data.About = "scscsc"
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
func checkedPost(input string) bool{
	return false
}

type InputData struct{
	input string
	distanceMin string
	distanceMax string
	language string
}

func bookSearch(data InputData)  {
	var db = models.InitDB()
	//var myLocationX = 0
	//var myLocationY = 0
	//var distanceMin = data.distanceMin
	//var distanceMax = data.distanceMax
	var input =  data.input
	var language = data.language
	//var command = "SELECT * FROM hospital_gps"
	var GpInformation []*models.HospitalGp

	if &input != nil {
		db.Raw("SELECT A.* FROM hospital_gps A, doctors B WHERE A.id = B.clinic_or_hospital AND B.language = ? AND post_code = ?", language, input).Find(&GpInformation)
	}

	if &language != nil {

	}

	//弄明白怎么把符合条件的gp存到list里面
	fmt.Println("start")

	//if unicode.IsNumber(input) {
		db.Raw("SELECT * FROM hospital_gps").Find(&GpInformation)
	fmt.Println("end")
	for i := 0; i < len(GpInformation); i++ {
		fmt.Println(GpInformation[i].GpName)
	}
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
