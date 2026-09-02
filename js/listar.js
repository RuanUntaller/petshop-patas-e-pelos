let tabela = document.getElementById('tabela_corpo');
let listaAgendamentos = JSON.parse(localStorage.getItem('agendamentos_petshop')) || [];


function carregarTabela() {

    tabela.innerHTML = "";

    if (listaAgendamentos.length === 0) {
        tabela.innerHTML = '<tr><td colspan="8">Nenhum pet agendado! 🐾</td></tr>';
    } else {
        let total = 0;

        listaAgendamentos.forEach(function(item, index) {

            total += item.preco;

            tabela.innerHTML += `
                <tr>
                    <td>${item.nomedoPet}</td>
                    <td>${item.especie_pet}</td>
                    <td>${item.data}</td>
                    <td>${item.hora}</td>
                    <td>${item.servico}</td>
                    <td>${item.telefone_dono}</td>
                    <td>${item.dono_pet}</td>
                    <td><button onclick="excluirAgendamento(${index})">Excluir</button></td>
                </tr>
            `;
        });

        let faturamento = document.getElementById('faturamento_total');
        faturamento.innerHTML = total;
    }
}


function excluirAgendamento(index) {

    listaAgendamentos.splice(index, 1);

    localStorage.setItem(
        'agendamentos_petshop',
        JSON.stringify(listaAgendamentos)
    );

    carregarTabela();
}


carregarTabela();