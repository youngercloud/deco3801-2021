package main

import (
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"net/http"
)

type UserInfo struct {
	ID uint
	BookingName string
}

func main()  {
	dsn := "stu:deco3801@tcp(34.116.85.107:3306)/booking?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&UserInfo{})
	if err != nil {
		return
	}

	u1 := UserInfo{3, "预约1"}
	u2 := UserInfo{4, "预约2"}
	// 创建记录
	db.Create(&u1)
	db.Create(&u2)

	// 查询
	var u = new(UserInfo)
	db.First(u)
	fmt.Printf("%#v\n", u)

	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H {
				"message": "pong",
			})
		})

		api.GET("/patients", PatientHandler)
		api.GET("/:patientName", SpecHandler)
	}
	router.NoRoute(NoResponse)

	router.Run(":8081")

	//-------------------------------------------
}

func NoResponse(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{
		"status": 404,
		"error":  "404, page not exists!",
	})
}


func PatientHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"message": "Test",
	})
}

type Patient struct {
	ID int `json:"id" binding:"required"`
	Name string `json:"name"`
}

var pa = []Patient {
	{1, "WangChangling"},
	{2, "CaoCao"},
	{3, "ZhangJiuling"},
}

//asdasdadasd
func SpecHandler(c *gin.Context)  {
	c.Header("Content-Type", "application/json")
	pName := c.Param("patientName")
	for i := 0; i < len(pa); i++ {
		if pa[i].Name == pName {
			c.JSON(http.StatusOK, &pa[i])
			return
		}
	}
	c.AbortWithStatus(http.StatusNotFound)
}


