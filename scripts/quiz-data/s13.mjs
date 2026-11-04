// Session 13: Modules and Packages
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a module?`, `A Python file with ready-made code you can import`, [`A kind of loop`, `A type of variable`, `A comment block`], `A module holds functions and values that you can reuse.`],
  [`What is the standard library?`, `The modules that come with Python`, [`A website that sells Python books`, `A folder of your own files`, `Only the math module`], `It is often called "batteries included".`],
  [`Which line loads the math module?`, `import math`, [`load math`, `include math`, `use math`], `import is the keyword that loads a module.`],
  [`What does math.sqrt(144) give?`, `12.0`, [`12`, `72`, `144`], `sqrt gives the square root as a float.`, `import math
print(math.sqrt(144))`],
  [`What does the dot in math.sqrt mean?`, `sqrt is a function inside the math module`, [`sqrt is a variable you made`, `math is inside sqrt`, `It joins two numbers`], `The dot goes inside the module.`],
  [`How do you use sqrt without writing math. each time?`, `from math import sqrt`, [`import sqrt from math`, `import math.sqrt as sqrt`, `use math.sqrt`], `from module import name brings the name in directly.`],
  [`What does import math as m let you write?`, `m.sqrt(16)`, [`math.sqrt(16)`, `as.sqrt(16)`, `sqrt(16)`], `as gives the module a shorter name.`],
  [`Why should you avoid from math import *?`, `You cannot tell where names come from and it can hide your own names`, [`It makes Python slower than 10 times`, `It is a syntax error`, `It deletes the math module`], `Import only the names you need.`],
  [`What does math.floor(3.9) give?`, `3`, [`4`, `3.9`, `3.0`], `floor rounds down.`, `import math
print(math.floor(3.9))`],
  [`What does math.ceil(3.1) give?`, `4`, [`3`, `3.1`, `4.0`], `ceil rounds up.`, `import math
print(math.ceil(3.1))`],
  [`What does math.factorial(5) give?`, `120`, [`25`, `15`, `5`], `5 * 4 * 3 * 2 * 1 is 120.`, `import math
print(math.factorial(5))`],
  [`What does math.gcd(12, 18) give?`, `6`, [`36`, `3`, `216`], `6 is the biggest number that divides both 12 and 18.`, `import math
print(math.gcd(12, 18))`],
  [`What does math.pow(2, 3) give?`, `8.0`, [`8`, `6`, `9`], `math.pow always gives a float.`, `import math
print(math.pow(2, 3))`],
  [`What does round(2.5) give in Python?`, `2`, [`3`, `2.5`, `2.0`], `A half is rounded to the nearest even number.`, `print(round(2.5))`],
  [`What does random.randint(1, 6) give?`, `A whole number from 1 to 6, both included`, [`A float from 1 to 6`, `A whole number from 1 to 5`, `Always 1`], `randint includes both ends.`],
  [`What does random.random() give?`, `A float from 0.0 up to but not including 1.0`, [`A whole number from 0 to 10`, `Always 0.5`, `A float from 1 to 6`], `It is a number between 0 and 1.`],
  [`What does random.choice(["a", "b", "c"]) give?`, `One random item from the list`, [`The whole list shuffled`, `Always the first item`, `Three items`], `choice picks a single item.`],
  [`What does random.shuffle(cards) return?`, `None, because it changes the list in place`, [`A new shuffled list`, `The first card`, `The number of cards`], `Do not write cards = random.shuffle(cards).`],
  [`How is random.sample(items, 3) different from choosing 3 times with choice?`, `sample never picks the same item twice`, [`sample always picks the first 3`, `sample gives a float`, `There is no difference`], `Each item can appear at most once in a sample.`],
  [`What does random.seed(10) do?`, `Makes the random numbers repeat the same way each time`, [`Makes the numbers truly random`, `Deletes the random module`, `Stops randint working`], `The same seed gives the same sequence.`],
  [`What is printed by seeding with 10 twice and comparing the two lists?`, `True`, [`False`, `None`, `An error`], `Same seed, same numbers.`, `import random
random.seed(10)
a = [random.randint(1, 100) for _ in range(3)]
random.seed(10)
b = [random.randint(1, 100) for _ in range(3)]
print(a == b)`],
  [`Why is random not safe for real passwords?`, `Its numbers can be predicted, so Python has the secrets module for that`, [`It only makes numbers`, `It is too slow`, `It cannot make letters`], `Use secrets for anything security related.`],
  [`What does "".join(random.choice(letters) for _ in range(10)) build?`, `A string of 10 random characters`, [`A list of 10 letters`, `A number`, `The same letter 10 times`], `join glues the 10 chosen characters together.`],
  [`Which module has the timedelta class?`, `datetime`, [`time`, `calendar`, `delta`], `datetime has date, datetime and timedelta.`],
  [`What does date(2026, 8, 15).year give?`, `2026`, [`8`, `15`, `2026-08-15`], `.year, .month and .day read the parts.`, `from datetime import date
print(date(2026, 8, 15).year)`],
  [`What does print(date(2026, 8, 15)) show?`, `2026-08-15`, [`15/08/2026`, `August 15 2026`, `date(2026, 8, 15)`], `A date prints as year-month-day.`, `from datetime import date
print(date(2026, 8, 15))`],
  [`What type do you get from subtracting two dates?`, `timedelta`, [`date`, `int`, `str`], `The result is a length of time.`, `from datetime import date
print(type(date(2026, 3, 1) - date(2026, 1, 1)).__name__)`],
  [`How many days from 1 Jan 2026 to 1 Mar 2026?`, `59`, [`58`, `60`, `31`], `January has 31 days and February 2026 has 28.`, `from datetime import date
print((date(2026, 3, 1) - date(2026, 1, 1)).days)`],
  [`What does date(2026, 1, 1) + timedelta(days=30) give?`, `2026-01-31`, [`2026-01-30`, `2026-02-01`, `2026-01-01`], `Add 30 days to 1 January.`, `from datetime import date, timedelta
print(date(2026, 1, 1) + timedelta(days=30))`],
  [`What does weekday() return for a Monday?`, `0`, [`1`, `7`, `Monday`], `Monday is 0 and Sunday is 6.`, `from datetime import date
print(date(2026, 8, 17).weekday())`],
  [`Which method turns a date into text?`, `strftime`, [`strptime`, `parse`, `totext`], `strftime formats a date as text.`],
  [`Which method reads text into a date?`, `strptime`, [`strftime`, `read`, `fromtext`], `strptime parses text.`],
  [`What does datetime(2026, 8, 5, 9, 30).strftime("%d/%m/%Y") give?`, `05/08/2026`, [`2026/08/05`, `5/8/2026`, `08/05/2026`], `%d is the day, %m the month, %Y the year.`, `from datetime import datetime
print(datetime(2026, 8, 5, 9, 30).strftime("%d/%m/%Y"))`],
  [`Which code gives the full month name, like August?`, `%B`, [`%b`, `%m`, `%M`], `%b is the short name and %m is the number.`],
  [`What does statistics.median([70, 85, 85, 90, 100]) give?`, `85`, [`86`, `90`, `70`], `The middle value of the sorted list is 85.`, `import statistics
print(statistics.median([70, 85, 85, 90, 100]))`],
  [`What does Counter("banana").most_common(1) give?`, `[('a', 3)]`, [`[('b', 1)]`, `['a']`, `[('n', 2)]`], `a appears 3 times, which is the most.`, `from collections import Counter
print(Counter("banana").most_common(1))`],
  [`What is a package?`, `A folder of modules`, [`A single function`, `A kind of variable`, `A Python comment`], `A package folder holds an __init__.py file and modules.`],
  [`Which file marks a folder as a package?`, `__init__.py`, [`package.py`, `main.py`, `setup.txt`], `It can be empty.`],
  [`What does from tools import maths mean?`, `Import the maths module from the tools package`, [`Import tools from maths`, `Import every module in Python`, `Run the tools file`], `from package import module.`],
  [`What is the value of __name__ when a file is run directly?`, `__main__`, [`main`, `__file__`, `None`], `Python sets it to "__main__" for the file you start.`, `print(__name__)`],
  [`When does code under if __name__ == "__main__": run?`, `Only when the file is started directly, not when it is imported`, [`Only when it is imported`, `Never`, `Every time any file runs`], `This keeps test code quiet when imported.`],
  [`What is pip?`, `The tool that installs Python packages`, [`A Python loop`, `A text editor`, `A kind of variable`], `pip downloads packages from PyPI.`],
  [`Where do you type pip install commands?`, `In the terminal (Command Prompt or PowerShell)`, [`Inside a Python file`, `In the Try it box`, `In a print statement`], `pip is a command line tool.`],
  [`Which command installs the requests package?`, `pip install requests`, [`import requests`, `python requests`, `pip get requests`], `pip install name downloads and installs it.`],
  [`Which command removes a package?`, `pip uninstall name`, [`pip remove name`, `pip delete name`, `pip clear name`], `uninstall is the pip word for removing.`],
  [`What is a virtual environment for?`, `Giving each project its own private set of packages`, [`Running Python faster`, `Making a website`, `Backing up files`], `Different projects can use different package versions.`],
  [`What does pip freeze > requirements.txt do?`, `Saves the list of packages and versions to a file`, [`Deletes all packages`, `Stops pip working`, `Installs requirements.txt`], `Others can then run pip install -r requirements.txt.`],
  [`What error appears for import mathh when no such module exists?`, `ModuleNotFoundError`, [`NameError`, `SyntaxError`, `TypeError`], `Python cannot find a module with that name.`],
  [`What error appears for sqrt(9) after only import math?`, `NameError`, [`ModuleNotFoundError`, `TypeError`, `ValueError`], `You need math.sqrt(9).`],
  [`What happens if you name your own file random.py?`, `It hides the real random module and your imports break`, [`Nothing, it is fine`, `Python deletes it`, `It runs faster`], `Never name your files like standard modules.`],
]
