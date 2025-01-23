// Callback Hell
// The callback hell is a pattern where multiple callbacks are nested inside each other, 
// resulting in a complex and difficult to understand code structure.

// Consider we need to fetch data from a database and then process it.

function getData(dataId) {
    //We are making query to database and it is getting 2 sec to return the data which is a type of asynchronous programming
    setTimeout(() => {
        console.log("Data :", dataId);
    }, 2000)
}
getData(89); //Data : 89 (2 sec)

//What if we want to find the data1 and then after 2 sec data2 and then after 2 sec data3
getData(1);
getData(2);
getData(3);

//Both data1, data2, and data3 gets printed after 2 sec but it should take whole 6 sec so for that ...

//! CallBack Hell

// Consider we have to fetch data1 and if data1 found then make query for data2 and then data3 and so on we will use callbacks for that 
// data1 // 2sec
// data2  // 2sec
// data3  // 2sec

function callbackData(dataId, getNextData) {
    // 2sec
    setTimeout(() => {
        console.log("Data :", dataId);
        if (getNextData) {
            getNextData();
        }
    }, 2000);
}

// callbackData()--> Let's say we have to find data1 and then data2 and then data3 so in callbackHell we will provide it with dataId 1 and then it will give us data1 after 2 seconds

// Then it checks if getNextData callback function exists I mean if we want to find the next data then we will find the next data otherwise we will exist from function.



// This is the callback Hell 
callbackData(1, () => {
    callbackData(2, () => {
        callbackData(3, () => {
            callbackData(4, () => {
                callbackData(5, () => {
                    callbackData(6, () => {
                        callbackData(7);
                    })
                })
            })
        })
    });
})

// As we see that it is not very readable
