const square = function(x){
    return x*x;
}

const squared_arrowed = (x) => {
    return x*x;
}

const squared_arrowed2 = (x) => x*x;


// hier würde eine Arrow function nicht gut klappen, weil die Funktion nicht zum event (this) gebindet würde
const event = {
    name: 'Birthday',
    printGuestList: function(){
        console.log('Guest List for ' + this.name);
    }
}

// das wird undefined, weil das this-binding nicht übernommen wird! (daher this auf undefined)
const event2 = {
    name: 'Birthday',
    guestList: ['Hugo', 'Horst', 'Olaf'],
    printGuestList(){   // ES6 Syntax
        console.log('Guest List for ' + this.name);
        this.guestList.forEach(function(guest) {
            console.log(guest + 'is attending ' + this.name);
        })
    }
}

// sowas kann man aber machen
// printGuestList hat this auf event3
// this.name hat Binding auf event3, weil Arrow Function mit => das binding von oben drüber übernimmt
const event3 = {
    name: 'Birthday',
    guestList: ['Hugo', 'Horst', 'Olaf'],
    printGuestList(){
        console.log('Guest List for ' + this.name);
        this.guestList.forEach((guest) => {
            console.log(guest + 'is attending ' + this.name);
        })
    }
}


// => ARROW functions do not bind their own this value!

console.log(square(3));
console.log(squared_arrowed(3));
console.log(squared_arrowed2(3));
event.printGuestList();
event2.printGuestList();
event3.printGuestList();