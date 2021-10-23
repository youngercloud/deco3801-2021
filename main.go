package main

import (
	"deco3801/controllers"
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main()  {
	//controllers.FakeCreateTable()
	controllers.FakeImage()
	router:= gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	api := router.Group("./api")
	{
		api.POST("/signup/user", controllers.SignUpUser)
		api.POST("/signup/doctor", controllers.SignUpDoctor)
		api.POST("/login/user", controllers.LoginUser)
		api.POST("/booking", controllers.BookingInsert)
		api.POST("/booking/searchGp", controllers.HandleGpSearch)
		api.POST("/date", controllers.CheckDocDate)
		api.POST("/time", controllers.CheckDocTime)
		api.POST("/userBookings", controllers.GetUserBookings)
		api.POST("/changeInformation", controllers.ChangeUserInfo)
	}
	router.NoRoute(controllers.NoResponse)

	err := router.Run(":8081")
	if err != nil {
		fmt.Println("Fail start at port: 8081!")
		return
	}
}
