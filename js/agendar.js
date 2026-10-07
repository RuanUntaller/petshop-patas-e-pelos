
const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';

async function carregarPetsNoSelect() {
    const select = document.getElementById('pet_id');
    select.innerHTML = '<option value="">Escolha um pet</option>';

    const resposta = await fetch(`${ENDERECO_BACKEND}/pets`);
    const pets = await resposta.json();

    for (let i = 0; i < pets.length; i++) {
        select.innerHTML += `<option value="${pets[i]._id}">${pets[i].nome_pet} (${pets[i].dono_pet})</option>`;
    }
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
        const resposta = await fetch(`${ENDERECO_BACKEND}/agendamentos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(novoAgendamento)
        });
        const dados = await resposta.json();

        if(!resposta.ok) {
            alert('Não foi possivel agendar: ' + dados.mensagem);
            return;
        }

        alert('Agendamento criado com sucesso!');
        formulario.reset();
    } catch (erro) {
        alert ('Erro de conexão. Tente novamente.');
    }

});

carregarPetsNoSelect();