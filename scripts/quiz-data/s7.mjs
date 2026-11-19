// Session 7: Tuples and Sets
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a tuple in Python?`, `An ordered collection in round brackets that cannot be changed`, [`An ordered collection in square brackets that can be changed`, `A collection of unique items with no order`, `A block of text inside quotes`], `A tuple looks like a list but is immutable.`],
  [`Which of these is a tuple?`, `(10, 20, 30)`, [`[10, 20, 30]`, `{10, 20, 30}`, `"10, 20, 30"`], `Tuples use round brackets.`],
  [`What does type((3, 4)) show?`, `<class 'tuple'>`, [`<class 'list'>`, `<class 'set'>`, `<class 'int'>`], `Round brackets with commas make a tuple.`, `print(type((3, 4)))`],
  [`What is the type of (5)?`, `int`, [`tuple`, `list`, `str`], `Brackets alone do not make a tuple. The comma does, so (5,) is the tuple.`, `print(type((5)).__name__)`],
  [`What is the type of (5,)?`, `tuple`, [`int`, `list`, `set`], `The trailing comma makes it a one-item tuple.`, `print(type((5,)).__name__)`],
  [`What does days[-1] give?

days = ("Mon", "Tue", "Wed", "Thu", "Fri")`, `Fri`, [`Mon`, `Thu`, `An error`], `-1 is the last item, as in lists.`, `days = ("Mon", "Tue", "Wed", "Thu", "Fri")
print(days[-1])`],
  [`What does days[1:3] give?

days = ("Mon", "Tue", "Wed", "Thu", "Fri")`, `('Tue', 'Wed')`, [`('Mon', 'Tue', 'Wed')`, `('Tue', 'Wed', 'Thu')`, `['Tue', 'Wed']`], `The stop index is not included, and slicing a tuple gives a tuple.`, `days = ("Mon", "Tue", "Wed", "Thu", "Fri")
print(days[1:3])`],
  [`What does (1, 2, 2, 3, 2).count(2) give?`, `3`, [`2`, `1`, `5`], `count() says how many times 2 appears.`, `print((1, 2, 2, 3, 2).count(2))`],
  [`What does (1, 2, 2, 3, 2).index(3) give?`, `3`, [`4`, `2`, `1`], `index() gives the position of the first match, and 3 is at index 3.`, `print((1, 2, 2, 3, 2).index(3))`],
  [`Which are the only two tuple methods?`, `count() and index()`, [`append() and remove()`, `add() and discard()`, `sort() and reverse()`], `A tuple cannot change, so it only has methods that read.`],
  [`What happens here?

t = (10, 20, 30)
t[0] = 99`, `TypeError`, [`t becomes (99, 20, 30)`, `IndexError`, `NameError`], `Tuples are immutable, so item assignment is not allowed.`],
  [`What happens here?

t = (10, 20, 30)
t.append(40)`, `AttributeError`, [`t becomes (10, 20, 30, 40)`, `TypeError`, `ValueError`], `A tuple has no append method.`],
  [`What does immutable mean?`, `It cannot be changed after it is created`, [`It cannot be printed`, `It can only hold numbers`, `It is stored in a file`], `Tuples, strings and numbers are immutable.`],
  [`What is printed?

t = (10, 20, 30)
t = t + (40,)
print(t)`, `(10, 20, 30, 40)`, [`(10, 20, 30, (40,))`, `(40, 10, 20, 30)`, `An error`], `You cannot change a tuple, but you can build a new one and reuse the name.`, `t = (10, 20, 30)
t = t + (40,)
print(t)`],
  [`What is printed?

x, y = (3, 4)
print(x + y)`, `7`, [`34`, `(3, 4)`, `An error`], `Unpacking puts 3 in x and 4 in y.`, `x, y = (3, 4)
print(x + y)`],
  [`What happens here?

a, b = (1, 2, 3)`, `ValueError`, [`a is 1 and b is 2`, `TypeError`, `a is 1 and b is (2, 3)`], `The number of variables must match the number of items.`],
  [`What is printed?

a, b = 1, 2
a, b = b, a
print(a, b)`, `2 1`, [`1 2`, `2 2`, `1 1`], `Python can swap two variables in one line, with no third variable.`, `a, b = 1, 2
a, b = b, a
print(a, b)`],
  [`What type does min_max give back?

def min_max(nums):
    return min(nums), max(nums)`, `tuple`, [`list`, `set`, `Two separate values`], `Returning several values with commas returns one tuple.`, `def f(nums):
    return min(nums), max(nums)
print(type(f([1, 2])).__name__)`],
  [`What is a set in Python?`, `A collection of unique items with no order`, [`An ordered collection that allows duplicates`, `A collection that cannot be changed`, `A block of text`], `Sets remove duplicates and have no order.`],
  [`Which of these is a set?`, `{1, 2, 3}`, [`[1, 2, 3]`, `(1, 2, 3)`, `"1, 2, 3"`], `Sets are written with curly brackets.`],
  [`What is printed?

s = {3, 1, 2, 3, 1}
print(len(s))`, `3`, [`5`, `2`, `6`], `The duplicates are removed, leaving 1, 2 and 3.`, `s = {3, 1, 2, 3, 1}
print(len(s))`],
  [`How do you make an empty set?`, `set()`, [`{}`, `[]`, `()`], `{} is an empty dictionary.`],
  [`What does sorted(set([5, 3, 5, 1, 3])) give?`, `[1, 3, 5]`, [`[5, 3, 5, 1, 3]`, `[1, 3, 3, 5, 5]`, `{1, 3, 5}`], `set() removes duplicates and sorted() puts the result in order, as a list.`, `print(sorted(set([5, 3, 5, 1, 3])))`],
  [`What happens here?

s = {1, 2, 3}
print(s[0])`, `TypeError`, [`1`, `IndexError`, `{1}`], `Sets have no order, so they cannot be indexed.`],
  [`What is printed? print(2 in {1, 2, 3})`, `True`, [`False`, `2`, `An error`], `in checks membership, and it is very fast for sets.`, `print(2 in {1, 2, 3})`],
  [`What is the difference between remove() and discard()?`, `remove() gives an error if the item is missing, discard() does not`, [`discard() gives an error if the item is missing, remove() does not`, `They are exactly the same`, `remove() removes all items`], `Use discard() when you are not sure the item is in the set.`],
  [`What does {1, 2, 3, 4} | {3, 4, 5, 6} give?`, `{1, 2, 3, 4, 5, 6}`, [`{3, 4}`, `{1, 2}`, `{1, 2, 5, 6}`], `| is union, everything in either set.`, `print({1, 2, 3, 4} | {3, 4, 5, 6})`],
  [`What does {1, 2, 3, 4} & {3, 4, 5, 6} give?`, `{3, 4}`, [`{1, 2, 3, 4, 5, 6}`, `{1, 2}`, `{1, 2, 5, 6}`], `& is intersection, only what is in both.`, `print({1, 2, 3, 4} & {3, 4, 5, 6})`],
  [`What does {1, 2, 3, 4} - {3, 4, 5, 6} give?`, `{1, 2}`, [`{5, 6}`, `{3, 4}`, `{1, 2, 5, 6}`], `- is difference, in the first set but not in the second.`, `print({1, 2, 3, 4} - {3, 4, 5, 6})`],
  [`Which one is the best to remove duplicates from a list?`, `Convert it to a set`, [`Convert it to a tuple`, `Use append()`, `Use sorted() alone`], `A set keeps only unique items. Use sorted() on the result if you need an order.`],
  [`Which collection is best for checking quickly whether an item is present?`, `A set`, [`A tuple`, `A list`, `A string`], `Membership checks on a set are very fast.`],
  [`Which collections keep the order of their items?`, `Lists and tuples`, [`Sets and tuples`, `Lists and sets`, `Only lists`], `Sets have no order.`],
]
