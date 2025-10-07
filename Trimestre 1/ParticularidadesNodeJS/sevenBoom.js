function sevenBoom(myArray = []){
    for(let n of myArray){
        if(String(n).includes('7')){

            return 'BOOM'
        }
    }

    return "there is no 7 in the array"

}

console.log(sevenBoom([1, 2, 3, 4, 5, 6, 7]))







