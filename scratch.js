let religion = {
    'catholic' : 0,
    'iglesia' : 0,


    getKeys : function(){
        return Object.keys(this);
    }
}


const variable  = 'iglesia';


for(let i = 0 ;  i < 5; i++ ){

    religion[variable]+=1;

}

console.log(religion);

console.log(religion.getKeys());


console.log(religion.hasOwnProperty('getKeys'));
console.log(typeof religion['catholic']);