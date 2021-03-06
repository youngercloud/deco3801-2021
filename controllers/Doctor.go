package controllers

import (
	"deco3801/models"
	"gorm.io/gorm"
)

//DocInfo the information that a doctor have
type DocInfo struct {
	Doctor models.Doctor
	Image  []models.Image
}

//HandleDocSearch Return all the doctor information by the given gp name
func HandleDocSearch(gpName string, db gorm.DB) []DocInfo {
	var docInfos []DocInfo
	var doctors []models.Doctor
	db.Where("clinic_or_hospital = ?", gpName).Find(&doctors)

	for _, doctor := range doctors {
		var images []models.Image
		var docInfo DocInfo
		db.Where("owner_name LIKE ? AND type = ?", doctor.FirstName+" "+doctor.LastName, models.DOCTOR).Find(&images)
		docInfo.Doctor = doctor
		docInfo.Image = images
		docInfos = append(docInfos, docInfo)
	}
	return docInfos
}
