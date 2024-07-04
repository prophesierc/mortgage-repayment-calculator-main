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
    }

    clear()
    {
        const clearButton = document.querySelector('#clear');
        const allInputs = document.querySelectorAll('input');
        
        clearButton.onclick = () =>
        {            
            Array.from(allInputs).forEach((x) => 
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

}
const calculator = new Calculator();