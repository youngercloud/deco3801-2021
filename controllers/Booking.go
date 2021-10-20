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

func BookingInsert(c *gin.Context)  {
	type Info struct {
		GpName string
		GpAddr string
		FirstName string
		LastName string
		UserName string
		UserPassword string
		DocLang string
		DocGender string
		DocEmail string
		Date string
		Time string
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
	time, err := strconv.Atoi( strings.Split(info.Time, ":")[0])
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

	if  0 <= time && time <= 8 {
		newBooking.BookTime = info.Date + "," + "0" + strconv.Itoa(time) + ":00" + "-" + "0" + strconv.Itoa(time + 1) + ":00"
	} else if time == 9 {
		newBooking.BookTime = info.Date + "," + "0" + strconv.Itoa(time) + ":00" + "-" + strconv.Itoa(time + 1) + ":00"
	} else {
		newBooking.BookTime = info.Date + "," + strconv.Itoa(time) + ":00" + "-" + strconv.Itoa(time + 1) + ":00"
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



// HandleGpSearch This is the function that transfer the data of gp searching to front-end/**
func HandleGpSearch(c *gin.Context)  {
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

type searchReData struct {
	Gp models.HospitalGp
	Language []string
	Distance string
	Images models.Image
	GpImages []models.Image
	DocInfos []DocInfo
}

/**
This is the function that return the data of gp searching in booking interface
 */
func gPSearch(data InputData) []searchReData {
	var rawList []searchReData
	//var dataList []*searchReData
	var db = models.InitDB()
	var myLocationX = 0
	var myLocationY = 0
	var command = "SELECT * FROM hospital_gps"
	var GpInformation []models.HospitalGp

	//去除首尾空格
	data.Input = strings.TrimSpace(data.Input)



	//Step 1: Get all the Gp that match the input data
	if data.Input != "" {
		if checkedPost(data.Input) {
			command += " WHERE post_code LIKE ?"
		} else {
			//以后可能会变为模糊搜索
			command += " WHERE gp_name LIKE ?"
		}
		db.Raw(command, "%" + data.Input + "%").Find(&GpInformation)
	} else {
		db.Raw(command).Find(&GpInformation)
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
		//distance int -> string
		eachData.Distance = strconv.Itoa(calDistance(myLocationX, myLocationY, gp.LocationX, gp.LocationY))
		images := GetImages(models.GP, gp.GpName, 1, *db)
		if len(images) == 0 {
			eachData.Images = models.Image{}
		} else {
			eachData.Images = images[0]
		}
		eachData.GpImages = GetImages(models.GP, gp.GpName, 0, *db)
		eachData.DocInfos = HandleDocSearch(gp.GpName, *db)
		rawList = append(rawList, eachData)
	}

	//待测试
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

func GetAvailability(c *gin.Context)  {
	var db = models.InitDB()
	var userName string
	var bookings []models.Booking
	err := c.Bind(&userName)
	if err != nil {
		fmt.Println("error booking require")
	}
	bookings = GetBookings(userName, *db)
	if bookings != nil {
		c.JSON(200, gin.H{
			"myBookings": bookings,
		})
	}
}

func HandleGetBookings(c *gin.Context) {
	//type doctorCons struct {
	//	name string
	//	data string
	//}
	//var db = models.InitDB()
	//var userName string
	//var info doctorCons
	//var bookings []models.Booking
	//err := c.Bind(&userName)
	//if err != nil {
	//	fmt.Println("error booking require")
	//}
	//bookings = GetBookings(userName, *db)
	//

}

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

func CheckDocDate(c *gin.Context)  {
	type DocInfo struct {
		Date string
		GpName string
		LastName string
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

	//日期格式需要一致
	db.Where("gp_name = ? AND doc_name = ? AND book_time LIKE ?",info.GpName, info.FirstName + " " + info.LastName, "%" + info.Date + "%").Find(&bookings)
	if len(bookings) == 0 {
		c.JSON(200, gin.H{
			"validation": true,
		})
		return
	}
	//已经被book过的不重复的时间
	var antiTimes []int
	for _, each := range bookings {
		antiTime, _ :=  strconv.Atoi(strings.Split(strings.Split(strings.Split(each.BookTime, ",")[1], "-")[0], ":")[0])
		antiTimes = append(antiTimes, antiTime)
	}

	//找到医生可以被book的时间段，with特定日期
	var doctor models.Doctor
	db.Where("first_name = ? AND last_name = ? AND clinic_or_hospital = ?", info.FirstName, info.LastName, info.GpName).Find(&doctor)

	minTime, _ :=  strconv.Atoi(strings.Split(strings.Split(doctor.Monday, "-")[0], ":")[0])
	maxTime, _ :=  strconv.Atoi(strings.Split(strings.Split(doctor.Monday, "-")[1], ":")[0])

	//算出医生可用时间的总合
	var sum = 0
	for i := minTime; i < maxTime; i++ {
		sum += i
	}

	//算出查询当天的不可用时间
	var antiSum = 0
	for _, time := range antiTimes {
		antiSum += time
	}

	//对比医生的时间与不可用时间是否一致，一致则表明当天被订满了
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

func CheckDocTime(c *gin.Context)  {
	type DocInfo struct {
		Date string
		Time string
		GpName string
		LastName string
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
	fmt.Println(info.Date + ","+ info.Time)
	//日期格式需要一致
	db.Where("gp_name = ? AND doc_name = ? AND book_time LIKE ?",info.GpName, info.FirstName + " " + info.LastName, "%" + info.Date + ","+ info.Time + "%").Find(&bookings)
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

func GetUserBookings(c *gin.Context)  {
	type ReturnData struct {
		FirstName string
		LastName string
		GpName string
		DocLanguage string
		BookingTime string
	}
	var db = models.InitDB()
	var dataList []ReturnData
	var info models.Booking
	err := c.Bind(&info)
	if err != nil {
		fmt.Println("error booking require")
	}
	fmt.Println(info.UserName)
	bookings := GetBookings(info.UserName, *db)

	for _, each := range bookings {
		fmt.Println("完成医生多重语言的list检测！")
		n := strings.Split(each.DocName, " ")
		var obj ReturnData
		obj.FirstName = n[0]
		obj.LastName = n[1]
		obj.GpName = each.GpName
		obj.DocLanguage = each.DocLang
		obj.BookingTime = each.BookTime
		dataList = append(dataList, obj)
	}
	fmt.Println(dataList)
	c.JSON(200, gin.H{
		"data": dataList,
	})
}