Sobre o projeto:  Este é o  frontend do PetShop Patas & Pelos, é um projeto do curso desenvolvido usando HTML e JavaScript puro, sem frameworks.

O projeto se comunica com um backend separado, desenvolvido com Node.js, Express e MongoDB Atlas. O backend está publicado no Render.

estrutura principal:
index.html: pagina principal
paginas: páginas secundárias do sistema, como lista_pets.html e agendar.html.
js/: pasta que fica responsável pela funcionalidade das páginas, como lista_pets.html e agendar.html.

Idioma: Portugues Brasil em respostas, comentários e nomes de variáveis.

IDs e campos existentes (não alterar nem inventar):
os ids existentes são:
agendar.html: id="form_agendamento", id="pet_id", id="servico", id="data", id="hora", id="observacoes"

agendarServico.html: id="form_agendamento", id="agendar_pet", id="agendar_servico", id="agendar_especie", id="agendar_telefone", id="agendar_dono", id="areaSintomas", id="sintomas", id="precoEstimado", id="agendar_data", id="agendar_hora", id="agendar_obs"

cadastroPet.html: id="form_cadastro_pet", id="especie_pet", id="raca_pet", id="dono_pet", id="telefone_dono",  id="cep_dono", id="rua_dono", id="bairro_dono", id="cidade_dono", id="uf_dono", id="select_estado_dono", id="select_cidade_dono"

lista_agendamentos.html: id="filtro_data", id="tabela_agendamentos"

lista_pets.html: id="tabela_pets"

listarAgendamentos.html: id="tabela_corpo", id="faturamento_total"

index.html: id="mensagem_unidade", id="mensagemHorario"

Padrões:
Uso de fetch com async/await (com dois await e conferindo resposta.ok).
Montagem de listas com for + innerHTML (sempre limpando o elemento antes).
Eventos de formulário com addEventListener e preventDefault().

Proibido:
Nunca altere os ids de elemento existente nos HTMLs.
Nunca altere a constante ENDERECO_BACKEND.
Nunca reescreva as funções que já estão funcionando.
Não use bibliotecas, frameworks ou CDNs novos sem perguntar.

Como testo: Abrir página no navegador (local ou Netlify) e verificar o Console de Desenvolvedor (F12)