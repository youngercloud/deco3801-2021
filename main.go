package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main()  {
	router:= gin.Default()
	router.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{})
	})
	router.Run(":8081")
}