class HttpService{
    get(url){
        //resolve = é uma função que deve ser passada o retorno de sucesso do metodo 
        //reject = é o erro em si
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.onreadystatechange = ()=> { // é chamada toda vez que o estado do xhr mudar
                        /* --------Estados de uma conexão ajax-------------
                            0: requisição ainda não iniciada
                            1: conexão com o servidor estabelecida
                            2: requisição recebida
                            3: processando requisição
                            4: requisição está concluída e a resposta está pronta
                        */
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log('passou aqui');
                    resolve(JSON.parse(xhr.responseText))//converte JSON para objetos JS
                }else{
                    reject(xhr.responseText)
                }
            }
            }
            xhr.send();
        })
    }
    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
        });

    }
}