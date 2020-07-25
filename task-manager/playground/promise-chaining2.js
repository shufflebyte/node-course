require('../src/db/mongoose');
const Task = require('../src/models/task');
const { count } = require('../src/models/task');

// Task.findByIdAndDelete('5f19522fc2200f27963acc2d')
// .then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false});
// }).then((numDocs) => {
//     console.log(numDocs);
// }).catch((e) => {
//     console.log(e);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
};

deleteTaskAndCount('5f198afd9497e32f1b0094a1')
.then((count) => {
    console.log(count);
}).catch((e) => {
    console.log("some error occured: ", e);
});