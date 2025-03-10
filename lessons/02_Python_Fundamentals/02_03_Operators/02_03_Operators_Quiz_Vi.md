# Bài Kiểm Tra Về Toán Tử Python Cho Phỏng Vấn

## Mục Lục

- [Bài Kiểm Tra Về Toán Tử Python Cho Phỏng Vấn](#bài-kiểm-tra-về-toán-tử-python-cho-phỏng-vấn)
  - [Mục Lục](#mục-lục)
  - [Toán Tử Số Học](#toán-tử-số-học)
  - [Toán Tử So Sánh](#toán-tử-so-sánh)
  - [Toán Tử Logic](#toán-tử-logic)
  - [Toán Tử Bit](#toán-tử-bit)
  - [Toán Tử Gán](#toán-tử-gán)
  - [Toán Tử Nhận Dạng và Thành Viên](#toán-tử-nhận-dạng-và-thành-viên)
  - [Thứ Tự Ưu Tiên Của Toán Tử](#thứ-tự-ưu-tiên-của-toán-tử)
  - [Đặc Điểm Kỳ Lạ Của Toán Tử](#đặc-điểm-kỳ-lạ-của-toán-tử)
  - [Sử Dụng Toán Tử Nâng Cao](#sử-dụng-toán-tử-nâng-cao)
  - [Cân Nhắc Hiệu Suất](#cân-nhắc-hiệu-suất)

## Toán Tử Số Học

**Câu hỏi 1:** Kết quả của đoạn mã Python sau là gì?

```python
print(10 / 5)
print(10 // 5)
print(10 % 3)
print(2 ** 3)
```

A) `2, 2, 1, 8`  
B) `2.0, 2, 1, 8`  
C) `2, 2, 1, 6`  
D) `2.0, 2.0, 1, 8`

<details>
<summary>Xem Đáp Án</summary>
<b>B) 2.0, 2, 1, 8</b>

Giải thích:

- `10 / 5` bằng `2.0` (số thực): Trong Python 3, phép chia luôn trả về số thực
- `10 // 5` bằng `2` (số nguyên): Phép chia lấy phần nguyên trả về phần nguyên của kết quả chia
- `10 % 3` bằng `1`: Toán tử modulo trả về phần dư của phép chia
- `2 ** 3` bằng `8`: Toán tử lũy thừa (2 mũ 3)

Điều này thể hiện sự khác biệt quan trọng giữa phép chia chuẩn (`/`) và phép chia lấy phần nguyên (`//`) trong Python 3. Phép chia chuẩn luôn trả về số thực, ngay cả khi kết quả là số nguyên.

</details>

## Toán Tử So Sánh

**Câu hỏi 2:** Phát biểu nào về toán tử so sánh trong Python là SAI?

A) Các phép so sánh nối chuỗi như `1 < x < 10` được đánh giá tương đương với `1 < x and x < 10`  
B) Biểu thức `"apple" < "banana"` cho kết quả là `True`  
C) Biểu thức `[1, 2] < [1, 3]` cho kết quả là `True`  
D) Biểu thức `None == 0` cho kết quả là `True`

<details>
<summary>Xem Đáp Án</summary>
<b>D) Biểu thức `None == 0` cho kết quả là `True`</b>

Giải thích:

- `None == 0` thực tế đánh giá thành `False`: Trong Python, `None` là một kiểu riêng biệt và không bằng 0 hoặc bất kỳ giá trị nào khác ngoại trừ chính `None`
- Phép so sánh nối chuỗi đúng là được đánh giá như các phép toán AND logic
- So sánh chuỗi được thực hiện theo thứ tự từ điển, vì vậy "apple" đúng là đứng trước "banana"
- So sánh danh sách được thực hiện từng phần tử một, vì vậy [1, 2] nhỏ hơn [1, 3]

Câu hỏi này nhấn mạnh cách hệ thống kiểu dữ liệu của Python xử lý `None` như một thực thể riêng biệt chứ không phải là giá trị falsy như trong một số ngôn ngữ khác.

</details>

## Toán Tử Logic

**Câu hỏi 3:** Kết quả của đoạn mã Python sau là gì?

```python
print(True and False)
print(True or False)
print(not True)
print('' and 'Hello')
print('' or 'Hello')
```

A) `False, True, False, '', 'Hello'`  
B) `False, True, False, False, True`  
C) `0, 1, 0, '', 'Hello'`  
D) `False, True, False, 'Hello', ''`

<details>
<summary>Xem Đáp Án</summary>
<b>A) False, True, False, '', 'Hello'</b>

Giải thích:

- `True and False` bằng `False`: Toán tử AND logic trả về giá trị thứ hai nếu giá trị đầu tiên là truthy
- `True or False` bằng `True`: Toán tử OR logic trả về giá trị đầu tiên nếu nó là truthy
- `not True` bằng `False`: Toán tử NOT logic đảo ngược giá trị boolean
- `'' and 'Hello'` bằng `''`: Vì chuỗi rỗng là falsy, AND trả về nó mà không cần đánh giá toán hạng thứ hai
- `'' or 'Hello'` bằng `'Hello'`: Vì chuỗi rỗng là falsy, OR chuyển sang toán hạng thứ hai

Điều này chứng tỏ rằng các toán tử logic của Python không chỉ trả về giá trị boolean - chúng trả về chính giá trị toán hạng quyết định kết quả, cho phép đánh giá ngắn mạch.

</details>

## Toán Tử Bit

**Câu hỏi 4:** Kết quả của đoạn mã Python sau là gì?

```python
a = 5    # 101 dạng nhị phân
b = 3    # 011 dạng nhị phân
print(a & b)
print(a | b)
print(a ^ b)
print(~a)
print(a << 1)
print(a >> 1)
```

A) `1, 7, 6, -6, 10, 2`  
B) `1, 7, 6, -5, 10, 2`  
C) `1, 7, 2, -6, 10, 2`  
D) `1, 15, 6, -5, 25, 2`

<details>
<summary>Xem Đáp Án</summary>
<b>A) 1, 7, 6, -6, 10, 2</b>

Giải thích:

- `a & b` bằng `1`: Phép AND bit (101 & 011 = 001)
- `a | b` bằng `7`: Phép OR bit (101 | 011 = 111)
- `a ^ b` bằng `6`: Phép XOR bit (101 ^ 011 = 110)
- `~a` bằng `-6`: Phép NOT bit (~101 = ...11111010 do bổ sung số 2)
- `a << 1` bằng `10`: Dịch trái (101 thành 1010)
- `a >> 1` bằng `2`: Dịch phải (101 thành 10)

Điều này minh họa cách Python xử lý các phép toán nhị phân, bao gồm kết quả hơi trái ngược của toán tử NOT bit do cách lưu trữ số âm trong hệ nhị phân.

</details>

## Toán Tử Gán

**Câu hỏi 5:** Phát biểu nào sau đây về toán tử gán trong Python là ĐÚNG?

A) Biểu thức `x += 1` luôn tương đương với `x = x + 1` trong mọi tình huống  
B) Câu lệnh `x = y = z = 0` gán 0 cho x, y cho x, và z cho y  
C) Phép gán tăng cường `x += [1, 2]` sẽ thất bại nếu x ban đầu là một danh sách rỗng  
D) Câu lệnh `a, b = b, a` hoán đổi giá trị của biến a và b

<details>
<summary>Xem Đáp Án</summary>
<b>D) Câu lệnh `a, b = b, a` hoán đổi giá trị của biến a và b</b>

Giải thích:

- `a, b = b, a` thực sự hoán đổi các biến mà không cần biến tạm thời
- `x += 1` nhìn chung tương đương với `x = x + 1`, nhưng có một số trường hợp đặc biệt với các đối tượng tùy chỉnh
- `x = y = z = 0` gán 0 cho cả ba biến (không phải như lựa chọn B đề xuất)
- `x += [1, 2]` hoạt động tốt nếu x là một danh sách rỗng, vì toán tử += cho danh sách thực hiện phép nối

Câu hỏi này nhấn mạnh tính năng giải nén tuple của Python, cho phép hoán đổi biến một cách thanh lịch mà không cần biến tạm thời như trong nhiều ngôn ngữ khác.

</details>

## Toán Tử Nhận Dạng và Thành Viên

**Câu hỏi 6:** Kết quả của đoạn mã Python sau là gì?

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)
print(a is b)
print(a is c)
print(2 in a)
print(4 not in a)
```

A) `True, True, True, True, True`  
B) `True, False, True, True, True`  
C) `True, False, False, True, True`  
D) `False, False, True, True, True`

<details>
<summary>Xem Đáp Án</summary>
<b>B) True, False, True, True, True</b>

Giải thích:

- `a == b` bằng `True`: Các danh sách có cùng giá trị, nên chúng bằng nhau
- `a is b` bằng `False`: Chúng là các đối tượng khác nhau trong bộ nhớ
- `a is c` bằng `True`: c được gán cùng đối tượng với a
- `2 in a` bằng `True`: 2 là một phần tử trong danh sách
- `4 not in a` bằng `True`: 4 không phải là phần tử trong danh sách

Điều này thể hiện sự khác biệt quan trọng giữa toán tử bằng nhau (`==`) và toán tử nhận dạng (`is`). `==` kiểm tra xem các giá trị có bằng nhau không, trong khi `is` kiểm tra xem hai biến có tham chiếu đến cùng một đối tượng trong bộ nhớ không.

</details>

## Thứ Tự Ưu Tiên Của Toán Tử

**Câu hỏi 7:** Kết quả của đoạn mã Python sau là gì?

```python
x = 5
y = 10
z = 0

print(x < y and z or not z)
print(3 + 4 * 2 - 1)
print(3 * 1 ** 3)
print(4 < 5 > 3 < 6)
```

A) `True, 10, 3, True`  
B) `False, 10, 3, True`  
C) `True, 10, 27, True`  
D) `False, 10, 3, False`

<details>
<summary>Xem Đáp Án</summary>
<b>A) True, 10, 3, True</b>

Giải thích:

- `x < y and z or not z`: `x < y` là `True`, `z` là `0` (falsy), nên `True and 0` là `0`, sau đó `0 or not 0` là `True`
- `3 + 4 * 2 - 1`: Phép nhân có độ ưu tiên cao hơn, nên `4 * 2 = 8`, sau đó `3 + 8 - 1 = 10`
- `3 * 1 ** 3`: Phép lũy thừa có độ ưu tiên cao hơn phép nhân, nên `1 ** 3 = 1`, sau đó `3 * 1 = 3`
- `4 < 5 > 3 < 6`: Tất cả các phép so sánh nối chuỗi đều `True`, nên toàn bộ biểu thức là `True`

Điều này thể hiện các quy tắc về thứ tự ưu tiên của toán tử trong Python, quyết định thứ tự mà các phép toán được đánh giá.

</details>

## Đặc Điểm Kỳ Lạ Của Toán Tử

**Câu hỏi 8:** Kết quả của đoạn mã Python sau là gì?

```python
def add_to_list(value, my_list=[]):
    my_list.append(value)
    return my_list

print(add_to_list(1))
print(add_to_list(2))
print(add_to_list(3, [10, 20]))
print(add_to_list(4))
```

A) `[1], [2], [10, 20, 3], [4]`  
B) `[1], [1, 2], [10, 20, 3], [1, 2, 4]`  
C) `[1], [2], [10, 20, 3], [1, 2, 3, 4]`  
D) `[1], [1, 2], [10, 20, 3], [1, 2, 4]`

<details>
<summary>Xem Đáp Án</summary>
<b>D) [1], [1, 2], [10, 20, 3], [1, 2, 4]</b>

Giải thích:
Câu hỏi này thể hiện cạm bẫy của đối số mặc định có thể thay đổi trong Python:

1. `add_to_list(1)`: Tạo danh sách rỗng mặc định và thêm 1, trả về `[1]`
2. `add_to_list(2)`: Sử dụng CÙNG danh sách mặc định từ lần gọi đầu tiên (hiện chứa `[1]`), thêm 2, trả về `[1, 2]`
3. `add_to_list(3, [10, 20])`: Sử dụng danh sách được cung cấp, thêm 3, trả về `[10, 20, 3]`
4. `add_to_list(4)`: Lại sử dụng cùng danh sách mặc định (hiện chứa `[1, 2]`), thêm 4, trả về `[1, 2, 4]`

Đây là một lỗi cổ điển trong Python: đối số mặc định chỉ được đánh giá một lần tại thời điểm định nghĩa hàm, không phải mỗi lần hàm được gọi. Đối số mặc định có thể thay đổi tồn tại giữa các lần gọi hàm.

</details>

## Sử Dụng Toán Tử Nâng Cao

**Câu hỏi 9:** Kết quả của đoạn mã Python sau là gì?

```python
# Sử dụng giải nén và toán tử *
first, *middle, last = [1, 2, 3, 4, 5]
print(first, middle, last)

# Sử dụng ** để giải nén từ điển
def display_info(name, age, city):
    return f"{name} is {age} years old from {city}"

person = {"name": "Alice", "age": 30, "city": "New York"}
print(display_info(**person))

# Sử dụng toán tử điều kiện
x = 5
result = "Even" if x % 2 == 0 else "Odd"
print(result)
```

A) `1 [2, 3, 4] 5, "Alice is 30 years old from New York", "Odd"`  
B) `1 [2, 3, 4] 5, Error: unpack got an unexpected keyword argument, "Odd"`  
C) `1 [2, 3, 4] 5, "Alice is 30 years old from New York", "Even"`  
D) `Error: too many values to unpack, "Alice is 30 years old from New York", "Odd"`

<details>
<summary>Xem Đáp Án</summary>
<b>A) 1 [2, 3, 4] 5, "Alice is 30 years old from New York", "Odd"</b>

Giải thích:

- `first, *middle, last = [1, 2, 3, 4, 5]`: Giải nén mở rộng gán `1` cho `first`, `[2, 3, 4]` cho `middle`, và `5` cho `last`
- `display_info(**person)`: Giải nén từ điển truyền từng cặp khóa-giá trị như một đối số có tên cho hàm
- `"Even" if x % 2 == 0 else "Odd"`: Vì `5 % 2` là `1`, điều kiện là `False`, vì vậy giá trị "Odd" được chọn

Điều này thể hiện ba tính năng mạnh mẽ của Python:

1. Giải nén mở rộng với toán tử `*` để thu thập nhiều giá trị
2. Giải nén từ điển với toán tử `**` để truyền đối số từ khóa
3. Toán tử điều kiện/ba ngôi cho biểu thức if-else ngắn gọn
</details>

## Cân Nhắc Hiệu Suất

**Câu hỏi 10:** Phát biểu nào sau đây về hiệu suất toán tử trong Python là ĐÚNG?

A) Biểu thức `a < b and expensive_function()` sẽ luôn gọi `expensive_function()` bất kể giá trị của `a < b`  
B) Toán tử bit nói chung chậm hơn toán tử số học cho các phép toán số nguyên đơn giản  
C) Sử dụng `1 < x < 10` kém hiệu quả hơn viết `1 < x and x < 10`  
D) Toán tử modulo `%` thường hiệu quả hơn việc sử dụng toán tử bit để kiểm tra xem một số là chẵn hay lẻ

<details>
<summary>Xem Đáp Án</summary>
<b>C) Sử dụng `1 < x < 10` kém hiệu quả hơn viết `1 < x and x < 10`</b>

Giải thích:

- Mặc dù phép so sánh nối chuỗi như `1 < x < 10` thanh lịch hơn, chúng kém hiệu quả hơn một chút vì Python phải thực hiện các bước bổ sung bên trong
- Toán tử logic như `and` sử dụng đánh giá ngắn mạch, vì vậy nếu `a < b` là False, `expensive_function()` sẽ không được gọi
- Toán tử bit nói chung nhanh hơn toán tử số học cho các phép toán đơn giản, không phải chậm hơn
- Để kiểm tra xem một số có chẵn không, `num & 1 == 0` thường hiệu quả hơn `num % 2 == 0`

Câu hỏi này nhấn mạnh sự cân bằng giữa viết mã thanh lịch, dễ đọc và tối ưu hóa hiệu suất. Trong thực tế, sự khác biệt hiệu suất cho phép so sánh nối chuỗi là không đáng kể đối với hầu hết các ứng dụng, và cú pháp dễ đọc hơn thường được ưa chuộng.

</details>
