function calcularPreco() {
    let campoServico = document.getElementById('agendar_servico').value;
    let campoPreco = document.getElementById('precoEstimado');

    if (campoServico === 'Banho') {
        campoPreco.value = 'R$ 50,00';
    } else if (campoServico === 'Tosa') {
        campoPreco.value = 'R$ 60,00';
    } else if (campoServico === 'Banho e Tosa') {
        campoPreco.value = 'R$ 90,00';
    } else {
        campoPreco.value = 'R$ 120,00';
    }
}

function verificarConsulta() {
    let servico = document.getElementById('agendar_servico').value;
    let campoSintomas = document.getElementById('areaSintomas');

    if (servico === 'Consulta') {
        campoSintomas.style.display = 'block';
    } else {
        campoSintomas.style.display = 'none';
    }
}

/*
function validarAgendamento(event) {
    event.preventDefault();
    let nomePet = document.getElementById('agendar_pet').value;
    let data = document.getElementById('agendar_data').value;

    if (nomePet === "") {
        alert("Por favor escreva o nome do pet.");
    } else if (data === "") {
        alert("Por favor insira a data.");
    } else {
        alert("Parabéns, o cadastro do(a) pet " + nomePet + " foi um sucesso!");
    }
}
*/

function salvarAgendamento(event) {
    event.preventDefault();

    let agendamentos_petshop = {
        nomedoPet: document.getElementById('agendar_pet').value,
        servico: document.getElementById('agendar_servico').value,
        data: document.getElementById('agendar_data').value,
        hora: document.getElementById('agendar_hora').value,
        observacoes: document.getElementById('agendar_obs').value,
        especie_pet: document.getElementById('agendar_especie').value,
        telefone_dono: document.getElementById('agendar_telefone').value,
        dono_pet: document.getElementById('agendar_dono').value,

        preco: parseFloat(
            document.getElementById('precoEstimado').value
                .replace('R$ ', '')
                .replace(',', '.')
        )
    };

    if (agendamentos_petshop.nomedoPet === '') {
        alert('Digite o nome do pet!');
        return;
    }

    if (agendamentos_petshop.data === '') {
        alert('Escolha a data!');
        return;
    }

    if (agendamentos_petshop.hora === '') {
        alert('Escolha o horário!');
        return;
    }

    let salvos = localStorage.getItem('agendamentos_petshop');
    let lista = salvos ? JSON.parse(salvos) : [];

    lista.push(agendamentos_petshop);

    localStorage.setItem(
        'agendamentos_petshop',
        JSON.stringify(lista)
    );

    alert('Agendamento salvo com sucesso!');
}