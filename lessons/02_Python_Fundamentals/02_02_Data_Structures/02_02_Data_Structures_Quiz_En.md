# Python Data Structures: Multiple Choice Questions for Senior Interviews

## Table of Contents

- [Python Data Structures: Multiple Choice Questions for Senior Interviews](#python-data-structures-multiple-choice-questions-for-senior-interviews)
  - [Table of Contents](#table-of-contents)
  - [Question 1: List Comprehensions](#question-1-list-comprehensions)
  - [Question 2: Dictionary Implementation](#question-2-dictionary-implementation)
  - [Question 3: Tuples vs Lists](#question-3-tuples-vs-lists)
  - [Question 4: Set Operations](#question-4-set-operations)
  - [Question 5: Time Complexity](#question-5-time-complexity)
  - [Question 6: Collections Module](#question-6-collections-module)
  - [Question 7: Dictionary Methods](#question-7-dictionary-methods)
  - [Question 8: Memory Optimization](#question-8-memory-optimization)
  - [Question 9: Queue Implementation](#question-9-queue-implementation)
  - [Question 10: Advanced Sorting](#question-10-advanced-sorting)

## Question 1: List Comprehensions

What is the output of the following code?

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row if num % 2 == 0]
print(flattened)
```

A) `[2, 4, 6, 8]`  
B) `[[2], [4, 6], [8]]`  
C) `[1, 2, 3, 4, 5, 6, 7, 8, 9]`  
D) `TypeError: 'int' object is not iterable`

<details>
<summary>View Answer and Explanation</summary>

**Answer: A) [2, 4, 6, 8]**

This code demonstrates nested list comprehension with a conditional filter. Here's how it breaks down:

1. `for row in matrix`: Iterates through each sublist in the matrix
2. `for num in row`: For each sublist, iterates through each number
3. `if num % 2 == 0`: Only includes numbers that are even (divisible by 2)

The comprehension creates a single flattened list containing only the even numbers from all sublists in the matrix.

If we expand this comprehension into regular for loops, it would look like:

```python
flattened = []
for row in matrix:
    for num in row:
        if num % 2 == 0:
            flattened.append(num)
```

This is a powerful feature in Python for processing nested data structures in a concise way. In senior roles, you'll often need to manipulate complex nested data structures, and list comprehensions provide an elegant, Pythonic solution.

</details>

## Question 2: Dictionary Implementation

Which statement about Python dictionaries is FALSE?

A) In Python 3.7+, dictionaries maintain insertion order by default  
B) Dictionary keys must be immutable objects  
C) The average time complexity for key lookups is O(1)  
D) Dictionary comprehensions can only create dictionaries from lists

<details>
<summary>View Answer and Explanation</summary>

**Answer: D) Dictionary comprehensions can only create dictionaries from lists**

This statement is false. Dictionary comprehensions can create dictionaries from any iterable, not just lists. Here are some examples:

```python
# From a list of tuples
dict_from_tuples = {k: v for k, v in [('a', 1), ('b', 2), ('c', 3)]}

# From two separate lists using zip
keys = ['name', 'age', 'job']
values = ['Alice', 35, 'Developer']
person = {k: v for k, v in zip(keys, values)}

# From a range
squares = {x: x**2 for x in range(6)}

# From another dictionary (with transformation)
original = {'a': 1, 'b': 2, 'c': 3}
transformed = {k.upper(): v*2 for k, v in original.items()}
```

The other statements are true:

- Since Python 3.7, dictionaries preserve insertion order (this was an implementation detail in 3.6 and became an official language feature in 3.7)
- Dictionary keys must be immutable (hashable) objects like strings, numbers, or tuples (but not lists)
- Dictionary lookups have an average time complexity of O(1) due to the hash table implementation

Understanding dictionary comprehensions and the flexibility they offer is important for writing concise, efficient Python code in senior roles.

</details>

## Question 3: Tuples vs Lists

Which of the following would be a valid reason to use a tuple instead of a list in Python?

A) You need to modify elements after creation  
B) You want to use the object as a dictionary key  
C) You need to append new elements frequently  
D) You want the fastest possible random access by index

<details>
<summary>View Answer and Explanation</summary>

**Answer: B) You want to use the object as a dictionary key**

Tuples are immutable, which makes them hashable, and therefore usable as dictionary keys. Lists, being mutable, cannot be used as dictionary keys.

```python
# This works
my_dict = {(1, 2): "Value for tuple"}

# This raises TypeError: unhashable type: 'list'
my_dict = {[1, 2]: "Value for list"}  # Error!
```

The other options do not provide valid reasons for choosing tuples over lists:

- A) You need to modify elements after creation - Lists would be better since tuples are immutable and cannot be modified after creation
- C) You need to append new elements frequently - Lists have the `.append()` method, tuples don't (you'd need to create a new tuple)
- D) You want the fastest possible random access by index - Both tuples and lists offer O(1) access by index, though tuples might be marginally faster in some cases

Additional tuple advantages worth knowing for senior interviews:

1. **Memory efficiency**: Tuples typically use less memory than lists
2. **Performance**: Operations on tuples can be slightly faster
3. **Signaling intent**: Using a tuple signals that the data shouldn't change
4. **Multiple return values**: Tuples are commonly used for returning multiple values from functions
5. **Named tuples**: For enhanced readability, `collections.namedtuple` provides named fields
</details>

## Question 4: Set Operations

What will be the output of the following code?

```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
result = set1.symmetric_difference(set2)
print(result)
```

A) `{1, 2, 3}`  
B) `{6, 7, 8}`  
C) `{1, 2, 3, 6, 7, 8}`  
D) `{4, 5}`

<details>
<summary>View Answer and Explanation</summary>

**Answer: C) {1, 2, 3, 6, 7, 8}**

The `symmetric_difference()` method returns a set containing elements that are in either of the sets, but not in both. It's equivalent to the XOR operation (^) between sets.

In this example:

- Elements unique to set1: {1, 2, 3}
- Elements unique to set2: {6, 7, 8}
- Elements in both sets: {4, 5}

The symmetric difference includes only the elements that are in exactly one of the sets, so {1, 2, 3, 6, 7, 8}.

Other important set operations to know for senior interviews:

```python
# Union: elements in either set
set1 | set2  # or set1.union(set2)

# Intersection: elements in both sets
set1 & set2  # or set1.intersection(set2)

# Difference: elements in set1 but not in set2
set1 - set2  # or set1.difference(set2)

# Symmetric difference: elements in either set but not both
set1 ^ set2  # or set1.symmetric_difference(set2)

# Subset check
set1 <= set2  # or set1.issubset(set2)

# Superset check
set1 >= set2  # or set1.issuperset(set2)

# Disjoint check (no common elements)
set1.isdisjoint(set2)
```

Set operations are highly optimized in Python and are useful for eliminating duplicates, finding common elements, and performing mathematical set operations efficiently.

</details>

## Question 5: Time Complexity

Which operation has a different time complexity than the others when performed on a Python list?

A) Appending an element with `append()`  
B) Checking if an element exists with `in` operator  
C) Accessing an element by index  
D) Removing the last element with `pop()`

<details>
<summary>View Answer and Explanation</summary>

**Answer: B) Checking if an element exists with `in` operator**

The time complexities for these operations are:

- A) Appending an element with `append()`: **O(1)** (amortized constant time)
- B) Checking if an element exists with `in` operator: **O(n)** (linear time)
- C) Accessing an element by index: **O(1)** (constant time)
- D) Removing the last element with `pop()`: **O(1)** (constant time)

The `in` operator has to potentially scan through the entire list to determine if an element exists, making it O(n), while the other operations are all O(1).

This is a critical distinction when working with large datasets. For frequent membership tests, consider using a set instead of a list, as the `in` operator on sets is O(1) on average.

```python
# O(n) operation
if value in my_list:  # Has to scan the entire list in worst case
    # do something

# O(1) operation - much more efficient for large collections
my_set = set(my_list)  # Convert once, O(n)
if value in my_set:  # Now checks in constant time
    # do something
```

Understanding time complexity trade-offs between different data structures is essential for writing efficient code, especially when dealing with large datasets in senior-level positions.

</details>

## Question 6: Collections Module

Which collection from the `collections` module would be most appropriate for counting the frequency of items in a sequence?

A) `OrderedDict`  
B) `namedtuple`  
C) `Counter`  
D) `deque`

<details>
<summary>View Answer and Explanation</summary>

**Answer: C) Counter**

`Counter` is specifically designed for counting hashable objects and is the most appropriate choice for frequency counting. It's a subclass of dict that has keys representing the items being counted and values representing their counts.

Example usage:

```python
from collections import Counter

# Count occurrences of each character
text = "mississippi"
char_counts = Counter(text)
print(char_counts)  # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})

# Count words in a sentence
sentence = "how much wood would a woodchuck chuck if a woodchuck could chuck wood"
word_counts = Counter(sentence.split())
print(word_counts.most_common(3))  # [('wood', 2), ('a', 2), ('woodchuck', 2)]

# Mathematical operations
counter1 = Counter('abcaba')
counter2 = Counter('abcdef')
print(counter1 + counter2)  # Sum of counts: Counter({'a': 4, 'b': 3, 'c': 2, 'd': 1, 'e': 1, 'f': 1})
print(counter1 - counter2)  # Subtract counts (keeping only positive): Counter({'a': 2, 'b': 1})
```

The other options have different purposes:

- `OrderedDict`: Dictionary that maintains insertion order (less relevant since Python 3.7 as regular dicts preserve order)
- `namedtuple`: Factory function for creating tuple subclasses with named fields
- `deque`: Double-ended queue with efficient appends/pops from both ends

Knowing when to use specialized collections from the `collections` module can significantly improve code readability and performance, a skill expected in senior Python developers.

</details>

## Question 7: Dictionary Methods

Consider the following code:

```python
d = {'a': 1, 'b': 2}
value = d.pop('c', None)
print(value)
```

What will be the output?

A) `KeyError: 'c'`  
B) `None`  
C) `0`  
D) The code will not execute due to a syntax error

<details>
<summary>View Answer and Explanation</summary>

**Answer: B) None**

The `pop()` method on dictionaries takes an optional second argument that specifies a default value to return if the key is not found. In this case, since the key 'c' doesn't exist in the dictionary, the method returns the default value `None`.

This is a common pattern used to avoid KeyError exceptions when removing elements that might not exist.

Key dictionary methods to understand for senior positions:

```python
# Getting values with defaults
value = d.get('key', 'default')  # Returns 'default' if 'key' not found

# Removing with defaults
value = d.pop('key', 'default')  # Returns 'default' if 'key' not found and removed

# Setting defaults
d.setdefault('key', 'default')  # Sets key to 'default' only if key doesn't exist yet

# Updating from another dictionary
d.update(other_dict)  # Add/update keys from other_dict

# Getting all key-value pairs as a view
items = d.items()  # Dynamic view of items

# Getting with side effect of adding
value = d['key']  # Raises KeyError if not found
```

In Python 3.9+, dictionaries gained additional methods:

```python
d1 = {'a': 1, 'b': 2}
d2 = {'b': 3, 'c': 4}

# Dictionary merge and update operators
merged = d1 | d2  # {'a': 1, 'b': 3, 'c': 4}
d1 |= d2          # In-place update - modifies d1
```

Understanding these methods and when to use them is important for writing robust and efficient code at a senior level.

</details>

## Question 8: Memory Optimization

Which data structure would use the least memory for storing a large collection of strings that has many duplicate values?

A) A list of strings  
B) A set of strings  
C) A tuple of strings  
D) A frozenset of strings

<details>
<summary>View Answer and Explanation</summary>

**Answer: B) A set of strings**

A set would use the least memory for storing a large collection of strings with many duplicates because sets store only unique values. When you add a duplicate string to a set, it doesn't create a new entry, saving memory.

Here's a memory usage comparison using the `sys.getsizeof()` function (note that this only measures the container size, not the contained objects):

```python
import sys
from timeit import timeit

# Create test data with many duplicates
data = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'] * 1000

# Compare memory usage
list_size = sys.getsizeof(data)
set_size = sys.getsizeof(set(data))
tuple_size = sys.getsizeof(tuple(data))
frozen_size = sys.getsizeof(frozenset(data))

print(f"List size: {list_size} bytes")
print(f"Set size: {set_size} bytes")
print(f"Tuple size: {tuple_size} bytes")
print(f"Frozenset size: {frozen_size} bytes")

# Compare performance for 'in' operations
list_time = timeit(lambda: 'apple' in data, number=10000)
set_time = timeit(lambda: 'apple' in set(data), number=10000)

print(f"List search time: {list_time:.6f} seconds")
print(f"Set search time: {set_time:.6f} seconds")
```

For this example, you'd see that the set and frozenset use significantly less memory than the list or tuple due to deduplication.

While frozenset would also deduplicate values, it's generally slightly larger than a regular set due to its immutable implementation details.

A tuple would use slightly less memory than a list for the same elements, but it would still store all duplicates.

When considering memory optimization for senior Python roles:

1. Be aware of object overhead
2. Consider specialized data structures (like sets for unique values)
3. Use generators for processing large datasets
4. Look into third-party libraries like NumPy for numerical data
5. Consider data serialization formats for storage
</details>

## Question 9: Queue Implementation

Which implementation of a queue in Python would be most efficient for handling both enqueue and dequeue operations in large-scale applications?

A) List with `append()` and `pop(0)`  
B) List with `append()` and `pop()`  
C) `collections.deque` with `append()` and `popleft()`  
D) `queue.Queue` from the standard library

<details>
<summary>View Answer and Explanation</summary>

**Answer: C) `collections.deque` with `append()` and `popleft()`**

For implementing an efficient queue in Python, `collections.deque` (double-ended queue) is the best general-purpose choice because:

1. It has O(1) time complexity for both `append()` (enqueue) and `popleft()` (dequeue) operations
2. It's implemented as a doubly-linked list internally, allowing efficient operations at both ends
3. It's part of the standard library and optimized in C

Let's compare the options:

A) List with `append()` and `pop(0)`:

- `append()` is O(1) amortized
- `pop(0)` is O(n) because it requires shifting all elements
- Very inefficient for large queues

B) List with `append()` and `pop()`:

- Both operations are O(1)
- But this implements a stack (LIFO), not a queue (FIFO)

C) `collections.deque` with `append()` and `popleft()`:

- Both operations are O(1)
- Properly implements a FIFO queue
- Memory efficient with fast operations

D) `queue.Queue` from the standard library:

- Thread-safe implementation with locks
- Slightly slower than `deque` due to thread safety overhead
- Use when thread safety is required, not for pure performance

Performance comparison:

```python
import timeit
from collections import deque
from queue import Queue

# Setup
list_queue = []
deque_queue = deque()
thread_queue = Queue()

# Benchmark enqueue + dequeue operations
def list_bad_queue():
    list_queue.append(1)
    if list_queue: list_queue.pop(0)

def list_stack():  # not a queue
    list_queue.append(1)
    if list_queue: list_queue.pop()

def deque_queue_op():
    deque_queue.append(1)
    if deque_queue: deque_queue.popleft()

def thread_safe_queue():
    thread_queue.put(1)
    if not thread_queue.empty(): thread_queue.get()

# Results for 100,000 operations
print("List as queue (pop(0)): ", timeit.timeit(list_bad_queue, number=100000))
print("List as stack (pop()): ", timeit.timeit(list_stack, number=100000))
print("Deque as queue: ", timeit.timeit(deque_queue_op, number=100000))
print("Thread-safe Queue: ", timeit.timeit(thread_safe_queue, number=100000))
```

For senior positions, understanding these performance implications and choosing the right data structure for the specific use case is critical, especially in applications with high throughput requirements.

</details>

## Question 10: Advanced Sorting

Consider the following code:

```python
data = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}, {'name': 'Carol', 'age': 25}]
result = sorted(data, key=lambda x: (x['age'], x['name']))
print([person['name'] for person in result])
```

What will be the output?

A) `['Alice', 'Bob', 'Carol']`  
B) `['Bob', 'Carol', 'Alice']`  
C) `['Carol', 'Bob', 'Alice']`  
D) `['Bob', 'Alice', 'Carol']`

<details>
<summary>View Answer and Explanation</summary>

**Answer: B) ['Bob', 'Carol', 'Alice']**

This code demonstrates sorting a list of dictionaries using a tuple as the sorting key. When using a tuple as the key in `sorted()`, Python sorts by the first element of the tuple, then uses subsequent elements as tiebreakers.

In this case, the sorting key is `(x['age'], x['name'])`, which means:

1. First, sort by age in ascending order
2. If ages are equal, sort by name in ascending order (alphabetically)

So the result will be:

- First: Bob (age 25, name 'Bob')
- Second: Carol (age 25, name 'Carol')
- Third: Alice (age 30, name 'Alice')

Both Bob and Carol have the same age (25), so the tiebreaker is their names in alphabetical order, putting Bob before Carol.

Advanced sorting techniques for senior Python developers:

```python
# Sort with multiple criteria
sorted(data, key=lambda x: (x['department'], -x['salary']))  # Ascending by dept, descending by salary

# Using operator module for better performance
from operator import itemgetter, attrgetter
sorted(list_of_dicts, key=itemgetter('age', 'name'))  # More efficient than lambda
sorted(list_of_objects, key=attrgetter('age', 'name'))  # For objects with attributes

# Custom sorting with functools
from functools import cmp_to_key
def custom_compare(a, b):
    # Custom comparison logic
    return (a > b) - (a < b)
sorted(data, key=cmp_to_key(custom_compare))

# Stable vs unstable sorting
# Python's sort is stable - equal elements maintain their relative order
```

Understanding these sorting techniques is valuable in data processing tasks where you need to arrange information according to specific business rules or for presentation, a common requirement in senior developer roles.

</details>
