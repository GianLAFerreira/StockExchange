class ProxyFactory{
    static create(objeto, props, acao){
       return new Proxy (objeto,{
            //get: sempre chamado ao ler qlqr propriedade
            //target: referencia do objeto que está sendo encapsulado pelo proxy
            //prop: é a propriedade que esta sendo processada
            //receiver: é a referencia para o proxy
             get(target, prop,receiver) {
                 if(props.includes(prop) //verifica se dentro do arrray existe 'adiciona' e o 'esvazia'
                     && ProxyFactory._ehfuncao(target[prop])) // os metodos existentes tem q ser uma função 
                     {
                         return function(){ //substitui o metodo do proxy por outro
                             console.log(`interceptando ${prop}`)
                             Reflect.apply(target[prop], target, arguments); 
                             //arguments é um parametro acessivel que da acesso a todos os parametros da funcao 
                             return acao(target);
                         }
                 }
                 return Reflect.get(target, prop, receiver)
            },
                set(target, prop, value, receiver) {
                    if(props.includes(prop)){   
                        target[prop] = value;
                        acao(target);
                    }
                    return Reflect.set(target,prop, value, receiver);
                    
                }
        });
    }

    static _ehfuncao(func){
       return typeof(func) == typeof(Function);
    }
}