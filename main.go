package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
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

type Patient struct {
	ID int `json:"id" binding:"required"`
	Name string `json:"name"`
}

var pa = []Patient {
	{1, "WangChangling"},
	{2, "CaoCao"},
	{3, "ZhangJiuling"},
}


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


