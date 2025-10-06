function anagrama(palabra1, palabra2) {
    if (palabra1 === palabra2) {
        return false;
    }

    const ordenada1 = palabra1.toLowerCase().split("").sort().join("");
    const ordenada2 = palabra2.toLowerCase().split("").sort().join("");

    return ordenada1 === ordenada2;
}

console.log(anagrama("Roma", "Amor")); 
console.log(anagrama("Hola", "Halo"));
console.log(anagrama("Hola", "Calor")); 
