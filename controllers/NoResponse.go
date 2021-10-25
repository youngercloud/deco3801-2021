package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

//NoResponse Called when back-end starting failed
func NoResponse(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{
		"status": 404,
		"error":  "404, page not exists!",
	})
}
