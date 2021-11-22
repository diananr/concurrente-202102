package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net"
)

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
	ln, _ := net.Listen("tcp", ":8082")
	defer ln.Close()

	// accept connection on port

	// run loop forever (or until ctrl-c)
	for {
		conn, _ := ln.Accept()
		message, _ := bufio.NewReader(conn).ReadString('\n')
		// output message received
		fmt.Println(message)
		if message == "train" {
			conn2, _ := ln.Accept()
			datos := json.NewDecoder(conn2)
			var arrIrisT IrisT
			datos.Decode(&arrIrisT)
			fmt.Println(arrIrisT)
		}
	}
}

func main() {
	conectarAPI()
}
