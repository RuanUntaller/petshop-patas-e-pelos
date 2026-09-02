async function estados (){
    
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    let resposta = await fetch (url)
    let estados = await resposta.json()
    let selectEstados = document.getElementById('select_estados_teste')
    let selectCidades = document.getElementById('select_cidades_teste')

    
selectEstados.addEventListener('change', async function() { 

    let ufEscolhida = selectEstados.value;
    selectCidades.innerHTML = `<option value ="">Selecione a Cidade</option>`

    if (ufEscolhida !== "") {
    
        const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufEscolhida}/municipios`    
        let respostaCidades = await fetch (urlCidades)
        let cidades = await respostaCidades.json()
        
        for (let i = 0; i < cidades.length;i++) {
            selectCidades.innerHTML += `<option value= "${cidades[i].nome}">${cidades[i].nome}</option>`;
        }
    }

})

    for (let i = 0; i < estados.length; i++ ) {
        selectEstados.innerHTML += `<option value= "${estados[i].sigla}">${estados[i].nome}</option>`;
    }
}

estados ()
