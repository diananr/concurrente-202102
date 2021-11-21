package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	//"strings"
)

//Estructura Para Entrenar
type DataTrain struct {
	SepalL      float64 `json:"sepal_length"`
	SepalW      float64 `json:"sepal_width"`
	PetalL      float64 `json:"petal_length"`
	PetalW      float64 `json:"petal_width"`
	Class       string  `json:"class"`
	TypeRequest string  `json:"type"`
}

var listDataTrain []DataTrain

//Estructura para Predecir
type DataPredcit struct {
	SepalL      float64 `json:"sepal_length"`
	SepalW      float64 `json:"sepal_width"`
	PetalL      float64 `json:"petal_length"`
	PetalW      float64 `json:"petal_width"`
	TypeRequest string  `json:"type"`
}

var listDataPredict []DataPredcit

func enableCors(res *http.ResponseWriter) {
	(*res).Header().Set("Access-Control-Allow-Origin", "*")
	(*res).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*res).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func mostrarHome(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "text/html")
	io.WriteString(response, `
		<html>
		<head></head>
		<body><h2>API de Iris</h2></body>
		</html>
	`)
}

func agregarEntrenamiento(response http.ResponseWriter, request *http.Request) {
	enableCors(&response)
	if request.Method == "POST" {
		//Almacena la info que llega por el body
		body, err := ioutil.ReadAll(request.Body)

		if err != nil {
			log.Fatal(err)
			http.Error(response, "Error al leer el body", http.StatusInternalServerError)
		}

		var dataEntrenamiento DataTrain

		json.Unmarshal(body, &dataEntrenamiento)

		//mensaje := strings.ToUpper(dataEntrenamiento.TypeRequest)
		enviarEntrenamiento(dataEntrenamiento)

		//Respuesta del servidor
		response.Header().Set("Content-Type", "application/json")
		response.WriteHeader(http.StatusOK)
		io.WriteString(response, `{
			"msg":"Registro Data Entrenamiento correcta"
		}`)
	} else {
		http.Error(response, "Método no válido", http.StatusMethodNotAllowed)
	}
}

func agregarPrediccion(response http.ResponseWriter, request *http.Request) {
	enableCors(&response)
	if request.Method == "POST" {
		//Almacena la info que llega por el body
		body, err := ioutil.ReadAll(request.Body)

		if err != nil {
			log.Fatal(err)
			http.Error(response, "Error al leer el body", http.StatusInternalServerError)
		}

		var dataPredict DataPredcit
		json.Unmarshal(body, &dataPredict)

		enviarPrediccion(dataPredict)

		// listDataPredict = append(listDataPredict, dataPredict)

		// mensaje := strings.ToUpper(listDataPredict[0].typeRequest)

		//Respuesta del servidor
		response.Header().Set("Content-Type", "application/json")
		response.WriteHeader(http.StatusOK)
		io.WriteString(response, `{
			"msg":"Registro Data Predicicón correcta"
		}`)
	} else {
		http.Error(response, "Método no válido", http.StatusMethodNotAllowed)
	}
}

func manejadorSolicitudes() {
	//Enrutador
	mux := http.NewServeMux()

	//Endpoints
	mux.HandleFunc("/home", mostrarHome)
	mux.HandleFunc("/agregartrain", agregarEntrenamiento)
	mux.HandleFunc("/agregarpredict", agregarPrediccion)

	//CORS Handler
	//handler := cors.Default().Handler(mux)

	//Errors
	log.Fatal(http.ListenAndServe(":9000", mux))
}

func enviarEntrenamiento(mensaje DataTrain) {
	// connect to this socket
	conn, _ := net.Dial("tcp", "127.0.0.1:8081")
	// send to socket
	fmt.Fprintln(conn, mensaje)
	// listen for reply
	message, _ := bufio.NewReader(conn).ReadString('\n')
	fmt.Print("Message from server: " + message)
	conn.Close()
}

func enviarPrediccion(mensaje DataPredcit) {
	// connect to this socket
	conn, _ := net.Dial("tcp", "127.0.0.1:8081")
	// send to socket
	fmt.Fprintln(conn, mensaje)
	// listen for reply
	message, _ := bufio.NewReader(conn).ReadString('\n')
	fmt.Print("Message from server: " + message)
	conn.Close()
}

func main() {
	manejadorSolicitudes()
}
