package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
)

func conectarAPI() {
	fmt.Println("Launching server...")

	// listen on all interfaces
	ln, _ := net.Listen("tcp", ":8081")
	defer ln.Close()

	// accept connection on port
	
	// run loop forever (or until ctrl-c)
	for {
		conn, _ := ln.Accept()
		// will listen for message to process ending in newline (\n)
		message, _ := bufio.NewReader(conn).ReadString('\n')
		// output message received
		fmt.Print("Message Received:", string(message))
		// sample process for string received
		newmessage := strings.ToUpper(message)
		// send new string back to client
		conn.Write([]byte(newmessage + "\n"))
	}
}

func main() {
	conectarAPI()
}
