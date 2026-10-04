const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';
let idEmEdicao = null;

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

async function verificarModoEdicao() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');

    if (id === null) {
        return;
    }

    idEmEdicao = id;

    const resposta = await fetch(`${ENDERECO_BACKEND}/pets/${id}`);
    const pet = await resposta.json();

    document.getElementById('nome_pet').value = pet.nome_pet;
    document.getElementById('especie_pet').value = pet.especie_pet;
    document.getElementById('raca_pet').value = pet.raca_pet;
    document.getElementById('dono_pet').value = pet.dono_pet;
    document.getElementById('telefone_dono').value = pet.telefone_dono;
    document.getElementById('cep_dono').value = pet.cep_dono;
    document.getElementById('rua_dono').value = pet.rua_dono;
    document.getElementById('bairro_dono').value = pet.bairro_dono;
    document.getElementById('cidade_dono').value = pet.cidade_dono;
    document.getElementById('uf_dono').value = pet.uf_dono;

    document.querySelector('button[type="submit"]').textContent = 'Salvar alterações';
}

verificarModoEdicao();



document.getElementById('select_cidade_dono').addEventListener('change', function() {

    let cidadeEscolhida = document.getElementById('select_cidade_dono').value;  
    document.getElementById('cidade_dono').value = cidadeEscolhida;

});


const formulario = document.getElementById("form_cadastro_pet");
formulario.addEventListener('submit', async function (evento) {
    evento.preventDefault()

    let url = `${ENDERECO_BACKEND}/pets`;
    let metodo = 'POST';

    if (idEmEdicao !== null) {
        url = `${ENDERECO_BACKEND}/pets/${idEmEdicao}`;
        metodo = 'PUT';
    }

    const novoPet = {
        nome_pet: document.getElementById('nome_pet').value,
        especie_pet: document.getElementById('especie_pet').value,
        raca_pet: document.getElementById('raca_pet').value,
        dono_pet: document.getElementById('dono_pet').value,
        telefone_dono: document.getElementById('telefone_dono').value,
        cep_dono: document.getElementById('cep_dono').value,
        rua_dono: document.getElementById('rua_dono').value,
        bairro_dono: document.getElementById('bairro_dono').value,
        cidade_dono: document.getElementById('cidade_dono').value,
        uf_dono: document.getElementById('uf_dono').value
    };
    
    try {const resposta = await fetch (url, {
        method: metodo,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novoPet)

    })

    const dados = await resposta.json();
    alert(idEmEdicao !== null ? 'Pet atualizado com sucesso!' : 'Pet cadastrado com sucesso!');
    window.location.href = 'lista_pets.html';
    } catch(erro) {
    alert ("Erro ao cadastrar o pet. Tente novamente");
}
}); 




/**
 * 
 * localStorage.setItem('pet_cadastrado','nome pet', 'espécie_pet','raca_pet', 'dono_pet', 'telefone_dono');
 * let dadosPet = localStorage.getItem('pet_cadastrado');
 * document.getElementById('Pet').innerHTML = dadosPet
 */
