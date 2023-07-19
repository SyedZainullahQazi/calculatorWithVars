// Import specific functions from Math.js


export default class EvaluationModule
{

    //-----------------------------------//
    //        Constructor                //
    //-----------------------------------//
    constructor()
    {

        //The Object Array To Store Variables
        this.variableObject=
        [   {name:"pi",value:"3.142"},
            {name:"e",value:"2.718"},
            {name:"sqrt",value:"Math.sqrt"},
            {name:"sin",value:"Math.sin"},
            {name:"cos",value:"Math.cos"},
            {name:"tan",value:"Math.tan"},];

        //Reference To Output Field on Calculator
        this.outputText=document.getElementById("output");

        //Reference to the Input Field on Calculator
        this.inputText=document.getElementById("input");

        //Reference to the Equal button On Calculator
        this.equalBtn=document.getElementById("equal");

        //Reference To the Submit Variable Btn On Calculator
        this.submitVar=document.getElementById("submitVar");

        //Adds EqualBtn EventListener - Evaluates Expression
        this.evaluateExpression();

    }


    //----------------------------------------------//
    //    Listens To Equal Buttons Pressed          //
    //    Gets The Input Expression                 //
    //    Check Expression Is Correct               //
    //    Calls checkTypeOfExpression               //
    //----------------------------------------------//
    evaluateExpression()
    {
        this.equalBtn.addEventListener("click",()=>{
            try
            {
                console.log(this.inputText.value)
                this.checkTypeOfExpression(this.inputText.value);
            }
            catch(error)//Error Occured and Expression was Wrong
            {
                this.outputText.value="Error - Cannot Evaluate  Expression"
            }
        });
    }

    //------------------------------------//
    //Check in string the Stored Vars     //
    //evolve sotred names to their values //
    //return the evolved expression       //
    //------------------------------------//
    evolveExpression(argExpression)
    {
        //Getting the Instances from Object 
        for (let storedVar of this.variableObject)
        {
            const regex = new RegExp("\\b" +  storedVar.name + "\\b", "g");
            argExpression = argExpression.replace(regex, storedVar.value);
        }
        return argExpression;
    }

    //-------------------------------------//
    // Gets Expression from EvaluateExp    //
    // Check If its Variable Assign or Calc//
    // Based On Check calls relevent func  //
    //-------------------------------------//
    checkTypeOfExpression(expr)
    {
        if(expr.includes("="))
        {
            console.log("Variable type Expression");
            this.evaluateVariableExpression(expr);
        }
        else
        {
            console.log("Calculator Type Expression");
            this.evaluateCalculatorExpression(expr);
        }
    }


    //-------------------------------------------------//
    //evolves by replacing stored var names with value
    //if calc expression its not NaN and is true       //
    //Prints the Evaluated Answer                      //
    //-------------------------------------------------//    
    evaluateCalculatorExpression(expr)
    {
        let ans=eval(this.evolveExpression(expr));
        if(ans){ //If the expression calcualted was correct 
            this.outputText.value=ans;
        }
        else if(ans==0)  //Special Case if answer is zero 
        {
            this.outputText.value=ans;
        }
        else { //if the expression was wrong 
            this.outputText.value="Error - Cannot Evaluate Given Expression"
        }
    }

    //------------------------------------------------------//
    //Evaluates the Expression of Variable storage type     //
    //splits the string based on the assignment sign        //
    //then evaluates the left side of the equation with     //
    //evolveExpression                                      //
    //checks if the name already exsist, replaces value if  //
    //exsists otherwise adds the object to vars object array//
    //------------------------------------------------------//
    evaluateVariableExpression(expr)
    {
        expr=expr.replace(/\s/g, "");
        let parts = expr.split("=");
        let value=this.evolveExpression(parts[1]);
        let name=parts[0];
        try
        {
           
            value=eval(value);
            let check=this.checkExsisting(name);
            if(check)
            {
                
                this.variableObject[check].value=value;
                this.outputText.value="Variable Updated";
            }
            else
            {            
                this.variableObject.push({name,value});
                this.outputText.value="Variable Added";
            }
        }
        catch(error)
        {
            this.outputText.value="Error - Adding Variable";
        }
        
    }

    //------------------------------------------//
    // Check if there is already exsisting var  //
    // with the same name it returns index of   //
    // the variable if exsistant and false if   //
    // its non-exsistant                        //
    //------------------------------------------//
    checkExsisting(name)
    {
        for(let i=0;i < this.variableObject.length;i++)
        {
            if(this.variableObject[i].name==name)
            {
                console.log(this.variableObject[i].name);
                return i;
            }
        }
        return false;
    }

}