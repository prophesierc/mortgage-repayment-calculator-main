class Calculator 
{
    constructor() 
    {
        this.values = 
        {
            mortgageAmount: 
            {
                original: null, // stores pre formatted cached value
                formatted: null // stores formatted cached value
            }
        };
        this.init();
    }

    init()
    {
        this.cacheElements();
        this.clear();
        this.radioSpanSelector();
        this.errorValidation();
        this.toLocalStringInputFormatter();
    }

    cacheElements() 
    {
        this.values.mortgageAmount.original = document.querySelector('input[type="text"]');
    }

    clear() 
    {
        document.querySelector('#clear').onclick = () => 
        {
            document.querySelectorAll('input[type="radio"]').forEach(radio => 
            {
                radio.checked = false;
            });

            document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => 
            {
                input.value = null;
                
            });

            document.querySelectorAll('.radio-container span').forEach(span => 
            {
                span.classList.remove('selected');
            });

            document.querySelectorAll('.errorText').forEach(error => 
            {
                error.classList.remove('display');
            });

            document.querySelectorAll('.inputClassJS').forEach(error => 
            {
                error.classList.remove('error');
            });

            document.querySelectorAll('.errorColorChanger').forEach(icon => {
                icon.classList.remove('changer');
            });

            this.values.mortgageAmount.original = null;
            this.values.mortgageAmount.formatted = null;

            document.querySelector('.complete-footer').classList.remove('show');
            document.querySelector('.default-footer').classList.remove('hide');
        };
    }

    radioSpanSelector() 
    {
        document.querySelectorAll('.radio-container span').forEach((span, index) => 
        {
            span.onclick = () => 
            {
                document.querySelectorAll('input[type="radio"]').forEach(radio => 
                {
                    radio.checked = false;
                });
                    
                document.querySelectorAll('.radio-container span').forEach(span => 
                {
                    span.classList.remove('selected');
                });
    
                document.querySelectorAll('input[type="radio"]')[index].checked = true;
                span.classList.add('selected');
            };
        });
    }
    
    completeFooterAnimationChange() 
    {
        this.calculations();
        document.querySelector('.default-footer').classList.add('hide');
        document.querySelector('.complete-footer').classList.add('show');
    }

    errorValidation() 
    {
        const submit = document.querySelector('.submit');
        const errorText = document.querySelectorAll('.errorText');
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="radio"]');   
    
        submit.onclick = () => 
        {       
            let hasError = false;
    
            errorText.forEach((error, index) => 
            {        
                const errorInput = inputs[index];
                const borderInput = inputs[index];
                const errorIcon = document.querySelectorAll('.errorColorChanger')[index];
    
                const hasValidationError = 
                    (errorInput.type === "radio" && !document.querySelector('input[name="mortgage-type"]:checked')) 
                    || errorInput.value.trim() === "";
    
                error.classList.toggle('display', hasValidationError);
                borderInput && borderInput.classList.toggle('error', hasValidationError);
                borderInput && borderInput.classList.toggle('dynamic-error', hasValidationError);
                borderInput && borderInput.classList.toggle('errorClass', hasValidationError);
                if (errorIcon) 
                {
                    errorIcon.classList.toggle('changer', hasValidationError);
                }
    
                hasError = hasError || hasValidationError;
            });
    
            if (!hasError) 
            {        
                this.completeFooterAnimationChange();
            }
        };
    }
    
    

    toLocalStringInputFormatter() 
    {
        const input = this.values.mortgageAmount.original;
        input.oninput = () => 
        {
            const formattedValue = input.value.replace(/[^\d]/g, '');

            this.values.mortgageAmount.original = formattedValue ? parseInt(formattedValue, 10) : null;

            this.values.mortgageAmount.formatted = formattedValue ? parseInt(formattedValue, 10).toLocaleString() : '';

            input.value = this.values.mortgageAmount.formatted;
        };
    }

    calculations()
    {
        const mortgageAmount = this.values.mortgageAmount.original;
        const inputs = document.querySelectorAll('input[type="number"]');
        const radios = document.querySelectorAll('input[type="radio"]');
        const totalPayments = parseInt(inputs[0].value, 10) * 12;
        const monthlyInterestRate = parseFloat(inputs[1].value) / 100 / 12;
        let monthlyPayment;
        let totalRepayment;

        if (radios[0].checked) 
        {
            monthlyPayment = (mortgageAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
        } 
        else if (radios[1].checked) 
        {
            monthlyPayment = mortgageAmount * monthlyInterestRate;
        }

        totalRepayment = monthlyPayment * totalPayments;
        this.values.mortgageAmount.formatted = monthlyPayment.toLocaleString();

        document.querySelector('.js-repayement').textContent = this.values.mortgageAmount.formatted;

        document.querySelector('.js-repayement-total').textContent = totalRepayment.toLocaleString();
    }
}
const calculator = new Calculator();