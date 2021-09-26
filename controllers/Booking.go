package controllers

import (
	_ "database/sql"
	"deco3801/models"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-playground/validator/v10/translations/en"
	"gorm.io/gorm"
	"math"
	"regexp"
	"strconv"
	"strings"
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

func calDistance(cunX int, cunY int, gpX int, gpY int) int {
	var distance = math.Cbrt(float64((cunX - gpX)*(cunX-gpX) + (cunY - gpY)*(cunY-gpY)))
	return int(distance)
}

/**
Check if the given string is a post code
 */
func checkedPost(input string) bool{
	var data = regexp.MustCompile(`\d{4}`)
	var result = data.FindAllString(input, -1)
	if len(result) == 1 {
		input = strings.Replace(input, result[0], "", 1)
		data = regexp.MustCompile(`\d+|\D+`)
		result = data.FindAllString(input, -1)
		return !(len(result) >= 1)
	}
	return false
}

// InputData 名字开头必须大写才能在其他文件被外部call
type InputData struct{
	Input string
	DistanceMin string
	DistanceMax string
	Language string
}

type searchReData struct {
	Gp models.HospitalGp
	Language []string
	Distance string
}


// HandleGpSearch This is the function that transfer the data of gp searching to front-end/**
func HandleGpSearch(c *gin.Context)  {
	var searchCond InputData
	err := c.Bind(&searchCond)
	if err != nil {
		fmt.Println("error booking search")
		return
	}
	var dataList = gPSearch(searchCond)
	fmt.Print("datalist: ")
	fmt.Println(dataList)
	c.JSON(200, gin.H{
		"data": dataList,
	})
}

/**
This is the function that return the data of gp searching in booking interface
 */
func gPSearch(data InputData) []*searchReData {
	var dataList []*searchReData
	var db = models.InitDB()
	var myLocationX = 0
	var myLocationY = 0
	var command = "SELECT * FROM hospital_gps"
	var GpInformation []models.HospitalGp

	//去除首尾空格
	data.Input = strings.TrimSpace(data.Input)
	if &data.Input != nil || &data.Language != nil {
		command += " WHERE"
	}

	//Step 1: Get all the Gp that match the input data
	if &data.Input != nil {
		if checkedPost(data.Input) {
			command += " post_code = ?"
		} else {
			//以后可能会变为模糊搜索
			command += " gp_name = ?"
		}
		db.Raw(command, data.Input).Find(&GpInformation)
	}

	//Step 2: Get the corresponding languages and distance of each gp
	for _, gp := range GpInformation {
		var eachData searchReData
		eachData.Gp = gp
		//language
		var language []string
		for _, doctor := range findDocByGp(db, gp.GpName) {
			if !isContain(doctor.Language, language) {
				language = append(language, doctor.Language)
			}
		}
		eachData.Language = language
		//distance int -> string
		eachData.Distance = strconv.Itoa(calDistance(myLocationX, myLocationY, gp.LocationX, gp.LocationY))
		dataList = append(dataList, &eachData)
	}
	//Filtering languages and distance of data list
	//If not match then delete it from data list
	for i, eachData := range dataList {
		//if language not match

		if data.Language != "" {
			if !isContain(data.Language, eachData.Language) {
				dataList = append(dataList[:i], dataList[i+1:]...)
				continue
			}
		}

		//if distance not match
		if eachData.Distance < data.DistanceMin || eachData.Distance > data.DistanceMax {
			dataList = append(dataList[:i], dataList[i+1:]...)
			continue
		}
	}
	return dataList
}

/**
Find all the doctors that belongs to the given Gp Name
 */
func findDocByGp(db *gorm.DB, GpName string) []models.Doctor {
	var doctors []models.Doctor
	db.Raw("SELECT * FROM doctors WHERE clinic_or_hospital = ?", GpName).Find(&doctors)
	return doctors
}

func isContain(data string, dataList []string) bool{
	for _, str := range dataList {
		if data == str {
			return true
		}
	}
	return false
}
