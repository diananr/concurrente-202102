package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	connection, _ := net.Dial("tcp", "localhost:8000")
	defer connection.Close()

	rin := bufio.NewReader(os.Stdin)
	r := bufio.NewReader(connection)

	for {
		fmt.Print("Ingrese un mensaje:")
		msg, _ := rin.ReadString('\n')
		fmt.Fprint(connection, msg); //envio

		resp, _ := r.ReadString('\n')
		fmt.Printf("Respuesta del server: $s", resp)
	}
}