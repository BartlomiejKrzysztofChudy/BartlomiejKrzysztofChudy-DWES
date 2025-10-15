console.log("1");

const promise = new Promise(
      function  (resolve, reject){

         setTimeout(() => {
           console.log("resolve");
           resolve("resolve"); 
        }, 1000);
    }
);

console.log("2");

promise.then(
    function(val){
        console.log("3");
        
    }
)
promise.then(
     function(val){
       console.log("done");

    }
);

