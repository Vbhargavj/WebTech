fruits=['apple','banana','grapes','mango']

// console.log(fruits.push('vbj') )
// console.log(fruits)

// console.log(fruits.slice())
console.log(fruits.pop())
console.log(fruits.join(', '))

fruits.forEach(function(num){
    console.log(num)
});

const num=[1,2,4,5,6]

const doubleNum=num.map(function(num){
    return num*2
})
console.log(doubleNum)