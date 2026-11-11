// Session 7: Lists
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

// runs the code and prints everything it printed on one line, so a multi-line output can be checked as one answer
const flat = (code) => `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
${code.split('\n').map((l) => '    ' + l).join('\n')}
print(" ".join(buf.getvalue().split()))`

export default [
  [`What is a list in Python?`, `An ordered collection of items inside square brackets`, [`A single number with decimals`, `A block of text inside quotes`, `A loop that repeats`], `One variable can hold many values in a list.`],
  [`Which of these is a list?`, `[10, 20, 30]`, [`(10, 20, 30)`, `"10, 20, 30"`, `{10 20 30}`], `Lists are written with square brackets, with commas between the items.`],
  [`Which statements about lists are true?`, `They are ordered, they can hold mixed types, and they can be changed`, [`They cannot hold text`, `They cannot be changed after creation`, `Every item must have a different value`, `They can only hold numbers`], `Lists are ordered, allow duplicates and mixed types, and are mutable.`],
  [`What does len([10, 20, 30]) give?`, `3`, [`2`, `30`, `60`], `len() gives the number of items.`, `print(len([10, 20, 30]))`],
  [`What does list("Python") give?`, `['P', 'y', 't', 'h', 'o', 'n']`, [`['Python']`, `"Python"`, `['P', 'y', 't', 'h', 'o']`], `list() turns the characters of a string into separate items.`, `print(list("Python"))`],
  [`What is the index of the first item in a list?`, `0`, [`1`, `-1`, `It depends on the list`], `Indexing starts from 0, like strings.`],
  [`What does fruits[-1] give when fruits = ["apple", "banana", "mango", "kiwi"]?`, `kiwi`, [`apple`, `mango`, `An error`], `-1 is the last item.`, `fruits = ["apple", "banana", "mango", "kiwi"]
print(fruits[-1])`],
  [`What does fruits[2] give when fruits = ["apple", "banana", "mango", "kiwi"]?`, `mango`, [`banana`, `kiwi`, `apple`], `Index 0 is apple, 1 is banana and 2 is mango.`, `fruits = ["apple", "banana", "mango", "kiwi"]
print(fruits[2])`],
  [`What error appears for fruits[4] when the list has 4 items?`, `IndexError`, [`TypeError`, `ValueError`, `NameError`], `The valid indexes are 0 to 3.`],
  [`Lists are mutable. Which line proves it?`, `fruits[1] = "orange"`, [`s[0] = "J" on a string`, `len(fruits)`, `print(fruits)`], `You can replace an item by assigning to its index. Strings cannot be changed this way.`],
  [`What does nums[1:4] give when nums = [10, 20, 30, 40, 50, 60]?`, `[20, 30, 40]`, [`[10, 20, 30, 40]`, `[20, 30, 40, 50]`, `[10, 20, 30]`], `The stop index is not included.`, `nums = [10, 20, 30, 40, 50, 60]
print(nums[1:4])`],
  [`What does nums[::-1] give when nums = [10, 20, 30]?`, `[30, 20, 10]`, [`[10, 20, 30]`, `[30]`, `[20, 10]`], `A step of -1 reverses the list.`, `nums = [10, 20, 30]
print(nums[::-1])`],
  [`What does nums[-2:] give when nums = [10, 20, 30, 40, 50, 60]?`, `[50, 60]`, [`[10, 20]`, `[60]`, `[40, 50, 60]`], `-2 means the second item from the end, and the missing stop means to the end.`, `nums = [10, 20, 30, 40, 50, 60]
print(nums[-2:])`],
  [`What does nums[:] do?`, `Makes a copy of the whole list`, [`Deletes the list`, `Reverses the list`, `Gives an error`], `A slice gives a new list, so nums[:] is a copy.`],
  [`What is printed?

nums = [10, 20, 30, 40, 50]
nums[1:3] = [21, 31]
print(nums)`, `[10, 21, 31, 40, 50]`, [`[10, 21, 31, 30, 40, 50]`, `[21, 31]`, `[10, 20, 21, 31, 40, 50]`], `Assigning to a slice replaces those items.`, `nums = [10, 20, 30, 40, 50]
nums[1:3] = [21, 31]
print(nums)`],
  [`Which method adds an item at the end of a list?`, `append()`, [`insert()`, `add()`, `push()`], `append(x) adds x at the end.`],
  [`What does fruits.insert(1, "kiwi") do?`, `Adds kiwi at position 1`, [`Adds kiwi at the end`, `Replaces the item at position 1`, `Removes kiwi`], `insert(i, x) puts x at position i and moves the rest along.`],
  [`What is printed?

fruits = ["apple", "banana"]
fruits.extend(["grapes", "orange"])
print(fruits)`, `['apple', 'banana', 'grapes', 'orange']`, [`['apple', 'banana', ['grapes', 'orange']]`, `['grapes', 'orange']`, `['apple', 'grapes', 'banana', 'orange']`], `extend() adds every item of another list at the end.`, `fruits = ["apple", "banana"]
fruits.extend(["grapes", "orange"])
print(fruits)`],
  [`What is the difference between append([3, 4]) and extend([3, 4]) on the list [1, 2]?`, `append gives [1, 2, [3, 4]] and extend gives [1, 2, 3, 4]`, [`Both give [1, 2, 3, 4]`, `append gives [1, 2, 3, 4] and extend gives [1, 2, [3, 4]]`, `Both give [1, 2, [3, 4]]`], `append adds one item, which here is a list. extend adds each item.`, `a = [1, 2]
a.append([3, 4])
b = [1, 2]
b.extend([3, 4])
print("append gives", a, "and extend gives", b)`],
  [`What is printed?

nums = [10, 20, 30, 20, 40]
nums.remove(20)
print(nums)`, `[10, 30, 20, 40]`, [`[10, 30, 40]`, `[10, 20, 30, 40]`, `[10, 20, 30, 20]`], `remove(x) removes only the first x.`, `nums = [10, 20, 30, 20, 40]
nums.remove(20)
print(nums)`],
  [`What does pop() do with no number?`, `Removes and returns the last item`, [`Removes and returns the first item`, `Removes every item`, `Returns None and changes nothing`], `pop(i) takes the item at position i instead.`],
  [`What is printed?

nums = [10, 30, 20, 40]
last = nums.pop()
print(last)`, `40`, [`10`, `20`, `[10, 30, 20]`], `pop() returns the item it removes.`, `nums = [10, 30, 20, 40]
last = nums.pop()
print(last)`],
  [`What does nums.clear() do?`, `Removes every item from the list`, [`Removes only the last item`, `Deletes the variable nums`, `Sorts the list`], `The list stays, but it becomes empty.`],
  [`What error does nums.remove(10) cause when nums = [1, 2, 3]?`, `ValueError`, [`IndexError`, `TypeError`, `KeyError`], `You can check with 10 in nums before removing.`],
  [`What does colors.index("blue") give when colors = ["red", "green", "blue", "green"]?`, `2`, [`3`, `1`, `-1`], `index() gives the position of the first match.`, `colors = ["red", "green", "blue", "green"]
print(colors.index("blue"))`],
  [`What does colors.count("green") give when colors = ["red", "green", "blue", "green"]?`, `2`, [`1`, `3`, `4`], `count() gives how many times the item appears.`, `colors = ["red", "green", "blue", "green"]
print(colors.count("green"))`],
  [`What does "pink" in colors give when colors = ["red", "green", "blue"]?`, `False`, [`True`, `None`, `An error`], `in checks whether a value is present in the list.`, `colors = ["red", "green", "blue"]
print("pink" in colors)`],
  [`What is printed?

nums = [5, 2, 9, 1]
nums.sort(reverse=True)
print(nums)`, `[9, 5, 2, 1]`, [`[1, 2, 5, 9]`, `[5, 2, 9, 1]`, `[1, 9, 2, 5]`], `reverse=True sorts from the biggest to the smallest.`, `nums = [5, 2, 9, 1]
nums.sort(reverse=True)
print(nums)`],
  [`What is the difference between sort() and sorted()?`, `sort() changes the list, sorted() gives a new sorted list`, [`They are exactly the same`, `sort() gives a new list, sorted() changes the list`, `sorted() only works on strings`], `sorted() leaves the original list alone.`],
  [`What does print(len(marks), min(marks), max(marks), sum(marks)) show for marks = [72, 85, 60, 91]?`, `4 60 91 308`, [`4 72 91 308`, `4 60 91 240`, `3 60 91 308`], `len is 4, the smallest is 60, the biggest is 91, and the total is 308.`, `marks = [72, 85, 60, 91]
print(len(marks), min(marks), max(marks), sum(marks))`],
  [`What is the average of marks = [72, 85, 60, 91] found with sum(marks) / len(marks)?`, `77.0`, [`77`, `308`, `76.5`], `308 divided by 4 is 77.0, as a float.`, `marks = [72, 85, 60, 91]
print(sum(marks) / len(marks))`],
  [`What is printed?

nums = [3, 1, 2]
result = nums.sort()
print(result)`, `None`, [`[1, 2, 3]`, `[3, 1, 2]`, `An error`], `sort() changes the list and returns None. Do not write nums = nums.sort().`, `nums = [3, 1, 2]
result = nums.sort()
print(result)`],
  [`What does [1, 2, 3] + [4, 5] give?`, `[1, 2, 3, 4, 5]`, [`[5, 7, 3]`, `[[1, 2, 3], [4, 5]]`, `An error`], `+ joins two lists into a new one.`, `print([1, 2, 3] + [4, 5])`],
  [`What does [4, 5] * 3 give?`, `[4, 5, 4, 5, 4, 5]`, [`[12, 15]`, `[4, 5, 3]`, `[[4, 5], 3]`], `* repeats a list.`, `print([4, 5] * 3)`],
  [`What is printed?

a = [1, 2, 3]
b = a
b.append(4)
print(a)`, `[1, 2, 3, 4]`, [`[1, 2, 3]`, `[4]`, `An error`], `b = a does not copy the list. Both names point to the same list.`, `a = [1, 2, 3]
b = a
b.append(4)
print(a)`],
  [`Which line makes a real copy of the list a?`, `a.copy()`, [`b = a`, `a == a`, `len(a)`], `a[:] also makes a copy.`],
  [`Which loop goes through every item of a list called fruits?`, `for fruit in fruits:`, [`for fruit of fruits`, `for (fruit in fruits)`, `loop fruit in fruits:`], `The loop variable takes one item at a time.`],
  [`What does enumerate(fruits) give you in a loop?`, `The index and the item together`, [`Only the items`, `Only the indexes in reverse`, `The length of the list`], `for i, fruit in enumerate(fruits): gives both.`],
  [`What is printed?

squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)`, `[1, 4, 9, 16, 25]`, [`[1, 2, 3, 4, 5]`, `[0, 1, 4, 9, 16]`, `[2, 4, 6, 8, 10]`], `Start with an empty list, then append inside the loop.`, `squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)`],
  [`What is evens after going through nums = [4, 7, 10, 3, 8] and appending the even numbers?`, `[4, 10, 8]`, [`[7, 3]`, `[4, 7, 10, 3, 8]`, `[10, 8]`], `Only items with n % 2 == 0 are appended.`, `nums = [4, 7, 10, 3, 8]
evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print(evens)`],
  [`What does [n * n for n in range(1, 6)] give?`, `[1, 4, 9, 16, 25]`, [`[1, 2, 3, 4, 5]`, `[2, 4, 6, 8, 10]`, `An error`], `This is a list comprehension, a one-line way to build a list.`, `print([n * n for n in range(1, 6)])`],
  [`What does matrix[1][2] give when matrix = [[1, 2, 3], [4, 5, 6]]?`, `6`, [`2`, `3`, `5`], `matrix[1] is the second row [4, 5, 6], and index 2 is its third item.`, `matrix = [[1, 2, 3], [4, 5, 6]]
print(matrix[1][2])`],
  [`What does print(matrix[0]) show when matrix = [[1, 2, 3], [4, 5, 6]]?`, `[1, 2, 3]`, [`1`, `[1, 4]`, `[[1, 2, 3]]`], `matrix[0] is the first row.`, `matrix = [[1, 2, 3], [4, 5, 6]]
print(matrix[0])`],
  [`What is printed?

nums = [10, 20, 30, 40, 50]
nums.append(60)
nums.pop(0)
print(len(nums))`, `5`, [`4`, `6`, `7`], `Appending makes 6 items, and pop(0) removes one, so 5 remain.`, `nums = [10, 20, 30, 40, 50]
nums.append(60)
nums.pop(0)
print(len(nums))`],
  [`True or false: this is the correct way to add 5 to nums.

nums = nums.append(5)`, `False`, [`True`], `append() returns None, so nums would become None. Just write nums.append(5).`],
]
