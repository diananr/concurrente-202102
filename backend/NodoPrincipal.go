package main

import (
	"encoding/json"
	"fmt"
	"net"
)

type Mensaje struct {
	SepalL      float64 `json:"sepal_length"`
	SepalW      float64 `json:"sepal_width"`
	PetalL      float64 `json:"petal_length"`
	PetalW      float64 `json:"petal_width"`
	Class       string  `json:"class"`
	TypeRequest string  `json:"type"`
}

var listMensaje []Mensaje

type IrisT struct {
	SepalL float64 `json:"sepal_length"`
	SepalW float64 `json:"sepal_width"`
	PetalL float64 `json:"petal_length"`
	PetalW float64 `json:"petal_width"`
	Class  string  `json:"class"`
}
var listIrisT []IrisT

type IrisP struct {
	SepalL float64 `json:"sepal_length"`
	SepalW float64 `json:"sepal_width"`
	PetalL float64 `json:"petal_length"`
	PetalW float64 `json:"petal_width"`
}

var listIrisP []IrisP

func conectarAPI() {
	fmt.Println("Launching server...")

	// listen on all interfaces
	ln, _ := net.Listen("tcp", ":8081")
	defer ln.Close()

	// accept connection on port

	// run loop forever (or until ctrl-c)
	for {
		conn, _ := ln.Accept()
		datos := json.NewDecoder(conn)
		var arrMensaje Mensaje
		err := datos.Decode(&arrMensaje)
		fmt.Println(arrMensaje.PetalL, err)
	}
}

func main() {
	conectarAPI()
}
