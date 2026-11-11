// Session 11: Functions
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a function?`, `A named block of code that can be run again and again`, [`A kind of variable that stores text`, `A loop that never ends`, `A comment in the code`], `You define it once and call it whenever you need it.`],
  [`Which keyword defines a function?`, `def`, [`func`, `function`, `define`], `A function starts with def.`],
  [`What does a function definition need after the brackets?`, `A colon and an indented body`, [`A semicolon`, `A closing word like end`, `Nothing`], `The colon starts the body, which is indented.`],
  [`Does this code run the print?

def greet():
    print("Hi")`, `No, it only defines the function`, [`Yes, immediately`, `Yes, but twice`, `Only if there is a return`], `The body runs only when the function is called.`],
  [`How do you call a function named greet?`, `greet()`, [`greet`, `call greet`, `def greet`], `The brackets run it. Without them you only name the function.`],
  [`What does print(type(greet)) show for a function greet?`, `<class 'function'>`, [`<class 'str'>`, `<class 'NoneType'>`, `<class 'tuple'>`], `A function is an object of type function.`, `def greet():
    pass
print(type(greet))`],
  [`In def greet(name):, what is name?`, `A parameter`, [`An argument`, `A return value`, `A keyword`], `A parameter is the name inside the brackets of def.`],
  [`In greet("Aman"), what is "Aman"?`, `An argument`, [`A parameter`, `A return value`, `A keyword`], `An argument is the real value passed in the call.`],
  [`What is printed?

def add(a, b):
    print(a + b)
add(3, 4)`, `7`, [`34`, `a + b`, `None`], `3 goes to a and 4 goes to b.`, `def add(a, b):
    print(a + b)
add(3, 4)`],
  [`What error appears for add(3) when def add(a, b) needs two arguments?`, `TypeError`, [`NameError`, `ValueError`, `IndexError`], `A required argument is missing.`],
  [`How are arguments matched to parameters by default?`, `By position`, [`By name only`, `By alphabetical order`, `By their type`], `The first argument goes to the first parameter.`],
  [`What does return do?`, `Sends a value back and ends the function`, [`Prints a value on the screen`, `Repeats the function`, `Deletes the function`], `The value goes back to where the function was called.`],
  [`What is printed?

def square(n):
    return n * n
print(square(7))`, `49`, [`14`, `7`, `None`], `7 times 7 is 49.`, `def square(n):
    return n * n
print(square(7))`],
  [`What is printed?

def square(n):
    return n * n
print(square(3) + square(4))`, `25`, [`49`, `7`, `14`], `9 + 16 is 25.`, `def square(n):
    return n * n
print(square(3) + square(4))`],
  [`What does a function give back when it has no return?`, `None`, [`0`, `An empty string`, `An error`], `Every function gives back something, and without return it is None.`],
  [`What does the last line print?

def show(n):
    print(n * 2)

b = show(5)
print(b)`, `None`, [`10`, `5`, `An error`], `show() prints 10 but returns nothing, so b is None.`],
  [`What is the difference between print and return?`, `print only shows a value, return gives it back so it can be used`, [`They are exactly the same`, `return shows a value, print gives it back`, `print ends the function`], `A returned value can be stored and used in more maths.`],
  [`Why is show_double(5) + 1 an error when show_double only prints?`, `It returns None, and None + 1 does not work`, [`print cannot take numbers`, `5 is the wrong type`, `Functions cannot be used in maths`], `You need return to get the value out.`],
  [`What happens to code written after a return line in a function?`, `It never runs`, [`It runs before the return`, `It runs after the program ends`, `It gives an error`], `return ends the function immediately.`],
  [`What is printed?

def sign(n):
    if n > 0:
        return "positive"
    elif n < 0:
        return "negative"
    return "zero"
print(sign(0))`, `zero`, [`positive`, `negative`, `None`], `Neither condition is true, so the last return runs.`, `def sign(n):
    if n > 0:
        return "positive"
    elif n < 0:
        return "negative"
    return "zero"
print(sign(0))`],
  [`What type does return min(nums), max(nums) give back?`, `A tuple`, [`A list`, `Two separate values`, `A set`], `Several values separated by commas make one tuple.`],
  [`What is low after low, high = min_max([4, 9, 2, 7]) when min_max returns min(nums), max(nums)?`, `2`, [`9`, `4`, `(2, 9)`], `The returned tuple is unpacked into low and high.`, `def min_max(nums):
    return min(nums), max(nums)
low, high = min_max([4, 9, 2, 7])
print(low)`],
  [`What is printed?

def is_even(n):
    return n % 2 == 0
print(is_even(7))`, `False`, [`True`, `1`, `None`], `7 % 2 is 1, so the comparison is False.`, `def is_even(n):
    return n % 2 == 0
print(is_even(7))`],
  [`What is printed?

def greet(name, greeting="Hello"):
    return greeting + ", " + name
print(greet("Aman"))`, `Hello, Aman`, [`Aman, Hello`, `Hello Aman`, `An error`], `The default greeting is used.`, `def greet(name, greeting="Hello"):
    return greeting + ", " + name
print(greet("Aman"))`],
  [`What is printed?

def power(base, exponent=2):
    return base ** exponent
print(power(5))`, `25`, [`10`, `5`, `32`], `The default exponent is 2.`, `def power(base, exponent=2):
    return base ** exponent
print(power(5))`],
  [`What is printed?

def power(base, exponent=2):
    return base ** exponent
print(power(exponent=3, base=2))`, `8`, [`9`, `6`, `An error`], `Keyword arguments can come in any order. 2 to the power 3 is 8.`, `def power(base, exponent=2):
    return base ** exponent
print(power(exponent=3, base=2))`],
  [`Which definition is a mistake?`, `def f(a=1, b):`, [`def f(a, b=1):`, `def f(a, b):`, `def f(a=1, b=2):`], `Parameters with a default must come after those without one.`],
  [`What is nums inside def total(*nums) when called as total(1, 2, 3)?`, `The tuple (1, 2, 3)`, [`The list [1, 2, 3]`, `The number 1`, `The number 6`], `The star collects the extra arguments into a tuple.`],
  [`What is printed?

def total(*nums):
    return sum(nums)
print(total())`, `0`, [`None`, `An error`, `An empty tuple`], `With no arguments nums is empty, and sum of nothing is 0.`, `def total(*nums):
    return sum(nums)
print(total())`],
  [`What is a docstring?`, `A string on the first line of a function that describes it`, [`A string that is printed when the function runs`, `A comment that Python ignores completely`, `A kind of parameter`], `You can read it with function.__doc__.`],
  [`What is a local variable?`, `A variable made inside a function`, [`A variable made outside all functions`, `A variable with a short name`, `A variable that cannot change`], `It exists only while the function runs.`],
  [`What error appears when you print a local variable outside its function?`, `NameError`, [`TypeError`, `ValueError`, `KeyError`], `Outside the function that name does not exist.`],
  [`Can a function read a global variable without any special keyword?`, `Yes`, [`No, it needs the global keyword`, `Only if it is a number`, `Only if it is a parameter`], `Reading works. The global keyword is only needed to change it.`],
  [`What is printed?

x = 10
def change():
    x = 99
change()
print(x)`, `10`, [`99`, `None`, `An error`], `Assigning inside the function makes a new local x, and the global stays 10.`, `x = 10
def change():
    x = 99
change()
print(x)`],
  [`What does the global keyword do inside a function?`, `Lets the function change a global variable`, [`Makes the function run faster`, `Makes a variable a constant`, `Imports a module`], `Without it, assigning makes a new local variable.`],
  [`What is printed?

count = 0
def add_one():
    global count
    count += 1
add_one()
add_one()
print(count)`, `2`, [`0`, `1`, `An error`], `Each call adds one to the global.`, `count = 0
def add_one():
    global count
    count += 1
add_one()
add_one()
print(count)`],
  [`What is the better habit than using global?`, `Pass values in as arguments and send results out with return`, [`Use more global variables`, `Avoid writing functions`, `Use longer names`], `That keeps functions easy to understand and test.`],
  [`What is printed?

def add_item(items):
    items.append("new")
stuff = ["a", "b"]
add_item(stuff)
print(stuff)`, `['a', 'b', 'new']`, [`['a', 'b']`, `['new']`, `An error`], `The function gets the same list, so the change is visible outside.`, `def add_item(items):
    items.append("new")
stuff = ["a", "b"]
add_item(stuff)
print(stuff)`],
  [`What is printed?

def add_ten(n):
    n = n + 10
x = 5
add_ten(x)
print(x)`, `5`, [`15`, `None`, `An error`], `Numbers cannot be changed in place, so n is only a local change.`, `def add_ten(n):
    n = n + 10
x = 5
add_ten(x)
print(x)`],
  [`How do you stop a function changing your list?`, `Pass a copy, such as stuff.copy()`, [`Use return`, `Use a tuple name`, `You cannot stop it`], `The function then changes only the copy.`],
  [`What is printed?

def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
print(factorial(5))`, `120`, [`24`, `5`, `15`], `5 * 4 * 3 * 2 * 1 is 120.`, `def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
print(factorial(5))`],
  [`What is recursion?`, `A function that calls itself`, [`A loop that never stops`, `A function with no parameters`, `A function inside a loop`], `It needs a stopping case, or it never ends.`],
  [`What does isdigit() check in "123".isdigit()?`, `That the text has only digits`, [`That the text is a float`, `That the text is a list`, `That the text is positive`], `It gives True for "123" and False for "12a".`],
  [`Why does read_number use a while True loop with return?`, `It keeps asking until the input is valid, then return ends the loop and the function`, [`It asks exactly three times`, `It stops at the first input`, `It converts text to float`], `return leaves both the loop and the function.`],
  [`Why did the marks manager get easier to read with functions?`, `Each job has a name and the main code is short`, [`Functions make programs run faster`, `Functions remove the need for dictionaries`, `Functions make the file smaller by half`], `Functions give names to jobs.`],
  [`What is printed?

def double(n):
    n * 2
print(double(4))`, `None`, [`8`, `4`, `An error`], `The function calculates n * 2 but never returns it.`, `def double(n):
    n * 2
print(double(4))`],
  [`What is printed?

def f(a, b=2):
    return a * b
print(f(f(2)))`, `8`, [`4`, `6`, `2`], `f(2) is 4, and f(4) is 8.`, `def f(a, b=2):
    return a * b
print(f(f(2)))`],
]
