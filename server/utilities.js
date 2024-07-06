class StringManipulate {
    
    //static method to used in the backend logic and procedures

    static RemoveSqrBrac(str){

        const charToRemove = /\[|\]/g;
        let newstring = str.replace(charToRemove, "");

        return newstring;

    }
    
    static RemoveQuotation(str){

        const charToRemove = /\"|\"/g

        return str.replace(charToRemove, ''); 

    }

}



class DashBoardTools {
    static greet() {
        return 'hellow world';
    }
}




module.exports = {
    StringManipulate
};