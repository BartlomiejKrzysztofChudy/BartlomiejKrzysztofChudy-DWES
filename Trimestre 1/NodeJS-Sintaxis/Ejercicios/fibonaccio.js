function fibonacciDosVariables(n) {
    let a = 0, b = 1;
    console.log(a);

    for (let i = 2; i <= n; i++) {
        let c = a + b;
        console.log(c);
        a = b;
        b = c;
    }
}

fibonacciDosVariables(10);
