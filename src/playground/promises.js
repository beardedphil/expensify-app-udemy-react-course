const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'Phil',
        //     age: 26,
        // });
        reject('Something went wrong.');
    });
});

console.log('before');

promise.then((data) => {
    console.log('1: ', data);
}).catch((error) => {
    console.log('Error:', error);
});

// This is a valid alternative, though since it isn't explicit,
// it is arguably harder to read
//
// promise.then((data) => {
//     console.log('1:', data);
// }, (error) => {
//     console.log('Error:', error);
// });

console.log('after');