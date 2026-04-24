// VALIDAÇÃO NOME
addEventListener("DOMContentLoaded", () => {
    const fields = {
        nome: document.querySelector("input[name='nome']"),
        nomeError: document.querySelector("#nome-error"),
        email: document.querySelectorAll("input[name='email']"),
        emailError: document.querySelector("#email-error"),
        senha: document.querySelectorAll("input[name='senha']"),
        senhaError: document.querySelector("#senha-error"),
    }

    const senhaRequisitos = {
        length: document.querySelector("#req-length"),
        case: document.querySelector("#req-case"),
        number: document.querySelector("#req-number"),
        special: document.querySelector("#req-special"),
    }

    if (fields.nome) {

        fields.nome.addEventListener("input", () => {
            let value = fields.nome.value.trim();
            if (value.length >= 3) {
                fields.nome.classList.remove("invalid");
                fields.nome.classList.add("valid");
                fields.nomeError.style.display = 'none';
            } else {
                fields.nome.classList.remove("valid");
                fields.nome.classList.add("invalid");
                fields.nomeError.style.display = 'flex';
            }
        });
    }

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



