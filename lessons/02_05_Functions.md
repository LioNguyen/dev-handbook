# Python Functions Reference

## Table of Contents

- [Python Functions Reference](#python-functions-reference)
  - [Table of Contents](#table-of-contents)
  - [Introduction to Functions](#introduction-to-functions)
  - [Defining Functions](#defining-functions)
    - [Basic Function Definition](#basic-function-definition)
    - [Function Parameters](#function-parameters)
    - [Return Statement](#return-statement)
  - [Calling Functions](#calling-functions)
    - [Basic Function Calls](#basic-function-calls)
    - [Built-in Functions](#built-in-functions)
  - [Advanced Function Concepts](#advanced-function-concepts)
    - [Default Parameters](#default-parameters)
    - [Keyword Arguments](#keyword-arguments)
    - [Variable-Length Arguments](#variable-length-arguments)
    - [Unpacking Arguments](#unpacking-arguments)
  - [Function Behavior](#function-behavior)
    - [Return Values](#return-values)
    - [Modifying Objects](#modifying-objects)
    - [None Value](#none-value)
    - [Side Effects](#side-effects)
  - [Function Scope](#function-scope)
    - [Local Variables](#local-variables)
    - [Global Variables](#global-variables)
    - [The `global` Keyword](#the-global-keyword)
    - [The `nonlocal` Keyword](#the-nonlocal-keyword)
  - [Lambda Functions](#lambda-functions)
  - [Documentation and Type Hints](#documentation-and-type-hints)
    - [Docstrings](#docstrings)
    - [Type Hints](#type-hints)
  - [Python vs. JavaScript Functions](#python-vs-javascript-functions)
    - [Function Declaration](#function-declaration)
    - [Default Parameters](#default-parameters-1)
    - [Return Values](#return-values-1)
    - [Function Arguments](#function-arguments)
    - [Anonymous Functions](#anonymous-functions)
    - [Hoisting](#hoisting)
    - [Closures](#closures)
    - [Function Scope Differences](#function-scope-differences)
  - [Best Practices](#best-practices)

## Introduction to Functions

Functions are reusable blocks of code that perform a specific task. They help organize code, make it more readable, and reduce redundancy. Python provides many built-in functions, but you can also define your own functions.

## Defining Functions

### Basic Function Definition

In Python, functions are defined using the `def` keyword followed by the function name and parentheses.

Syntax:

```python
def function_name():
    # Code block
    # Statements to execute
```

Example:

```python
def greet():
    print('Hello, World!')
```

### Function Parameters

Functions can accept inputs called parameters.

Syntax:

```python
def function_name(parameter1, parameter2, ...):
    # Code block using parameters
```

Example:

```python
def multiplyByThree(val):
    return 3 * val
```

```python
def multiply(val1, val2):
    return val1 * val2
```

### Return Statement

Functions can send results back using the `return` statement.

Syntax:

```python
def function_name(parameters):
    # Code block
    return value
```

Example:

```python
def multiplyByThree(val):
    return 3 * val
```

## Calling Functions

### Basic Function Calls

To execute a function, you call it using its name followed by parentheses, including any required arguments.

Examples:

```python
# Calling a function with no arguments
greet()  # Output: Hello, World!

# Calling a function with one argument
result = multiplyByThree(4)
print(result)  # Output: 12

# Calling a function with multiple arguments
product = multiply(3, 4)
print(product)  # Output: 12
```

### Built-in Functions

Python has many built-in functions. Here are a few examples:

```python
# print() is a built-in function
print('Hello, World!')  # Output: Hello, World!

# type() returns the type of an object
print(type(42))  # Output: <class 'int'>

# len() returns the length of an object
print(len([1, 2, 3]))  # Output: 3
```

## Advanced Function Concepts

### Default Parameters

You can specify default values for parameters.

Syntax:

```python
def function_name(param1, param2=default_value):
    # Code block
```

Example:

```python
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # Output: 9 (3^2)
print(power(3, 3))  # Output: 27 (3^3)
```

### Keyword Arguments

You can call functions using parameter names.

Example:

```python
def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type} named {pet_name}.")

# Using positional arguments
describe_pet('hamster', 'Harry')

# Using keyword arguments
describe_pet(pet_name='Harry', animal_type='hamster')
```

Both calls output: `I have a hamster named Harry.`

### Variable-Length Arguments

Functions can accept a variable number of arguments using special syntax.

- `*args` - collects positional arguments into a tuple
- `**kwargs` - collects keyword arguments into a dictionary

Example:

```python
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3, 4))  # Output: 10
print(sum_all(10, 20))      # Output: 30

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, country="Wonderland")
# Output:
# name: Alice
# age: 25
# country: Wonderland
```

### Unpacking Arguments

You can unpack lists or dictionaries to provide arguments to functions.

Example:

```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))  # Output: 6

params = {'a': 1, 'b': 2, 'c': 3}
print(add(**params))  # Output: 6
```

## Function Behavior

### Return Values

Functions can return a single value, multiple values, or nothing.

```python
# Returning a single value
def square(x):
    return x ** 2

# Returning multiple values
def min_max(numbers):
    return min(numbers), max(numbers)

min_val, max_val = min_max([1, 5, 3, 9, 2])
print(min_val, max_val)  # Output: 1 9
```

### Modifying Objects

Functions can modify mutable objects passed as arguments.

Example:

```python
a = [1, 2, 3]

def appendFour(myList):
    myList.append(4)

appendFour(a)
print(a)  # Output: [1, 2, 3, 4]
```

In this example, the list `a` is modified inside the function because lists are mutable objects in Python.

### None Value

Functions without a `return` statement or with an empty `return` statement return `None`.

Example:

```python
# A function without a return statement returns None
def say_hello():
    print("Hello!")

result = say_hello()
print(result)  # Output: None
print(type(None))  # Output: <class 'NoneType'>
```

Trying to perform operations with `None` typically results in errors:

```python
try:
    None + 1
except TypeError as e:
    print(f"Error: {e}")  # Output: Error: unsupported operand type(s) for +: 'NoneType' and 'int'
```

### Side Effects

Functions can have side effects, like printing to the console or modifying global variables.

Example:

```python
# A function with a side effect (printing)
def greet(name):
    print(f"Hello, {name}!")  # Side effect: prints to console
    return f"Greeted {name}"  # Return value

# The return value of print() is None
result = print('Hello, World!')
print(result)  # Output: None
```

## Function Scope

### Local Variables

Variables defined inside a function are local to that function.

Example:

```python
def my_function():
    local_var = 10
    print(local_var)

my_function()  # Output: 10

try:
    print(local_var)  # Error: local_var is not defined
except NameError as e:
    print(f"Error: {e}")
```

### Global Variables

Variables defined outside any function are global.

Example:

```python
global_var = 10

def my_function():
    print(global_var)  # Can access global variable

my_function()  # Output: 10
```

### The `global` Keyword

Use `global` to modify a global variable inside a function.

Example:

```python
counter = 0

def increment():
    global counter
    counter += 1
    print(counter)

increment()  # Output: 1
increment()  # Output: 2
```

### The `nonlocal` Keyword

Use `nonlocal` to modify a variable in an enclosing (but not global) scope.

Example:

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x += 5
        print(x)

    inner()
    print(x)

outer()
# Output:
# 15
# 15
```

## Lambda Functions

Lambda functions are small anonymous functions defined using the `lambda` keyword.

Syntax:

```python
lambda arguments: expression
```

Examples:

```python
# Lambda function to square a number
square = lambda x: x ** 2
print(square(5))  # Output: 25

# Lambda with multiple parameters
multiply = lambda x, y: x * y
print(multiply(3, 4))  # Output: 12

# Lambda with sorted()
points = [(1, 2), (3, 1), (5, 0), (2, 4)]
sorted_points = sorted(points, key=lambda point: point[1])
print(sorted_points)  # Output: [(5, 0), (3, 1), (1, 2), (2, 4)]
```

## Documentation and Type Hints

### Docstrings

Docstrings describe what a function does and are enclosed in triple quotes.

Example:

```python
def calculate_area(radius):
    """
    Calculate the area of a circle.

    Args:
        radius (float): The radius of the circle

    Returns:
        float: The area of the circle
    """
    import math
    return math.pi * radius ** 2

# Accessing the docstring
print(calculate_area.__doc__)
```

### Type Hints

Type hints indicate the expected types of function parameters and return values.

Example:

```python
def greet(name: str) -> str:
    """Greet a person by name."""
    return f"Hello, {name}!"

def get_first_item(items: list) -> str:
    """Return the first item from a list."""
    return items[0]
```

## Python vs. JavaScript Functions

### Function Declaration

**Python**:

```python
# Function declaration
def greet(name):
    return f"Hello, {name}!"

# Function call
greet("Alice")
```

**JavaScript**:

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression
const greetExpression = function (name) {
  return `Hello, ${name}!`;
};

// Arrow function (ES6+)
const greetArrow = (name) => {
  return `Hello, ${name}!`;
};

// Simplified arrow function for single expressions
const greetShort = (name) => `Hello, ${name}!`;

// Function calls
greet("Alice");
greetExpression("Bob");
greetArrow("Charlie");
greetShort("David");
```

### Default Parameters

**Python**:

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))            # "Hello, Alice!"
print(greet("Bob", "Howdy"))     # "Howdy, Bob!"
```

**JavaScript**:

```javascript
// ES6+ syntax
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Howdy")); // "Howdy, Bob!"
```

### Return Values

**Python**:

```python
# Function without a return statement returns None
def no_return():
    pass

print(no_return())  # None
```

**JavaScript**:

```javascript
// Function without a return statement returns undefined
function noReturn() {
  // No return statement
}

console.log(noReturn()); // undefined
```

### Function Arguments

**Python**:

```python
# Variable number of positional arguments
def sum_all(*args):
    return sum(args)

# Variable number of keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print(sum_all(1, 2, 3, 4))  # 10
print_info(name="Alice", age=25)  # name: Alice \n age: 25
```

**JavaScript**:

```javascript
// Rest parameters (ES6+)
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Object for keyword-like arguments
function printInfo(info) {
  for (const [key, value] of Object.entries(info)) {
    console.log(`${key}: ${value}`);
  }
}

console.log(sumAll(1, 2, 3, 4)); // 10
printInfo({ name: "Alice", age: 25 }); // name: Alice \n age: 25
```

### Anonymous Functions

**Python** (Lambda - limited to a single expression):

```python
# Lambda function
square = lambda x: x * x

# Used in higher-order functions
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x * x, numbers))
print(squared)  # [1, 4, 9, 16]
```

**JavaScript** (Arrow functions - can contain multiple statements):

```javascript
// Arrow function - single expression
const square = (x) => x * x;

// Arrow function - multiple statements
const complexFunc = (x) => {
  const result = x * x;
  return result + 1;
};

// Used in higher-order functions
const numbers = [1, 2, 3, 4];
const squared = numbers.map((x) => x * x);
console.log(squared); // [1, 4, 9, 16]
```

### Hoisting

**Python** (no hoisting):

```python
# This will cause an error
try:
    result = multiply(3, 4)  # NameError: name 'multiply' is not defined
except NameError as e:
    print(f"Error: {e}")

# Correct order
def multiply(a, b):
    return a * b

result = multiply(3, 4)  # Works fine
```

**JavaScript** (function declarations are hoisted, expressions are not):

```javascript
// This works due to hoisting
console.log(hoistedFunc(3, 4)); // 12

function hoistedFunc(a, b) {
  return a * b;
}

// This fails - function expressions aren't hoisted
try {
  console.log(notHoisted(3, 4)); // Error: notHoisted is not defined
} catch (e) {
  console.log(`Error: ${e.message}`);
}

const notHoisted = function (a, b) {
  return a * b;
};
```

### Closures

**Python**:

```python
def create_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

counter = create_counter()
print(counter())  # 1
print(counter())  # 2
```

**JavaScript**:

```javascript
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

### Function Scope Differences

**Python**:

```python
x = 10  # Global variable

def modify_global():
    global x
    x = 20

def access_global():
    return x  # Can read global variables by default

def create_local():
    x = 30  # Creates a new local variable
    return x

print(x)                # 10
print(access_global())  # 10
print(create_local())   # 30
print(x)                # 10 (unchanged)
modify_global()
print(x)                # 20 (modified)
```

**JavaScript**:

```javascript
var x = 10; // Global variable

function modifyGlobal() {
  x = 20; // Modifies global by default if not redeclared
}

function accessGlobal() {
  return x; // Can read global variables
}

function createLocal() {
  var x = 30; // Creates a new local variable with function scope
  return x;
}

function createBlockScoped() {
  let x = 40; // Block-scoped variable (ES6+)
  return x;
}

console.log(x); // 10
console.log(accessGlobal()); // 10
console.log(createLocal()); // 30
console.log(x); // 10 (unchanged)
modifyGlobal();
console.log(x); // 20 (modified)
```

## Best Practices

1. **Use descriptive names**: Choose function names that describe what the function does.

2. **Keep functions small**: Each function should do one thing well.

3. **Document your functions**: Add docstrings to explain the purpose, parameters, and return values.

4. **Use type hints**: Add type hints to make your code more readable and catch type errors.

5. **Return early**: Use early returns to handle edge cases and simplify logic.

6. **Avoid side effects**: Functions should preferably be "pure" (no side effects).

7. **Minimize use of global variables**: Pass data through parameters instead.

8. **Use exceptions appropriately**: Raise exceptions when functions encounter errors.

9. **Test your functions**: Write unit tests to ensure functions work as expected.

10. **Follow consistent style**: Adhere to the PEP 8 style guide for Python code.
