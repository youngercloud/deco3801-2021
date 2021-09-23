package controllers

import (
	_ "database/sql"
	"deco3801/models"
	"github.com/gin-gonic/gin"
	_ "github.com/go-playground/validator/v10/translations/en"
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

//func calDistance(cunX int, cunY int, gpX int, gpY int) int {
//	var distance = math.Cbrt(float64((cunX - gpX)(cunX-gpX) + (cunY - gpY)(cunY-gpY)))
//	return int(distance)
//}


//func bookSearch(c *gin.Context)  {
//	var db = models.InitDB()
//	var clinicInfo models.Institution
//	var myLocationX = 0
//	var myLocationY = 0
//	//var distance = 0
//	var input =  ""
//	var language = ""
//	err := c.Bind(&clinicInfo)
//	if err != nil {
//		return
//	}
//
//	if err := db.Create(&clinicInfo).Error; err != nil {
//		c.JSON(200, gin.H{
//			"creation": "false",
//		})
//		return
//	}
//	c.JSON(200, gin.H{
//		"creation": "true",
//	})
//
//	GpInformation := models.HospitalGp{}
//	if unicode.IsNumber(input) {
//		db.Raw("SELECT A.GpName A.LocationX A.LocationY FROM HostipalGp A, Doctor B WHERE A.id = B. ClinicOrHospital AND B.Language = ? AND PostCode = ?", language, input).Find(&GpInformation)
//	} else {
//		db.Raw("SELECT A.GpName A.LocationX A.LocationY FROM HostipalGp A, Doctor B WHERE A.id = B. ClinicOrHospital AND B.Language = ? AND GpName Like = ?", language, "%"+input+"%").Find(&GpInformation)
//	}
//
//	var RealDistance = calDistance(myLocationX,myLocationY, GpInformation.LocationX,GpInformation.LocationY)
//
//
//}

//db.Joins("join Doctor as a on a.ClinicOrHospital = GP.ID").Where("A.Language Like ?", "%"+language+"%").Find(GpInformation)

//func findLanguages(clinicName string) []string {
//
//}
