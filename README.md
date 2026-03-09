************************************************************
                Some Question and Answers
************************************************************

1. What is the difference between var, let, and const?

Answer: In JavaScript we have these three components to declare a variable.
    
    ( i ) var: This keyword is function scoped. A variable declared with "var" keyword can be redeclared and also can be reassigned and updated. Variables declared with var can be hoisted, means this variable can be accessed even before the declaration line arrives. The value will be undefined in this case.

    ( ii ) let: This keyword is a block scoped element, means if it is declared inside a block then it can only be accessed inside the block like conditional statements. A variable declared with "let" keyword cannot be redeclared again in the entire file or project. Although it can be reassigned with new value and also can be updated inside array type things. Although let also gets hoisted but it is placed in a Temporal Dead Zone term which means it cannot be accessed before its declaration.

    ( iii ) const: const is completely similar with let as its also block scoped, cannot be redeclared, gets hoisted but placed in temporal dead zone so its values also cannot be accessed before initialization. But one difference is there, that it cannot be re-assigned with a new value. although data type like array and object can be updated (inside elements). But the whole value cannot be changed with re-assigning.

2. What is the spread operator (...)?

Answer: In JavaScript, spread operator is used to spread the elements of array or object type elements individually.

We need to use this operator while working with an array or object and we don't want to change the original element value. If we do not use this, then the original element will be changed as we know array and object are stored by a memory location reference.

For example,
    
    // Without spread operator, if we copy one array and change, the original array will also change

    const arr1 = [1, 2, 3];
    const arr2 = arr1;
    arr2.push(4);
    console.log(arr1); // output: [1, 2, 3, 4]

    // With spread operator, if we copy one array and change, the original array will not be affected
    
    const arr3 = [4, 5, 6];
    const arr4 = [...arr3];
    arr4.push(7);
    console.log(arr3); // output: [4, 5, 6]
    console.log(arr4); // output: [4, 5, 6, 7]
    
3. What is the difference between map(), filter(), and forEach()?

Answer: In JavaScript, map(), filter(), and forEach() are array methods used to iterate over elements of an array. But these have some different functionality and also in output they have difference.

    ( i ) map(): This method is used when we need to transform each element of an array and create a new array with the updated values. It runs a function on every element of an array and stores the returned result into a new array, leaving the original array unchanged.

    ( ii ) filter(): This method is used when we want to select specific element/s from an array based on a condition. All element satisfies the condition defined in the callback function is gathered into a new array.

    ( iii ) forEach(): This method is used when we want to iterate over an array and perform an action for each element. It does not return a new array like the other two. It executes the provided function for each element of the array and return undefined.

4. What is an arrow function?

Answer: An arrow function is a update and modern way to write a function. It uses => (arrow) instead of traditional "function" keyword. It has a best use for small functions with a single work to do. With the help of this, the function can be written in only one line making it easy to read, and clear.

    // Traditional way of one operation add
    function add(a, b) {
        return a + b;
    }

    // Arrow function for add operation
    const add2 = (a, b) => {
        return a + b;
    }

    // shorter version for add operation
    const add3 = (a, b) => a + b;

Although Traditional function are still very widely used in many places. In our project we also used many functions. Because this can be called before initialization line, means hoisted. We needed to call a function in many places. So in those cases and greater works traditional functions are better (Personal Thought).

5. What are template literals?

Answer: Template string are widely used where we need to use dynamic values. While writing string, basically we use single quotes ('') and double quotes (""). But when we need to use dynamic value, we use backticks (``). This makes the code easy to read and also easy to use with dynamic values. and also MultiLine string can be used by using template string. That's another advantage of this.