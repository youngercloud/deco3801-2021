package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func main()  {
	databaseSetup()
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

func Test (a string) string {
	println(a)
	return a
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


