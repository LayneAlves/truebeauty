document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
 
    // Verifica se o campo existe no HTML
    if (!cepInput) {
        console.error("ERRO: Não encontrei nenhum campo com id='cep' no seu HTML!");
        return;
    }
 
    cepInput.addEventListener("blur", () => {
        const cep = cepInput.value.replace(/\D/g, '');
        
        console.log("1. Evento disparado! CEP digitado:", cep);
 
        if (cep.length !== 8) {
            console.warn("2. CEP com tamanho errado:", cep.length);
            alert("CEP inválido!");
            return;
        }
 
        console.log("3. Iniciando busca na URL:", `https://viacep.com.br/ws/${cep}/json/`);
 
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => {
                console.log("4. Resposta da rede recebida.");
                return res.json();
            })
            .then(data => {
                console.log("5. Dados convertidos para JSON:", data);
 
                if (data.erro) {
                    alert("CEP não encontrado!");
                    return;
                }
 
                // Preenchimento dos campos
                // IMPORTANTE: Verifique se os IDs "rua", "bairro", etc, existem no seu HTML
                if(document.getElementById("rua")) document.getElementById("rua").value = data.logradouro;
                if(document.getElementById("bairro")) document.getElementById("bairro").value = data.bairro;
                if(document.getElementById("cidade")) document.getElementById("cidade").value = data.localidade;
                if(document.getElementById("estado")) document.getElementById("estado").value = data.uf;
                
                console.log("6. Campos preenchidos com sucesso!");
            })
            .catch(err => {
                console.error("ERRO CRÍTICO na busca:", err);
            });
    });
});
 