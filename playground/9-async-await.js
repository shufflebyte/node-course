const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative');
            }
            resolve(a + b);
        }, 2000);
    });
};


// use await async

// 1. deutlich übersichtlicher als Promise-Chaining mit mehreren .then()-Teilen
// 2. die Values von sum, sum2, sum3 sind alle im gleichen Scope verfügbar (sonst müsste man immer Variablen in den Callbacks mitgeben)

// zu klären: Im Tutorial kein try catch in async fct. Jedoch kommt dann Fehler unhandled exception!
// Internet: try catch in async fct! 
const doWork = async () => {
    try {
        const sum = await add(1, -99);
        const sum2 = await add(sum, 50);
        const sum3 = await add(sum2, -3);
        return sum3;
    }
    catch (rejectedValue){
        console.log("This needs to be handled!")
    }
}

// this returns a Promise(return value)
// Hier sieht man, dass das Promise sofort zurück gegeben wird, aber der value erst 2*3 Sekunden pending ist
console.log(doWork());

// Dieser Code wird dann ausgeführt, wenn der value nicht mehr pending ist
doWork().then((result) => {
    console.log('result: ', result);
}).catch((e) => {
    console.log('error: ', e);
});

// ---------------------------

