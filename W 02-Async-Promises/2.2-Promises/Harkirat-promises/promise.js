class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFullfilledCallbacks = [] //Queue for success callbacks like for then
        this.onRejectCallbacks = [] //Queue for failed callbacks like for catch

        //resolve
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fullfilled';
                this.value = value;

                //execute all the received success callbacks
                this.onFullfilledCallbacks.forEach((cb) => cb(value));
            }
        }

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                //execute all the stored failure callbacks
                this.onRejectCallbacks.forEach((cb) => cb(reason));
            }
        }

        //Execute the executor function
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    // then(onFullfilled, onRejected) {
    //     onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (value) => value;
    //     onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error };

    //     if (this.state === 'fullfilled') {
    //         onFullfilled(this.value);
    //     } else if (this.state === 'rejected') {
    //         onRejected(this.reason);
    //     } else {
    //         //Store the calls for asynchronous execution
    //         this.onFullfilledCallbacks.push(onFullfilled);
    //         this.onRejectCallbacks.push(onRejected);
    //     }
    // }

    //Modifying it to support promise chaining

    then(onFullfilled, onRejected) {
        //Checking default case like if onFullfilled is a function then remain it a function if not then remain its value as it is
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (value) => value;
        onRejected = typeof onRejected === "function" ? onRejected : (error) => { throw error };

        return new MyPromise((resolve, reject) => {
            if (this.state === 'fullfilled') {
                try {
                    const result = onFullfilled(this.value);
                    resolve(result); //Resolve a new promise   
                } catch (error) {
                    reject(error); //Reject if error occurs
                }
            } else if (this.state === 'rejected') {
                try {
                    const result = onRejected(this.reason);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else {
                this.onFullfilledCallbacks.push(() => {
                    try {
                        const result = onFullfilled(this.value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            //Handling pending states by queuing the callbacks
            this.onRejectCallbacks.push(() => {
                try {
                    const result = onRejected(this.reason);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            })
        });

    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

(function main() {
    const myPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => resolve(5), 500); // Resolve with 5 after 500ms
    });

    myPromise
        .then((value) => value * 2) // 5 * 2 = 10
        .then((value) => value + 3) // 10 + 3 = 13
        .then((result) => console.log(result)) // Output: 13
        .catch((err) => console.log(err));
})()