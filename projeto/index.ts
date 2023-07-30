const axios = require('axios')
const fs = require('fs')

const url: string = 'https://jsonplaceholder.typicode.com/comments'

interface Email {
    email: string
    name: string
    body: string
}


const getData = async (url: string) => {
    try {
        const res = await axios.get(url)

        //monta o array com as mensagens
        const arrData: Email[] = res.data.map((value: Email) => {
            return `From: ${value.email} . ${value.name} say ${value.body}`
        })

        await handleData(arrData)
    }
    catch (error) {
        console.log(error)
    }
}

const handleData = async (obj: Email[]) => {
    let arrSize: number = obj.length - 1
    let ciclo: number = 0
    let str: Email[] = []

    const delayLoop = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const writeFile = (arrText: Email[]) =>{
        let text: string = JSON.stringify(arrText, null, 1)

        fs.writeFile('arquivo.txt', text, (error:any)=>{
            if(error){
                console.log('deu erro')
            }
            console.log('Escrevendo no .txt ...')
        })
    }
    const readArray = async () => {
        for (let i = 0; i <= arrSize; i++) {
            ciclo++
            str[i] = obj[i]
            if (ciclo === 50) {
                ciclo = 0
                await delayLoop(1000);//atrasa o loop
                writeFile(str)//função que escreve os grupos de dados no txt
            }
        }
    }
    readArray();
}

getData(url)


/* comandos p rodar 
1- tsc index.ts
2- node index.js */
