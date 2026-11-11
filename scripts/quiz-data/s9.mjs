// Session 9: Dictionaries
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a dictionary in Python?`, `A collection of key-value pairs`, [`An ordered list of numbers only`, `A collection of unique items with no keys`, `A block of text inside quotes`], `A dictionary stores values that you find by their keys.`],
  [`What does type({}) show?`, `<class 'dict'>`, [`<class 'set'>`, `<class 'list'>`, `<class 'tuple'>`], `Empty curly brackets make a dictionary, not a set.`, `print(type({}))`],
  [`How do you find a value in a dictionary?`, `By its key`, [`By its position number`, `By its length`, `By its type`], `A dictionary looks values up by key, a list by position.`],
  [`Which of these can NOT be a dictionary key?`, `A list`, [`A string`, `A number`, `A tuple`], `Keys must be immutable, and a list can change.`],
  [`What error appears here?

d = {[1, 2]: "x"}`, `TypeError`, [`KeyError`, `ValueError`, `NameError`], `A list is unhashable, so it cannot be a key.`],
  [`What is printed?

d = {"a": 1, "b": 2, "a": 3}
print(d)`, `{'a': 3, 'b': 2}`, [`{'a': 1, 'b': 2}`, `{'a': 1, 'b': 2, 'a': 3}`, `An error`], `A repeated key keeps only the last value.`, `d = {"a": 1, "b": 2, "a": 3}
print(d)`],
  [`What is printed?

d = {"a": 1, "b": 2, "a": 3}
print(len(d))`, `2`, [`3`, `1`, `6`], `The two "a" keys count as one.`, `d = {"a": 1, "b": 2, "a": 3}
print(len(d))`],
  [`What does dict(x=1, y=2) give?`, `{'x': 1, 'y': 2}`, [`{x: 1, y: 2}`, `(x, 1, y, 2)`, `An error`], `dict() with names builds the same dictionary as {"x": 1, "y": 2}.`, `print(dict(x=1, y=2))`],
  [`What does student["age"] give?

student = {"name": "Aman", "age": 20}`, `20`, [`age`, `Aman`, `An error`], `Put the key in square brackets to get its value.`, `student = {"name": "Aman", "age": 20}
print(student["age"])`],
  [`What error appears for student["city"] when the key "city" does not exist?`, `KeyError`, [`IndexError`, `TypeError`, `NameError`], `Reading a missing key gives a KeyError.`],
  [`What does student.get("city") give?

student = {"name": "Aman", "age": 20}`, `None`, [`An error`, `An empty string`, `0`], `get() returns None instead of an error.`, `student = {"name": "Aman"}
print(student.get("city"))`],
  [`What does student.get("city", "Unknown") give?

student = {"name": "Aman", "age": 20}`, `Unknown`, [`None`, `city`, `An error`], `The second argument is the default value.`, `student = {"name": "Aman"}
print(student.get("city", "Unknown"))`],
  [`What does "Aman" in {"name": "Aman"} give?`, `False`, [`True`, `name`, `An error`], `in checks the keys, and "Aman" is a value.`, `print("Aman" in {"name": "Aman"})`],
  [`What does "name" in {"name": "Aman"} give?`, `True`, [`False`, `Aman`, `An error`], `"name" is a key, so in finds it.`, `print("name" in {"name": "Aman"})`],
  [`What is printed?

d = {"a": 1}
d["b"] = 2
print(d)`, `{'a': 1, 'b': 2}`, [`{'a': 1}`, `{'b': 2}`, `An error`], `Assigning to a new key adds a pair.`, `d = {"a": 1}
d["b"] = 2
print(d)`],
  [`What is printed?

d = {"a": 1}
d["a"] = 10
print(d)`, `{'a': 10}`, [`{'a': 1, 'a': 10}`, `{'a': 1}`, `An error`], `Assigning to an existing key changes its value.`, `d = {"a": 1}
d["a"] = 10
print(d)`],
  [`What does the second line do to d?

d = {"a": 1}
d.update({"b": 2, "c": 3})`, `Adds both pairs`, [`Replaces the whole dictionary`, `Adds only the first pair`, `Gives an error`], `update() adds many pairs, and replaces the values of keys that exist.`],
  [`What does d.setdefault("a", 99) give?

d = {"a": 1}`, `1`, [`99`, `None`, `An error`], `The key exists, so setdefault keeps the old value and returns it.`, `d = {"a": 1}
print(d.setdefault("a", 99))`],
  [`What does d.pop("a") give?

d = {"a": 1, "b": 2}`, `1`, [`a`, `{'b': 2}`, `None`], `pop() removes the key and returns its value.`, `d = {"a": 1, "b": 2}
print(d.pop("a"))`],
  [`What does d.pop("z", "not found") give?

d = {"a": 1}`, `not found`, [`An error`, `None`, `z`], `With a default value there is no error.`, `d = {"a": 1}
print(d.pop("z", "not found"))`],
  [`What does popitem() remove?`, `The last pair added`, [`The first pair`, `A random value`, `Every pair`], `popitem() removes and returns the last (key, value) pair.`],
  [`Which statement removes the key "b" from d?`, `del d["b"]`, [`d.remove("b")`, `d.delete("b")`, `d["b"].clear()`], `del d[key] removes the pair.`],
  [`What does d.clear() do?`, `Removes every pair`, [`Removes only the last pair`, `Deletes the variable d`, `Copies d`], `The dictionary stays but becomes empty.`],
  [`What does list(marks.keys()) give?

marks = {"maths": 90, "science": 85}`, `['maths', 'science']`, [`[90, 85]`, `[('maths', 90), ('science', 85)]`, `['maths', 90]`], `keys() gives the keys.`, `marks = {"maths": 90, "science": 85}
print(list(marks.keys()))`],
  [`What does list(marks.values()) give?

marks = {"maths": 90, "science": 85}`, `[90, 85]`, [`['maths', 'science']`, `[('maths', 90), ('science', 85)]`, `[175]`], `values() gives the values.`, `marks = {"maths": 90, "science": 85}
print(list(marks.values()))`],
  [`What does list(marks.items()) give?

marks = {"maths": 90, "science": 85}`, `[('maths', 90), ('science', 85)]`, [`['maths', 'science']`, `[90, 85]`, `{'maths': 90, 'science': 85}`], `items() gives (key, value) pairs as tuples.`, `marks = {"maths": 90, "science": 85}
print(list(marks.items()))`],
  [`What does sum(marks.values()) give?

marks = {"maths": 90, "science": 85, "english": 78}`, `253`, [`3`, `90`, `175`], `It adds up all the values.`, `marks = {"maths": 90, "science": 85, "english": 78}
print(sum(marks.values()))`],
  [`What does sorted(marks) give?

marks = {"maths": 90, "science": 85, "english": 78}`, `['english', 'maths', 'science']`, [`[78, 85, 90]`, `['maths', 'science', 'english']`, `[('english', 78), ('maths', 90), ('science', 85)]`], `sorted() on a dictionary sorts its keys and gives a list.`, `marks = {"maths": 90, "science": 85, "english": 78}
print(sorted(marks))`],
  [`What does a plain for loop over a dictionary give each time?`, `A key`, [`A value`, `A (key, value) pair`, `An index number`], `Looping goes through the keys. Use items() for both.`],
  [`Which loop gives both the key and the value?`, `for k, v in d.items():`, [`for k, v in d:`, `for k, v in d.keys():`, `for k in d.values():`], `items() gives pairs, and the loop unpacks them.`],
  [`What does max(marks, key=marks.get) give?

marks = {"maths": 90, "science": 85, "english": 78}`, `maths`, [`90`, `science`, `english`], `It gives the key whose value is the biggest.`, `marks = {"maths": 90, "science": 85, "english": 78}
print(max(marks, key=marks.get))`],
  [`What is printed?

a = {"x": 1}
b = a
b["x"] = 99
print(a)`, `{'x': 99}`, [`{'x': 1}`, `{'x': 1, 'x': 99}`, `An error`], `b = a does not copy. Both names point to the same dictionary.`, `a = {"x": 1}
b = a
b["x"] = 99
print(a)`],
  [`Which line makes a real copy of a dictionary a?`, `a.copy()`, [`b = a`, `a.same()`, `a[:]`], `copy() makes a new dictionary.`],
  [`What does {"x": 1, "y": 2} | {"y": 20, "z": 30} give?`, `{'x': 1, 'y': 20, 'z': 30}`, [`{'x': 1, 'y': 2, 'z': 30}`, `{'x': 1, 'y': 22, 'z': 30}`, `An error`], `When the same key is in both, the second dictionary wins.`, `print({"x": 1, "y": 2} | {"y": 20, "z": 30})`],
  [`What does students["Ankit"]["city"] read when students is a dictionary of dictionaries?`, `The city of Ankit`, [`The first letter of Ankit`, `The index of the city`, `Nothing, it is an error`], `The first brackets find Ankit's dictionary and the second find the city inside it.`],
  [`What does students["Aman"]["age"] = 21 do?`, `Changes Aman's age inside the nested dictionary`, [`Adds a new student`, `Replaces the whole students dictionary`, `Gives an error`], `Each pair of brackets goes one level deeper.`],
  [`What is a list of dictionaries good for?`, `Storing rows of data, one dictionary per row`, [`Sorting numbers`, `Removing duplicates`, `Making a set`], `For example one dictionary for each student.`],
  [`What is printed?

scores = {"Aman": [90, 80]}
scores["Aman"].append(70)
print(scores["Aman"])`, `[90, 80, 70]`, [`[70]`, `[90, 80]`, `An error`], `The value is a list, so list methods work on it.`, `scores = {"Aman": [90, 80]}
scores["Aman"].append(70)
print(scores["Aman"])`],
  [`What is printed?

word = "banana"
count = {}
for ch in word:
    count[ch] = count.get(ch, 0) + 1
print(count)`, `{'b': 1, 'a': 3, 'n': 2}`, [`{'b': 1, 'a': 1, 'n': 1}`, `{'a': 3, 'b': 1, 'n': 2, 'a': 1}`, `{'b': 1, 'a': 2, 'n': 3}`], `Each letter is a key and its count is the value.`, `word = "banana"
count = {}
for ch in word:
    count[ch] = count.get(ch, 0) + 1
print(count)`],
  [`Why does count.get(ch, 0) + 1 work for a new letter?`, `get() gives 0 when the key is missing, so the first count is 1`, [`get() gives None, which can be added`, `get() creates the key with value 1`, `It does not work, it gives an error`], `The default 0 avoids a KeyError for the first time a letter is seen.`],
  [`What does len(count) give?

count = {'the': 3, 'cat': 1, 'and': 2, 'dog': 1, 'bird': 1}`, `5`, [`8`, `3`, `1`], `It counts the different words, not the total number of words.`, `count = {'the': 3, 'cat': 1, 'and': 2, 'dog': 1, 'bird': 1}
print(len(count))`],
  [`Which method turns a sentence into a list of words, ready for counting?`, `split()`, [`join()`, `strip()`, `count()`], `"a b c".split() gives ['a', 'b', 'c'].`],
  [`What does groups.setdefault("a", []).append("apple") do?`, `Adds apple to the list stored under the key "a", making the list first if needed`, [`Replaces the list under "a" with apple`, `Gives an error if "a" is missing`, `Counts the words`], `setdefault gives a list to append to, even for a new key.`],
  [`What does {n: n * n for n in range(1, 4)} give?`, `{1: 1, 2: 4, 3: 9}`, [`[1, 4, 9]`, `{1, 4, 9}`, `{1: 2, 2: 4, 3: 6}`], `This is a dictionary comprehension.`, `print({n: n * n for n in range(1, 4)})`],
  [`What does {v: k for k, v in {"a": 1, "b": 2}.items()} give?`, `{1: 'a', 2: 'b'}`, [`{'a': 1, 'b': 2}`, `{'a', 'b'}`, `An error`], `It swaps keys and values.`, `print({v: k for k, v in {"a": 1, "b": 2}.items()})`],
  [`True or false: a dictionary keeps the order in which pairs were added.`, `True`, [`False`], `Dictionaries remember their insertion order.`],
  [`True or false: "x" in d checks the values of d.`, `False`, [`True`], `in checks the keys.`],
  [`Which one would you use for a phone book?`, `A dictionary`, [`A tuple`, `A set`, `A list of numbers`], `You look up a number by a name, which is a key.`],
  [`Which one is best for the unique words in a story?`, `A set`, [`A dictionary`, `A tuple`, `A string`], `A set keeps each item only once.`],
  [`How do you make an empty dictionary?`, `{}`, [`set()`, `[]`, `()`], `{} is an empty dictionary, and set() is an empty set.`],
]
