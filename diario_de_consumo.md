Diario de Consumo - Modulo 13 (Desenvolvendo com IA)


Aluno:
 Ruan

Sistema:
 Linux

Cota renova em:
 31/10/2026, as 21hrs

Preencha uma linha por aula. "% antes" e "% depois" vem do painel Credits do Copilot no VS Code. "Pedidos" = mensagens enviadas ao Copilot (Ask + Edit + Agent).

| Aula | % antes | % depois | Pedidos | Observacao |

| 13.1 |    -    |    0.4%  |     1   |  O copilot identificou e explicou as rotas corretamente
| 13.2 |   0.4%  |    0.6%  |     1   |  O Copilot explicou corretamente as funções e a ordem de execução.
| 13.3 |   0.6%  |     1    |     1   |  O copilot gerou o códigou, adicionou o filtro de pets corretamente, e não cometeu erros. Filtro criado com evento input e toLowerCase de primeira pelo Copilot
| 13.4 |    1    |    1.6   |     2   |  O copilot gerou o código e adicionou tudo corretamente, aprendi que o filtro pet_id deve usar texto puro, pois esse campo armazena o ID como string. Usar new ObjectId(id) poderia causar um erro silencioso. 
| 13.5 |   1.6   |    2.3   |     2    | O copilot explicou a contagem pet_id como string, o fallback para 0 e apontou riscos de contagem de cancelados e desempenho com muitos agendamentos.

TOTAL DO MODULO
7 pedidos

## Balanco (preencher na Aula 13.5)


Em que aula gastei mais, e por que?
13.4 e 13.5, pois fiz dois pedidos em cada aula: um para gerar o código e outro para pedir uma explicação.

---


O que eu faria diferente?
Nada, pois as alterações funcionaram corretamente e consegui testar a funcionalidade no navegador.

---


Uma coisa que a IA errou e eu peguei:
Não identifiquei erros no código durante os testes.

---

MÓdulo 14

Decisão de Produto (Rotas):

Rotas Públicas: GET /pets e GET /agendamentos (qualquer visitante pode visualizar os animais e serviços).

Rotas Protegidas: POST, PUT e DELETE de pets, agendamentos e usuários (exigem token de autenticação válido para que apenas funcionários alterem os dados).

Aula	% antes	 % depois  	Pedidos 	Observação
14.1	  2.3%	   2.3%	       0	    Decisão de produto registrada e instruções de autenticação atualizadas.
14.2	  2.3%	   3.2%	       2	    Fiz 2 pedios, enviei um incorreto sem querer, nao sei se conta como 2 pedidos. O Copilot pediu autorização antes de instalar o bcrypt. Os três testes da API passaram, e a Atlas confirmou que a senha foi salva como senha_hash, sem armazenar a senha em texto puro.
14.3	  3.2%	   4.1%	       1	    Implementação do login com JWT concluída. Os testes locais e no Render retornaram os resultados esperados, e o token contém os dados do usuário e a validade.
14.4	  4.1%	   6.9%	       2	    Login e autenticação no frontend concluídos. Testes de cadastro, edição, exclusão, logout e bloqueio sem login realizados com sucesso. Token JWT confirmado no Network.
14.5	  6.9%	    8%	       1	    Auditoria de segurança concluída com 12 itens conferidos. Comparei minha análise com a do Copilot, realizei os testes de segurança e registrei os resultados no AUDITORIA.md. Relatório enviado ao GitHub.
