function validarTelefone(event){
    let telefone_dono = document.getElementById ('telefone_dono').value;
    event.preventDefault();

    if (telefone_dono === "") {
        alert ('Por favor preencha o telefone.');        
    } else if (telefone_dono.length < 10) {
        alert ("O número de telefone deve ter no minímo 10 digitos");
    } else {
        alert ("Parabéns, seu agendamento foi finalizado.");
    }
}

function cadastro_pet(event){
    event.preventDefault();
    let pet_cadastrado = {
        nome: document.getElementById('nome_pet').value,
        especie_pet: document.getElementById('especie_pet').value,
        raca: document.getElementById('raca_pet').value,
        dono_pet: document.getElementById('dono_pet').value,
        telefone_dono: document.getElementById('telefone_dono').value,

    }

    let dadosPet = JSON.stringify(pet_cadastrado);
    localStorage.setItem('pet_cadastrado', dadosPet);
    localStorage.getItem('pet_cadastrado');
    JSON.parse(dadosPet);

    alert('Pet ' + pet_cadastrado.nome + ' salvo na memória!')
}


function limparCamposEndereco(){
    document.getElementById('rua_dono').value = ""
    document.getElementById('bairro_dono').value = ""
    document.getElementById('cidade_dono').value = ""
    document.getElementById('uf_dono').value = ""
}



let campoCEP = document.getElementById('cep_dono')
campoCEP.addEventListener('blur', async function (){

    let cepDigitado = document.getElementById('cep_dono').value;
    let cepLimpo = cepDigitado.replace(/\D/g, '');
    
    if (cepLimpo.length === 8) {
        
        try{
            
            let url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
            let resposta = await fetch(url);
            let dados = await resposta.json();


            if (dados.erro) {
                alert("Cep não encontrado no sistema dos correios!")
                limparCamposEndereco();
            } else {

                document.getElementById('rua_dono').value = dados.logradouro;
                document.getElementById('bairro_dono').value = dados.bairro;
                document.getElementById('cidade_dono').value = dados.localidade;
                document.getElementById('uf_dono').value = dados.uf

            }

        } catch (erro) {
            alert("Erro de conexão com o servidor de CEP!");
        }


    } else {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
    }   
})


async function carregarEstados(){

    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    let resposta = await fetch (url)
  
    let estados = await resposta.json()
    let selectEstados = document.getElementById('select_estado_dono')
    let selectCidades = document.getElementById('select_cidade_dono')

    selectEstados.addEventListener('change', async function () {
        let ufEscolhida = selectEstados.value;
        document.getElementById('uf_dono').value = ufEscolhida;
        selectCidades.innerHTML = `<option value = "">Selecione a Cidade </option>` 
        
        if (ufEscolhida !== "") {
            const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufEscolhida}/municipios`
            
            let respostaCidades = await fetch (urlCidades)
            let cidades = await respostaCidades.json()

            for(let i = 0; i < cidades.length;i ++){
                selectCidades.innerHTML += `<option value = "${cidades[i].nome}">${cidades[i].nome}</option>`
            }
        }
    })
    
    for(let i = 0; i < estados.length;i ++){
        selectEstados.innerHTML += `<option value = "${estados[i].sigla}">${estados[i].nome}</option>`
    }

}
carregarEstados()


document.getElementById('select_cidade_dono').addEventListener('change', function() {

    let cidadeEscolhida = document.getElementById('select_cidade_dono').value;  
    document.getElementById('cidade_dono').value = cidadeEscolhida;

});




/**
 * 
 * localStorage.setItem('pet_cadastrado','nome pet', 'espécie_pet','raca_pet', 'dono_pet', 'telefone_dono');
 * let dadosPet = localStorage.getItem('pet_cadastrado');
 * document.getElementById('Pet').innerHTML = dadosPet
 */
