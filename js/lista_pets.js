const ENDERECO_BACKEND = 'https://petshop-servidor.onrender.com';
async function carregarPets() {
    const tabela =
    document.getElementById('tabela_pets');
    tabela.innerHTML = '';

    const resposta = await
    fetch(`${ENDERECO_BACKEND}/pets`);
    const pets = await resposta.json();
    for (let i = 0; i < pets.length; i++){
        tabela.innerHTML += `
        <tr>
            <td>${pets[i].nome_pet}</td>
            <td>${pets[i].especie_pet}</td>
            <td>${pets[i].raca_pet}</td>
            <td>${pets[i].dono_pet}</td>
            <td>${pets[i].cidade_dono}/${pets[i].uf_dono}</td>
        </tr>
        `;
    }
    
}
carregarPets();