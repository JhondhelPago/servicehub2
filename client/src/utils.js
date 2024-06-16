class TimeUtils {

   

    static _24HrTo12hr (time_string){
        const timeArray = time_string.split(':');

        const Hr = parseInt(timeArray[0]); 
        const Min = timeArray[1];
        

        let _12hr;

        let timeMark;

        if(Hr >= 12){
            timeMark = 'PM';
            _12hr =  Hr - 12 ;
        }else{
            timeMark = 'AM';
            _12hr =  Hr;
        }

        return `${_12hr.toString()}:${Min} ${timeMark}`;
        
    }
}

class ImageStringUtils {

    static ToArray(image_string){
        
        return image_string.split(',');
    }

    static FirstImageElement (image_string){

        return this.ToArray(image_string)[0];
    }

}












class StringManipulate {
    static ToLowerCase(string){
        return string.toLowerCase();
    }
}

function sampleEdit(props){
    // const obj_props = {title: newTitle, creator: newCreatorName};
    const obj_props = props;


    try{
        fetch('/editpost',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(obj_props)
        });

    }catch(error){
        throw error;
    }
}

export {
    TimeUtils,
    ImageStringUtils,
    sampleEdit
}



