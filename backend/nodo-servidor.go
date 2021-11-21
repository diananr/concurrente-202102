package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func handleConnections(conn net.Conn) {
	defer conn.Close()

	//recuperar datos q se envian
	reader := bufio.NewReader(conn)

	for {
		datos, _ := reader.ReadString('\n')
		fmt.Println(datos)

		//responder al cliente
		fmt.Fprintf(conn, "Recibido!!")
	}

}

func main() {
	//este servidor escucha a cualquier cliente q se quiere comunicar
	listener, err := net.Listen("tcp", "localhost:8000") //cual es el protocolo y dirección
	if err != nil {
		fmt.Println("Falla en la comunicación", err.Error())
		os.Exit(1)
	}
	defer listener.Close() //con defer se garantiza que no queda abierto nada

	for {
		conecction, err := listener.Accept()
		if err != nil {
			fmt.Println("Falla en la conexión", err.Error())
			//reintento
		}

		go handleConnections(conecction) //conexión concurrente a varios clientes

	}

}