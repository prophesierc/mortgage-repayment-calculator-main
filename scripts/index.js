class Calculator
{
    
    constructor()
    {
        this.init();
    }

    init()
    {
        this.clear();
        this.radioSpanSelector();
        this.errorValidation();
        this.toLocalStringInputFormatter();
        this.completeFooterAnimationChange();
        this.calculations();
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
        const input = document.querySelector('input[type="text"]');
        input.oninput = () => 
        {
            const numericValue = input.value.replace(/[^\d]/g, '');

            numericValue !== '' 
            ? input.value = parseInt(numericValue, 10).toLocaleString() 
            : input.value = '';
        }
    }    

    calculations()
    {
        const mortgageAmount = document.querySelectorAll('input[type="text"]');
        console.log(mortgageAmount)
        const inputs = document.querySelectorAll('input[type="number"]');
        console.log(inputs)
        const radios = document.querySelectorAll('input[type="radio"]');
        console.log(radios)
        
        
        document.querySelector('.submit').onclick = () =>  
        {
            document.querySelector('.js-repayement').textContent = inputs[0].value
            document.querySelector('.js-repayement-total').textContent = 5
        }
    }

}
const calculator = new Calculator();