package main

import (
	"deco3801/controllers"
	"deco3801/models"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main()  {
	controllers.FakeImage()
	models.InitDB()
	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.GET("/doctors", controllers.GetAvailableDoctor)
		api.POST("/booking", controllers.Booking)
		api.POST("/signup/user", controllers.SignUpUser)
		api.POST("/signup/doctor", controllers.SignUpDoctor)
		api.POST("/login/user", controllers.LoginUser)
		api.POST("/booking/searchGp", controllers.HandleGpSearch)
	}
	router.NoRoute(controllers.NoResponse)

	router.Run(":8081")
}
