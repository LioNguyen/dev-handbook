# Cấu Trúc Dữ Liệu Python: Các Câu Hỏi Trắc Nghiệm cho Phỏng Vấn Cấp Cao

## Mục Lục

- [Cấu Trúc Dữ Liệu Python: Các Câu Hỏi Trắc Nghiệm cho Phỏng Vấn Cấp Cao](#cấu-trúc-dữ-liệu-python-các-câu-hỏi-trắc-nghiệm-cho-phỏng-vấn-cấp-cao)
  - [Mục Lục](#mục-lục)
  - [Câu hỏi 1: List Comprehensions](#câu-hỏi-1-list-comprehensions)
  - [Câu hỏi 2: Cài Đặt Dictionary](#câu-hỏi-2-cài-đặt-dictionary)
  - [Câu hỏi 3: Tuples và Lists](#câu-hỏi-3-tuples-và-lists)
  - [Câu hỏi 4: Các Phép Toán Set](#câu-hỏi-4-các-phép-toán-set)
  - [Câu hỏi 5: Độ Phức Tạp Thời Gian](#câu-hỏi-5-độ-phức-tạp-thời-gian)
  - [Câu hỏi 6: Module Collections](#câu-hỏi-6-module-collections)
  - [Câu hỏi 7: Các Phương Thức Dictionary](#câu-hỏi-7-các-phương-thức-dictionary)
  - [Câu hỏi 8: Tối Ưu Hóa Bộ Nhớ](#câu-hỏi-8-tối-ưu-hóa-bộ-nhớ)
  - [Câu hỏi 9: Cài Đặt Queue](#câu-hỏi-9-cài-đặt-queue)
  - [Câu hỏi 10: Sắp Xếp Nâng Cao](#câu-hỏi-10-sắp-xếp-nâng-cao)

## Câu hỏi 1: List Comprehensions

Kết quả của đoạn mã sau là gì?

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
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: A) [2, 4, 6, 8]**

Đoạn mã này minh họa list comprehension lồng nhau với một điều kiện lọc. Nó hoạt động như sau:

1. `for row in matrix`: Lặp qua từng danh sách con trong ma trận
2. `for num in row`: Với mỗi danh sách con, lặp qua từng số
3. `if num % 2 == 0`: Chỉ bao gồm các số chẵn (chia hết cho 2)

List comprehension tạo ra một danh sách phẳng duy nhất chứa chỉ các số chẵn từ tất cả các danh sách con trong ma trận.

Nếu viết lại list comprehension này bằng các vòng lặp for thông thường, nó sẽ trông như sau:

```python
flattened = []
for row in matrix:
    for num in row:
        if num % 2 == 0:
            flattened.append(num)
```

Đây là một tính năng mạnh mẽ trong Python để xử lý các cấu trúc dữ liệu lồng nhau một cách ngắn gọn. Trong các vị trí cấp cao, bạn thường cần thao tác với các cấu trúc dữ liệu lồng nhau phức tạp, và list comprehension cung cấp một giải pháp thanh lịch, đúng kiểu Python.

</details>

## Câu hỏi 2: Cài Đặt Dictionary

Phát biểu nào về dictionary trong Python là SAI?

A) Từ Python 3.7 trở đi, dictionary mặc định duy trì thứ tự chèn  
B) Các khóa dictionary phải là các đối tượng không thay đổi (immutable)  
C) Độ phức tạp thời gian trung bình cho tìm kiếm theo khóa là O(1)  
D) Dictionary comprehension chỉ có thể tạo dictionary từ lists

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: D) Dictionary comprehension chỉ có thể tạo dictionary từ lists**

Phát biểu này là sai. Dictionary comprehension có thể tạo dictionary từ bất kỳ iterable nào, không chỉ từ lists. Dưới đây là một số ví dụ:

```python
# Từ một list các tuples
dict_from_tuples = {k: v for k, v in [('a', 1), ('b', 2), ('c', 3)]}

# Từ hai list riêng biệt sử dụng zip
keys = ['name', 'age', 'job']
values = ['Alice', 35, 'Developer']
person = {k: v for k, v in zip(keys, values)}

# Từ một range
squares = {x: x**2 for x in range(6)}

# Từ một dictionary khác (với biến đổi)
original = {'a': 1, 'b': 2, 'c': 3}
transformed = {k.upper(): v*2 for k, v in original.items()}
```

Các phát biểu khác là đúng:

- Từ Python 3.7, dictionary giữ thứ tự chèn (đây là chi tiết triển khai trong 3.6 và trở thành tính năng chính thức của ngôn ngữ trong 3.7)
- Các khóa dictionary phải là các đối tượng không thay đổi (có thể hash) như chuỗi, số, hoặc tuples (nhưng không phải lists)
- Các thao tác tra cứu dictionary có độ phức tạp thời gian trung bình là O(1) do việc triển khai bảng băm

Hiểu về dictionary comprehension và tính linh hoạt mà chúng cung cấp là quan trọng để viết mã Python ngắn gọn, hiệu quả trong các vị trí cấp cao.

</details>

## Câu hỏi 3: Tuples và Lists

Lý do hợp lệ nào sau đây để sử dụng tuple thay vì list trong Python?

A) Bạn cần sửa đổi các phần tử sau khi tạo  
B) Bạn muốn sử dụng đối tượng làm khóa dictionary  
C) Bạn cần thường xuyên thêm phần tử mới  
D) Bạn muốn truy cập ngẫu nhiên nhanh nhất có thể theo chỉ mục

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: B) Bạn muốn sử dụng đối tượng làm khóa dictionary**

Tuples là không thay đổi (immutable), điều này làm cho chúng có thể hash được, và do đó có thể sử dụng làm khóa dictionary. Lists, được phép thay đổi, không thể được sử dụng làm khóa dictionary.

```python
# Cách này hoạt động
my_dict = {(1, 2): "Giá trị cho tuple"}

# Cách này gây ra TypeError: unhashable type: 'list'
my_dict = {[1, 2]: "Giá trị cho list"}  # Lỗi!
```

Các lựa chọn khác không cung cấp lý do hợp lệ để chọn tuples thay vì lists:

- A) Bạn cần sửa đổi các phần tử sau khi tạo - Lists sẽ tốt hơn vì tuples là không thay đổi và không thể sửa đổi sau khi tạo
- C) Bạn cần thường xuyên thêm phần tử mới - Lists có phương thức `.append()`, tuples thì không (bạn cần tạo một tuple mới)
- D) Bạn muốn truy cập ngẫu nhiên nhanh nhất có thể theo chỉ mục - Cả tuples và lists đều cung cấp truy cập O(1) theo chỉ mục, mặc dù tuples có thể nhanh hơn một chút trong một số trường hợp

Các lợi ích bổ sung của tuple đáng biết cho các cuộc phỏng vấn cấp cao:

1. **Hiệu quả bộ nhớ**: Tuples thường sử dụng ít bộ nhớ hơn lists
2. **Hiệu suất**: Các thao tác trên tuples có thể nhanh hơn một chút
3. **Thể hiện ý định**: Sử dụng tuple báo hiệu rằng dữ liệu không nên thay đổi
4. **Nhiều giá trị trả về**: Tuples thường được sử dụng để trả về nhiều giá trị từ các hàm
5. **Named tuples**: Để nâng cao khả năng đọc, `collections.namedtuple` cung cấp các trường có tên
</details>

## Câu hỏi 4: Các Phép Toán Set

Kết quả của đoạn mã sau là gì?

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
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: C) {1, 2, 3, 6, 7, 8}**

Phương thức `symmetric_difference()` trả về một set chứa các phần tử có trong một trong hai set, nhưng không đồng thời có trong cả hai. Nó tương đương với phép toán XOR (^) giữa các set.

Trong ví dụ này:

- Các phần tử riêng của set1: {1, 2, 3}
- Các phần tử riêng của set2: {6, 7, 8}
- Các phần tử có trong cả hai set: {4, 5}

Symmetric difference chỉ bao gồm các phần tử có trong đúng một trong các set, vì vậy {1, 2, 3, 6, 7, 8}.

Các phép toán set quan trọng khác cần biết cho các cuộc phỏng vấn cấp cao:

```python
# Union: các phần tử có trong một trong hai set
set1 | set2  # hoặc set1.union(set2)

# Intersection: các phần tử có trong cả hai set
set1 & set2  # hoặc set1.intersection(set2)

# Difference: các phần tử có trong set1 nhưng không có trong set2
set1 - set2  # hoặc set1.difference(set2)

# Symmetric difference: các phần tử có trong một trong hai set nhưng không phải cả hai
set1 ^ set2  # hoặc set1.symmetric_difference(set2)

# Kiểm tra subset
set1 <= set2  # hoặc set1.issubset(set2)

# Kiểm tra superset
set1 >= set2  # hoặc set1.issuperset(set2)

# Kiểm tra disjoint (không có phần tử chung)
set1.isdisjoint(set2)
```

Các phép toán set được tối ưu hóa cao trong Python và hữu ích để loại bỏ các bản sao, tìm các phần tử chung và thực hiện các phép toán tập hợp toán học một cách hiệu quả.

</details>

## Câu hỏi 5: Độ Phức Tạp Thời Gian

Thao tác nào có độ phức tạp thời gian khác với các thao tác khác khi thực hiện trên một list Python?

A) Thêm một phần tử bằng `append()`  
B) Kiểm tra nếu một phần tử tồn tại bằng toán tử `in`  
C) Truy cập một phần tử bằng chỉ mục  
D) Xóa phần tử cuối cùng bằng `pop()`

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: B) Kiểm tra nếu một phần tử tồn tại bằng toán tử `in`**

Độ phức tạp thời gian cho các thao tác này là:

- A) Thêm một phần tử bằng `append()`: **O(1)** (thời gian không đổi khấu hao)
- B) Kiểm tra nếu một phần tử tồn tại bằng toán tử `in`: **O(n)** (thời gian tuyến tính)
- C) Truy cập một phần tử bằng chỉ mục: **O(1)** (thời gian không đổi)
- D) Xóa phần tử cuối cùng bằng `pop()`: **O(1)** (thời gian không đổi)

Toán tử `in` phải quét qua toàn bộ list để xác định liệu một phần tử có tồn tại hay không, làm cho nó là O(n), trong khi các thao tác khác đều là O(1).

Đây là một sự khác biệt quan trọng khi làm việc với các tập dữ liệu lớn. Để kiểm tra thành viên thường xuyên, hãy cân nhắc sử dụng set thay vì list, vì toán tử `in` trên set là O(1) trung bình.

```python
# Thao tác O(n)
if value in my_list:  # Phải quét toàn bộ list trong trường hợp xấu nhất
    # làm gì đó

# Thao tác O(1) - hiệu quả hơn nhiều cho các tập hợp lớn
my_set = set(my_list)  # Chuyển đổi một lần, O(n)
if value in my_set:  # Bây giờ kiểm tra trong thời gian không đổi
    # làm gì đó
```

Hiểu biết về các đánh đổi độ phức tạp thời gian giữa các cấu trúc dữ liệu khác nhau là cần thiết để viết mã hiệu quả, đặc biệt khi xử lý các tập dữ liệu lớn trong các vị trí cấp cao.

</details>

## Câu hỏi 6: Module Collections

Cấu trúc nào từ module `collections` sẽ phù hợp nhất để đếm tần suất xuất hiện của các mục trong một chuỗi?

A) `OrderedDict`  
B) `namedtuple`  
C) `Counter`  
D) `deque`

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: C) Counter**

`Counter` được thiết kế đặc biệt để đếm các đối tượng có thể hash và là lựa chọn phù hợp nhất cho việc đếm tần suất. Nó là một lớp con của dict có các khóa đại diện cho các mục được đếm và các giá trị đại diện cho số lần xuất hiện của chúng.

Ví dụ sử dụng:

```python
from collections import Counter

# Đếm số lần xuất hiện của mỗi ký tự
text = "mississippi"
char_counts = Counter(text)
print(char_counts)  # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})

# Đếm các từ trong một câu
sentence = "bao nhiêu gỗ sẽ một con sóc gỗ ném nếu một con sóc gỗ có thể ném gỗ"
word_counts = Counter(sentence.split())
print(word_counts.most_common(3))  # [('gỗ', 3), ('một', 2), ('con', 2)]

# Các phép toán toán học
counter1 = Counter('abcaba')
counter2 = Counter('abcdef')
print(counter1 + counter2)  # Tổng số lần đếm: Counter({'a': 4, 'b': 3, 'c': 2, 'd': 1, 'e': 1, 'f': 1})
print(counter1 - counter2)  # Trừ số lần đếm (chỉ giữ dương): Counter({'a': 2, 'b': 1})
```

Các tùy chọn khác có các mục đích khác nhau:

- `OrderedDict`: Dictionary duy trì thứ tự chèn (ít liên quan kể từ Python 3.7 vì dict thông thường đã bảo toàn thứ tự)
- `namedtuple`: Hàm factory để tạo các lớp con tuple với các trường có tên
- `deque`: Hàng đợi hai đầu với thao tác thêm/xóa hiệu quả từ cả hai đầu

Biết khi nào sử dụng các bộ sưu tập chuyên dụng từ module `collections` có thể cải thiện đáng kể khả năng đọc mã và hiệu suất, một kỹ năng được mong đợi ở các nhà phát triển Python cấp cao.

</details>

## Câu hỏi 7: Các Phương Thức Dictionary

Xem xét đoạn mã sau:

```python
d = {'a': 1, 'b': 2}
value = d.pop('c', None)
print(value)
```

Kết quả sẽ là gì?

A) `KeyError: 'c'`  
B) `None`  
C) `0`  
D) Mã sẽ không thực thi do lỗi cú pháp

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: B) None**

Phương thức `pop()` trên dictionary nhận một đối số thứ hai tùy chọn xác định giá trị mặc định để trả về nếu không tìm thấy khóa. Trong trường hợp này, vì khóa 'c' không tồn tại trong dictionary, phương thức trả về giá trị mặc định `None`.

Đây là một mẫu phổ biến được sử dụng để tránh các ngoại lệ KeyError khi xóa các phần tử có thể không tồn tại.

Các phương thức dictionary chính cần hiểu cho các vị trí cấp cao:

```python
# Lấy giá trị với mặc định
value = d.get('key', 'default')  # Trả về 'default' nếu không tìm thấy 'key'

# Xóa với mặc định
value = d.pop('key', 'default')  # Trả về 'default' nếu không tìm thấy 'key' và đã xóa

# Thiết lập mặc định
d.setdefault('key', 'default')  # Đặt khóa thành 'default' chỉ khi khóa chưa tồn tại

# Cập nhật từ một dictionary khác
d.update(other_dict)  # Thêm/cập nhật các khóa từ other_dict

# Lấy tất cả các cặp khóa-giá trị dưới dạng view
items = d.items()  # View động của các mục

# Lấy với tác dụng phụ của việc thêm
value = d['key']  # Gây ra KeyError nếu không tìm thấy
```

Trong Python 3.9+, dictionary có thêm các phương thức bổ sung:

```python
d1 = {'a': 1, 'b': 2}
d2 = {'b': 3, 'c': 4}

# Các toán tử hợp nhất và cập nhật dictionary
merged = d1 | d2  # {'a': 1, 'b': 3, 'c': 4}
d1 |= d2          # Cập nhật tại chỗ - sửa đổi d1
```

Hiểu các phương thức này và khi nào sử dụng chúng là quan trọng để viết mã mạnh mẽ và hiệu quả ở cấp độ cao.

</details>

## Câu hỏi 8: Tối Ưu Hóa Bộ Nhớ

Cấu trúc dữ liệu nào sẽ sử dụng ít bộ nhớ nhất để lưu trữ một tập hợp lớn các chuỗi có nhiều giá trị trùng lặp?

A) Một list các chuỗi  
B) Một set các chuỗi  
C) Một tuple các chuỗi  
D) Một frozenset các chuỗi

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: B) Một set các chuỗi**

Một set sẽ sử dụng ít bộ nhớ nhất để lưu trữ một tập hợp lớn các chuỗi với nhiều giá trị trùng lặp vì set chỉ lưu trữ các giá trị duy nhất. Khi bạn thêm một chuỗi trùng lặp vào set, nó không tạo một mục mới, tiết kiệm bộ nhớ.

Đây là so sánh sử dụng bộ nhớ sử dụng hàm `sys.getsizeof()` (lưu ý rằng điều này chỉ đo kích thước container, không phải các đối tượng chứa trong đó):

```python
import sys
from timeit import timeit

# Tạo dữ liệu kiểm tra với nhiều bản sao
data = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'] * 1000

# So sánh mức sử dụng bộ nhớ
list_size = sys.getsizeof(data)
set_size = sys.getsizeof(set(data))
tuple_size = sys.getsizeof(tuple(data))
frozen_size = sys.getsizeof(frozenset(data))

print(f"Kích thước List: {list_size} byte")
print(f"Kích thước Set: {set_size} byte")
print(f"Kích thước Tuple: {tuple_size} byte")
print(f"Kích thước Frozenset: {frozen_size} byte")

# So sánh hiệu suất cho các thao tác 'in'
list_time = timeit(lambda: 'apple' in data, number=10000)
set_time = timeit(lambda: 'apple' in set(data), number=10000)

print(f"Thời gian tìm kiếm List: {list_time:.6f} giây")
print(f"Thời gian tìm kiếm Set: {set_time:.6f} giây")
```

Trong ví dụ này, bạn sẽ thấy rằng set và frozenset sử dụng ít bộ nhớ hơn đáng kể so với list hoặc tuple do việc loại bỏ bản sao.

Mặc dù frozenset cũng sẽ loại bỏ các giá trị trùng lặp, nhưng nó thường hơi lớn hơn một set thông thường do chi tiết triển khai không thay đổi của nó.

Một tuple sẽ sử dụng ít bộ nhớ hơn một chút so với một list cho cùng các phần tử, nhưng nó vẫn sẽ lưu trữ tất cả các bản sao.

Khi xem xét tối ưu hóa bộ nhớ cho các vai trò Python cấp cao:

1. Nhận thức về chi phí đối tượng
2. Xem xét các cấu trúc dữ liệu chuyên dụng (như set cho các giá trị duy nhất)
3. Sử dụng generators để xử lý tập dữ liệu lớn
4. Tìm hiểu các thư viện bên thứ ba như NumPy cho dữ liệu số
5. Xem xét các định dạng tuần tự hóa dữ liệu để lưu trữ
</details>

## Câu hỏi 9: Cài Đặt Queue

Việc triển khai nào của queue trong Python sẽ hiệu quả nhất để xử lý cả hai thao tác enqueue và dequeue trong các ứng dụng quy mô lớn?

A) List với `append()` và `pop(0)`  
B) List với `append()` và `pop()`  
C) `collections.deque` với `append()` và `popleft()`  
D) `queue.Queue` từ thư viện tiêu chuẩn

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: C) `collections.deque` với `append()` và `popleft()`**

Để triển khai queue hiệu quả trong Python, `collections.deque` (queue hai đầu) là lựa chọn đa năng tốt nhất vì:

1. Nó có độ phức tạp thời gian O(1) cho cả thao tác `append()` (enqueue) và `popleft()` (dequeue)
2. Nó được triển khai nội bộ như một danh sách liên kết đôi, cho phép các thao tác hiệu quả ở cả hai đầu
3. Nó là một phần của thư viện chuẩn và được tối ưu hóa bằng C

Hãy so sánh các tùy chọn:

A) List với `append()` và `pop(0)`:

- `append()` là O(1) khấu hao
- `pop(0)` là O(n) vì nó yêu cầu dịch chuyển tất cả các phần tử
- Rất không hiệu quả cho các queue lớn

B) List với `append()` và `pop()`:

- Cả hai thao tác đều là O(1)
- Nhưng đây là triển khai stack (LIFO), không phải queue (FIFO)

C) `collections.deque` với `append()` và `popleft()`:

- Cả hai thao tác đều là O(1)
- Triển khai đúng queue FIFO
- Hiệu quả bộ nhớ với các thao tác nhanh

D) `queue.Queue` từ thư viện chuẩn:

- Triển khai an toàn với luồng với locks
- Hơi chậm hơn `deque` do overhead an toàn luồng
- Sử dụng khi yêu cầu an toàn luồng, không phải cho hiệu suất thuần túy

So sánh hiệu suất:

```python
import timeit
from collections import deque
from queue import Queue

# Thiết lập
list_queue = []
deque_queue = deque()
thread_queue = Queue()

# Benchmark các thao tác enqueue + dequeue
def list_bad_queue():
    list_queue.append(1)
    if list_queue: list_queue.pop(0)

def list_stack():  # không phải queue
    list_queue.append(1)
    if list_queue: list_queue.pop()

def deque_queue_op():
    deque_queue.append(1)
    if deque_queue: deque_queue.popleft()

def thread_safe_queue():
    thread_queue.put(1)
    if not thread_queue.empty(): thread_queue.get()

# Kết quả cho 100,000 thao tác
print("List làm queue (pop(0)): ", timeit.timeit(list_bad_queue, number=100000))
print("List làm stack (pop()): ", timeit.timeit(list_stack, number=100000))
print("Deque làm queue: ", timeit.timeit(deque_queue_op, number=100000))
print("Queue an toàn luồng: ", timeit.timeit(thread_safe_queue, number=100000))
```

Đối với các vị trí cấp cao, việc hiểu các tác động về hiệu suất này và chọn cấu trúc dữ liệu phù hợp cho trường hợp sử dụng cụ thể là rất quan trọng, đặc biệt là trong các ứng dụng có yêu cầu thông lượng cao.

</details>

## Câu hỏi 10: Sắp Xếp Nâng Cao

Xem xét đoạn mã sau:

```python
data = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}, {'name': 'Carol', 'age': 25}]
result = sorted(data, key=lambda x: (x['age'], x['name']))
print([person['name'] for person in result])
```

Kết quả sẽ là gì?

A) `['Alice', 'Bob', 'Carol']`  
B) `['Bob', 'Carol', 'Alice']`  
C) `['Carol', 'Bob', 'Alice']`  
D) `['Bob', 'Alice', 'Carol']`

<details>
<summary>Xem Đáp Án và Giải Thích</summary>

**Đáp án: B) ['Bob', 'Carol', 'Alice']**

Đoạn mã này minh họa việc sắp xếp một danh sách các dictionary sử dụng một tuple làm khóa sắp xếp. Khi sử dụng một tuple làm khóa trong `sorted()`, Python sắp xếp theo phần tử đầu tiên của tuple, sau đó sử dụng các phần tử tiếp theo làm yếu tố quyết định hòa.

Trong trường hợp này, khóa sắp xếp là `(x['age'], x['name'])`, có nghĩa là:

1. Đầu tiên, sắp xếp theo tuổi theo thứ tự tăng dần
2. Nếu tuổi bằng nhau, sắp xếp theo tên theo thứ tự tăng dần (bảng chữ cái)

Vì vậy kết quả sẽ là:

- Đầu tiên: Bob (tuổi 25, tên 'Bob')
- Thứ hai: Carol (tuổi 25, tên 'Carol')
- Thứ ba: Alice (tuổi 30, tên 'Alice')

Cả Bob và Carol đều có cùng tuổi (25), vì vậy yếu tố quyết định hòa là tên của họ theo thứ tự bảng chữ cái, đặt Bob trước Carol.

Các kỹ thuật sắp xếp nâng cao cho các nhà phát triển Python cấp cao:

```python
# Sắp xếp với nhiều tiêu chí
sorted(data, key=lambda x: (x['department'], -x['salary']))  # Tăng dần theo phòng ban, giảm dần theo lương

# Sử dụng module operator để hiệu suất tốt hơn
from operator import itemgetter, attrgetter
sorted(list_of_dicts, key=itemgetter('age', 'name'))  # Hiệu quả hơn lambda
sorted(list_of_objects, key=attrgetter('age', 'name'))  # Cho các đối tượng với thuộc tính

# Sắp xếp tùy chỉnh với functools
from functools import cmp_to_key
def custom_compare(a, b):
    # Logic so sánh tùy chỉnh
    return (a > b) - (a < b)
sorted(data, key=cmp_to_key(custom_compare))

# Sắp xếp ổn định vs không ổn định
# Thuật toán sắp xếp của Python là ổn định - các phần tử bằng nhau duy trì thứ tự tương đối của chúng
```

Hiểu các kỹ thuật sắp xếp này có giá trị trong các tác vụ xử lý dữ liệu nơi bạn cần sắp xếp thông tin theo các quy tắc kinh doanh cụ thể hoặc để trình bày, một yêu cầu phổ biến trong các vai trò nhà phát triển cấp cao.

</details>
