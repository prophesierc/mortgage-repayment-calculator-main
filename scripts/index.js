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
        this.completeFooterAnimationChange();
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
    
            document.querySelectorAll('input').forEach(input => 
            {
                input.value = '';
            });
        
            document.querySelectorAll('.radio-container span').forEach(span => 
            {
                span.classList.remove('selected');
            });

            this.values.mortgageAmount.original = '';
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
        document.querySelector('.submit').onclick = () => 
        {
            this.calculations();
            document.querySelector('.default-footer').classList.add('hide');
            document.querySelector('.complete-footer').classList.add('show');
        };
    }

    errorValidation() // wip
    {
        const submit = document.querySelector('.submit');

        document.querySelectorAll('input[type="radio"]').forEach(radio => 
        {
            radio.checked = false;
        });

        document.querySelectorAll('input').forEach(input => 
        {
            input.value = '';
        });

        submit.onclick = () =>
        {
            document.querySelectorAll('.errorText').classList.add('.errorText.display')
        }
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

    calculations() // do not run if !errorValidation
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