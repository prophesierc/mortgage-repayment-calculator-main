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
        this.completeFooterAnimationChange()
    }

    clear()
    {        
        document.querySelector('#clear').onclick = () =>
        {            
            Array.from(document.querySelectorAll('input')).forEach((x) => 
            {
                x.checked = false;
                x.value = null;    
            })                               
        }
    }
    
    radioSpanSelector() 
    {
        const radioInputSpans = document.querySelectorAll('.radio-container span');
        const radioInput = document.querySelectorAll('input[type="radio"]');

        radioInputSpans.forEach((input, index) => 
        {
            input.onclick = () => 
            {
                radioInput[index].checked = true;
            }
        })   
    }

    completeFooterAnimationChange() 
    {    
        document.querySelector('.submit').onclick = () => 
        {
            document.querySelector('.default-footer').classList.add('hide');
            document.querySelector('.complete-footer').classList.add('show');
        }
    }

    errorValidation() // wip
    {
        const submitButton = document.querySelector('.submit');
        const allInputs = document.querySelectorAll('input');
        
        submitButton.onclick = () =>
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

}
const calculator = new Calculator();