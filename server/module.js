/*
userId -> user id reference
adminId -> admin id reference
*/

function setSessionVariable(key, value){

    localStorage.setItem(key, JSON.stringify(value));

}

function getSessionVariable(key){

    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;

}

function sampleArith(a, b, operator){

    let result;
    
    switch(operator){
        case '+':
            result = a + b;
            break;

        case '-':
            result = a - b;
            break;
        
        case '*':
            result = a * b;
            break;

        case '/':
            result = a / b;
            break;

        default:
            return null;

    }

    return result;

}

function samplefunction(){
    return 'hello world';
}




