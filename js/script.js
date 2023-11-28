document.addEventListener('DOMContentLoaded', function() {
    const inputCEP = document.getElementById('cep');
    inputCEP.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            consultarCEP();
        }
    });
});

function consultarCEP() {
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { erro, logradouro, complemento, bairro, localidade, uf } = data;
            if (erro) {
                mostrarResultado('CEP não encontrado.');
                return;
            }

            const enderecoCompleto = [logradouro, complemento, bairro].every(info => info) ?
                `Endereço: ${logradouro}, ${complemento}, ${bairro}, ${localidade} - ${uf}` :
                `Localidade: ${localidade}, UF: ${uf}`;

            mostrarResultado(enderecoCompleto);
        })
        .catch(error => console.error('Erro na API', error));
}

function mostrarResultado(mensagem) {
    document.getElementById('resultado').innerText = mensagem;
}
