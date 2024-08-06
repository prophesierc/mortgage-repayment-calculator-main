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
        this.calculations();
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
            this.values.mortgageAmount.original.value = '';
            this.values.mortgageAmount.formatted = null;
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
        // document.querySelector('.submit').onclick
        onload = () => 
        {
            document.querySelector('.default-footer').classList.add('hide');
            document.querySelector('.complete-footer').classList.add('show');
        }
    }

    errorValidation() // wip
    {
        const allInputs = document.querySelectorAll('input');
        
        document.querySelector('.submit').onclick = () =>
        {            
            // Array.from(allInputs).forEach((x) => 
            // {
            //     if (x.checked === false || x.value === null)
            //     {
            //         console.log(x.value)
            //     };
            // }) 
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

    calculations() 
    {
        
        document.querySelector('.submit').onclick = () => 
        {
            const mortgageAmount = this.values.mortgageAmount.original;
            const mortgageAmountFormatted = this.values.mortgageAmount.formatted;

            document.querySelector('.js-repayement').textContent = mortgageAmountFormatted;
        };
    }

}
const calculator = new Calculator();