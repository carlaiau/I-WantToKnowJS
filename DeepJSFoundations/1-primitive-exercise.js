/* 
Exercise 1

Manage the special cases of NaN and 0/-1 without using the newly introduced 
Object.is method.

Math.sign(0) returns 0
Math.sign(-0) returns -0
Lol, so to get a correct sign from this, 
we can divide by the zeros
to get signed infinites
*/

// My original solution 
Object.is = function(a, b){
    if(Number.isNaN(a) && Number.isNaN(b))
        return true

    if(a === 0 && b === 0){
        return Math.sign(1/a) == Math.sign(1/b)
    }    
    return a === b
}

// Kyle's solution. Not using built in methods for Nan or Sign checking
Object.is = function(x, y){
    const xNegZero = isNegZero(x)
    const yNegZero = isNegZero(y)

    if(xNegZero || yNegZero){
        return xNegZero && yNegZero
    }
    else if(isItNan(x) && isItNan(y)){
        return true
    }
    else{
        return x === y
    }

    function isNegZero(x){
        return x === 0 && (1 / x) === -Infinity
    }
    function isItNan(x){
        // Nan's are the only type that doesn't equal itself
        return x !== x 
    }
    
}

// All test assertions should pass
console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log(Object.is(null,null) === true);
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);
console.log(Object.is(-1,-1) === true);
console.log(Object.is(0,0) === true);

console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);