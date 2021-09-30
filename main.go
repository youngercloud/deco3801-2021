package main

import (
	"deco3801/controllers"
	"deco3801/models"
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main()  {
	//controllers.FakeBooking()
	models.InitDB()
	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.POST("/signup/user", controllers.SignUpUser)
		api.POST("/signup/doctor", controllers.SignUpDoctor)
		api.POST("/login/user", controllers.LoginUser)
		api.POST("/booking", controllers.BookingInsert)
		api.POST("/booking/searchGp", controllers.HandleGpSearch)
		api.GET("/booking/requireGp", controllers.HandleGpRequire)
		api.GET("/booking/requireDocs", controllers.HandleDocSearch)
	}
	router.NoRoute(controllers.NoResponse)

	err := router.Run(":8081")
	if err != nil {
		fmt.Println("Fail start at port: 8081!")
		return
	}
}
