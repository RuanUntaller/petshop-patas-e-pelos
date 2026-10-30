const URL_LOGIN = new URL('../paginas/login.html', document.currentScript.src);

function obterToken() {
    return localStorage.getItem('token');
}

function cabecalhosComToken() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obterToken() || ''}`
    };
}

function sair() {
    localStorage.clear();
    window.location.href = URL_LOGIN.href;
}

function tratarNaoAutorizado(resposta) {
    if (resposta.status !== 401) {
        return false;
    }

    alert('Faça login para continuar');
    window.location.href = URL_LOGIN.href;
    return true;
}

const linkAutenticacao = document.getElementById('link_autenticacao');
if (linkAutenticacao) {
    if (obterToken()) {
        const email = localStorage.getItem('email');
        linkAutenticacao.textContent = `Sair (${email || 'usuário'})`;
        linkAutenticacao.href = '#';
        linkAutenticacao.addEventListener('click', function(evento) {
            evento.preventDefault();
            sair();
        });
    } else {
        linkAutenticacao.textContent = 'Entrar';
        linkAutenticacao.href = URL_LOGIN.href;
    }
}
