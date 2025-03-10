# 1. Python Functions Reference with JavaScript Comparisons

## 1.1 Table of Contents

- [1. Python Functions Reference with JavaScript Comparisons](#1-python-functions-reference-with-javascript-comparisons)
  - [1.1 Table of Contents](#11-table-of-contents)
  - [1.2 Introduction](#12-introduction)
  - [1.3 Frequently Used Function Features](#13-frequently-used-function-features)
    - [1.3.1 Basic Function Definition](#131-basic-function-definition)
      - [Python Syntax:](#python-syntax)
      - [JavaScript Comparison:](#javascript-comparison)
      - [Python Example:](#python-example)
      - [JavaScript Equivalent:](#javascript-equivalent)
    - [1.3.2 Function Parameters](#132-function-parameters)
      - [Python Syntax:](#python-syntax-1)
      - [JavaScript Comparison:](#javascript-comparison-1)
      - [Python Example:](#python-example-1)
      - [JavaScript Equivalent:](#javascript-equivalent-1)
    - [1.3.3 Return Values](#133-return-values)
      - [Python Syntax:](#python-syntax-2)
      - [JavaScript Comparison:](#javascript-comparison-2)
      - [Python Example:](#python-example-2)
      - [JavaScript Equivalent:](#javascript-equivalent-2)
    - [1.3.4 Calling Functions](#134-calling-functions)
      - [Python Syntax:](#python-syntax-3)
      - [JavaScript Comparison:](#javascript-comparison-3)
      - [Python Example:](#python-example-3)
      - [JavaScript Equivalent:](#javascript-equivalent-3)
    - [1.3.5 Function Scope](#135-function-scope)
      - [Python Example:](#python-example-4)
      - [JavaScript Equivalent:](#javascript-equivalent-4)
    - [1.3.6 Default Parameters](#136-default-parameters)
      - [Python Syntax:](#python-syntax-4)
      - [JavaScript Comparison:](#javascript-comparison-4)
      - [Python Example:](#python-example-5)
      - [JavaScript Equivalent:](#javascript-equivalent-5)
    - [1.3.7 Lambda Functions](#137-lambda-functions)
      - [Python Syntax:](#python-syntax-5)
      - [JavaScript Comparison:](#javascript-comparison-5)
      - [Python Example:](#python-example-6)
      - [JavaScript Equivalent:](#javascript-equivalent-6)
  - [1.4 Rarely Used Function Features](#14-rarely-used-function-features)
    - [1.4.1 Keyword Arguments](#141-keyword-arguments)
      - [Python Syntax:](#python-syntax-6)
      - [JavaScript Comparison:](#javascript-comparison-6)
      - [Python Example:](#python-example-7)
      - [JavaScript Equivalent:](#javascript-equivalent-7)
    - [1.4.2 Variable-Length Arguments](#142-variable-length-arguments)
      - [Python Syntax:](#python-syntax-7)
      - [JavaScript Comparison:](#javascript-comparison-7)
      - [Python Example:](#python-example-8)
      - [JavaScript Equivalent:](#javascript-equivalent-8)
    - [1.4.3 Unpacking Arguments](#143-unpacking-arguments)
      - [Python Syntax:](#python-syntax-8)
      - [JavaScript Comparison:](#javascript-comparison-8)
      - [Python Example:](#python-example-9)
      - [JavaScript Equivalent:](#javascript-equivalent-9)
    - [1.4.4 Global and Nonlocal Keywords](#144-global-and-nonlocal-keywords)
      - [Python Example:](#python-example-10)
      - [JavaScript Equivalent:](#javascript-equivalent-10)
    - [1.4.5 Docstrings and Type Hints](#145-docstrings-and-type-hints)
      - [Python Example:](#python-example-11)
      - [JavaScript Equivalent:](#javascript-equivalent-11)
    - [1.4.6 Function Attributes](#146-function-attributes)
      - [Python Example:](#python-example-12)
      - [JavaScript Equivalent:](#javascript-equivalent-12)
    - [1.4.7 Function as First-Class Objects](#147-function-as-first-class-objects)
      - [Python Example:](#python-example-13)
      - [JavaScript Equivalent:](#javascript-equivalent-13)
    - [1.4.8 Closures](#148-closures)
      - [Python Example:](#python-example-14)
      - [JavaScript Equivalent:](#javascript-equivalent-14)
    - [1.4.9 Decorators](#149-decorators)
      - [Python Example:](#python-example-15)
      - [JavaScript Equivalent:](#javascript-equivalent-15)
    - [1.4.10 Generator Functions](#1410-generator-functions)
      - [Python Syntax:](#python-syntax-9)
      - [JavaScript Comparison:](#javascript-comparison-9)
      - [Python Example:](#python-example-16)
      - [JavaScript Equivalent:](#javascript-equivalent-16)
  - [1.5 Best Practices](#15-best-practices)
    - [1.5.1 Python Best Practices](#151-python-best-practices)
    - [1.5.2 JavaScript Best Practices](#152-javascript-best-practices)
    - [1.5.3 Language Transition Tips](#153-language-transition-tips)

## 1.2 Introduction

Functions are reusable blocks of code that perform specific tasks. They help organize code, improve readability, and reduce redundancy. This reference compares Python functions with their JavaScript equivalents to assist developers working in both languages.

The document is divided into:

- **Frequently Used Features**: Common function patterns used in everyday coding
- **Rarely Used Features**: Advanced function capabilities for specialized scenarios

## 1.3 Frequently Used Function Features

### 1.3.1 Basic Function Definition

Functions are defined with the `def` keyword in Python and the `function` keyword in JavaScript.

#### Python Syntax:

```python
def function_name(parameters):
    # Function body
    # Code to execute
    return value  # Optional
```

#### JavaScript Comparison:

| Feature             | Python                    | JavaScript                     |
| ------------------- | ------------------------- | ------------------------------ |
| Declaration keyword | `def`                     | `function`                     |
| End of function     | Indentation defines scope | Curly braces `{}` define scope |
| Function expression | Not common in Python      | `const func = function() {}`   |
| Arrow functions     | N/A (lambda is different) | `const func = () => {}`        |

#### Python Example:

```python
def greet():
    print("Hello, World!")

def add(a, b):
    return a + b
```

#### JavaScript Equivalent:

```javascript
// Function declaration
function greet() {
  console.log("Hello, World!");
}

function add(a, b) {
  return a + b;
}

// Function expression
const greetExpression = function () {
  console.log("Hello, World!");
};

// Arrow function
const addArrow = (a, b) => a + b;
```

### 1.3.2 Function Parameters

Both languages allow functions to accept parameters (inputs).

#### Python Syntax:

```python
def function_name(param1, param2):
    # Use param1 and param2
```

#### JavaScript Comparison:

| Feature                 | Python                         | JavaScript                             |
| ----------------------- | ------------------------------ | -------------------------------------- |
| Basic parameters        | `def func(a, b):`              | `function func(a, b) {`                |
| Parameter type checking | Optional with type hints       | None by default (TypeScript adds this) |
| Handling missing args   | Error if required args missing | Parameters default to `undefined`      |

#### Python Example:

```python
def multiply(x, y):
    return x * y

result = multiply(5, 3)  # 15
```

#### JavaScript Equivalent:

```javascript
function multiply(x, y) {
  return x * y;
}

const result = multiply(5, 3); // 15
```

### 1.3.3 Return Values

Functions can return values using the `return` statement.

#### Python Syntax:

```python
def function_name():
    # Function body
    return value  # Return a value (optional)
```

#### JavaScript Comparison:

| Feature          | Python                           | JavaScript               |
| ---------------- | -------------------------------- | ------------------------ |
| Basic return     | `return value`                   | `return value;`          |
| Multiple returns | `return a, b, c` (returns tuple) | `return [a, b, c];`      |
| No return        | Returns `None`                   | Returns `undefined`      |
| Early return     | `return` can be anywhere         | `return` can be anywhere |

#### Python Example:

```python
def square(x):
    return x * x

def get_coordinates():
    return 10, 20  # Returns a tuple (10, 20)

def do_something():
    print("Doing something")
    # No return statement, returns None
```

#### JavaScript Equivalent:

```javascript
function square(x) {
  return x * x;
}

function getCoordinates() {
  return [10, 20]; // Returns an array [10, 20]
}

function doSomething() {
  console.log("Doing something");
  // No return statement, returns undefined
}
```

### 1.3.4 Calling Functions

Functions are called by name with arguments in parentheses.

#### Python Syntax:

```python
function_name(arg1, arg2)
```

#### JavaScript Comparison:

| Feature            | Python                                    | JavaScript                                                        |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------- |
| Basic call         | `function_name(arg1, arg2)`               | `functionName(arg1, arg2);`                                       |
| Method call        | `object.method(arg1, arg2)`               | `object.method(arg1, arg2);`                                      |
| Built-in functions | Many built-ins (e.g., `len()`, `print()`) | Global objects with methods (e.g., `console.log()`, `Math.max()`) |

#### Python Example:

```python
def add(a, b):
    return a + b

result = add(5, 3)  # 15

# Built-in functions
length = len([1, 2, 3])  # 3
print("Hello")           # Outputs: Hello
```

#### JavaScript Equivalent:

```javascript
function add(a, b) {
  return a + b;
}

const result = add(5, 3); // 15

// Built-in functions and methods
const length = [1, 2, 3].length; // 3
console.log("Hello"); // Outputs: Hello
```

### 1.3.5 Function Scope

Variables defined inside a function are local to that function.

#### Python Example:

```python
def my_function():
    local_var = 10
    print(local_var)  # 10

my_function()

# print(local_var)  # Error: local_var is not defined

global_var = 20

def read_global():
    print(global_var)  # 20

read_global()
```

#### JavaScript Equivalent:

```javascript
function myFunction() {
  let localVar = 10;
  console.log(localVar); // 10
}

myFunction();

// console.log(localVar);  // Error: localVar is not defined

let globalVar = 20;

function readGlobal() {
  console.log(globalVar); // 20
}

readGlobal();
```

### 1.3.6 Default Parameters

Both languages allow default values for parameters.

#### Python Syntax:

```python
def function_name(param1, param2=default_value):
    # Function body
```

#### JavaScript Comparison:

| Feature             | Python                                     | JavaScript                       |
| ------------------- | ------------------------------------------ | -------------------------------- |
| Basic syntax        | `def func(a, b=5):`                        | `function func(a, b = 5) {`      |
| Default computation | Evaluated once at definition               | Evaluated at each call if needed |
| Order requirement   | Default params must come after non-default | Same rule                        |

#### Python Example:

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))          # Hello, Alice!
print(greet("Bob", "Howdy"))   # Howdy, Bob!
```

#### JavaScript Equivalent:

```javascript
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob", "Howdy")); // Howdy, Bob!
```

### 1.3.7 Lambda Functions

Python's lambda functions are similar to JavaScript's arrow functions, but more limited.

#### Python Syntax:

```python
lambda parameters: expression
```

#### JavaScript Comparison:

| Feature        | Python                          | JavaScript          |
| -------------- | ------------------------------- | ------------------- |
| Syntax         | `lambda x: x * 2`               | `(x) => x * 2`      |
| Multiline body | Not supported (expression only) | Supported with `{}` |
| Function name  | Always anonymous                | Can be named        |

#### Python Example:

```python
# Lambda function assigned to a variable
double = lambda x: x * 2
print(double(5))  # 10

# Lambda function used directly
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16]

# Lambda in sorting
points = [(1, 5), (3, 2), (5, 7)]
sorted_points = sorted(points, key=lambda p: p[1])
print(sorted_points)  # [(3, 2), (1, 5), (5, 7)]
```

#### JavaScript Equivalent:

```javascript
// Arrow function assigned to a variable
const double = (x) => x * 2;
console.log(double(5)); // 10

// Arrow function used directly
const numbers = [1, 2, 3, 4];
const squared = numbers.map((x) => x ** 2);
console.log(squared); // [1, 4, 9, 16]

// Arrow function in sorting
const points = [
  [1, 5],
  [3, 2],
  [5, 7],
];
const sortedPoints = points.sort((a, b) => a[1] - b[1]);
console.log(sortedPoints); // [[3, 2], [1, 5], [5, 7]]
```

## 1.4 Rarely Used Function Features

### 1.4.1 Keyword Arguments

Python's named arguments are more flexible than JavaScript's object parameters.

#### Python Syntax:

```python
def function(param1, param2):
    # Function body

# Call with keyword arguments
function(param2=value2, param1=value1)
```

#### JavaScript Comparison:

| Feature           | Python                            | JavaScript                                           |
| ----------------- | --------------------------------- | ---------------------------------------------------- |
| Named arguments   | `func(name="Alice", age=30)`      | Uses destructuring: `func({name: "Alice", age: 30})` |
| Order flexibility | Can reorder named args            | Properties in object can be in any order             |
| Mixing styles     | Can mix positional and named args | Must separate positional from object args            |

#### Python Example:

```python
def display_info(name, age, city):
    print(f"{name} is {age} years old and lives in {city}")

# Using keyword arguments - order doesn't matter
display_info(city="New York", name="Alice", age=30)
# Alice is 30 years old and lives in New York

# Mix of positional and keyword arguments
display_info("Bob", city="Boston", age=25)
# Bob is 25 years old and lives in Boston
```

#### JavaScript Equivalent:

```javascript
// Using an object parameter for named arguments
function displayInfo({ name, age, city }) {
  console.log(`${name} is ${age} years old and lives in ${city}`);
}

// Call with an object - order doesn't matter
displayInfo({ city: "New York", name: "Alice", age: 30 });
// Alice is 30 years old and lives in New York

// Alternative approach with separate parameters
function displayInfoAlt(name, age, city) {
  console.log(`${name} is ${age} years old and lives in ${city}`);
}

// No direct equivalent to mixing positional and named args
// Would need to use all positional args
displayInfoAlt("Bob", 25, "Boston");
```

### 1.4.2 Variable-Length Arguments

Python can collect extra positional or keyword arguments.

#### Python Syntax:

```python
def function(*args, **kwargs):
    # args is a tuple of positional arguments
    # kwargs is a dictionary of keyword arguments
```

#### JavaScript Comparison:

| Feature            | Python                                | JavaScript                                 |
| ------------------ | ------------------------------------- | ------------------------------------------ |
| Collect positional | `def func(*args):`                    | `function func(...args) {`                 |
| Collect keyword    | `def func(**kwargs):`                 | No direct equivalent; use object parameter |
| Usage in function  | `args` is a tuple, `kwargs` is a dict | `args` is an array                         |

#### Python Example:

```python
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4))  # 10
print(sum_all(10, 20))      # 30

def print_person(name, **details):
    print(f"Name: {name}")
    for key, value in details.items():
        print(f"{key}: {value}")

print_person("Alice", age=30, city="New York", job="Developer")
# Name: Alice
# age: 30
# city: New York
# job: Developer
```

#### JavaScript Equivalent:

```javascript
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10
console.log(sumAll(10, 20)); // 30

function printPerson(name, details = {}) {
  console.log(`Name: ${name}`);
  for (const [key, value] of Object.entries(details)) {
    console.log(`${key}: ${value}`);
  }
}

printPerson("Alice", { age: 30, city: "New York", job: "Developer" });
// Name: Alice
// age: 30
// city: New York
// job: Developer
```

### 1.4.3 Unpacking Arguments

Both languages can spread collections into function arguments.

#### Python Syntax:

```python
function_name(*iterable)      # Unpacks iterable to positional arguments
function_name(**dictionary)   # Unpacks dictionary to keyword arguments
```

#### JavaScript Comparison:

| Feature              | Python         | JavaScript                             |
| -------------------- | -------------- | -------------------------------------- |
| Unpack array to args | `func(*list)`  | `func(...array)`                       |
| Unpack dict to args  | `func(**dict)` | `func({...object})` with destructuring |

#### Python Example:

```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))  # 6

def greet(name, age, city):
    return f"{name} is {age} and lives in {city}"

person = {"name": "Alice", "age": 30, "city": "New York"}
print(greet(**person))  # Alice is 30 and lives in New York
```

#### JavaScript Equivalent:

```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6

function greet(name, age, city) {
  return `${name} is ${age} and lives in ${city}`;
}

const person = { name: "Alice", age: 30, city: "New York" };
// One approach using spread in object destructuring:
console.log(greet(person.name, person.age, person.city));
// Alice is 30 and lives in New York

// Alternative with destructured parameter:
function greetObj({ name, age, city }) {
  return `${name} is ${age} and lives in ${city}`;
}
console.log(greetObj(person));
```

### 1.4.4 Global and Nonlocal Keywords

Python has explicit keywords to modify variables in outer scopes.

#### Python Example:

```python
counter = 0

def increment():
    global counter  # Access global variable
    counter += 1
    return counter

print(increment())  # 1
print(increment())  # 2

def outer():
    x = 10
    def inner():
        nonlocal x  # Access variable from enclosing scope
        x += 5
        return x
    return inner()

print(outer())  # 15
```

#### JavaScript Equivalent:

```javascript
let counter = 0;

function increment() {
  // JavaScript has lexical scope - global variables are accessible
  // No 'global' keyword needed
  counter += 1;
  return counter;
}

console.log(increment()); // 1
console.log(increment()); // 2

function outer() {
  let x = 10;
  function inner() {
    // Closures in JavaScript capture the enclosing scope
    // No 'nonlocal' keyword needed
    x += 5;
    return x;
  }
  return inner();
}

console.log(outer()); // 15
```

### 1.4.5 Docstrings and Type Hints

Python has built-in documentation features and optional type annotations.

#### Python Example:

```python
def calculate_area(radius: float) -> float:
    """
    Calculate the area of a circle.

    Args:
        radius: The radius of the circle

    Returns:
        The area of the circle
    """
    import math
    return math.pi * radius ** 2

# Access the docstring
print(calculate_area.__doc__)

# Type hints don't affect runtime behavior
area = calculate_area(5)
```

#### JavaScript Equivalent:

```javascript
/**
 * Calculate the area of a circle.
 *
 * @param {number} radius - The radius of the circle
 * @returns {number} The area of the circle
 */
function calculateArea(radius) {
  return Math.PI * radius ** 2;
}

// Access the JSDoc comment (not as straightforward as Python)
console.log(calculateArea.toString());

// For type checking in JavaScript, you would use TypeScript:
/*
function calculateArea(radius: number): number {
    return Math.PI * radius ** 2;
}
*/
```

### 1.4.6 Function Attributes

Python functions are objects and can have attributes assigned to them.

#### Python Example:

```python
def greet(name):
    """Say hello to someone"""
    return f"Hello, {name}!"

# Add attributes to the function
greet.author = "John Doe"
greet.version = "1.0"

print(greet.author)   # John Doe
print(greet.version)  # 1.0
print(greet.__doc__)  # Say hello to someone
```

#### JavaScript Equivalent:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

// Functions in JavaScript are also objects and can have properties
greet.author = "John Doe";
greet.version = "1.0";

console.log(greet.author); // John Doe
console.log(greet.version); // 1.0
```

### 1.4.7 Function as First-Class Objects

Both languages treat functions as first-class objects that can be passed around.

#### Python Example:

```python
def apply_operation(func, x, y):
    return func(x, y)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(apply_operation(add, 5, 3))      # 8
print(apply_operation(multiply, 5, 3)) # 15
```

#### JavaScript Equivalent:

```javascript
function applyOperation(func, x, y) {
  return func(x, y);
}

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log(applyOperation(add, 5, 3)); // 8
console.log(applyOperation(multiply, 5, 3)); // 15
```

### 1.4.8 Closures

Both languages support closures, allowing functions to maintain access to variables from their defining scope.

#### Python Example:

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
print(counter())  # 3
```

#### JavaScript Equivalent:

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
console.log(counter()); // 3
```

### 1.4.9 Decorators

Python has a decorator syntax that extends function behavior.

#### Python Example:

```python
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_function_call
def add(a, b):
    return a + b

add(3, 5)
# Outputs:
# Calling add
# add returned 8
```

#### JavaScript Equivalent:

```javascript
function logFunctionCall(func) {
  return function wrapper(...args) {
    console.log(`Calling ${func.name}`);
    const result = func(...args);
    console.log(`${func.name} returned ${result}`);
    return result;
  };
}

// No direct decorator syntax, must apply manually
function add(a, b) {
  return a + b;
}

const loggedAdd = logFunctionCall(add);
loggedAdd(3, 5);
// Outputs:
// Calling add
// add returned 8

// ES2022+ adds a decorator proposal, but it's different from Python's
/*
@logMethod
class Example {
    @logProperty
    method() { ... }
}
*/
```

### 1.4.10 Generator Functions

Both languages support generator functions that yield values one at a time.

#### Python Syntax:

```python
def generator_function():
    yield value1
    yield value2
```

#### JavaScript Comparison:

| Feature     | Python            | JavaScript               |
| ----------- | ----------------- | ------------------------ |
| Declaration | `def gen():`      | `function* gen() {`      |
| Yield       | `yield value`     | `yield value;`           |
| Iteration   | `for x in gen():` | `for (let x of gen()) {` |

#### Python Example:

```python
def count_up_to(n):
    i = 0
    while i < n:
        yield i
        i += 1

for number in count_up_to(5):
    print(number)  # 0, 1, 2, 3, 4

generator = count_up_to(3)
print(next(generator))  # 0
print(next(generator))  # 1
print(next(generator))  # 2
```

#### JavaScript Equivalent:

```javascript
function* countUpTo(n) {
  let i = 0;
  while (i < n) {
    yield i;
    i++;
  }
}

for (const number of countUpTo(5)) {
  console.log(number); // 0, 1, 2, 3, 4
}

const generator = countUpTo(3);
console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
```

## 1.5 Best Practices

### 1.5.1 Python Best Practices

1. **Follow naming conventions**:

   - Function names should be lowercase with words separated by underscores (snake_case)
   - `my_function()` instead of `myFunction()` or `MyFunction()`

2. **Use docstrings for documentation**:

   ```python
   def function_name():
       """Brief description of what the function does.

       More detailed explanation if needed.

       Args:
           param1: Description of first parameter

       Returns:
           Description of return value
       """
   ```

3. **Return early to avoid deep nesting**:

   ```python
   def process_data(data):
       if not data:
           return None

       # Process valid data here
   ```

4. **Functions should do one thing well**:

   - Keep functions focused on a single task
   - Aim for functions under 20-30 lines

5. **Use type hints for clarity**:

   ```python
   def greet(name: str) -> str:
       return f"Hello, {name}!"
   ```

6. **Avoid mutable default arguments**:

   ```python
   # Bad:
   def append_to(element, target=[]):
       target.append(element)
       return target

   # Good:
   def append_to(element, target=None):
       if target is None:
           target = []
       target.append(element)
       return target
   ```

7. **Use keyword arguments for clarity**:
   ```python
   connect_to_database(host='localhost', port=5432, user='admin')
   ```

### 1.5.2 JavaScript Best Practices

1. **Follow naming conventions**:

   - Function names should use camelCase
   - `myFunction()` instead of `my_function()` or `MyFunction()`

2. **Use JSDoc for documentation**:

   ```javascript
   /**
    * Brief description of what the function does.
    *
    * @param {string} param1 - Description of first parameter
    * @returns {string} Description of return value
    */
   function functionName(param1) {
     // Implementation
   }
   ```

3. **Return early pattern**:

   ```javascript
   function processData(data) {
     if (!data) {
       return null;
     }

     // Process valid data here
   }
   ```

4. **Prefer arrow functions for brevity**:

   ```javascript
   // Instead of
   array.map(function (item) {
     return item * 2;
   });

   // Use
   array.map((item) => item * 2);
   ```

5. **Use default parameters**:

   ```javascript
   function greet(name = "Guest") {
     return `Hello, ${name}!`;
   }
   ```

6. **Use destructuring for object parameters**:

   ```javascript
   function displayUser({ name, age, email }) {
     console.log(`${name} (${age}) - ${email}`);
   }
   ```

7. **Use spread operator for rest parameters**:
   ```javascript
   function sum(...numbers) {
     return numbers.reduce((total, n) => total + n, 0);
   }
   ```

### 1.5.3 Language Transition Tips

1. **Mind the cases**:

   - Python uses `snake_case` for functions
   - JavaScript uses `camelCase` for functions

2. **Block definition differences**:

   - Python uses indentation and colons `:` for blocks
   - JavaScript uses curly braces `{}`

3. **Return value behavior**:

   - Python: Functions without a return statement return `None`
   - JavaScript: Functions without a return statement return `undefined`

4. **Function arguments**:

   - Python: Missing arguments raise errors unless they have default values
   - JavaScript: Missing arguments become `undefined`

5. **Method definition**:

   - Python: Methods explicitly list `self` as first parameter
   - JavaScript: Methods use `this` implicitly

6. **Function documentation**:

   - Python: Uses triple-quoted docstrings
   - JavaScript: Uses JSDoc comments

7. **Function assignment**:

   - Both languages treat functions as objects, but JavaScript has more function expression options

8. **Anonymous functions**:

   - Python: `lambda` is limited to a single expression
   - JavaScript: Arrow functions can have multiple statements with `{}`

9. **Closure behavior**:

   - Python: Requires `nonlocal` to modify outer variables
   - JavaScript: Can modify outer variables directly

10. **Type handling**:
    - Python: Has optional type annotations that don't affect runtime
    - JavaScript: No types by default; use TypeScript for static typing
