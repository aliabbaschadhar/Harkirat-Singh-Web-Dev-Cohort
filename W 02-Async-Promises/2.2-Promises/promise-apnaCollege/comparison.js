function callbackDataforHell(dataId, getNextData) {
    // 2sec
    setTimeout(() => {
        console.log("Data :", dataId);
        if (getNextData) {
            getNextData();
        }
    }, 2000);
}

// This is the callback Hell 
callbackDataforHell(1, () => {
    callbackDataforHell(2, () => {
        callbackDataforHell(3, () => {
            callbackDataforHell(4, () => {
                callbackDataforHell(5, () => {
                    callbackDataforHell(6, () => {
                        callbackDataforHell(7);
                    })
                })
            })
        })
    });
})

function callbackDataforChaining(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data :", dataId);
            resolve("success");
        }, 2000)
    })
}

//Promise Chaining
callbackDataforChaining(1).then(() => {
    return callbackDataforChaining(2);
}).then(() => {
    return callbackDataforChaining(3);
}).then(() => {
    return callbackDataforChaining(4);
}).then((res) => {
    console.log(res)
})


//Using async await
async function getCallbackData() {
    await callbackDataforChaining(1);
    await callbackDataforChaining(2);
    await callbackDataforChaining(3);
    await callbackDataforChaining(4);
}

getCallbackData()