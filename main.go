package main

import (
	"deco3801/controllers"
	"deco3801/models"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main()  {
	models.InitDB()
	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.POST("/signup/user", controllers.SignUpUser)
		api.POST("/signup/doctor", controllers.SignUpDoctor)
	}
	router.NoRoute(controllers.NoResponse)

	router.Run(":8081")
}

