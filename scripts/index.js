class Calculator
{
    constructor()
    {
        this.init();
    }
    init()
    {
        this.clear();
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

}
const calculator = new Calculator();