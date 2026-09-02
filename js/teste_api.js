async function consultarCEP(numeroCEP){

    let resposta = await fetch(`https://viacep.com.br/ws/${numeroCEP}/json/`)
    let dados = await resposta.json()

    console.log(dados.logradouro, dados.localidade, dados.bairro);

}
consultarCEP("01001000");
  