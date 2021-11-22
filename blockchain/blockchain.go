package blockchain

import (
	"bytes"
	"crypto/sha256"
)

type IrisT struct {
	SepalL float64 `json:"sepal_length"`
	SepalW float64 `json:"sepal_width"`
	PetalL float64 `json:"petal_length"`
	PetalW float64 `json:"petal_width"`
	Class  string  `json:"class"`
}

type Block struct {
	Hash     []byte
	Data     IrisT
	PrevHash []byte
}

type BlockChain struct {
	blocks []*Block
}

func (b *Block) DeriveHash() {
	info := bytes.Join([][]byte{b.PrevHash}, []byte{})
	hash := sha256.Sum256(info)
	b.Hash = hash[:]
}

func CreateBlock(data IrisT, prevHash []byte) *Block {
	block := &Block{[]byte{}, data, prevHash}
	block.DeriveHash()
	return block
}

func (chain *BlockChain) AddBlock(data IrisT) {
	prevBlock := chain.blocks[len(chain.blocks)-1]
	new := CreateBlock(data, prevBlock.Hash)
	chain.blocks = append(chain.blocks, new)
}

func Genesis() *Block {
	return CreateBlock(IrisT{0, 0, 0, 0, "Genesis"}, []byte{})
}

func InitBlockChain() *BlockChain {
	return &BlockChain{[]*Block{Genesis()}}
}
