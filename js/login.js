const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';

document.getElementById('form_login').addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch(`${ENDERECO_BACKEND}/login`, {
            method: 'POST',
            headers: cabecalhosComToken(),
            body: JSON.stringify({ email, senha })
        });
        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || 'Não foi possível fazer login.');
            return;
        }

        localStorage.setItem('token', dados.token);
        localStorage.setItem('email', dados.email);
        window.location.href = '../index.html';
    } catch (erro) {
        alert('Erro de conexão. Tente novamente.');
    }
});
