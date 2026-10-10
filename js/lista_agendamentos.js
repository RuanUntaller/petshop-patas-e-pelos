const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';

async function carregarAgendamentos(data) { 
    const tabela = document.getElementById('tabela_agendamentos'); 
    tabela.innerHTML = '';
    
    let url = `${ENDERECO_BACKEND}/agendamentos`;
    
    if (data) {
        url = `${ENDERECO_BACKEND}/agendamentos?data=${data}`;     
    }

    const resposta = await fetch(url);
    const agendamentos = await resposta.json();

    if (agendamentos.length === 0) {
        tabela.innerHTML= '<tr><td colspan="6">Nenhum agendamento.</td></tr>';
        return;
    }

    for (let i = 0; i < agendamentos.length; i++) {
    tabela.innerHTML += `
    <tr>
    <td>${agendamentos[i].data}</td>
    <td>${agendamentos[i].hora}</td>
    <td>${agendamentos[i].nome_pet}</td>
    <td>${agendamentos[i].servico}</td>
    <td>${agendamentos[i].observacoes}</td>
    
    <td>
    <button onclick="editarAgendamento('${agendamentos[i]._id}')">Editar</button>
    <button onclick="excluirAgendamento('${agendamentos[i]._id}')">Excluir</button>
    </td>    
   </tr>
    `;
    }
}

function filtrarPorDia() {
    const data = document.getElementById('filtro_data').value;
    carregarAgendamentos(data);
}

function limparFiltro() {
    document.getElementById('filtro_data').value = '';
    carregarAgendamentos();
}

async function excluirAgendamento(id) {
    const confirmou = confirm ("Excluir este agendamento?")
    
    if (!confirmou) {
        return;    
    } 
    await fetch (`${ENDERECO_BACKEND}/agendamentos/${id}`, {
        method: 'DELETE'
    });
    
    carregarAgendamentos();
}

function editarAgendamento(id) {
    window.location.href = `agendar.html?id=${id}`;
}

carregarAgendamentos();