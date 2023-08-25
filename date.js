



// console.log(module);


// module.exports="Hello There this is Harsh kumar."

// module.exports.getDate=getDate;



module.exports.getDate= function (){           // function as variable .

let today = new Date();

// var listTitle;
// var newListItems;


let option = {

    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"

};

return day = today.toLocaleDateString("en-us", option);



// return day;



}


// module.exports.getDay=getDay;



module.exports.getDay= function (){                 // function as variable 

    let today = new Date();
    
    // var listTitle;
    // var newListItems;
    
    
    let option = {
        
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    
    };
    
    return day = today.toLocaleDateString("en-us", option);
    
    
    
    // return day;
    
    
    
    }






