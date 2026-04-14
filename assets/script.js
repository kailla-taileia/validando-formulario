document.addEventListener("DOMContentLoaded",()=>{
    class validaForm{
        constructor(){
            this.form = document.querySelector("form");
            this.events();
        }

        events(){   //eventos
            this.form.addEventListener('submit', e =>{
                this.handleSubmit(e);
            });

            this.userName();
            this.isOnlyLetters();

            this.addMask();
            


        }


        handleSubmit(e){  //submeter formulário
            e.preventDefault();
            const inputValid = this.isInputEmpty();

            if(inputValid){
                const dados= {};

                for (let input of this.form.querySelectorAll(".inputBox")) {
                    dados[input.name] = input.value;
                }

                localStorage.setItem("usuario", JSON.stringify(dados));
                window.alert("Formulário enviado!");
                this.form.submit();
            }
        }

        
        


        //não capturar simbolos no user
        userName(){
            const inputUser = this.form.querySelector("#user");

            inputUser.addEventListener("input", (e) =>{
               inputUser.value = inputUser.value.replace(/[^a-zA-Z0-9]/g, ""); 

            });
            
        }

        //aceitar apenas letras em nome e sobrenome
        isOnlyLetters(){
            const inputNew = this.form.querySelectorAll(".onlyLetter");

            for(let input of inputNew){
                input.addEventListener("input", (e)=>{
                    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                });
            }

            
        }



        createError(parent, mensage){
            const p = document.createElement("p");

            p.textContent = mensage;
            p.classList.add("error");
            parent.insertAdjacentElement("afterend", p);
        }
        
        
        //verificação dos inputs
        isInputEmpty(){
            let valid = true;
            let mensagem = "";
            const keyPass = this.form.querySelector(".keyPass");
            const repeatKeyPass = this.form.querySelector(".repeatPass");


            // evitar duplicação de erro
            for(let error of this.form.querySelectorAll(".error")){

                error.remove();
            }


            //igualdade de senha e repetir senha
            if(keyPass.value && repeatKeyPass.value){

                if(repeatKeyPass.value !== keyPass.value){
                    this.createError(repeatKeyPass, `Campo "${keyPass.name}" e "${repeatKeyPass.name}" precisam ser iguais`);
                    valid = false;
                }
                
            }

            for(let inputField of this.form.querySelectorAll(".inputBox")){
                
                //input vazio
                if(!inputField.value){
                    mensagem = `Campo "${inputField.name}" não pode estar em branco`;
                    this.createError(inputField, mensagem);
                    valid = false;
                }

                //validar cpf
                if(inputField.classList.contains('cpf')){
                    this.validacpf(inputField);
                }


                //definir tamanho padrão do input user
                if (inputField.classList.contains('user')) {
                    const length = inputField.value.length;

                    if(!inputField.value)continue;

                    if (length < 3 || length > 14) {
                        this.createError(inputField, 'Usuário precisa ter entre 3 e 14 caracteres');
                        valid = false;
                    }
                }

                
                ////definir tamanho padrão dos inputs de senha
                if(inputField.classList.contains('password')){

                    const length = inputField.value.length;
                    

                    if(!inputField.value)continue;

                    if (length < 6 || length > 12) {
                        this.createError(inputField, 'Senha precisa ter entre 6 e 12 caracteres');
                        valid = false;
                    }
                }

            }

            return valid;
        }


        validacpf(campo){
            const cpf = new ValidaCpf(campo.value);

            if(!campo.value) return;
            
            if(!cpf.isvalid()){
                this.createError(campo, 'CPF inválido!')
                return false;
            }
            return true;
            
        }
        
        //adicionar mascara conforme digita cpf
        addMask(){
            const inputCpf = this.form.querySelector('.cpf');
            inputCpf.addEventListener('input', (e)=>{
                e.target.value = this.maskCPF(e.target.value);
            })
        }

        maskCPF(num) {

            num = num.replace(/\D/g, "");

            if (num.length > 3)
                num = num.slice(0, 3) + "." + num.slice(3);

            if (num.length > 7)
                num = num.slice(0, 7) + "." + num.slice(7);

            if (num.length > 11)
                num = num.slice(0, 11) + "-" + num.slice(11);

            return num.slice(0, 14);

        }
    };
    const validForm = new validaForm();
    
});

