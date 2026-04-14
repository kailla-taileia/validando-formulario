class ValidaCpf {
    constructor(numCpf) {
        
       Object.defineProperty(this, 'cpfLimpo',{
        writable: false,
        enumerable: true,
        configurable: false,
        value: numCpf.replace(/\D+/g, ''),
       });
    }

    sequencia(stringCpf){
        return stringCpf.charAt(0).repeat(stringCpf.length) === this.cpfLimpo;
    }

    newCpf(cpf){
        cpf = cpf.slice(0, -2);
        let digit1 = this.validDigit(cpf);
        let digit2 = this.validDigit(cpf + digit1);
        let newCpf = cpf + digit1 + digit2;
        return newCpf;
    }

    validDigit(cpfSemDigitos){
        let acumulador = 0;
        let reverso = cpfSemDigitos.length + 1;

        for (let stringNumerica of cpfSemDigitos){
            acumulador += reverso * Number(stringNumerica);
            reverso --;
 
        };

        const digito = 11 - (acumulador % 11);

        if (digito >= 10) return "0";

        return digito;

        
    }

    isvalid(){
        if(!this.cpfLimpo) return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.sequencia(this.cpfLimpo)) return false;
        this.newCpf(this.cpfLimpo);
        return(this.newCpf(this.cpfLimpo) ===  this.cpfLimpo);

        

    }
}


