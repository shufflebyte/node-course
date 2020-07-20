
// object shorthands
const name = 'Hugo';
const userAge = 55;

const user = {
    name: name,
    age: userAge,
    location: 'Unterhorst'
};


const user2 = {
    name,   // shorthand
    age: userAge,
    location: 'Unterhorst'
};

console.log(user);
console.log(user2);

// object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

//const label = product.label // pointer to product label...
// ...

const {label, stock, rating} = product

console.log(label);
console.log(stock);
console.log(rating); // undefined 

//rating = 234; // TypeError: Assignment to constant variable.
//console.log(rating);
console.log(product);

// rename variables
const {label:productLabel} = product
// now the objects label is referenced by variable productLabel
console.log(productLabel);

const car = {
    wheels: undefined,
    doors: 4
};

// default values
const {wheels= 4, doors = 7, somethingUndefined = 'hodor'} = car
console.log(wheels)
console.log(doors)
console.log(somethingUndefined)
// defaults only used if undefinded

// use default values to get no errors if destructuring undefined values!
// with eg =0 or {foo, baar} = {}
const transaction = (type, {label, stock = 0} = {}) => {
    console.log(type, label, stock);
}

transaction('order', product);