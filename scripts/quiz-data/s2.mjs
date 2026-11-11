// Session 2: Variables and Data Types
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]
export default [
  [`What is a variable?`, `A named container that stores a value in memory`, [`A fixed number that can never change`, `A kind of loop`, `A comment in the code`], `A variable has a name (the label) and a value (the thing inside), like a labelled box.`],
  [`What does the = sign mean in Python?`, `Store the right side in the left side (assignment)`, [`Both sides are equal, as in maths`, `Compare two values`, `Add two values`], `= is the assignment operator. To compare values you use ==.`],
  [`What is printed?

age = 25
age = 26
print(age)`, `26`, [`25`, `51`, `An error`], `A variable can be changed at any time. The newest value replaces the old one.`, `age = 25
age = 26
print(age)`],
  [`What is printed?

a, b, c = 1, 2, 3
print(b)`, `2`, [`1`, `3`, `(1, 2, 3)`], `Each name gets the value in the same position: a is 1, b is 2 and c is 3.`, `a, b, c = 1, 2, 3
print(b)`],
  [`What is printed?

x = y = 0
print(x + y)`, `0`, [`1`, `00`, `An error`], `x = y = 0 gives both variables the value 0.`, `x = y = 0
print(x + y)`],
  [`Which of these is a valid variable name?`, `student_name`, [`1student`, `my name`, `total-marks`], `Names cannot start with a digit, and cannot contain spaces or hyphens.`],
  [`Which of these is NOT a valid variable name?`, `class`, [`marks2`, `_count`, `Age`], `class is a keyword, so it cannot be used as a variable name.`],
  [`A variable name must start with...`, `A letter or an underscore`, [`A digit`, `A space`, `A hyphen`], `After the first character it can also contain digits.`],
  [`Are the variables Name and name the same in Python?`, `No, Python is case-sensitive`, [`Yes, case does not matter`, `Yes, but only inside functions`, `No, but only for numbers`], `Name and name are two different variables.`],
  [`Which naming style is recommended for Python variables?`, `snake_case, such as total_marks`, [`Spaces between words`, `Hyphens between words`, `All digits`], `Use snake_case and give meaningful names, for example price, not p.`],
  [`What is the data type of the value 10?`, `int`, [`float`, `str`, `bool`], `Whole numbers are int.`, `print(type(10).__name__)`],
  [`What is the data type of the value 3.0?`, `float`, [`int`, `str`, `bool`], `Any number with a decimal point is a float, even 3.0.`, `print(type(3.0).__name__)`],
  [`What is the data type of the value "3.14" (with quotes)?`, `str`, [`float`, `int`, `bool`], `Anything inside quotes is text (str), even if it looks like a number.`, `print(type("3.14").__name__)`],
  [`What is the data type of True?`, `bool`, [`str`, `int only`, `NoneType`], `True and False are bool values.`, `print(type(True).__name__)`],
  [`What is the data type of None?`, `NoneType`, [`bool`, `str`, `int`], `None means no value, and its type is NoneType.`, `print(type(None).__name__)`],
  [`Which one is written correctly as a Python boolean?`, `True`, [`true`, `TRUE`, `yes`], `True and False start with a capital letter.`],
  [`Which function tells you the type of a value?`, `type()`, [`kind()`, `typeof()`, `class()`], `type(10) shows the type of 10.`],
  [`What is printed?

x = 5
x = "five"
print(type(x).__name__)`, `str`, [`int`, `float`, `An error`], `Python is dynamically typed, so one variable can hold different types at different times.`, `x = 5
x = "five"
print(type(x).__name__)`],
  [`What type of value does input() always return?`, `A string (str)`, [`An integer`, `A float`, `A boolean`], `Even if the user types 5, input() gives the text "5". Convert it with int() or float() when you need a number.`],
  [`What does int("5") + 5 give?`, `10`, [`55`, `"10"`, `An error`], `int("5") turns the text into the number 5, so the sum is 10.`, `print(int("5") + 5)`],
  [`What does "5" + "5" give?`, `55`, [`10`, `"10"`, `An error`], `+ joins two strings together, so the result is the text 55.`, `print("5" + "5")`],
  [`What error does print("5" + 5) cause?`, `TypeError`, [`NameError`, `SyntaxError`, `No error, it prints 10`], `Text and numbers cannot be added. Use int("5") + 5 or "5" + str(5).`],
  [`What does int(9.99) give?`, `9`, [`10`, `9.99`, `9.0`], `int() truncates: it cuts off the decimals and does not round.`, `print(int(9.99))`],
  [`What does float(7) give?`, `7.0`, [`7`, `"7"`, `0.7`], `float() converts a whole number into a decimal number.`, `print(float(7))`],
  [`What is the type of str(100)?`, `str`, [`int`, `float`, `bool`], `str() turns a value into text, so str(100) is the text "100".`, `print(type(str(100)).__name__)`],
  [`What does bool(0) give?`, `False`, [`True`, `0`, `None`], `0, an empty string and None are False. Everything else is True.`, `print(bool(0))`],
  [`What does bool("hi") give?`, `True`, [`False`, `"hi"`, `An error`], `Any non-empty string is True.`, `print(bool("hi"))`],
  [`What does print(10 // 3) show?`, `3`, [`3.3333333333333335`, `1`, `4`], `// is floor division.`, `print(10 // 3)`],
  [`What does print(4 / 2) show?`, `2.0`, [`2`, `"2"`, `0.5`], `/ always returns a float, even when the answer is a whole number.`, `print(4 / 2)`],
  [`What is printed?

x = 10
x += 5
x *= 2
print(x)`, `30`, [`25`, `20`, `15`], `x += 5 makes it 15, and then x *= 2 makes it 30.`, `x = 10
x += 5
x *= 2
print(x)`],
  [`What does print(2 + 3 * 4) show?`, `14`, [`20`, `24`, `9`], `Multiplication comes before addition: 3 * 4 is 12, plus 2 is 14.`, `print(2 + 3 * 4)`],
  [`What does print((2 + 3) * 4) show?`, `20`, [`14`, `24`, `9`], `Brackets come first: 2 + 3 is 5, times 4 is 20.`, `print((2 + 3) * 4)`],
  [`What is the correct order of operator precedence from highest to lowest?`, `Brackets, then **, then * / // %, then + -`, [`+ -, then * / // %, then **, then brackets`, `** first, then brackets, then + -, then * /`, `* / first, then brackets, then ** , then + -`], `Brackets are first. The power operator ** comes next, then multiplication, division, floor division and remainder, and last addition and subtraction.`],
  [`Which line prints Age: 25 without an error?`, `print("Age: " + str(25))`, [`print("Age: " + 25)`, `print(Age: 25)`, `print("Age:" ++ 25)`], `Mixing a string and a number with + needs str(). A comma in print() works without it: print("Age:", 25).`],
  [`What is printed?

a, b = 1, 2
a, b = b, a
print(a, b)`, `2 1`, [`1 2`, `1 1`, `2 2`], `a, b = b, a swaps the two values without a third variable.`, `a, b = 1, 2
a, b = b, a
print(a, b)`],
  [`What is printed?

a, b = 10, 3
print(a ** b)`, `1000`, [`30`, `13`, `100`], `** is power: 10 to the power 3 is 1000.`, `a, b = 10, 3
print(a ** b)`],
  [`True or false: a variable can be changed after it is created.`, `True`, [`False`], `A variable can be changed at any time by assigning a new value.`],
]
