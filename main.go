package main

import (
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func main()  {
	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H {
				"message": "pong",
			})
		})


		//path need to be changed after page path has been determined
		api.POST("/signup", SignUpHandler)
		//api.GET("/patients", PatientHandler)
		//api.GET("/:patientName", SpecHandler)
	}
	router.NoRoute(NoResponse)

	router.Run(":8081")
}
func SignUpHandler(c *gin.Context) {
	//var db = SignUpDatabaseSetup();
	var userData Users
	c.Bind(&userData)
	fmt.Println(userData.FirstName)
	fmt.Println(userData.PhoneNumber)
	c.String(http.StatusOK, "Accept data from front-end!")
	//SignUpUser(userData, *db)
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


var pa = []Patient {
	{1, "ChangLing", "Wang", time.Date(666, time.Month(1), 1, 0, 0, 0, 0, time.UTC), 1, ""},
	{2, "Cao", "Cao", time.Date(190, time.Month(1), 2, 0, 0, 0, 0, time.UTC), 1, ""},
}


func SpecHandler(c *gin.Context)  {
	c.Header("Content-Type", "application/json")
	pName := c.Param("patientName")
	for i := 0; i < len(pa); i++ {
		if pa[i].FirstName == pName {
			c.JSON(http.StatusOK, &pa[i])
			return
		}
	}
	c.AbortWithStatus(http.StatusNotFound)
}
