
const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';

let idEmEdicao = null;

async function carregarPetsNoSelect() {
    const select = document.getElementById('pet_id');
    select.innerHTML = '<option value="">Escolha um pet</option>';

    const resposta = await fetch(`${ENDERECO_BACKEND}/pets`);
    const pets = await resposta.json();

    for (let i = 0; i < pets.length; i++) {
        select.innerHTML += `<option value="${pets[i]._id}">${pets[i].nome_pet} (${pets[i].dono_pet})</option>`;
    }
}

async function verificarModoEdicao() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');

    if (id === null) {
        return;
    }

    idEmEdicao = id;

    const resposta = await fetch(`${ENDERECO_BACKEND}/agendamentos/${id}`);
    const agendamento = await resposta.json();

    document.getElementById('pet_id').value = agendamento.pet_id;
    document.getElementById('servico').value = agendamento.servico;
    document.getElementById('data').value = agendamento.data;
    document.getElementById('hora').value = agendamento.hora;
    document.getElementById('observacoes').value = agendamento.observacoes || '';

    document.querySelector('#form_agendamento button[type="submit"]').textContent = 'Salvar alterações';
}

const formulario = document.getElementById('form_agendamento');

formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const novoAgendamento = {
        pet_id: document.getElementById('pet_id').value,
        servico: document.getElementById('servico').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        observacoes: document.getElementById('observacoes').value
    };

    try {
        let url = `${ENDERECO_BACKEND}/agendamentos`;
        let metodo = 'POST';

        if (idEmEdicao !== null) {
                url = `${ENDERECO_BACKEND}/agendamentos/${idEmEdicao}`;
                metodo = 'PUT';
            }
            const resposta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoAgendamento)
            });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert('Não foi possível salvar: ' + dados.mensagem);
            return;
        }

        alert(idEmEdicao !== null ? 'Agendamento atualizado!' : 'Agendamento criado com sucesso!');
        window.location.href = 'lista_agendamentos.html';
    } catch (erro) {
        alert ('Erro de conexão. Tente novamente.');
    }

});

async function iniciarPagina() {
    await carregarPetsNoSelect();
    await verificarModoEdicao();
}

iniciarPagina();

