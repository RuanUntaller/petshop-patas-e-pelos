function mostrarHorario() {
    let horario = document.getElementById("mensagemHorario");
    horario.style.display = 'block';
}

localStorage.setItem('nome_unidade', 'Unidade Central Patas & Pelos');
let unidade = localStorage.getItem('nome_unidade');
document.getElementById('mensagem_unidade').innerHTML = unidade