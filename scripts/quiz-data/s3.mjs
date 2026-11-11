// Session 3: Strings and Operators
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]
export default [
  [`What is a string in Python?`, `A sequence of characters inside quotes`, [`A list of numbers`, `A kind of loop`, `A number with a decimal point`], `A string is text, written inside single, double or triple quotes.`],
  [`Which quotes can you use to create a multi-line string?`, `Triple quotes`, [`Single quotes only`, `Round brackets`, `Backticks`], `Text inside triple quotes (""" or ''') can run over several lines.`],
  [`Which line prints It's a good day correctly?`, `print("It's a good day")`, [`print('It's a good day')`, `print(It's a good day)`, `print('It"s a good day)`], `Double quotes around the text let you use a single quote inside it.`],
  [`In a Python string, what does \\n do?`, `Starts a new line`, [`Inserts a tab`, `Prints a backslash`, `Ends the program`], `\\n is the new line escape. \\t is a tab.`],
  [`How do you put a backslash inside a Python string?`, `Write two backslashes`, [`Write one backslash`, `Write a slash and a dot`, `You cannot`], `\\\\ prints a single backslash, for example "C:\\\\Users".`],
  [`Which line prints I'm "happy" with both kinds of quote?`, `print("I'm \\"happy\\"")`, [`print("I'm "happy"")`, `print('I'm "happy"')`, `print(I'm "happy")`], `Use a backslash before the inner double quote: \\" . Then the string does not end early.`],
  [`In the string "Python", what is the index of the first character P?`, `0`, [`1`, `-1`, `6`], `Indexing starts from 0.`],
  [`What does "Python"[-1] give?`, `n`, [`P`, `y`, `An error`], `Negative indexes count from the end, so -1 is the last character.`, `print("Python"[-1])`],
  [`What does s[3] give?

s = "Python"`, `h`, [`t`, `o`, `y`], `P is 0, y is 1, t is 2 and h is 3.`, `s = "Python"
print(s[3])`],
  [`What does s[-3] give?

s = "Python"`, `h`, [`t`, `o`, `n`], `Counting back from the end: n is -1, o is -2 and h is -3.`, `s = "Python"
print(s[-3])`],
  [`What happens with s[6]?

s = "Python"`, `IndexError`, [`It gives n`, `TypeError`, `It gives an empty string`], `The valid indexes are 0 to 5, so 6 is out of range.`],
  [`What happens when you run s[0] = "J" on a string?`, `TypeError, because strings are immutable`, [`The first letter changes to J`, `IndexError`, `SyntaxError`], `Strings cannot be changed in place. Build a new string instead.`],
  [`In string[start:stop:step], what is true about the stop index?`, `It is not included`, [`It is included`, `It must be negative`, `It must be even`], `s[0:6] gives the characters at positions 0 to 5.`],
  [`What does "Python Programming"[0:6] give?`, `Python`, [`Python `, `Progra`, `ython`], `Positions 0 to 5 are the letters of Python.`, `print("Python Programming"[0:6])`],
  [`What does "Python"[::-1] give?`, `nohtyP`, [`Python`, `P`, `yhton`], `A step of -1 reverses the string.`, `print("Python"[::-1])`],
  [`What does "Python Programming"[::2] give?`, `Pto rgamn`, [`yhnPormig`, `Python`, `Pyton Pogamin`], `A step of 2 takes every second character, starting from the first.`, `print("Python Programming"[::2])`],
  [`What does "Python Programming"[-11:] give?`, `Programming`, [`Python`, `Programmin`, `Python Programming`], `-11 is the start position counted from the end, and the missing stop means to the end.`, `print("Python Programming"[-11:])`],
  [`What does len("  Hello Python  ") give?`, `16`, [`12`, `14`, `18`], `len() counts every character, including the 2 spaces at each end.`, `print(len("  Hello Python  "))`],
  [`What does "hello world".title() give?`, `Hello World`, [`Hello world`, `HELLO WORLD`, `hello world`], `title() makes the first letter of each word a capital.`, `print("hello world".title())`],
  [`What does "hello world".capitalize() give?`, `Hello world`, [`Hello World`, `HELLO WORLD`, `hello World`], `capitalize() changes only the first letter of the whole string.`, `print("hello world".capitalize())`],
  [`What does "  hi  ".strip() do?`, `Removes the spaces at both ends`, [`Removes all spaces`, `Makes the text capital`, `Splits the text into words`], `strip() cuts spaces from the left and the right. lstrip() and rstrip() do one side only.`],
  [`What does "cat".replace("c", "b") give?`, `bat`, [`cat`, `cbt`, `bct`], `replace(a, b) swaps text a for text b.`, `print("cat".replace("c", "b"))`],
  [`What does "hello".find("l") give?`, `2`, [`3`, `1`, `-1`], `find() gives the index of the first match. The first l is at index 2.`, `print("hello".find("l"))`],
  [`What does "hello".find("z") give?`, `-1`, [`0`, `None`, `An error`], `find() returns -1 when the text is not found.`, `print("hello".find("z"))`],
  [`What does "banana".count("a") give?`, `3`, [`2`, `1`, `6`], `count() gives the number of times the text appears.`, `print("banana".count("a"))`],
  [`What does "python".startswith("py") give?`, `True`, [`False`, `py`, `0`], `startswith() answers True or False.`, `print("python".startswith("py"))`],
  [`What does "123".isdigit() give?`, `True`, [`False`, `123`, `An error`], `isdigit() is True when the string has only digits.`, `print("123".isdigit())`],
  [`What does "a b c".split() give?`, `['a', 'b', 'c']`, [`abc`, `a-b-c`, `['a b c']`], `split() breaks the string into a list of words.`, `print("a b c".split())`],
  [`What does "-".join(["a", "b"]) give?`, `a-b`, [`ab-`, `-a-b`, `['a-b']`], `join() puts the text between the items of the list.`, `print("-".join(["a", "b"]))`],
  [`What is printed?

name = "aman"
name.upper()
print(name)`, `aman`, [`AMAN`, `Aman`, `None`], `String methods return a new string. They do not change the original, so name is still aman.`, `name = "aman"
name.upper()
print(name)`],
  [`What does print("Hello" + "World") show?`, `HelloWorld`, [`Hello World`, `Hello+World`, `An error`], `+ joins strings (concatenation) without adding a space.`, `print("Hello" + "World")`],
  [`What does print("ab" * 3) show?`, `ababab`, [`ab3`, `abababab`, `An error`], `* repeats a string.`, `print("ab" * 3)`],
  [`What does print("z" not in "apple") show?`, `True`, [`False`, `z`, `An error`], `There is no z in apple, so not in is True.`, `print("z" not in "apple")`],
  [`What is printed?

price = 49.5678
print(f"{price:.2f}")`, `49.57`, [`49.5678`, `49.56`, `49.6`], `.2f shows 2 decimal places, and rounds the last digit.`, `price = 49.5678
print(f"{price:.2f}")`],
  [`What does print(f"{1000000:,}") show?`, `1,000,000`, [`1000000`, `1.000.000`, `1,0,0`], `A comma after the colon adds thousand separators.`, `print(f"{1000000:,}")`],
  [`What is printed?

age = 25
print(f"Next year I will be {age + 1}")`, `Next year I will be 26`, [`Next year I will be age + 1`, `Next year I will be 25`, `Next year I will be {26}`], `You can put a calculation inside the curly braces of an f-string.`, `age = 25
print(f"Next year I will be {age + 1}")`],
  [`What is the difference between = and == ?`, `= assigns a value and == compares two values`, [`= compares and == assigns`, `They mean the same thing`, `== is only used with strings`], `Mixing them up is the classic beginner mistake.`],
  [`What does print(10 != 20) show?`, `True`, [`False`, `10`, `An error`], `!= means not equal. 10 and 20 are different, so the result is True.`, `print(10 != 20)`],
  [`What does print(10 >= 10) show?`, `True`, [`False`, `10`, `An error`], `>= means greater than or equal to.`, `print(10 >= 10)`],
  [`What is printed?

age = 22
marks = 80
print(age > 18 and marks > 75)`, `True`, [`False`, `22`, `80`], `and is True only if both parts are True. Both are.`, `age = 22
marks = 80
print(age > 18 and marks > 75)`],
  [`What is printed?

age = 22
marks = 80
print(age > 25 or marks > 75)`, `True`, [`False`, `22`, `An error`], `or is True if at least one part is True. marks > 75 is True.`, `age = 22
marks = 80
print(age > 25 or marks > 75)`],
  [`What is printed?

age = 22
print(not age > 18)`, `False`, [`True`, `22`, `An error`], `age > 18 is True, and not reverses it.`, `age = 22
print(not age > 18)`],
  [`What is True and False?`, `False`, [`True`, `None`, `An error`], `and needs both sides to be True.`, `print(True and False)`],
  [`What is False or False?`, `False`, [`True`, `None`, `An error`], `or needs at least one True side.`, `print(False or False)`],
  [`What does print("Apple" == "apple") show?`, `False`, [`True`, `apple`, `An error`], `String comparison is case-sensitive.`, `print("Apple" == "apple")`],
  [`What does print("a" < "b") show?`, `True`, [`False`, `a`, `An error`], `Strings are compared letter by letter, and a comes before b.`, `print("a" < "b")`],
  [`What does print(5 + 3 > 7 and 10 % 3 == 1) show?`, `True`, [`False`, `8`, `An error`], `5 + 3 > 7 is True, and 10 % 3 is 1, so both parts are True.`, `print(5 + 3 > 7 and 10 % 3 == 1)`],
  [`Which operator has the lowest precedence?`, `or`, [`and`, `not`, `**`], `The order from high to low is brackets, **, * / // %, + -, comparisons, not, and, or.`],
  [`What is printed?

x = None
print(x is None)`, `True`, [`False`, `None`, `An error`], `is None checks whether the value is None.`, `x = None
print(x is None)`],
]
