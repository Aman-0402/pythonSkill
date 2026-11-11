// Session 10: Revision and Mini Project
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What does print(type("42")) show?`, `<class 'str'>`, [`<class 'int'>`, `<class 'float'>`, `<class 'bool'>`], `Anything inside quotes is a string.`, `print(type("42"))`],
  [`What type does input() always give?`, `str`, [`int`, `float`, `It depends on what is typed`], `Use int() or float() to do maths on what the user types.`],
  [`What does int("42") + 1 give?`, `43`, [`421`, `42`, `An error`], `int() turns the text into a number first.`, `print(int("42") + 1)`],
  [`What does str(7) + "8" give?`, `78`, [`15`, `An error`, `7 8`], `Both sides are text, so + joins them.`, `print(str(7) + "8")`],
  [`What does "Python Programming"[::-1][0] give?`, `g`, [`P`, `n`, `y`], `The reversed string starts with the last letter.`, `print("Python Programming"[::-1][0])`],
  [`What does "Python Programming".count("o") give?`, `2`, [`1`, `3`, `0`], `There is an o in Python and an o in Programming.`, `print("Python Programming".count("o"))`],
  [`What does f"{86.456:.1f}" give?`, `86.5`, [`86.4`, `86.456`, `86`], `:.1f keeps one decimal place and rounds.`, `print(f"{86.456:.1f}")`],
  [`What is printed?

marks = 72
if marks >= 90:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "F"
print(grade)`, `B`, [`A`, `C`, `F`], `72 fails the first test and passes the second.`, `marks = 72
if marks >= 90:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "F"
print(grade)`],
  [`What does print(72 > 50 and 72 < 80) show?`, `True`, [`False`, `72`, `An error`], `Both conditions are true.`, `print(72 > 50 and 72 < 80)`],
  [`What does continue do inside a loop?`, `Skips the rest of this round and goes to the next one`, [`Ends the loop`, `Repeats the same round`, `Stops the program`], `break ends the loop, continue only skips one round.`],
  [`What is printed?

n = 5
total = 0
while n > 0:
    total += n
    n -= 1
print(total)`, `15`, [`5`, `10`, `0`], `It adds 5 + 4 + 3 + 2 + 1.`, `n = 5
total = 0
while n > 0:
    total += n
    n -= 1
print(total)`],
  [`What does "*" * 3 give?`, `***`, [`3`, `* * *`, `An error`], `A string times a number repeats the string.`, `print("*" * 3)`],
  [`Which collection is written with round brackets and cannot be changed?`, `A tuple`, [`A list`, `A set`, `A dictionary`], `Tuples are immutable.`],
  [`What is printed?

a = [1, 2, 3]
b = a
b.append(4)
print(a)`, `[1, 2, 3, 4]`, [`[1, 2, 3]`, `[4]`, `An error`], `b = a does not copy, so both names are the same list.`, `a = [1, 2, 3]
b = a
b.append(4)
print(a)`],
  [`What is y after x, *y = (1, 2, 3)?`, `[2, 3]`, [`(2, 3)`, `2`, `[1, 2, 3]`], `The starred variable takes the rest as a list.`, `x, *y = (1, 2, 3)
print(y)`],
  [`What does len({1, 2, 2, 3}) give?`, `3`, [`4`, `2`, `1`], `The set keeps only 1, 2 and 3.`, `print(len({1, 2, 2, 3}))`],
  [`What does {"a": 1}.get("b", 0) + 5 give?`, `5`, [`6`, `An error`, `None`], `get() returns the default 0 for a missing key.`, `print({"a": 1}.get("b", 0) + 5)`],
  [`What does max(count, key=count.get) give for count = {'to': 2, 'be': 2, 'or': 1}?`, `to`, [`2`, `or`, `be`], `It returns the key with the biggest value, and the first one wins a tie.`, `count = {'to': 2, 'be': 2, 'or': 1}
print(max(count, key=count.get))`],
  [`In the marks manager, what is stored in the dictionary students?`, `Each student name as a key and a list of marks as the value`, [`Each mark as a key and a name as the value`, `Only the names`, `A single total`], `The key is the name and the value is the list of marks.`],
  [`Why is a dictionary a good choice for the marks manager?`, `You can find a student directly by name`, [`It keeps the marks sorted`, `It stops marks being changed`, `It uses less typing`], `A dictionary looks values up by key.`],
  [`What does students.setdefault("Aman", []) do?`, `Creates an empty list for Aman only if Aman is missing`, [`Always replaces Aman's list with an empty one`, `Removes Aman`, `Gives an error if Aman is missing`], `If the key exists, nothing changes.`],
  [`What is printed?

students = {}
students.setdefault("Aman", []).extend([90, 80])
print(students)`, `{'Aman': [90, 80]}`, [`{'Aman': []}`, `{}`, `{'Aman': [[90, 80]]}`], `setdefault gives a list, and extend adds the marks to it.`, `students = {}
students.setdefault("Aman", []).extend([90, 80])
print(students)`],
  [`What does sum(marks) / len(marks) work out for marks = [90, 80, 70]?`, `The average`, [`The total`, `The highest mark`, `The number of marks`], `The total divided by the count is the average.`],
  [`What is the average of [90, 80, 70]?`, `80.0`, [`240`, `80`, `70.0`], `The total is 240 and 240 / 3 is 80.0.`, `print(sum([90, 80, 70]) / len([90, 80, 70]))`],
  [`In f"{name:<8}{total:>6}", what does :<8 do?`, `Pads the name to 8 characters, aligned to the left`, [`Cuts the name to 8 characters`, `Repeats the name 8 times`, `Makes the name 8 characters bigger`], `:<8 is left aligned in a width of 8, and :>6 is right aligned in a width of 6.`],
  [`What does reverse=True do in sorted(averages, key=averages.get, reverse=True)?`, `Puts the biggest average first`, [`Puts the smallest average first`, `Reverses the names`, `Removes duplicates`], `The default order is smallest to biggest.`],
  [`What does sorted(averages, key=averages.get) give when averages = {"Aman": 80, "Ankit": 90, "Kabir": 70}?`, `['Kabir', 'Aman', 'Ankit']`, [`['Ankit', 'Aman', 'Kabir']`, `[70, 80, 90]`, `['Aman', 'Kabir', 'Ankit']`], `The names are sorted by their values, smallest first.`, `averages = {"Aman": 80, "Ankit": 90, "Kabir": 70}
print(sorted(averages, key=averages.get))`],
  [`What does enumerate(ranked, start=1) do in a ranking loop?`, `Numbers the items from 1`, [`Starts the loop at the second item`, `Sorts the items`, `Counts the items`], `The rank then starts at 1 instead of 0.`],
  [`What does "add Aman 90 80".split() give?`, `['add', 'Aman', '90', '80']`, [`['add Aman 90 80']`, `['add', 'Aman', 90, 80]`, `('add', 'Aman', '90', '80')`], `split() breaks the text into words, and they are all strings.`, `print("add Aman 90 80".split())`],
  [`What does [int(x) for x in ["90", "80"]] give?`, `[90, 80]`, [`['90', '80']`, `[170]`, `An error`], `This list comprehension turns each text mark into a number.`, `print([int(x) for x in ["90", "80"]])`],
  [`In the command loop, what does the final else catch?`, `Commands the program does not know`, [`The quit command`, `Empty marks`, `Duplicate names`], `It prints "Unknown command" for anything else.`],
  [`Why does the command loop use break for the quit command?`, `To end the loop and stop asking for commands`, [`To skip one command`, `To delete the students`, `To print the report`], `break leaves the loop.`],
  [`Why is while True with a break used for a menu?`, `The menu repeats until the user chooses to quit`, [`It runs the menu only once`, `It sorts the choices`, `It stops the user typing`], `The loop never ends by itself, so break ends it when the user quits.`],
  [`What happens with int(input("Mark: ")) if the user types abc?`, `ValueError`, [`The mark becomes 0`, `The mark becomes abc`, `Nothing, it asks again`], `int() cannot turn the word abc into a number.`],
  [`What does students.pop("Zed", None) give when Zed is not in students?`, `None`, [`An error`, `Zed`, `An empty list`], `With a default, pop() does not raise a KeyError.`, `students = {"Aman": [1]}
print(students.pop("Zed", None))`],
  [`What does the contact book use as the value for each name?`, `Another dictionary with phone and email`, [`A list of numbers`, `A single string`, `A tuple of marks`], `That makes a nested dictionary.`],
  [`How do you read Ankit's phone from contacts = {"Ankit": {"phone": "912"}}?`, `contacts["Ankit"]["phone"]`, [`contacts["phone"]["Ankit"]`, `contacts["Ankit", "phone"]`, `contacts.phone.Ankit`], `One pair of brackets for each level.`],
  [`What is printed?

contacts = {"Aman": 1, "Amit": 2, "Ankit": 3}
print([n for n in contacts if "am" in n.lower()])`, `['Aman', 'Amit']`, [`['Aman']`, `['Ankit']`, `['Aman', 'Amit', 'Ankit']`], `It keeps the names that contain am, ignoring capital letters.`, `contacts = {"Aman": 1, "Amit": 2, "Ankit": 3}
print([n for n in contacts if "am" in n.lower()])`],
  [`Why use .lower() when searching for part of a name?`, `So "AM" and "am" match the same names`, [`To make the names shorter`, `To sort the names`, `To remove spaces`], `Lowercasing both sides makes the search ignore capital letters.`],
  [`What does this loop do?

for name in sorted(contacts):
    print(name)`, `Goes through the names in alphabetical order`, [`Goes through the phone numbers`, `Removes the contacts`, `Goes through the names in the order added`], `sorted() on a dictionary sorts its keys.`],
  [`What does contacts[name]["phone"] = "9000000000" do?`, `Changes the phone of an existing contact`, [`Deletes the contact`, `Makes a new dictionary called phone`, `Gives an error`], `It changes the value stored under phone inside the nested dictionary.`],
  [`What happens with del contacts["Zed"] when Zed is not a contact?`, `KeyError`, [`Nothing`, `TypeError`, `The first contact is deleted`], `That is why the program checks first, or uses pop with a default.`],
  [`Which code changes would make the marks manager show students who failed?`, `Loop through the averages and print the names with an average below 50`, [`Sort the names`, `Use a set of marks`, `Convert the dictionary to a tuple`], `A loop with an if on the average does it.`],
  [`Which is better for storing a project's data: one dictionary or many separate variables?`, `One dictionary`, [`Many separate variables`, `A single string`, `A tuple of variables`], `A dictionary scales to any number of students.`],
  [`True or false: a program should be built all at once and tested at the end.`, `False`, [`True`], `Build and test one small step at a time.`],
  [`True or false: the browser runner can run programs that use input().`, `False`, [`True`], `In the notes the browser examples use a list of commands instead, and the input() versions run on your computer.`],
  [`How does a program remember students after it closes?`, `It must save them to a file`, [`Variables are saved automatically`, `The dictionary stays in memory`, `It cannot be done`], `Variables disappear when the program ends. Files come in a later class.`],
]
