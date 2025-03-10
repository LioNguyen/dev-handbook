# Python Functions Quiz

## Table of Contents

- [Python Functions Quiz](#python-functions-quiz)
  - [Table of Contents](#table-of-contents)
  - [Question 1: Basic Function Definition](#question-1-basic-function-definition)
  - [Question 2: Function Parameters](#question-2-function-parameters)
  - [Question 3: Return Values](#question-3-return-values)
  - [Question 4: Function Scope](#question-4-function-scope)
  - [Question 5: Default Parameters](#question-5-default-parameters)
  - [Question 6: Lambda Functions](#question-6-lambda-functions)
  - [Question 7: Keyword Arguments](#question-7-keyword-arguments)
  - [Question 8: Variable-Length Arguments](#question-8-variable-length-arguments)
  - [Question 9: Unpacking Arguments](#question-9-unpacking-arguments)
  - [Question 10: Global and Nonlocal Keywords](#question-10-global-and-nonlocal-keywords)
  - [Question 11: Docstrings and Type Hints](#question-11-docstrings-and-type-hints)
  - [Question 12: First-Class Functions](#question-12-first-class-functions)
  - [Question 13: Closures](#question-13-closures)
  - [Question 14: Decorators](#question-14-decorators)
  - [Question 15: Generator Functions](#question-15-generator-functions)

## Question 1: Basic Function Definition

Which of the following is the correct way to define a function in Python?

A)

```python
function greet() {
    print("Hello, world!")
}
```

B)

```python
def greet():
    print("Hello, world!")
```

C)

```python
function greet():
    print("Hello, world!")
```

D)

```python
def greet() {
    print("Hello, world!")
}
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: B**

```python
def greet():
    print("Hello, world!")
```

**Explanation:**

Python uses the `def` keyword to define functions, followed by the function name, parentheses for parameters, and a colon. The function body is then indented (typically 4 spaces).

Key differences from JavaScript:

1. Python uses `def` instead of `function`
2. Python uses a colon (`:`) after the parameter list instead of an opening brace
3. Python uses indentation to define blocks, not curly braces `{}`
4. No semicolons are needed at the end of statements

The JavaScript equivalent would be:

```javascript
function greet() {
  console.log("Hello, world!");
}
```

Option A and D mix JavaScript syntax (curly braces) with Python, which is incorrect.
Option C uses the wrong keyword (`function` instead of `def`).

</details>

## Question 2: Function Parameters

Consider the following Python function:

```python
def calculate_total(price, tax_rate, discount=0):
    return price * (1 + tax_rate) * (1 - discount)
```

What does this parameter structure indicate?

A) `price` and `tax_rate` are required parameters, `discount` is optional  
B) All parameters are required  
C) All parameters are optional  
D) Only `price` is required, the others are optional

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: A) `price` and `tax_rate` are required parameters, `discount` is optional**

**Explanation:**

In Python function definitions, parameters fall into two categories:

1. **Required parameters** (positional parameters without default values)
2. **Optional parameters** (parameters with default values)

In this function:

- `price` and `tax_rate` don't have default values, so they are required
- `discount` has a default value of `0`, so it's optional

When calling this function:

- `calculate_total(100, 0.1)` is valid (discount will use default value of 0)
- `calculate_total(100, 0.1, 0.2)` is valid (overrides default discount)
- `calculate_total(100)` would raise a TypeError because `tax_rate` is missing

Python requires that all required parameters come before any optional parameters in the function definition.

**Comparison with JavaScript:**
JavaScript has similar behavior. In pre-ES6 JavaScript, you would implement this pattern using:

```javascript
function calculateTotal(price, taxRate, discount) {
  discount = discount || 0; // Old way of setting defaults
  return price * (1 + taxRate) * (1 - discount);
}
```

In modern JavaScript (ES6+), it's more similar to Python:

```javascript
function calculateTotal(price, taxRate, discount = 0) {
  return price * (1 + taxRate) * (1 - discount);
}
```

Both languages require parameters with default values to come after required parameters.

</details>

## Question 3: Return Values

What will the following Python function return?

```python
def process_number(num):
    if num > 10:
        return "Large"
    elif num < 0:
        return "Negative"
    # No return statement for other cases
```

A) "None" if num is between 0 and 10  
B) An error if num is between 0 and 10  
C) `None` if num is between 0 and 10  
D) The function will continue running, waiting for a return value

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: C) `None` if num is between 0 and 10**

**Explanation:**

In Python, every function returns a value, even if there is no explicit `return` statement. When a function doesn't explicitly return a value (or reaches the end of the function without encountering a `return`), it implicitly returns `None`.

In this function:

- If `num > 10`, it explicitly returns the string `"Large"`
- If `num < 0`, it explicitly returns the string `"Negative"`
- If `num` is between 0 and 10 (inclusive), no return statement is reached, so Python implicitly returns `None`

Note that `None` in Python is a special singleton object of the `NoneType` class. It's not a string "None" (which would be option A), and it doesn't cause an error (option B). The function also doesn't hang or continue running (option D) - it completes normally and returns `None`.

**Comparison with JavaScript:**
JavaScript behaves similarly - functions without a return statement (or that reach the end without returning) will return `undefined`:

```javascript
function processNumber(num) {
  if (num > 10) {
    return "Large";
  } else if (num < 0) {
    return "Negative";
  }
  // No return for other cases
}
```

If `num` is between 0 and 10, this JavaScript function will return `undefined`, which is analogous to Python's `None`. However, they are distinct values with different semantics in each language.

</details>

## Question 4: Function Scope

What will the following Python code output?

```python
x = 10

def modify_value():
    x = 20
    print("Inside function:", x)

modify_value()
print("Outside function:", x)
```

A)

```
Inside function: 20
Outside function: 20
```

B)

```
Inside function: 20
Outside function: 10
```

C)

```
Inside function: 10
Outside function: 10
```

D)

```
Error: x is not defined
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: B)**

```
Inside function: 20
Outside function: 10
```

**Explanation:**

This question tests understanding of Python's function scoping rules. Python uses lexical scoping with a LEGB rule (Local, Enclosing, Global, Built-in) for variable resolution.

In this code:

1. A global variable `x` is assigned the value `10`
2. The function `modify_value()` creates a new local variable also named `x` and assigns it the value `20`
3. The `print` inside the function accesses the local `x` (value `20`)
4. The `print` outside the function accesses the global `x` (value `10`)

The key concept is that the assignment `x = 20` inside the function creates a new local variable, rather than modifying the global variable with the same name. This is different from many other programming languages.

To modify the global variable from within the function in Python, you would need to use the `global` keyword:

```python
def modify_value():
    global x
    x = 20
    print("Inside function:", x)
```

**Comparison with JavaScript:**
JavaScript behaves differently based on whether a variable is declared with `var`, `let`, or `const`, and whether the variable is redeclared within the function:

```javascript
let x = 10;

function modifyValue() {
  let x = 20; // Creates a local variable
  console.log("Inside function:", x);
}

modifyValue();
console.log("Outside function:", x);
```

This would output the same as the Python example:

```
Inside function: 20
Outside function: 10
```

But if you don't redeclare with `let` or `var`:

```javascript
let x = 10;

function modifyValue() {
  x = 20; // Modifies the outer variable
  console.log("Inside function:", x);
}

modifyValue();
console.log("Outside function:", x);
```

This would output:

```
Inside function: 20
Outside function: 20
```

This is a key difference between Python and JavaScript scoping rules that often catches developers transitioning between the languages.

</details>

## Question 5: Default Parameters

What will the following Python code output?

```python
def add_item(item, list_of_items=[]):
    list_of_items.append(item)
    return list_of_items

print(add_item("apple"))
print(add_item("banana"))
print(add_item("cherry"))
```

A)

```
['apple']
['banana']
['cherry']
```

B)

```
['apple']
['apple', 'banana']
['apple', 'banana', 'cherry']
```

C)

```
['apple']
['banana']
['apple', 'banana', 'cherry']
```

D)

```
Error: mutable default argument
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: B)**

```
['apple']
['apple', 'banana']
['apple', 'banana', 'cherry']
```

**Explanation:**

This question demonstrates a common pitfall in Python: using mutable objects (like lists, dictionaries, or sets) as default parameter values.

In Python, default parameter values are evaluated only once - when the function is defined, not each time the function is called. This means that the empty list `[]` is created only once when the function is defined, and that same list object is used for all function calls where that parameter isn't specified.

Here's what happens in the given code:

1. First call: `add_item("apple")` - Appends "apple" to the default list, returns `['apple']`
2. Second call: `add_item("banana")` - Uses the same list (which now has "apple"), appends "banana", returns `['apple', 'banana']`
3. Third call: `add_item("cherry")` - Uses the same list (which now has "apple" and "banana"), appends "cherry", returns `['apple', 'banana', 'cherry']`

This behavior is often unexpected and can lead to bugs. The common solution is to use `None` as the default value and create a new empty list inside the function:

```python
def add_item(item, list_of_items=None):
    if list_of_items is None:
        list_of_items = []
    list_of_items.append(item)
    return list_of_items
```

**Comparison with JavaScript:**
JavaScript doesn't have this issue because default parameters are evaluated at call time, not definition time:

```javascript
function addItem(item, listOfItems = []) {
  listOfItems.push(item);
  return listOfItems;
}

console.log(addItem("apple")); // ['apple']
console.log(addItem("banana")); // ['banana']
console.log(addItem("cherry")); // ['cherry']
```

This is a significant difference between Python and JavaScript that can catch Python developers off guard.

</details>

## Question 6: Lambda Functions

Which of the following is a valid lambda function in Python?

A) `lambda x, y: return x + y`  
B) `lambda x, y => x + y`  
C) `lambda (x, y) => { return x + y; }`  
D) `lambda x, y: x + y`

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: D) `lambda x, y: x + y`**

**Explanation:**

Lambda functions in Python (also called anonymous functions) are defined using the `lambda` keyword. They are small, one-line functions that can take any number of arguments but can only have one expression.

The correct syntax for a lambda function in Python is:

```python
lambda parameters: expression
```

Key points about Python lambda functions:

1. The `lambda` keyword is used
2. No parentheses are needed around the parameter list
3. A colon separates the parameters from the expression
4. No `return` statement is allowed - the expression is implicitly returned
5. Only a single expression is allowed (no multi-line statements)

Option D is correct because it follows this syntax exactly.

The errors in the other options:

- Option A incorrectly includes a `return` statement
- Option B uses JavaScript-style arrow function syntax (`=>` instead of `:`)
- Option C mixes JavaScript arrow function syntax with parentheses around parameters

**Practical use case**:
Lambda functions are commonly used with higher-order functions like `map()`, `filter()`, and `sorted()`:

```python
# Sort a list of tuples by the second element
pairs = [(1, 'b'), (3, 'a'), (2, 'c')]
sorted_pairs = sorted(pairs, key=lambda pair: pair[1])
# Result: [(3, 'a'), (1, 'b'), (2, 'c')]
```

**Comparison with JavaScript:**
JavaScript uses arrow functions for similar purposes, with a different syntax:

```javascript
// JavaScript arrow function
const add = (x, y) => x + y;

// Multi-line arrow function requires curly braces and return
const complexFunc = (x, y) => {
  const z = x * y;
  return z + x;
};
```

Python's lambda is more limited compared to JavaScript's arrow functions, as JavaScript arrow functions can contain multiple statements when using curly braces.

</details>

## Question 7: Keyword Arguments

Consider the following Python function definition:

```python
def create_profile(name, age, occupation, city="Unknown"):
    return f"{name}, aged {age}, works as {occupation}, lives in {city}"
```

Which of the following function calls is NOT valid?

A) `create_profile("John", 30, "Developer", "New York")`  
B) `create_profile(name="John", age=30, occupation="Developer")`  
C) `create_profile("John", age=30, "Developer", city="New York")`  
D) `create_profile(name="John", age=30, occupation="Developer", city="New York")`

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: C) `create_profile("John", age=30, "Developer", city="New York")`**

**Explanation:**

This question tests understanding of positional and keyword arguments in Python. There's an important rule in Python function calls: **once you use a keyword argument, all arguments that follow must also be keyword arguments**.

Let's analyze each option:

A) `create_profile("John", 30, "Developer", "New York")`

- ✅ Valid: All arguments are positional, in the correct order

B) `create_profile(name="John", age=30, occupation="Developer")`

- ✅ Valid: All arguments are keyword arguments, and the optional `city` parameter uses its default value

C) `create_profile("John", age=30, "Developer", city="New York")`

- ❌ Invalid: This mixes positional and keyword arguments incorrectly
- `"John"` is a positional argument for `name`
- `age=30` is a keyword argument
- `"Developer"` is a positional argument after a keyword argument, which is not allowed
- `city="New York"` is a keyword argument

D) `create_profile(name="John", age=30, occupation="Developer", city="New York")`

- ✅ Valid: All arguments are keyword arguments

The error in option C would result in a `SyntaxError` with a message like "positional argument follows keyword argument".

**Comparison with JavaScript:**
JavaScript doesn't have built-in support for keyword arguments in the same way Python does. In modern JavaScript, a similar pattern would be achieved using destructuring of an options object:

```javascript
function createProfile({ name, age, occupation, city = "Unknown" } = {}) {
  return `${name}, aged ${age}, works as ${occupation}, lives in ${city}`;
}

// Call with an object of named properties
createProfile({
  name: "John",
  age: 30,
  occupation: "Developer",
  city: "New York",
});
```

This is a significant difference in function call syntax between the two languages.

</details>

## Question 8: Variable-Length Arguments

What will the following Python function return when called with `gather_info("Alice", 28, "Python", "JavaScript", country="USA", role="Developer")`?

```python
def gather_info(name, age, *languages, **details):
    return {
        "name": name,
        "age": age,
        "languages": languages,
        "details": details
    }
```

A)

```python
{
    "name": "Alice",
    "age": 28,
    "languages": ["Python", "JavaScript"],
    "details": {"country": "USA", "role": "Developer"}
}
```

B)

```python
{
    "name": "Alice",
    "age": 28,
    "languages": ("Python", "JavaScript"),
    "details": {"country": "USA", "role": "Developer"}
}
```

C)

```python
{
    "name": "Alice",
    "age": 28,
    "languages": "Python",
    "details": {"JavaScript": True, "country": "USA", "role": "Developer"}
}
```

D)

```python
{
    "name": "Alice",
    "age": 28,
    "languages": "*languages",
    "details": "**details"
}
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: B)**

```python
{
    "name": "Alice",
    "age": 28,
    "languages": ("Python", "JavaScript"),
    "details": {"country": "USA", "role": "Developer"}
}
```

**Explanation:**

This question tests understanding of variable-length arguments in Python, which come in two forms:

1. `*args` (commonly named `*args`): Collects excess positional arguments into a tuple
2. `**kwargs` (commonly named `**kwargs`): Collects keyword arguments into a dictionary

In the function call `gather_info("Alice", 28, "Python", "JavaScript", country="USA", role="Developer")`:

- `name` gets the value `"Alice"` (first positional argument)
- `age` gets the value `28` (second positional argument)
- `*languages` collects all remaining positional arguments into a tuple: `("Python", "JavaScript")`
- `**details` collects all keyword arguments into a dictionary: `{"country": "USA", "role": "Developer"}`

The key difference between options A and B is that A shows `languages` as a list `[...]`, while B correctly shows it as a tuple `(...)`. In Python, `*args` always creates a tuple, not a list.

**Comparison with JavaScript:**
JavaScript ES6+ supports the rest parameter syntax, which is similar to Python's `*args`:

```javascript
function gatherInfo(name, age, ...languages) {
  // ...languages is an array of remaining positional arguments
  return { name, age, languages };
}
```

However, JavaScript doesn't have a direct equivalent to Python's `**kwargs`. In JavaScript, you would typically handle this using object destructuring with a rest parameter:

```javascript
function gatherInfo(name, age, ...languages) {
  // Extract the last argument if it's an object for "kwargs" behavior
  const details =
    typeof languages[languages.length - 1] === "object" ? languages.pop() : {};

  return { name, age, languages, details };
}

// Call with "kwargs" as the last argument
gatherInfo("Alice", 28, "Python", "JavaScript", {
  country: "USA",
  role: "Developer",
});
```

This illustrates a significant difference in how the two languages handle variable arguments, particularly keyword arguments.

</details>

## Question 9: Unpacking Arguments

What will the following Python code output?

```python
def calculate(a, b, c):
    return a + b * c

values = [2, 3, 4]
result = calculate(*values)
print(result)

params = {"a": 5, "b": 6, "c": 7}
result = calculate(**params)
print(result)
```

A)

```
14
47
```

B)

```
20
47
```

C)

```
14
53
```

D)

```
Error: cannot unpack non-iterable object
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: A)**

```
14
47
```

**Explanation:**

This question demonstrates two important Python features:

1. **Sequence unpacking** with the `*` operator
2. **Dictionary unpacking** with the `**` operator

Let's break down what happens:

First part:

- `values = [2, 3, 4]` creates a list with three elements
- `calculate(*values)` unpacks the list into three separate arguments
- This is equivalent to calling `calculate(2, 3, 4)`
- The function computes `2 + 3 * 4 = 2 + 12 = 14`
- Note that multiplication has higher precedence than addition

Second part:

- `params = {"a": 5, "b": 6, "c": 7}` creates a dictionary
- `calculate(**params)` unpacks the dictionary into keyword arguments
- This is equivalent to calling `calculate(a=5, b=6, c=7)`
- The function computes `5 + 6 * 7 = 5 + 42 = 47`

These unpacking operators are very useful when you have arguments stored in data structures that you want to pass to a function.

**Comparison with JavaScript:**
JavaScript has similar unpacking operators:

```javascript
function calculate(a, b, c) {
  return a + b * c;
}

const values = [2, 3, 4];
const result1 = calculate(...values); // Spread operator for arrays
console.log(result1); // 14

const params = { a: 5, b: 6, c: 7 };
// Prior to ES2018, there was no direct equivalent to Python's ** operator
// With ES2018 and later:
const result2 = calculate(...Object.values(params));
console.log(result2); // 47
```

ES2018 introduced object spread operators, getting closer to Python's functionality:

```javascript
function calculateWithNamedArgs({ a, b, c }) {
  return a + b * c;
}

const params = { a: 5, b: 6, c: 7 };
const result2 = calculateWithNamedArgs(params);
console.log(result2); // 47
```

This shows both languages have unpacking capabilities, though they're implemented differently.

</details>

## Question 10: Global and Nonlocal Keywords

What will be the output of the following Python code?

```python
x = 10

def outer_function():
    x = 20

    def inner_function():
        nonlocal x
        x = 30
        print("Inner:", x)

    inner_function()
    print("Outer:", x)

outer_function()
print("Global:", x)
```

A)

```
Inner: 30
Outer: 20
Global: 10
```

B)

```
Inner: 30
Outer: 30
Global: 10
```

C)

```
Inner: 30
Outer: 30
Global: 30
```

D)

```
Error: nonlocal variable 'x' referenced before assignment
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: B)**

```
Inner: 30
Outer: 30
Global: 10
```

**Explanation:**

This question demonstrates the use of the `nonlocal` keyword in Python, which is used to indicate that a variable refers to a variable in the nearest enclosing scope that is not global.

Here's what happens:

1. A global variable `x` is defined with value `10`
2. `outer_function()` creates a new local variable `x` with value `20`
3. `inner_function()` uses the `nonlocal` keyword to indicate it wants to modify the `x` in the outer function's scope
4. It changes the value of the outer function's `x` to `30`
5. The inner function prints "Inner: 30"
6. The outer function prints "Outer: 30" (the value was changed by the inner function)
7. Outside all functions, "Global: 10" is printed (the global variable was never modified)

Important points about variable scope in Python:

- By default, variable assignments in functions create local variables
- The `global` keyword lets you modify global variables from within a function
- The `nonlocal` keyword lets you modify variables from the nearest enclosing scope (not global)

**Comparison with JavaScript:**
JavaScript handles scope differently and doesn't have a direct equivalent to Python's `nonlocal` keyword. In JavaScript:

```javascript
let x = 10;

function outerFunction() {
  let x = 20;

  function innerFunction() {
    x = 30; // This modifies the x in the outer function
    console.log("Inner:", x);
  }

  innerFunction();
  console.log("Outer:", x);
}

outerFunction();
console.log("Global:", x);
```

This JavaScript code would output:

```
Inner: 30
Outer: 30
Global: 10
```

The behavior is similar, but in JavaScript, when you assign to a variable without declaring it with `var`, `let`, or `const`, it automatically looks for the variable in outer scopes. This is different from Python, which creates a new local variable unless you explicitly use `nonlocal` or `global`.

</details>

## Question 11: Docstrings and Type Hints

Which Python function is properly documented with a docstring and type hints?

A)

```python
def calculate_area(radius):
    # This function calculates the area of a circle
    # radius: float - the radius of the circle
    # returns: float - the area of the circle
    return 3.14159 * radius ** 2
```

B)

```python
def calculate_area(radius):
    """Calculate the area of a circle.

    Args:
        radius: The radius of the circle

    Returns:
        The area of the circle
    """
    return 3.14159 * radius ** 2
```

C)

```python
def calculate_area(radius: float) -> float:
    """Calculate the area of a circle.

    Args:
        radius: The radius of the circle

    Returns:
        The area of the circle
    """
    return 3.14159 * radius ** 2
```

D)

```python
/**
 * Calculate the area of a circle.
 * @param {number} radius - The radius of the circle
 * @return {number} The area of the circle
 */
def calculate_area(radius: float) -> float:
    return 3.14159 * radius ** 2
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: C)**

```python
def calculate_area(radius: float) -> float:
    """Calculate the area of a circle.

    Args:
        radius: The radius of the circle

    Returns:
        The area of the circle
    """
    return 3.14159 * radius ** 2
```

**Explanation:**

This question tests understanding of Python documentation conventions and type hints. The correct answer combines both proper docstrings and type hints.

Python docstrings:

- Are enclosed in triple quotes (`"""..."""`)
- Are placed immediately after the function definition
- Typically include a summary line, followed by more details
- Can follow various formats (Google, Numpy, reStructuredText), but all are placed inside triple quotes

Python type hints (introduced in Python 3.5+):

- Are specified using colons (`:`) after parameter names
- Use `->` to indicate the return type
- Don't affect the runtime behavior (they're used by tools like mypy, IDEs, etc.)

Let's analyze each option:

A) Uses comments instead of docstrings. Comments are prefixed with `#` and are different from docstrings. Documentation tools won't recognize these as proper documentation.

B) Has proper docstrings but lacks type hints. While this is common in older Python code, modern Python encourages the use of type hints.

C) Correctly combines docstrings and type hints. It follows the Google docstring format with "Args:" and "Returns:" sections, and adds type annotations for both parameters and return value.

D) Uses a JSDoc-style comment format (from JavaScript) instead of Python docstrings, which is incorrect in Python.

**Comparison with JavaScript:**
JavaScript uses different documentation conventions, typically JSDoc comments:

```javascript
/**
 * Calculate the area of a circle.
 * @param {number} radius - The radius of the circle
 * @return {number} The area of the circle
 */
function calculateArea(radius) {
  return Math.PI * radius ** 2;
}
```

With TypeScript (JavaScript with types), you can add type annotations:

```typescript
/**
 * Calculate the area of a circle.
 * @param radius The radius of the circle
 * @return The area of the circle
 */
function calculateArea(radius: number): number {
  return Math.PI * radius ** 2;
}
```

The different documentation styles reflect the different communities and conventions between Python and JavaScript.

</details>

## Question 12: First-Class Functions

Which of the following statements about functions as first-class objects in Python is FALSE?

A) Functions can be assigned to variables  
B) Functions can be passed as arguments to other functions  
C) Functions can be returned from other functions  
D) Functions cannot be stored in data structures like lists or dictionaries

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: D) Functions cannot be stored in data structures like lists or dictionaries**

**Explanation:**

This statement is false. In Python, functions are indeed first-class objects, which means they can be stored in data structures like lists, tuples, dictionaries, etc.

First-class functions have the following characteristics, all of which are supported in Python:

1. **Can be assigned to variables**:

```python
def greet(name):
    return f"Hello, {name}!"

my_function = greet
print(my_function("Alice"))  # "Hello, Alice!"
```

2. **Can be passed as arguments to other functions**:

```python
def apply_function(func, value):
    return func(value)

def square(x):
    return x * x

result = apply_function(square, 5)  # 25
```

3. **Can be returned from other functions**:

```python
def get_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = get_multiplier(2)
print(double(10))  # 20
```

4. **Can be stored in data structures**:

```python
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

operations = [add, subtract]
print(operations[0](5, 3))  # 8
print(operations[1](5, 3))  # 2

function_map = {
    'add': add,
    'subtract': subtract
}
print(function_map['add'](5, 3))  # 8
```

This ability to treat functions as regular values is a key feature of Python's functional programming capabilities, making it possible to implement higher-order functions, callbacks, and other functional programming patterns.

**Comparison with JavaScript:**
JavaScript also treats functions as first-class objects, with very similar capabilities:

```javascript
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

// Store in array
const operations = [add, subtract];
console.log(operations[0](5, 3)); // 8

// Store in object
const functionMap = {
  add: add,
  subtract: subtract,
};
console.log(functionMap.add(5, 3)); // 8
```

This is an area where Python and JavaScript are quite similar, as both languages support functional programming concepts.

</details>

## Question 13: Closures

What will the following Python code output?

```python
def create_multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))
print(triple(5))
```

A)

```
10
15
```

B)

```
25
125
```

C)

```
Error: 'factor' is not defined
```

D)

```
10
10
```

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: A)**

```
10
15
```

**Explanation:**

This code demonstrates Python's support for closures. A closure is a function object that remembers values in enclosing scopes even if they are not present in memory.

Here's what happens in the code:

1. `create_multiplier(factor)` is a function that defines and returns another function, `multiply`
2. When `create_multiplier(2)` is called, it creates a function `multiply` that "remembers" that `factor` is `2`
3. Similarly, when `create_multiplier(3)` is called, it creates a different function that remembers `factor` is `3`
4. The `double` function is a closure that multiplies its argument by 2
5. The `triple` function is a closure that multiplies its argument by 3
6. `double(5)` returns `5 * 2 = 10`
7. `triple(5)` returns `5 * 3 = 15`

Closures are possible because Python's functions capture their lexical environment, which includes variables from the scope in which the function was defined.

Key aspects of closures:

- They "remember" the environment they were created in
- Each closure has its own separate environment
- They can access variables from outer functions even after those functions have completed execution

**Comparison with JavaScript:**
JavaScript has very similar behavior with closures:

```javascript
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

Both languages allow functions to capture and "remember" their lexical environment, making closures a powerful feature for both Python and JavaScript.

</details>

## Question 14: Decorators

What does the following Python code do?

```python
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args} and {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_function_call
def add(a, b):
    return a + b

add(5, 3)
```

A) It logs the execution time of the add function  
B) It logs the function name, arguments, and return value when the add function is called  
C) It caches the result of the add function for future calls with the same arguments  
D) It prevents the add function from being called with negative numbers

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: B) It logs the function name, arguments, and return value when the add function is called**

**Explanation:**

This code demonstrates the use of a decorator in Python. A decorator is a function that takes another function and extends its behavior without explicitly modifying its code.

Here's how the code works:

1. `log_function_call` is a decorator function that takes a function `func` as its argument
2. It defines an inner function `wrapper` that:
   - Prints information about the function call, including the function name and arguments
   - Calls the original function and stores its result
   - Prints information about the function's return value
   - Returns the original result
3. The decorator returns the `wrapper` function
4. The `@log_function_call` syntax is equivalent to `add = log_function_call(add)`
5. When `add(5, 3)` is called, it actually executes the wrapper function

When run, the code will output:

```
Calling add with (5, 3) and {}
add returned 8
```

This pattern is commonly used for cross-cutting concerns like logging, timing, access control, and caching.

**Comparison with JavaScript:**
JavaScript doesn't have built-in syntax for decorators in the current standard, though they are a proposed feature. Similar functionality can be achieved using higher-order functions:

```javascript
function logFunctionCall(func) {
  return function (...args) {
    // Convert arguments to a more readable format for logging
    const formattedArgs = args.map((arg) => JSON.stringify(arg)).join(", ");
    console.log(`Calling ${func.name} with arguments: ${formattedArgs}`);

    const result = func(...args);

    console.log(`${func.name} returned ${result}`);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

// Manually wrap the function
const wrappedAdd = logFunctionCall(add);
wrappedAdd(5, 3);
```

Alternatively, using the experimental decorator proposal (requires transpilation or a supporting environment):

```javascript
function logFunctionCall(target, context) {
  return function (...args) {
    console.log(`Calling ${context.name} with arguments: ${args}`);
    const result = target.call(this, ...args);
    console.log(`${context.name} returned ${result}`);
    return result;
  };
}

class Calculator {
  @logFunctionCall
  add(a, b) {
    return a + b;
  }
}

new Calculator().add(5, 3);
```

Decorators are much more straightforward and widely used in Python compared to JavaScript.

</details>

## Question 15: Generator Functions

What is the output of the following Python code?

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(5):
    print(num, end=" ")
```

A) 0 1 1 2 3  
B) 1 1 2 3 5  
C) 0 1 2 3 5  
D) 1 2 3 5 8

<details>
<summary>Answer and Explanation</summary>

**Correct Answer: A) 0 1 1 2 3**

**Explanation:**

This code demonstrates a generator function in Python, which is a special type of function that returns an iterator. Generator functions use the `yield` keyword instead of `return` to provide a series of values one at a time.

The `fibonacci(n)` function generates the first `n` numbers in the Fibonacci sequence. Let's trace its execution for `n = 5`:

1. Initially, `a = 0` and `b = 1`
2. First iteration: `yield a` returns `0`, then `a, b = b, a + b` sets `a = 1` and `b = 1`
3. Second iteration: `yield a` returns `1`, then `a, b = b, a + b` sets `a = 1` and `b = 2`
4. Third iteration: `yield a` returns `1`, then `a, b = b, a + b` sets `a = 2` and `b = 3`
5. Fourth iteration: `yield a` returns `2`, then `a, b = b, a + b` sets `a = 3` and `b = 5`
6. Fifth iteration: `yield a` returns `3`, then `a, b = b, a + b` sets `a = 5` and `b = 8`

The loop iterates through these yielded values: 0, 1, 1, 2, 3.

Key characteristics of generators:

- They're lazy - they compute values only when needed
- They can represent infinite sequences
- They're memory-efficient because they don't store all values at once
- Execution is paused at each `yield` until the next value is requested

**Comparison with JavaScript:**
JavaScript also supports generator functions with a slightly different syntax:

```javascript
function* fibonacci(n) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

for (const num of fibonacci(5)) {
  process.stdout.write(num + " ");
}
// Output: 0 1 1 2 3
```

The main differences are:

1. JavaScript uses `function*` (with an asterisk) to define generator functions
2. JavaScript doesn't have Python's tuple unpacking, so array destructuring is used instead
3. JavaScript uses `for...of` to iterate generators, while Python uses `for...in`

Both languages use the `yield` keyword similarly, and the behavior of pausing and resuming execution is similar.

</details>
