package controllers

import (
	_ "database/sql"
	"deco3801/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-playground/validator/v10/translations/en"
	"gorm.io/gorm"
	"math"
	"regexp"
	"strconv"
	"strings"
)

// BookingInsert Insert a new booking into database
func BookingInsert(c *gin.Context) {
	type Info struct {
		GpName       string
		GpAddr       string
		FirstName    string
		LastName     string
		UserName     string
		UserPassword string
		DocLang      string
		DocGender    string
		DocEmail     string
		Date         string
		Time         string
	}
	var db = models.InitDB()
	var info Info
	var newBooking models.Booking
	err := c.Bind(&info)
	if err != nil {
		return
	}
	var user models.User
	err = db.Where("name = ? AND password = ?", info.UserName, info.UserPassword).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no result")
		return
	}
	time, err := strconv.Atoi(strings.Split(info.Time, ":")[0])
	if err != nil {

		return
	}

	newBooking.GpName = info.GpName
	newBooking.DocName = info.FirstName + " " + info.LastName
	newBooking.UserName = info.UserName
	newBooking.UserId = int(user.ID)
	newBooking.GpAddr = info.GpAddr
	newBooking.DocLang = info.DocLang
	newBooking.DocGender = info.DocGender
	newBooking.DocEmail = info.DocEmail

	if 0 <= time && time <= 8 {
		newBooking.BookTime = info.Date + "," + "0" + strconv.Itoa(time) + ":00" + "-" + "0" + strconv.Itoa(time+1) + ":00"
	} else if time == 9 {
		newBooking.BookTime = info.Date + "," + "0" + strconv.Itoa(time) + ":00" + "-" + strconv.Itoa(time+1) + ":00"
	} else {
		newBooking.BookTime = info.Date + "," + strconv.Itoa(time) + ":00" + "-" + strconv.Itoa(time+1) + ":00"
	}

	if err := db.Create(&newBooking).Error; err != nil {
		c.JSON(200, gin.H{
			"validation": false,
		})
		return
	}
	c.JSON(200, gin.H{
		"validation": true,
	})
}

//calDistance Calculate distance between current position and gp position
func calDistance(gpX float64, cunX float64, gpY float64, cunY float64) float64 {

	radius := 6371000.0 //6378137.0
	rad := math.Pi / 180.0
	cunX = cunX * rad
	gpX = gpX * rad
	cunY = cunY * rad
	gpY = gpY * rad

	theta := cunY - gpY
	dist := math.Acos(math.Sin(gpX)*math.Sin(cunX) + math.Cos(gpX)*math.Cos(cunX)*math.Cos(theta))
	finalDis := math.Trunc(dist*radius/1000*1e2+0.5) * 1e-2
	return finalDis
}

//checkedPost Check if the given string is a post code
func checkedPost(input string) bool {
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

// InputData The data inputted from the input bar in front end
type InputData struct {
	Input       string
	DistanceMin string
	DistanceMax string
	CurrentDisX float64
	CurrentDisY float64
	Language    string
}

// HandleGpSearch This is the function that transfer the data of gp searching to front-end/**
func HandleGpSearch(c *gin.Context) {
	var searchCond InputData
	err := c.Bind(&searchCond)
	if err != nil {
		fmt.Println("error booking search")
		return
	}
	var dataList = gPSearch(searchCond)
	c.JSON(200, gin.H{
		"data": dataList,
	})
}

//searchReData A single gp information that will be returned to front-end as a list
type searchReData struct {
	Gp         models.HospitalGp
	GpStrength []string
	Language   []string
	Distance   string
	Images     models.Image
	GpImages   []models.Image
	DocInfos   []DocInfo
}

//gPSearch Return the data of gp searching in booking interface
func gPSearch(data InputData) []searchReData {
	var rawList []searchReData
	//var dataList []*searchReData
	var db = models.InitDB()
	var command = "SELECT * FROM hospital_gps"
	var GpInformation []models.HospitalGp

	data.Input = strings.TrimSpace(data.Input)

	//Step 1: Get all the Gp that match the input data
	if data.Input != "" {
		if checkedPost(data.Input) {
			db.Raw(command).Find(&GpInformation)
			//??????
			fmt.Println(data.CurrentDisX)
			//??????
			fmt.Println(data.CurrentDisY)
		} else {
			command += " WHERE gp_name LIKE ?"
			data.CurrentDisX = -27.497982097934575
			data.CurrentDisY = 153.01119711268808
		}
		db.Raw(command, "%"+data.Input+"%").Find(&GpInformation)
	} else {
		db.Raw(command).Find(&GpInformation)
		data.CurrentDisX = -27.497982097934575
		data.CurrentDisY = 153.01119711268808
	}

	//Step 2: Get the corresponding languages and distance of each gp
	for _, gp := range GpInformation {
		var eachData searchReData
		eachData.Gp = gp
		//language
		var language []string
		var doctors []models.Doctor
		db.Where("clinic_or_hospital = ?", gp.GpName).Find(&doctors)
		for _, doctor := range doctors {
			if !isContain(doctor.Language, language) {
				language = append(language, doctor.Language)
			}
		}
		eachData.Language = language
		//distance float -> string
		eachData.Distance = fmt.Sprintf("%.2f", calDistance(data.CurrentDisX, gp.LocationX, data.CurrentDisY, gp.LocationY))
		images := GetImages(models.GP, gp.GpName, 1, *db)
		if len(images) == 0 {
			eachData.Images = models.Image{}
		} else {
			eachData.Images = images[0]
		}
		eachData.GpImages = GetImages(models.GP, gp.GpName, 0, *db)
		eachData.DocInfos = HandleDocSearch(gp.GpName, *db)
		eachData.GpStrength = strings.Split(gp.Strengths, "%")
		rawList = append(rawList, eachData)
	}

	for i := 0; i < len(rawList); i++ {
		//Filtering languages and distance of data list
		//If not match then delete it from data list
		//if language not match
		if data.Language != "" {
			if !isContain(data.Language, rawList[i].Language) {
				rawList = append(rawList[:i], rawList[i+1:]...)
				i--
				continue
			}
		}

		//if distance not match
		if rawList[i].Distance < data.DistanceMin || rawList[i].Distance > data.DistanceMax {
			rawList = append(rawList[:i], rawList[i+1:]...)
			i--
			continue
		}
	}
	return rawList
}

//GetBookings get all the booking of the given user
func GetBookings(userName string, db gorm.DB) []models.Booking {
	var bookings []models.Booking
	err := db.Where("user_name = ? ", userName).Find(&bookings).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Println("There is no Gp")
		return nil
	} else {
		return bookings
	}
}

//CheckDocDate Check if the doctor are available in the given date
func CheckDocDate(c *gin.Context) {
	type DocInfo struct {
		Date      string
		GpName    string
		LastName  string
		FirstName string
	}
	var db = models.InitDB()
	var info DocInfo
	var bookings []models.Booking
	err := c.Bind(&info)
	if err != nil {
		fmt.Println("error booking search")
		return
	}

	//????????????????????????
	db.Where("gp_name = ? AND doc_name = ? AND book_time LIKE ?", info.GpName, info.FirstName+" "+info.LastName, "%"+info.Date+"%").Find(&bookings)
	if len(bookings) == 0 {
		c.JSON(200, gin.H{
			"validation": true,
		})
		return
	}
	//?????????book????????????????????????
	var antiTimes []int
	for _, each := range bookings {
		antiTime, _ := strconv.Atoi(strings.Split(strings.Split(strings.Split(each.BookTime, ",")[1], "-")[0], ":")[0])
		antiTimes = append(antiTimes, antiTime)
	}

	//?????????????????????book???????????????with????????????
	var doctor models.Doctor
	db.Where("first_name = ? AND last_name = ? AND clinic_or_hospital = ?", info.FirstName, info.LastName, info.GpName).Find(&doctor)

	minTime, _ := strconv.Atoi(strings.Split(strings.Split(doctor.Monday, "-")[0], ":")[0])
	maxTime, _ := strconv.Atoi(strings.Split(strings.Split(doctor.Monday, "-")[1], ":")[0])

	//?????????????????????????????????
	var sum = 0
	for i := minTime; i < maxTime; i++ {
		sum += i
	}

	//????????????????????????????????????
	var antiSum = 0
	for _, time := range antiTimes {
		antiSum += time
	}

	//???????????????????????????????????????????????????????????????????????????????????????
	if sum == antiSum {
		c.JSON(200, gin.H{
			"validation": false,
		})
	} else {
		c.JSON(200, gin.H{
			"validation": true,
		})
	}
}

//CheckDocTime Check if the doctor are available in the given time
func CheckDocTime(c *gin.Context) {
	type DocInfo struct {
		Date      string
		Time      string
		GpName    string
		LastName  string
		FirstName string
	}
	var db = models.InitDB()
	var info DocInfo
	var bookings []models.Booking
	err := c.Bind(&info)
	if err != nil {
		fmt.Println("error booking search")
		return
	}
	//????????????????????????
	db.Where("gp_name = ? AND doc_name = ? AND book_time LIKE ?", info.GpName, info.FirstName+" "+
		info.LastName, "%"+info.Date+","+info.Time+"%").Find(&bookings)
	if len(bookings) == 0 {
		c.JSON(200, gin.H{
			"validation": true,
		})
	} else {
		c.JSON(200, gin.H{
			"validation": false,
		})
	}
}

//GetUserBookings Return all the booking information as a list to front-end of a corresponding user
func GetUserBookings(c *gin.Context) {
	type ReturnData struct {
		FirstName   string
		LastName    string
		GpName      string
		DocLanguage string
		BookingTime string
		Image       models.Image
	}
	var db = models.InitDB()
	var dataList []ReturnData
	var info models.Booking
	err := c.Bind(&info)
	if err != nil {
		fmt.Println("error booking require")
	}
	bookings := GetBookings(info.UserName, *db)

	for _, each := range bookings {
		n := strings.Split(each.DocName, " ")
		var obj ReturnData
		fmt.Println(n[0] + " " + n[1])
		fmt.Println(GetImages(models.DOCTOR, n[0]+" "+n[1], 1, *db))
		obj.Image = GetImages(models.DOCTOR, n[0]+" "+n[1], 1, *db)[0]
		obj.FirstName = n[0]
		obj.LastName = n[1]
		obj.GpName = each.GpName
		obj.DocLanguage = each.DocLang
		obj.BookingTime = each.BookTime
		dataList = append(dataList, obj)
	}
	c.JSON(200, gin.H{
		"data": dataList,
	})
}
