const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';
async function carregarPets() {
    const tabela =
    document.getElementById('tabela_pets');
    tabela.innerHTML = '';

    const resposta = await
    fetch(`${ENDERECO_BACKEND}/pets`);
    const pets = await resposta.json();
    for (let i = 0; i < pets.length; i++){
        tabela.innerHTML += `
        <tr>
            <td>${pets[i].nome_pet}</td>
            <td>${pets[i].especie_pet}</td>
            <td>${pets[i].raca_pet}</td>
            <td>${pets[i].dono_pet}</td>
            <td>${pets[i].cidade_dono}/${pets[i].uf_dono}</td>
            <td>${pets[i].agendamentos_count ?? 0}</td>
            <td><button onclick="editarPet('${pets[i]._id}')">Editar</button></td>
            <td><button onclick="excluirPet('${pets[i]._id}')">Excluir</button></td>
        </tr>
        `;
    }
    
}
carregarPets();

const campoBuscaPets = document.querySelector('input[type="text"]');
campoBuscaPets.addEventListener('input', function () {
    const busca = campoBuscaPets.value.toLowerCase();
    const linhas = document.getElementById('tabela_pets').rows;

    for (let i = 0; i < linhas.length; i++) {
        const nomePet = linhas[i].cells[0].textContent.toLowerCase();
        linhas[i].style.display = nomePet.includes(busca) ? '' : 'none';
    }
});

async function excluirPet (id) {
    const confirmou = confirm ('Tem certeza que deseja excluir este pet?');
    if (!confirmou) {
        return;
    } 
   
    const resposta = await fetch (`${ENDERECO_BACKEND}/pets/${id}`, {
        method: 'DELETE',
        headers: cabecalhosComToken()
    });
    if (tratarNaoAutorizado(resposta)) {
        return;
    }

    const resultado = await resposta.json();
    if (!resposta.ok) {
        alert(resultado.mensagem);
        return;
    }

    carregarPets();
} 

function editarPet (id) {
    window.location.href = `cadastroPet.html?id=${id}`;
}