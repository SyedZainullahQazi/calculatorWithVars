
//Defining a Class For Event Listener Of Button Clicks
export default class EventListenerModule
{

    //-----------------------------------------//
    //              constructor                //
    //-----------------------------------------//
    constructor()
    {
        //Array to hold the id Name of all buttons
        this.buttons = [
            'sin', 'one', 'two', 'three', 'plus', 'cos', 'four',
            'five', 'six', 'minus', 'parLeft', 'tan', 'seven', 'eight',
            'nine', 'multiply', 'parRight', 'pi', 'varMode', 'zero',
            'euler', 'divide', 'sqrt', 'input'
          ];

        // Attach the event listeners to all the buttons
        this.MakeEventListeners();

        //Event Listener for Power Button
        this.powerButtonEvent();

        //Selecting Input Output
        this.inputText=document.getElementById("input");

        //Clearing Input Field 
        this.clrInp=document.getElementById("clrInp");
        this.clearInput();
        
    }


    //--------------------------------------//
    //    Event Listeners for Buttons       //
    //--------------------------------------//
    MakeEventListeners()
    {
        this.buttons.forEach((buttonID)=>{
            let btnRef=document.getElementById(buttonID);
            btnRef.addEventListener("click",this.appendInput.bind(this))
        })
    }


    //----------------------------------------//
    //    Power Button Event Listener         //
    //----------------------------------------//
    powerButtonEvent()
    {
        let powerButton=document.getElementById('power');
        powerButton.addEventListener("click",()=>
        {
            this.inputText.value+="**"
        })
    }


    //--------------------------------------------------------//
    //  Appends The Button text to the input text field       //
    //--------------------------------------------------------//
    appendInput(event)
    {
        this.inputText.value+=event.target.innerText;        
    }


    //--------------------------------------------//
    //           Clearing Input                   //
    //--------------------------------------------//
    clearInput()
    {
        this.clrInp.addEventListener("click",()=>{
            this.inputText.value="";
        })
    }
}

