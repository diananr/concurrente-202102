package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"net"
	"net/http"
)

type IrisT struct {
	SepalL float64 `json:"sepal_length"`
	SepalW float64 `json:"sepal_width"`
	PetalL float64 `json:"petal_length"`
	PetalW float64 `json:"petal_width"`
	Class  string  `json:"class"`
}

var listIrisT []IrisT

func readJSON() ([]IrisT, error) {
	url := "https://raw.githubusercontent.com/diananr/concurrente-202102/main/backend/dataset/irisJson.json"
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()
	var arrIrisT []IrisT
	buf := new(bytes.Buffer)
	buf.ReadFrom(resp.Body)
	respByte := buf.Bytes()
	body := bytes.TrimPrefix(respByte, []byte("\xef\xbb\xbf"))

	if err := json.Unmarshal([]byte(body), &arrIrisT); err != nil {
		return nil, err
	}
	fmt.Println(arrIrisT)
	return arrIrisT, nil
}

func conectarAPI() {
	fmt.Println("Launching server...")

	// listen on all interfaces
	ln, _ := net.Listen("tcp", ":8082")
	defer ln.Close()

	// accept connection on port
	var i int = 0
	// run loop forever (or until ctrl-c)
	for i >= 0 {
		conn, _ := ln.Accept()
		message, _ := bufio.NewReader(conn).ReadString('\n')
		// output message received
		fmt.Println(message)
		i++
		if i == 1 && message == "train"{

			conn2, _ := ln.Accept()
			datos := json.NewDecoder(conn2)
			var arrIrisT IrisT
			datos.Decode(&arrIrisT)
			guardarDatos(arrIrisT)
			fmt.Println(listIrisT)
			//fmt.Println(listIrisT)
			i --
		}
	}
}

func guardarDatos(arrIrisT IrisT) {
	list, err := readJSON()
	if err != nil {
		panic(err)
	}
	var i int = 0
	for i <= len(list){
		listIrisT[i].Class = list[0].Class
		listIrisT[i].PetalL = list[0].PetalL
		listIrisT[i].PetalW = list[0].PetalW
		listIrisT[i].SepalL = list[0].SepalL
		listIrisT[i].SepalW = list[0].SepalW
	}
	listIrisT[i].Class = arrIrisT.Class
	listIrisT[i].PetalL = arrIrisT.PetalL
	listIrisT[i].PetalW = arrIrisT.PetalW
	listIrisT[i].SepalL = arrIrisT.SepalL
	listIrisT[i].SepalW = arrIrisT.SepalW
}

func main() {
	conectarAPI()

}

type Perceptron struct {
	eta     float64
	weights []float64
	iterNum int
}

func activate(linearCombination float64) float64 {
	if linearCombination > 0 {
		return 1.0
	} else {
		return -1.0
	}
}

func (p *Perceptron) predict(x []float64) float64 {
	var linearCombination float64

	for i := 0; i < len(x); i++ {
		linearCombination += x[i] + p.weights[i+1]
	}
	linearCombination += p.weights[0]
	return activate(linearCombination)
}

func (p *Perceptron) fit(X [][]float64, Y []float64) {
	//initialize the weights
	p.weights = []float64{}
	for i := 0; i <= len(X[0]); i++ {
		if i == 0 {
			p.weights = append(p.weights, 1.0)
		} else {
			p.weights = append(p.weights, rand.NormFloat64())
		}
	}
	//update weights by data
	for iter := 0; iter < p.iterNum; iter++ {
		error := 0
		for i := 0; i < len(X); i++ {
			y_pred := p.predict(X[i])
			update := p.eta * (Y[i] - y_pred)
			p.weights[0] += update
			for j := 0; j < len(X[i]); j++ {
				p.weights[j+1] += update * X[i][j]

			}
			if update != 0 {
				error += 1
			}
		}
		fmt.Println(float64(error) / float64(len(Y)))
	}
}
