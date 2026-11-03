// Session 12: Advanced Functions
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a default argument?`, `A value a parameter uses when the caller leaves it out`, [`A value that cannot be changed`, `The first argument of every function`, `A value that is always printed`], `A parameter with a default becomes optional.`],
  [`What does welcome("Aman") give for def welcome(name, greeting="Hello"): return greeting + ", " + name?`, `Hello, Aman`, [`Aman, Hello`, `Hello Aman`, `An error`], `The default greeting is used.`, `def welcome(name, greeting="Hello"):
    return greeting + ", " + name
print(welcome("Aman"))`],
  [`Which definition is correct?`, `def f(a, b=1):`, [`def f(a=1, b):`, `def f(=1, b):`, `def f(a, b=):`], `Parameters with a default must come after those without one.`],
  [`When is a default value created?`, `Once, when the function is defined`, [`Every time the function is called`, `Only when the caller gives it`, `When the program ends`], `That is why a list used as a default is shared by every call.`],
  [`What do the three calls print for def add_item(item, items=[]): items.append(item); return items, calling add_item("a"), add_item("b"), add_item("c")?`, `['a'] then ['a', 'b'] then ['a', 'b', 'c']`, [`['a'] then ['b'] then ['c']`, `Three empty lists`, `An error`], `The same default list is shared, so it keeps growing.`],
  [`What is the safe default for a parameter that should start as an empty list?`, `None, then make the list inside the function`, [`[] written in the definition`, `{}`, `0`], `Use items=None and write: if items is None: items = [].`],
  [`What does book(author="Ankit", title="Data Tricks") show the benefit of?`, `The order of keyword arguments does not matter`, [`Keyword arguments must be in order`, `Parameters must be strings`, `The function runs faster`], `Named arguments are matched by name, not by position.`],
  [`Which call is a SyntaxError for def book(title, author)?`, `book(title="Python", "Aman")`, [`book("Python", author="Aman")`, `book(author="Aman", title="Python")`, `book("Python", "Aman")`], `A positional argument cannot follow a keyword argument.`],
  [`What is args inside def total(*args) when called as total(1, 2, 3)?`, `The tuple (1, 2, 3)`, [`The list [1, 2, 3]`, `The number 6`, `The dictionary {1, 2, 3}`], `A single star collects extra positional arguments into a tuple.`],
  [`What does total(10, 20, 30, 40) give for def total(*args): return sum(args)?`, `100`, [`10`, `40`, `An error`], `All four arguments are collected and added.`, `def total(*args):
    return sum(args)
print(total(10, 20, 30, 40))`],
  [`What is others in show(1, 2, 3) for def show(first, *others)?`, `(2, 3)`, [`(1, 2, 3)`, `[2, 3]`, `2`], `first takes 1 and others collects the rest into a tuple.`, `def show(first, *others):
    return others
print(show(1, 2, 3))`],
  [`What is kwargs inside def profile(**kwargs) when called as profile(name="Aman", age=20)?`, `{'name': 'Aman', 'age': 20}`, [`('Aman', 20)`, `['name', 'age']`, `Nothing, it is an error`], `A double star collects extra keyword arguments into a dictionary.`, `def profile(**kwargs):
    return kwargs
print(profile(name="Aman", age=20))`],
  [`In what order are parameters written in a definition?`, `Normal parameters, then *args, then **kwargs`, [`**kwargs, then *args, then normal parameters`, `*args, then normal parameters, then **kwargs`, `Any order`], `For example def demo(a, b=2, *args, **kwargs).`],
  [`What does demo(1, 5, 6, 7, x=10) show for args in def demo(a, b=2, *args, **kwargs)?`, `(6, 7)`, [`(1, 5, 6, 7)`, `(5, 6, 7)`, `[6, 7]`], `1 goes to a and 5 goes to b, so 6 and 7 are left for args.`, `def demo(a, b=2, *args, **kwargs):
    return args
print(demo(1, 5, 6, 7, x=10))`],
  [`What does volume(*[2, 3, 4]) do for def volume(length, width, height)?`, `Passes 2, 3 and 4 as three arguments`, [`Passes one list argument`, `Gives an error`, `Multiplies the list by itself`], `The star in a call spreads the list into separate arguments.`],
  [`What does volume(**{"length": 5, "width": 2, "height": 3}) do?`, `Passes the dictionary items as keyword arguments`, [`Passes the dictionary as one argument`, `Gives an error`, `Passes only the keys`], `The double star in a call spreads a dictionary into keyword arguments.`],
  [`What does print(*[5, 1, 9]) show?`, `5 1 9`, [`[5, 1, 9]`, `(5, 1, 9)`, `5, 1, 9`], `The star spreads the items, so print gets three arguments.`, `print(*[5, 1, 9])`],
  [`What does {**{"a": 1}, **{"b": 2}} give?`, `{'a': 1, 'b': 2}`, [`{'a': 1}`, `[{'a': 1}, {'b': 2}]`, `An error`], `The double stars merge two dictionaries.`, `print({**{"a": 1}, **{"b": 2}})`],
  [`How can a parameter be made keyword-only?`, `Write it after *args or after a bare *`, [`Write it before the first parameter`, `Give it a default of None`, `Write it in capital letters`], `For example def connect(host, *, port=80).`],
  [`What error appears for connect("example.com", 443) when def connect(host, *, port=80)?`, `TypeError`, [`NameError`, `SyntaxError`, `ValueError`], `port can only be given by name, as port=443.`],
  [`Can a function be stored in a variable?`, `Yes, a function is a value like any other`, [`No, only numbers and strings can`, `Only lambda functions can`, `Only built-in functions can`], `say = shout makes say another name for the same function.`],
  [`Why do we write apply(shout, "hi") and not apply(shout(), "hi")?`, `shout() would call it right away, but we want to pass the function itself`, [`The brackets are not allowed in a call`, `apply needs a string`, `shout() would return a function`], `Without brackets you pass the function, and with brackets you pass its result.`],
  [`What does apply(len, "python") give for def apply(func, value): return func(value)?`, `6`, [`python`, `len`, `An error`], `func is len, so func("python") is len("python").`, `def apply(func, value):
    return func(value)
print(apply(len, "python"))`],
  [`What is a lambda?`, `A small nameless function written in one line`, [`A kind of loop`, `A way to import a module`, `A function that cannot take arguments`], `The pattern is lambda parameters: expression.`],
  [`What does (lambda n: n * n)(6) give?`, `36`, [`6`, `12`, `lambda`], `The lambda squares its argument.`, `print((lambda n: n * n)(6))`],
  [`What does sorted(["banana", "kiwi", "apple", "fig"], key=len) give?`, `['fig', 'kiwi', 'apple', 'banana']`, [`['apple', 'banana', 'fig', 'kiwi']`, `['banana', 'apple', 'kiwi', 'fig']`, `[3, 4, 5, 6]`], `key=len sorts by the length of each word.`, `print(sorted(["banana", "kiwi", "apple", "fig"], key=len))`],
  [`What does max(["banana", "kiwi", "fig"], key=len) give?`, `banana`, [`kiwi`, `fig`, `6`], `banana is the longest word.`, `print(max(["banana", "kiwi", "fig"], key=len))`],
  [`What does sorted(students, key=lambda s: s[1], reverse=True) do for a list of (name, marks) tuples?`, `Sorts by marks, highest first`, [`Sorts by name`, `Sorts by marks, lowest first`, `Reverses the tuples`], `s[1] is the marks and reverse=True puts the biggest first.`],
  [`What does map(function, items) do?`, `Applies the function to every item`, [`Keeps only some items`, `Sorts the items`, `Adds all the items`], `map gives the result of the function for each item.`],
  [`What does list(map(lambda n: n * n, [1, 2, 3, 4])) give?`, `[1, 4, 9, 16]`, [`[2, 4, 6, 8]`, `30`, `[1, 2, 3, 4]`], `Each number is squared.`, `print(list(map(lambda n: n * n, [1, 2, 3, 4])))`],
  [`What does list(map(str, [1, 2, 3])) give?`, `['1', '2', '3']`, [`[1, 2, 3]`, `'123'`, `An error`], `str is applied to every item.`, `print(list(map(str, [1, 2, 3])))`],
  [`What does list(map(lambda x, y: x + y, [1, 2, 3], [10, 20, 30])) give?`, `[11, 22, 33]`, [`[1, 2, 3, 10, 20, 30]`, `[11, 22]`, `66`], `map takes one item from each list at a time.`, `print(list(map(lambda x, y: x + y, [1, 2, 3], [10, 20, 30])))`],
  [`Why is list() put around map(...)?`, `map gives a map object, and list() shows its values`, [`map needs it to run`, `list() sorts the result`, `It is only a habit`], `Printing map(...) shows an object, not the values.`],
  [`What does filter(function, items) do?`, `Keeps only the items for which the function is True`, [`Changes every item`, `Removes the first item`, `Counts the items`], `The function must answer True or False for each item.`],
  [`What does list(filter(lambda n: n % 2 == 0, [1, 2, 3, 4, 5, 6])) give?`, `[2, 4, 6]`, [`[1, 3, 5]`, `[1, 2, 3, 4, 5, 6]`, `[True, False]`], `It keeps the even numbers.`, `print(list(filter(lambda n: n % 2 == 0, [1, 2, 3, 4, 5, 6])))`],
  [`What does list(filter(None, ["apple", "", "kiwi", ""])) give?`, `['apple', 'kiwi']`, [`['', '']`, `['apple', '', 'kiwi', '']`, `An error`], `filter(None, items) removes every falsy item, such as an empty string.`, `print(list(filter(None, ["apple", "", "kiwi", ""])))`],
  [`What does list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, [1, 2, 3, 4, 5, 6]))) give?`, `[4, 16, 36]`, [`[1, 9, 25]`, `[1, 4, 9, 16, 25, 36]`, `[2, 4, 6]`], `It filters the even numbers first, then squares them.`, `print(list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, [1, 2, 3, 4, 5, 6]))))`],
  [`Which list comprehension does the same as filter(lambda n: n > 3, nums)?`, `[n for n in nums if n > 3]`, [`[n > 3 for n in nums]`, `[n * 3 for n in nums]`, `[n for n in nums] > 3`], `A comprehension with if keeps the matching items.`],
  [`Which comprehension does the same as map(f, items)?`, `[f(x) for x in items]`, [`[x for x in items if f(x)]`, `[f for x in items]`, `f(items)`], `It applies f to every item.`],
  [`What does dict(zip(["Aman", "Ankit"], [85, 92])) give?`, `{'Aman': 85, 'Ankit': 92}`, [`[('Aman', 85), ('Ankit', 92)]`, `{'Aman', 'Ankit', 85, 92}`, `An error`], `zip pairs the items up, and dict() turns the pairs into a dictionary.`, `print(dict(zip(["Aman", "Ankit"], [85, 92])))`],
  [`What does reduce(lambda a, b: a + b, [1, 2, 3, 4, 5]) give?`, `15`, [`5`, `120`, `[1, 2, 3, 4, 5]`], `reduce combines the items into one value, here their sum.`, `from functools import reduce
print(reduce(lambda a, b: a + b, [1, 2, 3, 4, 5]))`],
  [`What is double(5) after double = make_multiplier(2), with def make_multiplier(n): return lambda x: x * n?`, `10`, [`2`, `5`, `7`], `make_multiplier(2) returns a function that multiplies by 2.`, `def make_multiplier(n):
    return lambda x: x * n
double = make_multiplier(2)
print(double(5))`],
  [`What is wrong with map(f(), items)?`, `f() calls the function, but map needs the function itself`, [`Nothing, it is correct`, `map needs a lambda`, `items must be a tuple`], `Write map(f, items), without brackets after f.`],
]
