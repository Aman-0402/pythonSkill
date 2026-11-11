// Session 8: Tuples and Sets
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a tuple in Python?`, `An ordered collection in round brackets that cannot be changed`, [`An ordered collection in square brackets that can be changed`, `A collection of unique items with no order`, `A block of text inside quotes`], `A tuple looks like a list but is immutable.`],
  [`Which of these is a tuple?`, `(10, 20, 30)`, [`[10, 20, 30]`, `{10, 20, 30}`, `"10, 20, 30"`], `Tuples use round brackets.`],
  [`What does type((3, 4)) show?`, `<class 'tuple'>`, [`<class 'list'>`, `<class 'set'>`, `<class 'int'>`], `Round brackets with commas make a tuple.`, `print(type((3, 4)))`],
  [`What is the type of (5)?`, `int`, [`tuple`, `list`, `str`], `Brackets alone do not make a tuple. The comma does, so (5,) is the tuple.`, `print(type((5)).__name__)`],
  [`What is the type of (5,)?`, `tuple`, [`int`, `list`, `set`], `The trailing comma makes it a one-item tuple.`, `print(type((5,)).__name__)`],
  [`What does tuple("abc") give?`, `('a', 'b', 'c')`, [`('abc',)`, `['a', 'b', 'c']`, `{'a', 'b', 'c'}`], `tuple() turns the characters of a string into separate items.`, `print(tuple("abc"))`],
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

t = (1, [2, 3])
t[1].append(4)
print(t)`, `(1, [2, 3, 4])`, [`(1, [2, 3])`, `An error`, `(1, 2, 3, 4)`], `The tuple keeps the same list, and the list itself can still change.`, `t = (1, [2, 3])
t[1].append(4)
print(t)`],
  [`What does (1, 2) + (3, 4) give?`, `(1, 2, 3, 4)`, [`(4, 6)`, `((1, 2), (3, 4))`, `[1, 2, 3, 4]`], `+ joins two tuples into a new one.`, `print((1, 2) + (3, 4))`],
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
  [`What are first and rest after this line?

first, *rest = (1, 2, 3, 4)`, `1 and [2, 3, 4]`, [`1 and (2, 3, 4)`, `1 and 2`, `(1, 2, 3, 4) and []`], `The starred variable collects the extra items into a list.`, `first, *rest = (1, 2, 3, 4)
print(first, "and", rest)`],
  [`What is mid after this line?

a, *mid, z = (1, 2, 3, 4, 5)`, `[2, 3, 4]`, [`(2, 3, 4)`, `[1, 5]`, `2`], `The star takes everything between the first and the last.`, `a, *mid, z = (1, 2, 3, 4, 5)
print(mid)`],
  [`How many starred variables are allowed in one unpacking?`, `Only one`, [`As many as you like`, `Two`, `None`], `With two stars Python could not tell how to split the items.`],
  [`What type does min_max give back?

def min_max(nums):
    return min(nums), max(nums)`, `tuple`, [`list`, `set`, `Two separate values`], `Returning several values with commas returns one tuple.`, `def f(nums):
    return min(nums), max(nums)
print(type(f([1, 2])).__name__)`],
  [`What is printed?

for i, ch in enumerate("ab"):
    print(i, ch)`, `0 a 1 b`, [`a b`, `0 1`, `1 a 2 b`], `enumerate gives (index, item) tuples, and the loop unpacks them.`, `print(" ".join(f"{i} {ch}" for i, ch in enumerate("ab")))`],
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
  [`What happens here?

s = {[1, 2], 3}`, `TypeError, a list cannot go inside a set`, [`A set with a list and 3`, `The list is removed`, `NameError`], `Set items must be immutable, so a tuple (1, 2) is fine but a list is not.`],
  [`What is printed? print(2 in {1, 2, 3})`, `True`, [`False`, `2`, `An error`], `in checks membership, and it is very fast for sets.`, `print(2 in {1, 2, 3})`],
  [`What is the difference between remove() and discard()?`, `remove() gives an error if the item is missing, discard() does not`, [`discard() gives an error if the item is missing, remove() does not`, `They are exactly the same`, `remove() removes all items`], `Use discard() when you are not sure the item is in the set.`],
  [`What is printed?

s = {1, 2}
s.add(3)
s.add(2)
print(s)`, `{1, 2, 3}`, [`{1, 2, 3, 2}`, `{1, 2}`, `{3}`], `Adding an item that is already there changes nothing.`, `s = {1, 2}
s.add(3)
s.add(2)
print(s)`],
  [`What does {1, 2, 3, 4} | {3, 4, 5, 6} give?`, `{1, 2, 3, 4, 5, 6}`, [`{3, 4}`, `{1, 2}`, `{1, 2, 5, 6}`], `| is union, everything in either set.`, `print({1, 2, 3, 4} | {3, 4, 5, 6})`],
  [`What does {1, 2, 3, 4} & {3, 4, 5, 6} give?`, `{3, 4}`, [`{1, 2, 3, 4, 5, 6}`, `{1, 2}`, `{1, 2, 5, 6}`], `& is intersection, only what is in both.`, `print({1, 2, 3, 4} & {3, 4, 5, 6})`],
  [`What does {1, 2, 3, 4} - {3, 4, 5, 6} give?`, `{1, 2}`, [`{5, 6}`, `{3, 4}`, `{1, 2, 5, 6}`], `- is difference, in the first set but not in the second.`, `print({1, 2, 3, 4} - {3, 4, 5, 6})`],
  [`What does {1, 2, 3, 4} ^ {3, 4, 5, 6} give?`, `{1, 2, 5, 6}`, [`{3, 4}`, `{1, 2, 3, 4, 5, 6}`, `{1, 2}`], `^ is symmetric difference, in one set but not in both.`, `print({1, 2, 3, 4} ^ {3, 4, 5, 6})`],
  [`What does {1, 2} <= {1, 2, 3} check?`, `Whether the first set is a subset of the second`, [`Whether they have nothing in common`, `Whether the first set is bigger`, `Whether they are equal`], `<= is the same as issubset().`],
  [`What does {1, 2}.isdisjoint({3, 4}) give?`, `True`, [`False`, `{}`, `An error`], `The two sets have nothing in common, so they are disjoint.`, `print({1, 2}.isdisjoint({3, 4}))`],
  [`What does a |= {4} do to the set a?`, `Adds 4 to a in place`, [`Makes a new set and leaves a alone`, `Removes 4 from a`, `Gives an error`], `|= is the in-place union.`],
  [`What is a frozenset?`, `An immutable set`, [`A set with no items`, `A set that keeps its order`, `A list of sets`], `It cannot be changed, so add() gives an error.`],
  [`What is printed?

a = [1, 2, 3, 3]
b = [3, 4, 5]
print(sorted(set(a) & set(b)))`, `[3]`, [`[3, 3]`, `[1, 2, 3, 4, 5]`, `[1, 2]`], `The only common item is 3.`, `a = [1, 2, 3, 3]
b = [3, 4, 5]
print(sorted(set(a) & set(b)))`],
  [`Which one is the best to remove duplicates from a list?`, `Convert it to a set`, [`Convert it to a tuple`, `Use append()`, `Use sorted() alone`], `A set keeps only unique items. Use sorted() on the result if you need an order.`],
  [`Which collection is best for checking quickly whether an item is present?`, `A set`, [`A tuple`, `A list`, `A string`], `Membership checks on a set are very fast.`],
  [`Which collections keep the order of their items?`, `Lists and tuples`, [`Sets and tuples`, `Lists and sets`, `Only lists`], `Sets have no order.`],
  [`True or false: a tuple can never contain a list.`, `False`, [`True`], `A tuple can hold a list. The list can still change, but the tuple keeps the same list.`],
  [`True or false: a set can contain a tuple such as (1, 2).`, `True`, [`False`], `A tuple is immutable, so it is allowed inside a set.`],
]
