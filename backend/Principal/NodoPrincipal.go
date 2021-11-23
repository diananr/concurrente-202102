package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net"
)

type Mensaje struct {
	SepalL      float64 `json:"sepal_length"`
	SepalW      float64 `json:"sepal_width"`
	PetalL      float64 `json:"petal_length"`
	PetalW      float64 `json:"petal_width"`
	Class       string  `json:"class, omitempty"`
	TypeRequest string  `json:"type,omitempty"`
}

var listMensaje []Mensaje

func enviarNodo1(mensaje string) {
	// connect to this socket
	conn, _ := net.Dial("tcp", "127.0.0.1:8082")
	fmt.Fprintf(conn, mensaje+"\n")
	// listen for reply
	// message, _ := bufio.NewReader(conn).ReadString('\n')
	// fmt.Print("Message from server: " + message)
}

func enviarEntrenamiento(mensaje Mensaje) {
	// connect to this socket
	conn, _ := net.Dial("tcp", "127.0.0.1:8082")
	// send to socket
	//fmt.Fprintln(conn, mensaje)
	byteMensaje, _ := json.Marshal(mensaje)
	fmt.Fprintf(conn, "%s\n", byteMensaje)
	// listen for reply
	message, _ := bufio.NewReader(conn).ReadString('\n')
	fmt.Print("Message from server: " + message)
	conn.Close()
}

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
		datos.Decode(&arrMensaje)
		typo := arrMensaje.TypeRequest
		fmt.Println(typo)
		if typo == "train" {
			enviarNodo1(typo)
			arrMensaje.TypeRequest = ""
			fmt.Println(arrMensaje)
			enviarEntrenamiento(arrMensaje)
		}
	}
}

func main() {
	conectarAPI()
}
