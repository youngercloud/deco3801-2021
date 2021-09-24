package main

import (
	"deco3801/controllers"
	"deco3801/models"
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"strconv"
)

func main()  {
	fmt.Println(strconv.ParseFloat("13136", 64))

	models.InitDB()
	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.GET("/doctors", controllers.GetAvailableDoctor)
		api.POST("/booking", controllers.Booking)
		api.POST("/signup/user", controllers.SignUpUser)
		api.POST("/signup/doctor", controllers.SignUpDoctor)
		api.POST("login/user", controllers.LoginUser)
	}
	router.NoRoute(controllers.NoResponse)

	router.Run(":8081")
}
