// const async = (a, callback) => {
//     setTimeout(() => {
//         const b = a + 1;
//         callback(b);
//     }, 200);
// }

// async(5, (b) => {console.log(b)});

function async (a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a) {
                const b = a + 1;
                resolve(b);
            } else {
                reject('error!');
            }
        }, 2000);
    });
}

async(5).then((b) => {
    console.log(b)
}, (error) => {
    console.log(error)
});

async().then((b) => {
    console.log(b)
}, (error) => {
    console.log(error)
});