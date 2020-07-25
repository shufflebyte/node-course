require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5f1989e37f47d52e7a7f5c40', {age: 1}).then((user) => {
    //console.log(user);
    return User.countDocuments({age: 1});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});

const updateAgeAndCount = async (id, age) => {
    const user = User.findByIdAndUpdate(id, {age: 0});
    const count = User.countDocuments({age});
    return count;
}

updateAgeAndCount('5f1989e37f47d52e7a7f5c40', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});

