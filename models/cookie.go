package models

import (
	"time"
)

type Cookie struct {
	Name        string
	Value       string
	Path        string
	Domain      string
	Expires     time.Time
	RawExpires  string
	// MaxAge=0 意味着没有指定 Max-Age 的值
	// MaxAge<0 意味着现在就删除 Cookie，等价于 Max-Age=0
	// MaxAge>0 意味着 Max-Age 属性存在并以秒为单位存在
	MaxAge      int
	Secure      bool
	HttpOnly    bool
	Raw         string
	Unparsed    []string // 未解析的 attribute-value 属性位对
}


