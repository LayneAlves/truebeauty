// VALIDAÇÃO NOME
addEventListener("DOMContentLoaded", () => {
    const fields = {
        nome: document.querySelectorAll("input[name='nome']"),
        nomeError: document.querySelector("#nome-error"),
        email: document.querySelectorAll("input[name='email']"),
        emailError: document.querySelector("#email-error"),
        telefone: document.querySelectorAll("input[name='telefone']"),
        telefoneError: document.querySelector("#telefone-error"),
        cep: document.querySelectorAll("input[name='cep']"),
        cepError: document.querySelector("#cep-error"),
        endereco: document.querySelectorAll("input[name='endereco']"),
        enderecoError: document.querySelector("#endereco-error"),
        numero: document.querySelectorAll("input[name='numero']"),
        numeroError: document.querySelector("#numero-error"),
        complemento: document.querySelectorAll("input[name='complemento']"),
        complementoError: document.querySelector("#complemento-error"),
        bairro: document.querySelectorAll("input[name='bairro']"),
        bairroError: document.querySelector("#complemento-bairro"),
        cidade: document.querySelectorAll("input[name='cidade']"),
        cidadeError: document.querySelector("#complemento-cidade"),
        estado: document.querySelectorAll("input[name='estado']"),
        estadoError: document.querySelector("#complemento-estado"),
        senha: document.querySelectorAll("input[name='senha']"),
        senhaError: document.querySelector("#senha-error"),
    }

    const senhaRequisitos = {
        length: document.querySelector("#req-length"),
        case: document.querySelector("#req-case"),
        number: document.querySelector("#req-number"),
        special: document.querySelector("#req-special"),
    }

    // VALIDAÇÃO NOME
    fields.nome.forEach(field => {
        if (field) {

            field.addEventListener("keypress", (e) => {
                const valido = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]$/;
                if (!valido.test(e.key)) {
                    e.preventDefault();
                }
            });

            field.addEventListener("input", (e) => {
                let value = field.value.trim();

                if (value.length >= 10 && value.includes(" ")) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.nomeError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.nomeError.style.display = 'flex';
                }
            });
        }
    });

    // VALIDAÇÃO EMAIL
    fields.email.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                const value = field.value.trim();

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailRegex.test(value)) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.emailError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.emailError.style.display = 'flex';
                }
            });
        }
    });

    // VALIDAÇÃO NÚMERO DE TELEFONE
    fields.telefone.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 12) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.telefoneError.style.display = 'none';
                } else {

                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.telefoneError.style.display = 'flex';
                }
            });
        }
    });
    // VALIDAÇÃO CEP
    fields.cep.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 9) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.cepError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.cepError.style.display = 'flex';
                }
            });
        }
    });

    // VALIDAÇÃO ENDEREÇO 
    fields.endereco.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 5) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.enderecoError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.enderecoError.style.display = 'flex';
                }
            });
        }
    });
    // VALIDAÇÃO NÚMERO 
    fields.numero.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 2) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.numeroError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.numeroError.style.display = 'flex';
                }
            });
        }
    });
    // VALIDAÇÃO COMPLEMENTO 
    fields.complemento.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 4) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.complementoError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.complementoError.style.display = 'flex';
                }
            });
        }
    });
    // VALIDAÇÃO BAIRRO 
    fields.bairro.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 10) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.bairroError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.bairroError.style.display = 'flex';
                }
            });
        }
    });
    // VALIDAÇÃO CIDADE 
    fields.cidade.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 10) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.cidadeError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.cidadeError.style.display = 'flex';
                }
            });
        }
    });
    // VALIDAÇÃO ESTADO 
    fields.estado.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                let value = field.value.trim();
                if (value.length >= 2) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.estadoError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.estadoError.style.display = 'flex';
                }
            });
        }
    });

    fields.senha.forEach(field => {
        if (field) {
            field.addEventListener("input", () => {
                const value = field.value.trim();

                const lengthOk = value.length >= 8
                const caseOk = /[A-Z]/.test(value) && /[a-z]/.test(value)
                const numberOk = /\d/.test(value)
                const specialOk = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)

                if (field.value.length >= 8 && caseOk && numberOk && specialOk) {
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                    fields.emailError.style.display = 'none';
                } else {
                    field.classList.remove("valid");
                    field.classList.add("invalid");
                    fields.emailError.style.display = 'flex';
                }

                if (senhaRequisitos.length) {
                    senhaRequisitos.length.classList.toggle("valid", lengthOk)
                    senhaRequisitos.length.classList.toggle("invalid", !lengthOk)
                }

                if (senhaRequisitos.case) {
                    senhaRequisitos.case.classList.toggle("valid", caseOk)
                    senhaRequisitos.case.classList.toggle("invalid", !caseOk)
                }

                if (senhaRequisitos.number) {
                    senhaRequisitos.number.classList.toggle("valid", numberOk)
                    senhaRequisitos.number.classList.toggle("invalid", !numberOk)
                }

                if (senhaRequisitos.special) {
                    senhaRequisitos.special.classList.toggle("valid", specialOk)
                    senhaRequisitos.special.classList.toggle("invalid", !specialOk)
                }
            });
        }
    });
});


    // Validação de Login
    const formPerfil = document.querySelector("#form-perfil");
    const loginErrorMsg = document.querySelector("#login-error-msg");

    if (formPerfil) {
        formPerfil.addEventListener("submit", async (e) => {
            if (e.target.id === 'form-perfil')
                e.preventDefault();

            const formData = new FormData(e.target);
            const emailInput = formData.get('email');
            const senhaInput = formData.get('senha');

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailInput, senha: senhaInput })
                });
                const data = await response.json();

                if (response.ok && data.sucesso) {
                    localStorage.setItem('usuarioNome', data.nome); 
                    window.location.href = data.redirectUrl; 

                    if (loginErrorMsg) {
                        loginErrorMsg.textContent = data.error || "Erro ao fazer login";
                        loginErrorMsg.style.display = 'block';
                    } else {
                        alert(data.error); 
                    }
                }
            } catch (error) {
                console.error("Erro no fetch:", error);
                alert("Não foi possível conectar ao servidor."); 
            }
        });
    }

    // --- Após efetuar o login, aparece o nome de quem logou ---
    const nome = localStorage.getItem('usuarioNome');
    const userIcon = document.querySelector(".user-icon");
    if (nome && userIcon) {
        const primeiroNome = nome.split(' ')[0];
        userIcon.innerHTML = `<span style="font-size:12px; font-weight:bold; font-family: 'Lora', serif;
        ">Olá, ${primeiroNome}</span>`;

        userIcon.addEventListener("click", (e) => {
            e.preventDefault(); 

            if (confirm("Deseja realmente sair da sua conta?")) {
                localStorage.removeItem('usuarioNome'); 
                window.location.reload(); 
            }
        });
    }




