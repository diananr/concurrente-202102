package main

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
)

//Estructura Para Entrenar
type DataTrain struct {
	SepalL      float64 `json:"sepal_length"`
	SepalW      float64 `json:"sepal_width"`
	PetalL      float64 `json:"petal_length"`
	PetalW      float64 `json:"petal_width"`
	Class       string  `json:"class"`
	typeRequest string  `json:"typeRequest"`
}

var listDataTrain []DataTrain

//Estructura para Predecir
type DataPredcit struct {
	SepalL      float64 `json:"sepal_length"`
	SepalW      float64 `json:"sepal_width"`
	PetalL      float64 `json:"petal_length"`
	PetalW      float64 `json:"petal_width"`
	typeRequest string  `json:"typeRequest"`
}

var listDataPredict []DataPredcit

// //Cors Handler
// func setupCorsResponse(response *http.ResponseWriter, request *http.Request) {
// 	(*response).Header().Set("Access-Control-Allow-Origin", "*")
// 	(*response).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 	(*response).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
// }

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
	//setupCorsResponse(&response, request)
	if request.Method == "POST" {
		if request.Header.Get("Content-Type") == "application/json" {
			//Almacena la info que llega por el body
			body, err := ioutil.ReadAll(request.Body)

			if err != nil {
				log.Fatal(err)
				http.Error(response, "Error al leer el body", http.StatusInternalServerError)
			}

			var dataEntrenamiento DataTrain

			json.Unmarshal(body, &dataEntrenamiento)

			listDataTrain = append(listDataTrain, dataEntrenamiento)

			//Respuesta del servidor
			response.Header().Set("Content-Type", "application/json")
			response.WriteHeader(http.StatusOK)
			io.WriteString(response, `{
				"msg":"Registro Data Entrenamiento correcta"
			}`)
		} else {
			http.Error(response, "Contenido no válido", http.StatusBadRequest)
		}
	} else {
		http.Error(response, "Método no válido", http.StatusMethodNotAllowed)
	}
}

func agregarPrediccion(response http.ResponseWriter, request *http.Request) {
	//setupCorsResponse(&response, request)
	if request.Method == "POST" {
		if request.Header.Get("Content-Type") == "application/json" {
			//Almacena la info que llega por el body
			body, err := ioutil.ReadAll(request.Body)

			if err != nil {
				log.Fatal(err)
				http.Error(response, "Error al leer el body", http.StatusInternalServerError)
			}

			var dataPredict DataPredcit

			json.Unmarshal(body, &dataPredict)

			listDataPredict = append(listDataPredict, dataPredict)

			//Respuesta del servidor
			response.Header().Set("Content-Type", "application/json")
			response.WriteHeader(http.StatusOK)
			io.WriteString(response, `{
				"msg":"Registro Data Predicicón correcta"
			}`)
		} else {
			http.Error(response, "Contenido no válido", http.StatusBadRequest)
		}
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

func main() {
	manejadorSolicitudes()
}
