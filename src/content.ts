export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string; art?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[]; start?: number }
  | { type: 'code'; code: string; output?: string; label?: string; runnable?: boolean }
  | { type: 'note'; tone: 'tip' | 'warn'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }

export type Section = { id: string; title: string; art?: string; blocks: Block[] }

export type Lesson = {
  slug: string
  title: string
  summary: string
  // optional third pill on the notes title screen
  tag?: string
  // code shown typing on the notes title screen (defaults to a hello.py example)
  hero?: { file: string; lines: string[]; output: string }
  sections: Section[]
}

const raw = String.raw

export const lessons: Lesson[] = [
  {
    slug: 'introduction-to-python-and-setup',
    tag: 'Windows, macOS and Linux',
    title: 'Introduction to Python and Setup',
    summary: 'Install Python, set up your editor, and run your first program.',
    sections: [
      {
        id: 'what-is-python',
        art: 'hello-bubble',
        title: 'What is Python?',
        blocks: [
          {
            type: 'p',
            text: 'Python is a **high-level, interpreted, general-purpose programming language** with **simple, English-like syntax**. You can read a Python program almost like a sentence, which is why it is **the most common first language**.',
          },
          {
            type: 'ul',
            items: [
              '**High-level:** you write human-friendly instructions and Python handles the machine details such as memory.',
              '**Interpreted:** code runs line by line, with no separate compile step. You write it, run it, and see the result straight away.',
              '**Dynamically typed:** you do not declare variable types. Python works out whether a value is a number, text or something else.',
              '**General-purpose:** one language, many jobs, instead of being limited to one kind of software.',
            ],
          },
          { type: 'h3', text: 'What Python is used for', art: 'uses' },
          {
            type: 'ul',
            items: [
              'Data analysis and visualisation',
              'Artificial intelligence and machine learning',
              'Web development with frameworks such as Django and Flask',
              'Automation and scripting of repetitive tasks',
              'Games',
              'Cybersecurity',
            ],
          },
          { type: 'h3', text: 'Why it suits beginners' },
          {
            type: 'ul',
            items: [
              '**Short code:** a task that takes many lines in other languages often takes a few in Python.',
              '**A huge community,** so almost every question you will have has already been answered.',
              '**Thousands of libraries,** including Pandas (tables of data), NumPy (fast numbers) and Matplotlib (charts).',
            ],
          },
        ],
      },
      {
        id: 'history',
        title: 'History',
        blocks: [
          {
            type: 'p',
            text: 'Python was created by **Guido van Rossum** in the Netherlands. He started working on it in **late 1989** and the **first release came in 1991**.',
          },
          {
            type: 'p',
            text: 'The name comes from the British comedy show **Monty Python’s Flying Circus**, **not from the snake**. The snake logo came later.',
          },
          {
            type: 'table',
            head: ['Year', 'Milestone'],
            rows: [
              ['1989', 'Guido van Rossum starts work on Python'],
              ['1991', 'First public release'],
              ['2000', 'Python 2.0 released'],
              ['2008', 'Python 3.0 released'],
              ['1 Jan 2020', 'Python 2 reaches end of life'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Always install Python 3',
            text: 'Python 2 is no longer supported, so everyone uses Python 3 now. Always install the **latest stable Python 3 release**.',
          },
        ],
      },
      {
        id: 'installation',
        title: 'Installation',
        blocks: [
          { type: 'h3', text: 'Windows' },
          {
            type: 'ol',
            items: [
              'Go to python.org, open Downloads, and get the latest Python 3.',
              'Run the installer and tick **Add python.exe to PATH**.',
              'Click **Install Now**.',
              'Open Command Prompt and run the command below to check it worked.',
            ],
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Most common beginner mistake',
            text: 'Forgetting to tick “Add python.exe to PATH” on the first installer screen. Without it, the terminal cannot find Python.',
          },
          { type: 'code', label: 'Command Prompt', code: 'python --version', output: 'Python 3.14.0' },
          { type: 'h3', text: 'Windows: install from the terminal' },
          {
            type: 'p',
            text: 'Windows 10 and 11 include **winget**, so you can install Python with one command and skip the website. Open **PowerShell** or **Command Prompt** and run:',
          },
          {
            type: 'code',
            label: 'PowerShell',
            code: raw`winget install -e --id Python.Python.3.14`,
          },
          {
            type: 'p',
            text: 'Close the terminal and **open a new one** so it picks up the new PATH. Then check the install worked:',
          },
          {
            type: 'code',
            label: 'PowerShell',
            code: raw`python --version
pip --version`,
            output: 'Python 3.14.0',
          },
          {
            type: 'p',
            text: 'To see which versions are available, or to update later:',
          },
          {
            type: 'code',
            label: 'PowerShell',
            code: raw`winget search Python.Python
winget upgrade --id Python.Python.3.14`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Try py if python is not found',
            text: 'Windows also installs the `py` launcher. If `python` is not recognised, `py --version` often works.',
          },
          { type: 'h3', text: 'macOS' },
          {
            type: 'p',
            text: '**Install from python.org**, or use **Homebrew**. Then check the version with `python3`.',
          },
          {
            type: 'code',
            label: 'Terminal',
            code: raw`brew install python
python3 --version`,
          },
          { type: 'h3', text: 'Linux' },
          {
            type: 'code',
            label: 'Terminal',
            code: raw`sudo apt install python3 python3-pip
python3 --version`,
          },
          { type: 'h3', text: 'VS Code (editor)' },
          {
            type: 'ol',
            items: [
              'Install VS Code from code.visualstudio.com.',
              'Open the Extensions panel and install the **Python** extension by Microsoft.',
              'Create a folder for your work and open it in VS Code.',
              'Make a new file called `hello.py`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'No-install backup: Google Colab',
            text: 'Google Colab (colab.research.google.com) runs Python in any browser, with nothing to install. It is useful if your laptop is slow or locked down.',
          },
          { type: 'h3', text: 'VS Code: install from the terminal' },
          {
            type: 'p',
            text: 'On Windows you can install VS Code with **winget** too. Open **PowerShell** and run:',
          },
          {
            type: 'code',
            label: 'PowerShell',
            code: raw`winget install -e --id Microsoft.VisualStudioCode`,
          },
          {
            type: 'p',
            text: 'Open a **new terminal**, then check the `code` command works and add the Python extension from the terminal:',
          },
          {
            type: 'code',
            label: 'PowerShell',
            code: raw`code --version
code --install-extension ms-python.python`,
          },
          {
            type: 'p',
            text: 'Make a practice folder, create `hello.py`, open the folder in VS Code, and run the file:',
          },
          {
            type: 'code',
            label: 'PowerShell',
            code: raw`mkdir python-practice
cd python-practice
New-Item hello.py
code .
python hello.py`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'macOS and Linux',
            text: 'On macOS use `brew install --cask visual-studio-code`. On Ubuntu use `sudo snap install code --classic`. The `code` commands above work the same.',
          },
          { type: 'h3', text: 'Common problems' },
          {
            type: 'table',
            head: ['Problem', 'Fix'],
            rows: [
              [
                '`python` is not recognized',
                'PATH was not ticked during install. Reinstall and tick it, or add Python to PATH manually.',
              ],
              [
                '`python` opens the Microsoft Store',
                'Turn off the Python entries in Settings > Apps > Advanced app settings > App execution aliases, or use `py` instead.',
              ],
              [
                '`code` is not recognized',
                'Open a new terminal first. If it still fails, reinstall VS Code and keep **Add to PATH** ticked.',
              ],
              ['Command not found on Mac or Linux', 'Use `python3` instead of `python`.'],
            ],
          },
        ],
      },
      {
        id: 'ways-to-run',
        title: 'Ways to run Python',
        blocks: [
          { type: 'h3', text: 'Interactive mode (REPL)' },
          {
            type: 'p',
            text: 'Type `python` in the terminal. You get a `>>>` prompt where **every line runs the moment you press Enter**. It is perfect for trying small ideas. Leave with `exit()`.',
          },
          {
            type: 'code',
            label: 'REPL',
            code: raw`>>> 2 + 3
5
>>> exit()`,
          },
          { type: 'h3', text: 'Script mode' },
          {
            type: 'p',
            text: 'Write your code in a file such as `hello.py`, then **run the whole file** from the terminal. Use this for anything you want to keep.',
          },
          { type: 'code', label: 'Terminal', code: 'python hello.py' },
          { type: 'h3', text: 'VS Code' },
          { type: 'p', text: 'Open your file and click the Run button (▶) at the top right. The output appears in the terminal below.' },
          { type: 'h3', text: 'Jupyter and Colab' },
          {
            type: 'p',
            text: 'Cell-based notebooks where you run code in small pieces and see results under each cell. We use these later in the Data Analyst track.',
          },
        ],
      },
      {
        id: 'first-programs',
        title: 'First programs',
        blocks: [
          {
            type: 'code',
            label: 'hello.py',
            runnable: true,
            code: raw`print("Hello, World!")
print("My name is Aman")
print("Python", "is", "easy")
print("Python", "is", "easy", sep="-")
print("Line 1\nLine 2")`,
            output: raw`Hello, World!
My name is Aman
Python is easy
Python-is-easy
Line 1
Line 2`,
          },
          { type: 'h3', text: 'Key points' },
          {
            type: 'ul',
            items: [
              '`print()` is a **built-in function**. It shows whatever you give it on the screen.',
              '**Text (a “string”) goes inside quotes**. Single or double quotes both work.',
              'You can give `print()` several values. It puts a space between them by default, and `sep=` changes that.',
              '**Case matters**: `print` works, `Print` gives an error.',
              '`\\n` starts a new line and `\\t` inserts a tab.',
            ],
          },
          { type: 'h3', text: 'Comments' },
          {
            type: 'p',
            text: 'Comments are notes for people. **Python ignores them**. Use `#` for one line, or triple quotes for several lines.',
          },
          {
            type: 'code',
            code: raw`# This is a single-line comment
"""
This is a multi-line comment
"""`,
          },
          { type: 'h3', text: 'Reading errors' },
          {
            type: 'p',
            text: '**Everyone gets errors, and they are useful**. Break the code on purpose, read the message, then fix it.',
          },
          {
            type: 'code',
            label: 'Broken on purpose',
            runnable: true,
            code: raw`print("Hello)        # SyntaxError: missing quote
Print("Hello")       # NameError: wrong case`,
          },
          {
            type: 'p',
            text: 'Read the error message from the bottom. It tells you the **line number** and the **error type**. A `SyntaxError` means the code is written wrongly. A `NameError` means Python does not recognise a name.',
          },
        ],
      },
      {
        id: 'calculator',
        title: 'Python as a calculator',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`print(10 + 5)
print(10 / 3)
print(10 // 3)
print(10 % 3)
print(2 ** 3)`,
            output: raw`15
3.3333333333333335
3
1
8`,
          },
          {
            type: 'table',
            head: ['Operator', 'Meaning', 'Example', 'Result'],
            rows: [
              ['`+`', 'Add', '`10 + 5`', '15'],
              ['`/`', 'Divide, with a decimal result', '`10 / 3`', '3.3333333333333335'],
              ['`//`', 'Divide, keep the whole part only', '`10 // 3`', '3'],
              ['`%`', 'Remainder after dividing', '`10 % 3`', '1'],
              ['`**`', 'Power', '`2 ** 3`', '8'],
            ],
          },
        ],
      },
      {
        id: 'practice',
        title: 'Practice',
        blocks: [
          {
            type: 'ol',
            items: [
              'Print your name, college and branch on three lines.',
              'Print a simple box or star pattern using `print()`.',
              'Print the result of `(25 * 4) + 10`.',
              'Fix the broken code: `prnt("Hi")`.',
            ],
          },
          {
            type: 'code',
            label: 'Your turn: write your answers here, then press Run',
            runnable: true,
            code: raw`# 1. Your name, college and branch
print("Your name")

# 4. Fix this line
prnt("Hi")`,
          },
        ],
      },
      {
        id: 'homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ol',
            items: [
              'Install Python and VS Code (or use Colab) and run `hello.py`.',
              'Write a program that prints a short self-introduction.',
              'Send a screenshot of the output to the class group.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Variables and data types.',
          },
        ],
      },
    ],
  },
  {
    slug: 'variables-and-data-types',
    title: 'Variables and Data Types',
    summary: 'Store values in variables, learn the data types, take input and convert between types.',
    hero: { file: 'variables.py', lines: ['name = "Aman"', 'print(name)'], output: 'Aman' },
    sections: [
      {
        id: 's2-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What did we run last class?',
              'What does `print()` do?',
              'What is the difference between a comment and a statement?',
            ],
          },
        ],
      },
      {
        id: 's2-what-is-a-variable',
        title: 'What is a variable?',
        blocks: [
          {
            type: 'p',
            text: 'A variable is a **named container that stores a value in memory**.',
          },
          {
            type: 'p',
            text: 'Think of a labelled box: the label is the **variable name** and the thing inside is the **value**.',
          },
          {
            type: 'code',
            label: 'variables.py',
            runnable: true,
            code: raw`name = "Aman"
age = 25
print(name)
print(age)`,
          },
          { type: 'h3', text: 'The = sign' },
          {
            type: 'p',
            text: '`=` is the **assignment operator**. It means “store the right side in the left side”. It does **not** mean “equal” as in maths.',
          },
          { type: 'h3', text: 'Changing a variable' },
          { type: 'p', text: 'A variable can be changed at any time. The newest value replaces the old one.' },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 25
age = 26
print(age)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What will `print(age)` show after `age = 26`?',
          },
          { type: 'h3', text: 'Assign several at once' },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b, c = 1, 2, 3
x = y = 0
print(a, b, c)
print(x, y)`,
          },
        ],
      },
      {
        id: 's2-naming-rules',
        title: 'Rules for naming variables',
        blocks: [
          {
            type: 'ul',
            items: [
              'Must start with a **letter or underscore** (`_`), never a digit.',
              'Can contain **letters, digits and underscores** only, with no spaces or special characters.',
              '**Case-sensitive:** `Name` and `name` are different variables.',
              'Cannot be a **keyword** such as `if`, `for`, `class` or `True`.',
            ],
          },
          { type: 'h3', text: 'Valid and invalid names' },
          {
            type: 'table',
            head: ['Valid', 'Invalid'],
            rows: [
              ['`student_name`', '`1student`'],
              ['`_count`', '`my name`'],
              ['`marks2`', '`total-marks`'],
              ['`Age`', '`class`'],
            ],
          },
          { type: 'h3', text: 'Naming convention' },
          {
            type: 'p',
            text: 'Use **snake_case** (`total_marks`) and give variables **meaningful names** (`price`, not `p`).',
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Is `my_age` valid? What about `my-age`?',
          },
        ],
      },
      {
        id: 's2-data-types',
        title: 'Data types',
        blocks: [
          {
            type: 'p',
            text: 'Python decides the type **from the value**. Check it with `type()`.',
          },
          {
            type: 'table',
            head: ['Type', 'Meaning', 'Example'],
            rows: [
              ['`int`', 'whole numbers', '`10`, `-5`, `0`'],
              ['`float`', 'decimal numbers', '`3.14`, `-0.5`'],
              ['`str`', 'text', '`"Python"`, `\'A\'`'],
              ['`bool`', 'True or False', '`True`, `False`'],
              ['`NoneType`', 'no value', '`None`'],
            ],
          },
          { type: 'h3', text: 'Checking the type' },
          {
            type: 'code',
            runnable: true,
            code: raw`a = 10
b = 3.14
c = "Hello"
d = True
e = None

print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))`,
          },
          { type: 'h3', text: 'Things to remember' },
          {
            type: 'ul',
            items: [
              '`10` is an `int`, but `"10"` is a `str`.',
              '`True` and `False` start with a **capital letter**.',
              'Python is **dynamically typed**, so one variable can hold different types at different times.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`x = 5
print(type(x))
x = "five"
print(type(x))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What is the type of `"3.14"`? Of `3.0`?',
          },
        ],
      },
      {
        id: 's2-input',
        title: 'Taking input from the user',
        blocks: [
          {
            type: 'code',
            label: 'Run this one in VS Code or a terminal',
            code: raw`name = input("Enter your name: ")
print("Hello", name)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Important',
            text: '`input()` **always returns a string**, even when the user types a number.',
          },
          { type: 'h3', text: 'input() always gives a string' },
          {
            type: 'code',
            label: 'Run this one in VS Code or a terminal',
            code: raw`a = input("Enter a number: ")
print(type(a))`,
          },
          {
            type: 'p',
            text: 'Enter `5` and the type is still `str`.',
          },
        ],
      },
      {
        id: 's2-type-conversion',
        title: 'Type conversion (type casting)',
        blocks: [
          {
            type: 'p',
            text: 'Convert one type into another with `int()`, `float()`, `str()` and `bool()`.',
          },
          {
            type: 'code',
            label: 'Run this one in VS Code or a terminal',
            code: raw`age = int(input("Enter your age: "))
price = float(input("Enter price: "))
print(age + 1)
print(price * 2)`,
          },
          { type: 'h3', text: 'More examples' },
          {
            type: 'code',
            runnable: true,
            code: raw`print(int("25"))
print(float(7))
print(str(100))
print(int(9.99))
print(bool(0))
print(bool("hi"))`,
          },
          {
            type: 'ul',
            items: [
              '`int(9.99)` gives `9`. It **truncates**, it does not round.',
              '`bool(0)`, `bool("")` and `bool(None)` are `False`. **Everything else is True.**',
            ],
          },
          { type: 'h3', text: 'A common error' },
          {
            type: 'p',
            text: 'Text and numbers cannot be added. Run this to see the `TypeError`, then fix it with `int(a) + 5`.',
          },
          {
            type: 'code',
            label: 'Try it: run, read the error, then fix it',
            runnable: true,
            code: raw`a = "5"          # input() gives you text like this
print(a + 5)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Why does `"5" + "5"` give `55`?',
          },
        ],
      },
      {
        id: 's2-operators',
        title: 'Basic operators',
        blocks: [
          { type: 'h3', text: 'Arithmetic' },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b = 10, 3
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)`,
          },
          {
            type: 'ul',
            items: [
              '`/` **always returns a float**.',
              '`//` is **floor division**.',
              '`%` is the **remainder**.',
              '`**` is the **power**.',
            ],
          },
          { type: 'h3', text: 'Assignment operators' },
          {
            type: 'code',
            runnable: true,
            code: raw`x = 10
x += 5
x -= 3
x *= 2
x /= 4
print(x)`,
          },
          { type: 'h3', text: 'Operator precedence' },
          {
            type: 'p',
            text: 'Python works in this order: `()`, then `**`, then `* / // %`, then `+ -`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`print(2 + 3 * 4)
print((2 + 3) * 4)`,
          },
        ],
      },
      {
        id: 's2-extras',
        title: 'Useful extras',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`name = "Aman"
print(5 + 3, "is the sum")
print("Age:", 25)
print("Name: " + name)
print("Age: " + str(25))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Remember',
            text: 'Mixing a string and a number with `+` needs `str()`. Using a **comma** in `print()` does not.',
          },
        ],
      },
      {
        id: 's2-practice',
        title: 'Practice questions',
        blocks: [
          {
            type: 'ol',
            items: [
              'Store your name, age, height and student status in variables and print each with its type.',
              'Take two numbers from the user and print their sum, difference, product and division.',
              'Take the radius of a circle and print its area (`3.14 * r * r`).',
              'Take marks in 3 subjects and print the total and average.',
              'Swap two variables without using a third variable (`a, b = b, a`).',
              'Take a temperature in Celsius and convert it to Fahrenheit (`F = C * 9/5 + 32`).',
              'Find the error and fix it (see the next slide).',
            ],
          },
          { type: 'h3', text: 'Find the error and fix it' },
          {
            type: 'code',
            label: 'Your turn: fix it and press Run',
            runnable: true,
            code: raw`age = "20"     # imagine this came from input()
print(age + 1)`,
          },
          { type: 'h3', text: 'Try the swap' },
          {
            type: 'code',
            label: 'Your turn: swap a and b, then press Run',
            runnable: true,
            code: raw`a = 5
b = 10
# swap a and b without a third variable
print(a, b)`,
          },
        ],
      },
      {
        id: 's2-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a simple **bill calculator**: take the item price and quantity, and print the total.',
              'Write a program that takes **name, age and city**, and prints one formatted introduction line.',
              'Revise the **naming rules** and **data types**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Strings and operators.',
          },
        ],
      },
    ],
  },
  {
    slug: 'strings-and-operators',
    title: 'Strings and Operators',
    summary: 'Work with text using indexing, slicing, string methods and f-strings, then compare values with operators.',
    hero: { file: 'strings.py', lines: ['text = "Python"', 'print(text[0:2])'], output: 'Py' },
    sections: [
      {
        id: 's3-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What does `input()` always return?',
              'What is the output of `int("5") + 5`?',
              'What is the difference between `/` and `//`?',
            ],
          },
        ],
      },
      {
        id: 's3-what-is-a-string',
        title: 'What is a string?',
        blocks: [
          {
            type: 'p',
            text: 'A string is a **sequence of characters** inside quotes.',
          },
          {
            type: 'code',
            label: 'strings.py',
            runnable: true,
            code: raw`a = 'Python'
b = "Python"
c = """This is
a multi-line
string"""
print(a, b)
print(c)`,
          },
          { type: 'h3', text: 'Quotes' },
          {
            type: 'ul',
            items: [
              '**Single and double quotes** work the same way.',
              'Use **triple quotes** for multi-line text.',
              'You can **mix quotes** to put one kind inside the other.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`print("It's a good day")
print('He said "Hello"')`,
          },
          { type: 'h3', text: 'Escape characters' },
          {
            type: 'code',
            runnable: true,
            code: raw`print("Line 1\nLine 2")
print("Name\tAge")
print("He said \"Hi\"")
print("C:\\Users")`,
          },
          { type: 'h3', text: 'Escape table' },
          {
            type: 'table',
            head: ['Escape', 'Meaning'],
            rows: [
              ['`\\n`', 'new line'],
              ['`\\t`', 'tab'],
              ['`\\\\`', 'backslash'],
              ['`\\"`', 'double quote'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'How do you print `I\'m "happy"`?',
          },
        ],
      },
      {
        id: 's3-indexing',
        title: 'Indexing',
        blocks: [
          {
            type: 'p',
            text: 'Every character has a position, called its **index**, and counting starts from **0**.',
          },
          {
            type: 'code',
            label: 'Index positions',
            code: raw` P   y   t   h   o   n
 0   1   2   3   4   5
-6  -5  -4  -3  -2  -1`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`s = "Python"
print(s[0])
print(s[3])
print(s[-1])
print(s[-3])`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What is `s[-2]`?',
          },
          { type: 'h3', text: 'Two errors to know' },
          {
            type: 'ul',
            items: [
              '`s[6]` gives an **IndexError**, because there is no position 6.',
              'Strings are **immutable**: `s[0] = "J"` gives a **TypeError**. You cannot change a character in place.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: read the error',
            runnable: true,
            code: raw`s = "Python"
print(s[6])`,
          },
          {
            type: 'code',
            label: 'Try it: read the error',
            runnable: true,
            code: raw`s = "Python"
s[0] = "J"`,
          },
        ],
      },
      {
        id: 's3-slicing',
        title: 'Slicing',
        blocks: [
          {
            type: 'p',
            text: 'Syntax: `string[start:stop:step]`. The **stop index is not included**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`s = "Python Programming"
print(s[0:6])
print(s[:6])
print(s[7:])
print(s[:])
print(s[::2])
print(s[::-1])
print(s[-11:])`,
          },
          { type: 'h3', text: 'How slicing works' },
          {
            type: 'ul',
            items: [
              'Leaving out **start** means from the beginning.',
              'Leaving out **stop** means up to the end.',
              'A step of **-1** reverses the string.',
            ],
          },
        ],
      },
      {
        id: 's3-methods',
        title: 'Common string functions and methods',
        blocks: [
          {
            type: 'p',
            text: '`len()` is a **function**. The rest are **methods**, called with a dot.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`s = "  Hello Python  "
print(len(s))`,
          },
          { type: 'h3', text: 'Changing the text' },
          {
            type: 'table',
            head: ['Method', 'Purpose', 'Example'],
            rows: [
              ['`upper()`', 'all capitals', '`"abc".upper()` gives `ABC`'],
              ['`lower()`', 'all small', '`"ABC".lower()` gives `abc`'],
              ['`title()`', 'first letter of each word capital', '`"hello world".title()`'],
              ['`capitalize()`', 'first letter of the string capital', '`"hello world".capitalize()`'],
              ['`strip()`', 'remove spaces at both ends', '`"  hi  ".strip()`'],
              ['`lstrip()` / `rstrip()`', 'remove left or right spaces', ''],
              ['`replace(a, b)`', 'replace text', '`"cat".replace("c", "b")`'],
            ],
          },
          { type: 'h3', text: 'Searching and checking' },
          {
            type: 'table',
            head: ['Method', 'Purpose', 'Example'],
            rows: [
              ['`find(x)`', 'first index, or -1 if not found', '`"hello".find("l")`'],
              ['`count(x)`', 'number of occurrences', '`"banana".count("a")`'],
              ['`startswith(x)`', 'True or False', '`"python".startswith("py")`'],
              ['`endswith(x)`', 'True or False', '`"file.py".endswith(".py")`'],
              ['`isdigit()`', 'only digits?', '`"123".isdigit()`'],
              ['`isalpha()`', 'only letters?', '`"abc".isalpha()`'],
            ],
          },
          { type: 'h3', text: 'Splitting and joining' },
          {
            type: 'table',
            head: ['Method', 'Purpose', 'Example'],
            rows: [
              ['`split()`', 'break into a list', '`"a b c".split()`'],
              ['`join()`', 'join a list into a string', '`"-".join(["a","b"])`'],
            ],
          },
          { type: 'h3', text: 'Try the methods' },
          {
            type: 'code',
            runnable: true,
            code: raw`text = "python is easy"
print(text.upper())
print(text.title())
print(text.replace("easy", "powerful"))
print(text.split())
print(text.count("s"))`,
          },
          { type: 'h3', text: 'Methods return a new string' },
          {
            type: 'note',
            tone: 'warn',
            title: 'Important',
            text: 'Methods **return a new string**. They do not change the original.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`name = "aman"
name.upper()
print(name)
name = name.upper()
print(name)`,
          },
        ],
      },
      {
        id: 's3-operations',
        title: 'String operations',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`a = "Hello"
b = "World"
print(a + b)
print(a + " " + b)
print(a * 3)
print("a" in "apple")
print("z" not in "apple")`,
          },
          {
            type: 'ul',
            items: [
              '`+` is **concatenation**.',
              '`*` is **repetition**.',
              '`in` checks whether something is **present**.',
            ],
          },
          { type: 'h3', text: 'Mixing a string and a number' },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 25
print("Age: " + str(age))`,
          },
        ],
      },
      {
        id: 's3-fstrings',
        title: 'f-strings (formatted strings)',
        blocks: [
          {
            type: 'p',
            text: 'The **cleanest way** to mix text and variables.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`name = "Aman"
age = 25
print(f"My name is {name} and I am {age} years old")
print(f"Next year I will be {age + 1}")`,
          },
          { type: 'h3', text: 'Formatting numbers' },
          {
            type: 'code',
            runnable: true,
            code: raw`price = 49.5678
print(f"Price: {price:.2f}")
print(f"{1000000:,}")`,
          },
          {
            type: 'ul',
            items: [
              '`.2f` shows **2 decimal places**.',
              '`,` adds **thousand separators**.',
            ],
          },
        ],
      },
      {
        id: 's3-operators',
        title: 'Operators',
        blocks: [
          { type: 'h3', text: 'Arithmetic (quick revision)' },
          {
            type: 'code',
            runnable: true,
            code: raw`print(10 + 3, 10 - 3, 10 * 3, 10 / 3, 10 // 3, 10 % 3, 10 ** 3)`,
          },
          { type: 'h3', text: 'Comparison operators' },
          {
            type: 'p',
            text: 'The result is always **True or False**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b = 10, 20
print(a == b)
print(a != b)
print(a > b)
print(a < b)
print(a >= 10)
print(a <= 5)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Classic beginner mistake',
            text: '`=` **assigns** and `==` **compares**. Do not mix them up.',
          },
          { type: 'h3', text: 'Logical operators' },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 22
marks = 80
print(age > 18 and marks > 75)
print(age > 25 or marks > 75)
print(not age > 18)`,
          },
          {
            type: 'table',
            head: ['Operator', 'Meaning'],
            rows: [
              ['`and`', 'True only if both are True'],
              ['`or`', 'True if at least one is True'],
              ['`not`', 'reverses the result'],
            ],
          },
          { type: 'h3', text: 'Truth table' },
          {
            type: 'table',
            head: ['A', 'B', 'A and B', 'A or B'],
            rows: [
              ['T', 'T', 'T', 'T'],
              ['T', 'F', 'F', 'T'],
              ['F', 'T', 'F', 'T'],
              ['F', 'F', 'F', 'F'],
            ],
          },
          { type: 'h3', text: 'Comparing strings' },
          {
            type: 'code',
            runnable: true,
            code: raw`print("apple" == "apple")
print("Apple" == "apple")
print("a" < "b")`,
          },
          {
            type: 'p',
            text: 'Comparison is **case-sensitive**.',
          },
          { type: 'h3', text: 'Membership and identity (brief)' },
          {
            type: 'code',
            runnable: true,
            code: raw`print("py" in "python")
x = None
print(x is None)`,
          },
          { type: 'h3', text: 'Operator precedence (high to low)' },
          {
            type: 'ol',
            items: [
              '`()`',
              '`**`',
              '`* / // %`',
              '`+ -`',
              'comparison operators',
              '`not`',
              '`and`',
              '`or`',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`print(5 + 3 > 7 and 10 % 3 == 1)`,
          },
        ],
      },
      {
        id: 's3-practice',
        title: 'Practice questions',
        blocks: [
          { type: 'h3', text: 'Strings' },
          {
            type: 'ol',
            items: [
              'Take a name and print its length, uppercase, lowercase and reversed form.',
              'Take a name and print the first letter, the last letter and the middle character.',
              'Take a sentence and print the number of words (use `split()` and `len()`).',
              'Take an email address and print the username and domain (use `split("@")`).',
              'Count how many times `a` appears in a user-entered word.',
              'Take a string with extra spaces and print it cleaned and in title case.',
            ],
          },
          { type: 'h3', text: 'f-strings and operators' },
          {
            type: 'ol',
            start: 7,
            items: [
              'Print `Name: ... | Age: ... | City: ...` using an f-string.',
              'Take two numbers and print whether the first is greater, equal, or smaller, as True/False values.',
              'Take age and print whether the person is eligible to vote (`age >= 18`).',
              'Take a number and check whether it is even (`n % 2 == 0`).',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`s = "Programming"
print(s[2:6])
print(s[::-1])
print(s[-3:])`,
          },
          { type: 'h3', text: 'Try the first question' },
          {
            type: 'code',
            label: 'Your turn: finish the program, then press Run',
            runnable: true,
            code: raw`name = "Aman"
# print the length, uppercase, lowercase and reversed form
print(len(name))`,
          },
        ],
      },
      {
        id: 's3-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Take a full name (for example `aman kumar raj`) and print it in **title case**, then print the **initials** (`A.K.R.`).',
              'Write a program that takes a word and prints the **first 3 and last 3 letters**.',
              'Write a program that takes marks in 3 subjects, prints the **average with 2 decimals** using an f-string, and prints `True` or `False` for whether the average is **at least 40**.',
              'Revise the **string methods** table.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Conditional statements (`if`, `elif`, `else`).',
          },
        ],
      },
    ],
  },
  {
    slug: 'conditional-statements',
    title: 'Conditional Statements',
    summary: 'Make your programs decide with if, elif, else and nested conditions.',
    hero: {
      file: 'age.py',
      lines: ['age = 20', 'if age >= 18:', '    print("Adult")'],
      output: 'Adult',
    },
    sections: [
      {
        id: 's4-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between `=` and `==`?',
              'What is the output of `"Apple" == "apple"`?',
              'What does `age > 18 and marks > 75` give when both parts are True?',
            ],
          },
        ],
      },
      {
        id: 's4-why-conditions',
        title: 'Why do we need conditions?',
        blocks: [
          {
            type: 'p',
            text: 'So far every line of our programs ran, **one after another**. Real programs need to **make decisions**: allow the login only if the password is right, give a discount only if the bill is large enough.',
          },
          {
            type: 'p',
            text: 'A **condition** is an expression that gives **True or False**, such as `age >= 18`. A conditional statement runs a block of code **only when the condition is True**.',
          },
          {
            type: 'table',
            head: ['Statement', 'Use it when'],
            rows: [
              ['`if`', 'one thing needs a check'],
              ['`if` ... `else`', 'there are two ways to go'],
              ['`if` ... `elif` ... `else`', 'there are several ways to go'],
              ['nested `if`', 'a decision depends on an earlier decision'],
            ],
          },
        ],
      },
      {
        id: 's4-if',
        title: 'The if statement',
        blocks: [
          {
            type: 'code',
            label: 'Syntax',
            code: raw`if condition:
    statement`,
          },
          {
            type: 'code',
            label: 'age.py',
            runnable: true,
            code: raw`age = 20
if age >= 18:
    print("You can vote")
print("Done")`,
          },
          { type: 'h3', text: 'Colon and indentation' },
          {
            type: 'ul',
            items: [
              'The line ends with a **colon** (`:`).',
              'The code that belongs to the `if` is **indented**, normally by **4 spaces**.',
              'Python uses **indentation instead of brackets**. Every indented line is inside the block.',
              'The first line that is **not indented** (`print("Done")`) runs every time.',
            ],
          },
          { type: 'h3', text: 'A block can have many lines' },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = 72
if marks >= 40:
    print("Pass")
    print("Well done")
print("Result checked")`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What is printed if `marks = 30`?',
          },
          { type: 'h3', text: 'Forgetting the indentation' },
          {
            type: 'code',
            label: 'Try it: read the error, then indent the print line',
            runnable: true,
            code: raw`age = 20
if age >= 18:
print("You can vote")`,
          },
        ],
      },
      {
        id: 's4-if-else',
        title: 'The if ... else statement',
        blocks: [
          {
            type: 'p',
            text: '`else` runs when the condition is **False**. Exactly **one** of the two blocks runs.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`number = 7
if number % 2 == 0:
    print("Even")
else:
    print("Odd")`,
          },
          {
            type: 'ul',
            items: [
              '`else` has **no condition** of its own.',
              '`else` also ends with a **colon** and has an **indented block**.',
              '`else` lines up with the `if` it belongs to.',
            ],
          },
          { type: 'h3', text: 'Try it yourself' },
          {
            type: 'code',
            label: 'Your turn: change the age, then press Run',
            runnable: true,
            code: raw`age = 16
if age >= 18:
    print("Eligible to vote")
else:
    print("Not eligible to vote")`,
          },
        ],
      },
      {
        id: 's4-elif',
        title: 'The if ... elif ... else ladder',
        blocks: [
          {
            type: 'p',
            text: 'Use `elif` (short for **else if**) when there are **more than two choices**. Python checks from the top and runs the **first block whose condition is True**, then skips the rest.',
          },
          {
            type: 'code',
            label: 'Grade ladder',
            runnable: true,
            code: raw`marks = 82
if marks >= 90:
    print("Grade A+")
elif marks >= 75:
    print("Grade A")
elif marks >= 60:
    print("Grade B")
elif marks >= 40:
    print("Grade C")
else:
    print("Fail")`,
          },
          {
            type: 'ul',
            items: [
              'You can have **as many** `elif` blocks as you need.',
              '`else` is **optional** and always comes **last**.',
              'Only **one** block in the whole ladder runs.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What grade does `marks = 75` give? What about `marks = 74`?',
          },
          { type: 'h3', text: 'Order matters' },
          {
            type: 'p',
            text: 'Put the **most specific** condition first. Here the first test is True for 82, so the better grade is never reached.',
          },
          {
            type: 'code',
            label: 'Run it and spot the bug',
            runnable: true,
            code: raw`marks = 82
if marks >= 40:
    print("Grade C")
elif marks >= 75:
    print("Grade A")`,
          },
          { type: 'h3', text: 'Separate ifs or elif?' },
          {
            type: 'code',
            runnable: true,
            code: raw`x = 15
print("Separate ifs:")
if x > 10:
    print("more than 10")
if x > 5:
    print("more than 5")
print("With elif:")
if x > 10:
    print("more than 10")
elif x > 5:
    print("more than 5")`,
          },
          {
            type: 'p',
            text: 'Separate `if` statements are **all checked**. An `elif` is checked **only if the earlier ones were False**.',
          },
        ],
      },
      {
        id: 's4-nested',
        title: 'Nested conditions',
        blocks: [
          {
            type: 'p',
            text: 'An `if` **inside another** `if` is called a nested condition. The inner check happens **only if the outer one is True**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 25
has_id = True
if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("Show your ID")
else:
    print("Too young")`,
          },
          {
            type: 'ul',
            items: [
              'Each level is indented **4 more spaces**.',
              'An `else` belongs to the `if` at the **same indentation**.',
            ],
          },
          { type: 'h3', text: 'Nested or and?' },
          {
            type: 'p',
            text: 'When you only need **both** checks to pass, `and` is shorter and easier to read.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 25
has_id = True
if age >= 18 and has_id:
    print("Entry allowed")
else:
    print("Not allowed")`,
          },
          {
            type: 'p',
            text: 'Use nesting when you need a **different message for each failure**, as in the first example.',
          },
          { type: 'h3', text: 'Largest of three numbers' },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b, c = 12, 45, 30
if a >= b:
    if a >= c:
        print(a, "is largest")
    else:
        print(c, "is largest")
else:
    if b >= c:
        print(b, "is largest")
    else:
        print(c, "is largest")`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Can you write the same program with `and` and `elif`? Which is easier to read?',
          },
        ],
      },
      {
        id: 's4-conditions',
        title: 'Writing good conditions',
        blocks: [
          { type: 'h3', text: 'Combining with and, or, not' },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 30
income = 25000
if age >= 18 and income > 20000:
    print("Loan approved")
if age < 18 or age > 60:
    print("Special ticket")
else:
    print("Normal ticket")`,
          },
          { type: 'h3', text: 'Chained comparison' },
          {
            type: 'p',
            text: 'Python lets you write a range check the way you would in maths.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 30
print(18 <= age <= 60)
print(18 <= age and age <= 60)`,
          },
          { type: 'h3', text: 'Checking membership' },
          {
            type: 'code',
            runnable: true,
            code: raw`letter = "e"
if letter in "aeiou":
    print("Vowel")
else:
    print("Consonant")`,
          },
          { type: 'h3', text: 'Truthy and falsy values' },
          {
            type: 'p',
            text: 'A condition does not have to be a comparison. **Empty or zero values count as False**, and everything else counts as True.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`name = ""
if name:
    print("Hello", name)
else:
    print("Name is empty")`,
          },
          { type: 'h3', text: 'Comparing text safely' },
          {
            type: 'p',
            text: 'Text comparison is **case-sensitive**. Convert first with `lower()` so `YES`, `Yes` and `yes` all work.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`answer = "YES"
if answer.lower() == "yes":
    print("Confirmed")
else:
    print("Cancelled")`,
          },
        ],
      },
      {
        id: 's4-one-line',
        title: 'One-line if (conditional expression)',
        blocks: [
          {
            type: 'p',
            text: 'When a decision only **picks one of two values**, you can write it on **one line**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`age = 20
status = "adult" if age >= 18 else "minor"
print(status)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Pattern',
            text: '`value_if_true if condition else value_if_false`. Keep it for **short, simple** choices. Use a normal `if` block for anything longer.',
          },
        ],
      },
      {
        id: 's4-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'table',
            head: ['Mistake', 'Example', 'Fix'],
            rows: [
              ['`=` instead of `==`', '`if age = 18:`', '`if age == 18:`'],
              ['Missing colon', '`if age >= 18`', '`if age >= 18:`'],
              ['Missing indentation', 'body on the same level as `if`', 'indent the body by 4 spaces'],
              ['Uneven indentation', '3 spaces on one line, 4 on the next', 'use the same amount for the whole block'],
              ['Text compared with a number', '`"20" >= 18`', '`int("20") >= 18`'],
              ['`elif` or `else` with no `if`', '`else:` on its own', 'start with `if`'],
            ],
          },
          { type: 'h3', text: 'Assignment or comparison?' },
          {
            type: 'code',
            label: 'Try it: read the error, then fix it',
            runnable: true,
            code: raw`age = 18
if age = 18:
    print("Eighteen")`,
          },
          { type: 'h3', text: 'Text and numbers' },
          {
            type: 'p',
            text: '`input()` always gives text, so convert before comparing.',
          },
          {
            type: 'code',
            label: 'Try it: read the error, then fix it with int()',
            runnable: true,
            code: raw`age = "20"     # imagine this came from input()
if age >= 18:
    print("Adult")`,
          },
          {
            type: 'code',
            label: 'Run this one in VS Code or a terminal',
            code: raw`age = int(input("Enter your age: "))
if age >= 18:
    print("Adult")
else:
    print("Minor")`,
          },
        ],
      },
      {
        id: 's4-practice',
        title: 'Practice questions',
        blocks: [
          { type: 'h3', text: 'Basic questions' },
          {
            type: 'ol',
            items: [
              'Take an age and print whether the person is eligible to vote.',
              'Take a number and print whether it is positive, negative or zero.',
              'Take a number and print whether it is even or odd.',
              'Take marks and print the grade: A for 90 or more, B for 75 or more, C for 60 or more, D for 40 or more, otherwise Fail.',
              'Take a letter and print whether it is a vowel or a consonant.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Take three numbers and print the largest.',
              'Take a year and check whether it is a leap year. A year is a leap year if it is divisible by 4 and not by 100, or if it is divisible by 400.',
              'Ticket price: free for age below 5, half price from 5 to 12, full price above 12. Take the age and print the price.',
              'Simple calculator: take two numbers and an operator (`+`, `-`, `*`, `/`) and print the result. Print a message if the user divides by zero.',
              'Login check: take a username and password and print "Login successful" only if both are correct.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`x = 7
if x > 5:
    if x > 10:
        print("A")
    else:
        print("B")
else:
    print("C")`,
          },
          { type: 'h3', text: 'Try the leap year question' },
          {
            type: 'code',
            label: 'Your turn: finish the program, change the year and press Run',
            runnable: true,
            code: raw`year = 2024
# print "Leap year" or "Not a leap year"
`,
          },
        ],
      },
      {
        id: 's4-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Take marks in **3 subjects**, work out the **average**, and print the **grade** and whether the student has passed (average of at least 40).',
              'Write an **electricity bill** program: up to 100 units cost 5 per unit, and each unit above 100 costs 8.',
              'Take the **three sides** of a triangle. Check that it is a valid triangle (each side is shorter than the sum of the other two), then print whether it is equilateral, isosceles or scalene.',
              'Revise the **indentation rules** and why **the order of elif blocks matters**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Loops: `while` and `for`.',
          },
        ],
      },
    ],
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeat work with for and while, count with range(), and control a loop with break and continue.',
    hero: {
      file: 'loop.py',
      lines: ['for i in range(1, 4):', '    print(i)'],
      output: '1\n2\n3',
    },
    sections: [
      {
        id: 's5-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between `if` and `elif`?',
              'What is the output of `print(10 > 5 and 3 > 8)`?',
              'Why does indentation matter in Python?',
            ],
          },
        ],
      },
      {
        id: 's5-why-loops',
        title: 'Why do we need loops?',
        blocks: [
          {
            type: 'p',
            text: 'A **loop** repeats a block of code. Without a loop, repeating a task means **copying the same line again and again**.',
          },
          {
            type: 'code',
            label: 'Without a loop',
            runnable: true,
            code: raw`print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")`,
          },
          {
            type: 'code',
            label: 'With a loop: same result, and it still works for 5000 times',
            runnable: true,
            code: raw`for i in range(5):
    print("Hello")`,
          },
          { type: 'h3', text: 'Two kinds of loop' },
          {
            type: 'table',
            head: ['Loop', 'Use it when'],
            rows: [
              ['`for`', 'you know **how many times**, or you want to go through **every item**'],
              ['`while`', 'you want to repeat **until a condition becomes False**'],
            ],
          },
        ],
      },
      {
        id: 's5-for',
        title: 'The for loop',
        blocks: [
          {
            type: 'code',
            label: 'Syntax',
            code: raw`for variable in sequence:
    statement`,
          },
          {
            type: 'p',
            text: 'The loop **takes one item at a time** from the sequence, stores it in the variable, and runs the indented block. When the items run out, the loop ends.',
          },
          { type: 'h3', text: 'Looping through a string' },
          {
            type: 'code',
            runnable: true,
            code: raw`for letter in "Python":
    print(letter)`,
          },
          { type: 'h3', text: 'Looping through a list (preview)' },
          {
            type: 'p',
            text: 'A **list** holds several values in square brackets. You will study lists later; for now, see that a loop can go through one.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print("I like", fruit)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What is the loop variable in `for letter in "Python":`? What value does it hold in the third round?',
          },
          { type: 'h3', text: 'Printing on one line' },
          {
            type: 'p',
            text: '`print()` normally ends with a new line. `end=" "` changes that.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 6):
    print(i, end=" ")`,
          },
        ],
      },
      {
        id: 's5-range',
        title: 'The range() function',
        blocks: [
          {
            type: 'p',
            text: '`range()` makes a **sequence of numbers** for a loop. It has three forms: `range(stop)`, `range(start, stop)` and `range(start, stop, step)`.',
          },
          {
            type: 'table',
            head: ['Call', 'Numbers it gives'],
            rows: [
              ['`range(5)`', '0, 1, 2, 3, 4'],
              ['`range(1, 6)`', '1, 2, 3, 4, 5'],
              ['`range(0, 10, 2)`', '0, 2, 4, 6, 8'],
              ['`range(10, 0, -2)`', '10, 8, 6, 4, 2'],
            ],
          },
          {
            type: 'ul',
            items: [
              '`start` is **0** if you leave it out.',
              '`step` is **1** if you leave it out.',
              'The **stop number is never included**, just like in slicing.',
              'A **negative step** counts down.',
            ],
          },
          { type: 'h3', text: 'See the numbers' },
          {
            type: 'code',
            runnable: true,
            code: raw`print(list(range(5)))
print(list(range(1, 6)))
print(list(range(0, 10, 2)))
print(list(range(10, 0, -2)))`,
          },
          { type: 'h3', text: 'Sum of 1 to 10' },
          {
            type: 'code',
            runnable: true,
            code: raw`total = 0
for n in range(1, 11):
    total += n
print(total)`,
          },
          { type: 'h3', text: 'A multiplication table' },
          {
            type: 'code',
            runnable: true,
            code: raw`number = 5
for i in range(1, 11):
    print(number, "x", i, "=", number * i)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'How would you print the numbers from 10 down to 1?',
          },
        ],
      },
      {
        id: 's5-while',
        title: 'The while loop',
        blocks: [
          {
            type: 'code',
            label: 'Syntax',
            code: raw`while condition:
    statement`,
          },
          {
            type: 'p',
            text: 'Python **checks the condition before every round**. While it is True, the block runs again. When it becomes False, the loop ends.',
          },
          {
            type: 'code',
            label: 'Counting with while',
            runnable: true,
            code: raw`count = 1
while count <= 5:
    print(count)
    count += 1
print("Done")`,
          },
          {
            type: 'ul',
            items: [
              '**Start** the counter before the loop (`count = 1`).',
              '**Test** it in the condition (`count <= 5`).',
              '**Change** it inside the loop (`count += 1`). Without this the loop never ends.',
            ],
          },
          { type: 'h3', text: 'The loop may run zero times' },
          {
            type: 'p',
            text: 'If the condition is False at the very start, the block **never runs**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`count = 10
while count <= 5:
    print("This never prints")
print("Finished")`,
          },
          { type: 'h3', text: 'Sum of the digits of a number' },
          {
            type: 'code',
            runnable: true,
            code: raw`n = 1234
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'In the digits program, what are the values of `n` after each round?',
          },
        ],
      },
      {
        id: 's5-infinite',
        title: 'Infinite loops',
        blocks: [
          {
            type: 'p',
            text: 'A loop whose condition **never becomes False** runs forever. This is called an **infinite loop**.',
          },
          {
            type: 'code',
            label: 'Do NOT run this: it never stops',
            code: raw`count = 1
while count <= 5:
    print(count)
    # count never changes, so count <= 5 is always True`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'If your program gets stuck',
            text: 'Press **Ctrl + C** in the terminal to stop it. In the browser boxes on this site, close and reopen the tab.',
          },
          { type: 'h3', text: 'Waiting for the right answer' },
          {
            type: 'p',
            text: 'A `while` loop is perfect when you do not know how many tries the user needs.',
          },
          {
            type: 'code',
            label: 'Run this one in VS Code or a terminal',
            code: raw`password = ""
while password != "python123":
    password = input("Enter password: ")
print("Access granted")`,
          },
          { type: 'h3', text: 'for or while?' },
          {
            type: 'table',
            head: ['Situation', 'Better choice'],
            rows: [
              ['Repeat exactly 10 times', '`for`'],
              ['Go through every letter of a word', '`for`'],
              ['Keep asking until the answer is correct', '`while`'],
              ['Repeat until a number reaches 0', '`while`'],
            ],
          },
        ],
      },
      {
        id: 's5-break',
        title: 'The break statement',
        blocks: [
          {
            type: 'p',
            text: '`break` **stops the loop immediately** and jumps to the first line after it.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for number in range(1, 20):
    if number % 7 == 0:
        print("First multiple of 7:", number)
        break
print("Loop ended")`,
          },
          { type: 'h3', text: 'while True with break' },
          {
            type: 'p',
            text: '`while True` repeats **forever**, so a `break` inside decides when to stop. This is a common pattern.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`count = 0
while True:
    count += 1
    if count == 3:
        break
print(count)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What would the first program print without the `break` line?',
          },
        ],
      },
      {
        id: 's5-continue',
        title: 'The continue statement',
        blocks: [
          {
            type: 'p',
            text: '`continue` **skips the rest of the current round** and goes straight to the next one. The loop does **not** stop.',
          },
          {
            type: 'code',
            label: 'Skip the even numbers',
            runnable: true,
            code: raw`for i in range(1, 8):
    if i % 2 == 0:
        continue
    print(i)`,
          },
          { type: 'h3', text: 'break and continue together' },
          {
            type: 'table',
            head: ['Statement', 'What it does'],
            rows: [
              ['`break`', 'ends the **whole loop**'],
              ['`continue`', 'ends only the **current round**'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 10):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)`,
          },
        ],
      },
      {
        id: 's5-nested',
        title: 'Loops inside loops',
        blocks: [
          {
            type: 'p',
            text: 'A loop can sit **inside another loop**. For every round of the outer loop, the inner loop runs **completely**.',
          },
          {
            type: 'code',
            label: 'A star triangle',
            runnable: true,
            code: raw`for i in range(1, 5):
    print("*" * i)`,
          },
          { type: 'h3', text: 'A multiplication grid' },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end=" ")
    print()`,
          },
          {
            type: 'ul',
            items: [
              'The inner loop is indented **one more level**.',
              '`print()` with nothing inside **ends the line** after each row.',
            ],
          },
        ],
      },
      {
        id: 's5-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'table',
            head: ['Mistake', 'What happens', 'Fix'],
            rows: [
              ['Forgetting the colon', 'SyntaxError', 'end the `for` or `while` line with `:`'],
              ['`range(1, 5)` expecting 5', 'stops at 4', 'use `range(1, 6)`'],
              ['Not changing the counter in `while`', 'infinite loop', 'update it inside the loop'],
              ['Wrong indentation', 'a line runs once, or every round', 'indent only what must repeat'],
            ],
          },
          { type: 'h3', text: 'Off by one' },
          {
            type: 'code',
            label: 'Try it: change it so that 5 is printed too',
            runnable: true,
            code: raw`for i in range(1, 5):
    print(i)`,
          },
          { type: 'h3', text: 'Inside or outside?' },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(3):
    print("inside", i)
print("outside")`,
          },
        ],
      },
      {
        id: 's5-practice',
        title: 'Practice questions',
        blocks: [
          { type: 'h3', text: 'Basic questions' },
          {
            type: 'ol',
            items: [
              'Print the numbers from 1 to 10.',
              'Print the even numbers from 1 to 50.',
              'Print the sum of the numbers from 1 to 100.',
              'Take a number and print its multiplication table up to 10.',
              'Take a number and print its factorial.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Take a word and count how many vowels it has.',
              'Print a word in reverse using a loop (do not use slicing).',
              'Print a star triangle with 5 rows.',
              'Take a number and find the sum of its digits using a `while` loop.',
              'Keep asking for a password until the user types the right one, then print "Welcome".',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`for i in range(1, 6):
    if i == 3:
        continue
    if i == 5:
        break
    print(i)`,
          },
          { type: 'h3', text: 'Try the sum question' },
          {
            type: 'code',
            label: 'Your turn: add the numbers 1 to 100, then press Run',
            runnable: true,
            code: raw`total = 0
# add the numbers 1 to 100 using a for loop
print(total)`,
          },
        ],
      },
      {
        id: 's5-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Print a **multiplication table** in this format: `5 x 3 = 15`, using an f-string.',
              'Write a **number guessing game**: keep a secret number, keep asking for guesses, print "too high" or "too low", and stop with `break` when the guess is right.',
              'Write **FizzBuzz**: for the numbers 1 to 50, print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, and the number otherwise.',
              'Take a number and **count its digits** using a `while` loop.',
              'Revise the **difference between break and continue**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Lists.',
          },
        ],
      },
    ],
  },
  {
    slug: 'loop-practice',
    title: 'Loop Practice',
    summary: 'Practise nested loops, print patterns, and write number programs: factorial, prime numbers and Fibonacci.',
    hero: {
      file: 'pattern.py',
      lines: ['for i in range(1, 4):', '    print("*" * i)'],
      output: '*\n**\n***',
    },
    sections: [
      {
        id: 's6-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between `break` and `continue`?',
              'Which numbers does `range(1, 5)` give?',
              'When do you choose a `while` loop instead of a `for` loop?',
            ],
          },
        ],
      },
      {
        id: 's6-nested',
        title: 'Nested loops: how they run',
        blocks: [
          {
            type: 'p',
            text: 'For **every round of the outer loop**, the inner loop runs **from start to finish**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 3):
    for j in range(1, 4):
        print("i =", i, " j =", j)`,
          },
          {
            type: 'table',
            head: ['Outer i', 'Inner j runs', 'Lines printed'],
            rows: [
              ['1', '1, 2, 3', '3'],
              ['2', '1, 2, 3', '3'],
            ],
          },
          {
            type: 'ul',
            items: [
              'The outer loop handles the **rows**.',
              'The inner loop handles the **columns** in each row.',
              'Total rounds = outer rounds x inner rounds (here 2 x 3 = 6).',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'How many lines would print if the outer loop was `range(1, 6)` and the inner loop was `range(1, 5)`?',
          },
        ],
      },
      {
        id: 's6-patterns',
        title: 'Pattern programs',
        blocks: [
          {
            type: 'p',
            text: 'Every pattern is built the same way: the **outer loop counts the rows**, and **inside each row** you print spaces, stars or numbers and then move to the next line.',
          },
          { type: 'h3', text: 'A rectangle of stars' },
          {
            type: 'code',
            runnable: true,
            code: raw`for row in range(3):
    for col in range(5):
        print("*", end="")
    print()`,
          },
          {
            type: 'ul',
            items: [
              '`end=""` keeps the stars on the **same line**.',
              'The empty `print()` after the inner loop **starts a new line**.',
            ],
          },
          { type: 'h3', text: 'Right triangle' },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 6):
    print("*" * i)`,
          },
          {
            type: 'p',
            text: 'Row `i` has `i` stars. String repetition (`"*" * i`) does the inner loop for you.',
          },
          { type: 'h3', text: 'Inverted triangle' },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(5, 0, -1):
    print("*" * i)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which part of the program makes the triangle shrink?',
          },
          { type: 'h3', text: 'Number triangle' },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 6):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()`,
          },
          { type: 'h3', text: 'The same number in each row' },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 6):
    print(str(i) * i)`,
          },
          { type: 'h3', text: 'Pyramid' },
          {
            type: 'p',
            text: 'Each row needs **spaces first**, then an **odd number of stars** (1, 3, 5, ...).',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`n = 4
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))`,
          },
          { type: 'h3', text: 'Pattern recipe' },
          {
            type: 'table',
            head: ['Step', 'Question to ask'],
            rows: [
              ['1', 'How many **rows** are there? That is the outer loop.'],
              ['2', 'In row `i`, how many **spaces** come first?'],
              ['3', 'In row `i`, how many **stars or numbers** are printed?'],
              ['4', 'Do I need `end=""`, or can I build the row as one string?'],
            ],
          },
        ],
      },
      {
        id: 's6-factorial',
        title: 'Factorial',
        blocks: [
          {
            type: 'p',
            text: 'The factorial of `n` is the **product of all numbers from 1 to n**. So `5! = 5 x 4 x 3 x 2 x 1 = 120`. By definition `0! = 1`.',
          },
          {
            type: 'code',
            label: 'With a for loop',
            runnable: true,
            code: raw`n = 5
fact = 1
for i in range(1, n + 1):
    fact *= i
print(n, "! =", fact)`,
          },
          {
            type: 'ul',
            items: [
              'Start `fact` at **1**, not 0 (anything times 0 is 0).',
              'Set it **before** the loop, so it is not reset in every round.',
            ],
          },
          { type: 'h3', text: 'With a while loop' },
          {
            type: 'code',
            runnable: true,
            code: raw`n = 5
fact = 1
while n > 1:
    fact *= n
    n -= 1
print(fact)`,
          },
          { type: 'h3', text: 'Factorials from 1 to 6' },
          {
            type: 'p',
            text: 'Here a loop inside a loop works out many factorials. Notice that `fact = 1` is **reset for every number**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for n in range(1, 7):
    fact = 1
    for i in range(1, n + 1):
        fact *= i
    print(n, "! =", fact)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What would go wrong if `fact = 1` was written before the outer loop instead?',
          },
        ],
      },
      {
        id: 's6-prime',
        title: 'Prime numbers',
        blocks: [
          {
            type: 'p',
            text: 'A **prime number** is greater than 1 and divisible only by **1 and itself**: 2, 3, 5, 7, 11, 13 ...',
          },
          {
            type: 'p',
            text: 'Idea: try to divide `n` by every number from 2 up to `n - 1`. If **any** divides it, it is **not prime**.',
          },
          {
            type: 'code',
            label: 'Is n prime?',
            runnable: true,
            code: raw`n = 29
is_prime = n > 1
for i in range(2, n):
    if n % i == 0:
        is_prime = False
        break
if is_prime:
    print(n, "is prime")
else:
    print(n, "is not prime")`,
          },
          {
            type: 'ul',
            items: [
              '`is_prime` is a **flag**: it starts as True and flips to False if a divisor is found.',
              '`break` stops at the **first divisor**, because one is enough.',
              '`n > 1` makes sure 0 and 1 are not called prime.',
            ],
          },
          { type: 'h3', text: 'A faster check' },
          {
            type: 'p',
            text: 'A divisor can only be as big as the **square root** of `n`, so you can stop there.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`n = 97
is_prime = n > 1
for i in range(2, int(n ** 0.5) + 1):
    if n % i == 0:
        is_prime = False
        break
print(n, "is prime" if is_prime else "is not prime")`,
          },
          { type: 'h3', text: 'All primes up to 30' },
          {
            type: 'code',
            runnable: true,
            code: raw`for n in range(2, 31):
    is_prime = True
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            is_prime = False
            break
    if is_prime:
        print(n, end=" ")`,
          },
        ],
      },
      {
        id: 's6-fibonacci',
        title: 'Fibonacci series',
        blocks: [
          {
            type: 'p',
            text: 'Each number is the **sum of the two before it**: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...',
          },
          {
            type: 'code',
            label: 'First 10 terms',
            runnable: true,
            code: raw`a, b = 0, 1
for _ in range(10):
    print(a, end=" ")
    a, b = b, a + b`,
          },
          {
            type: 'ul',
            items: [
              '`a` and `b` hold the **current and next** terms.',
              '`a, b = b, a + b` updates **both at once**, so no third variable is needed.',
              '`_` is a loop variable we do not use. It is a common name for that.',
            ],
          },
          { type: 'h3', text: 'Fibonacci while a value stays small' },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b = 0, 1
while a < 100:
    print(a, end=" ")
    a, b = b, a + b`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which loop is better when you want exactly 10 terms? Which when you want all terms below 100?',
          },
        ],
      },
      {
        id: 's6-number-programs',
        title: 'More number programs',
        blocks: [
          { type: 'h3', text: 'Reverse a number and check a palindrome' },
          {
            type: 'code',
            runnable: true,
            code: raw`n = 1221
original = n
rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10
print(rev)
if rev == original:
    print("Palindrome number")
else:
    print("Not a palindrome")`,
          },
          {
            type: 'p',
            text: 'Each round takes the **last digit** (`n % 10`), adds it to the **end of `rev`**, and drops it from `n` (`n //= 10`).',
          },
          { type: 'h3', text: 'GCD (greatest common divisor)' },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b = 48, 18
while b != 0:
    a, b = b, a % b
print("GCD =", a)`,
          },
          {
            type: 'p',
            text: 'This is **Euclid method**: replace the pair with (smaller, remainder) until the remainder is 0.',
          },
        ],
      },
      {
        id: 's6-tips',
        title: 'Tips and common mistakes',
        blocks: [
          {
            type: 'table',
            head: ['Mistake', 'What happens', 'Fix'],
            rows: [
              ['Forgetting `print()` after the inner loop', 'the whole pattern is on one line', 'add `print()` at the outer loop level'],
              ['`range(1, n)` when you need n', 'the last row or number is missing', 'use `range(1, n + 1)`'],
              ['Starting `fact = 0`', 'the answer is always 0', 'start the product at 1'],
              ['Setting `fact = 1` outside the outer loop', 'the numbers keep growing across rounds', 'reset it inside the outer loop'],
              ['Wrong indentation of `print()`', 'prints too often or only once', 'check which loop it belongs to'],
            ],
          },
          { type: 'h3', text: 'Pattern without the new line' },
          {
            type: 'code',
            label: 'Try it: add the missing print() so each row gets its own line',
            runnable: true,
            code: raw`for i in range(1, 5):
    for j in range(1, i + 1):
        print("*", end="")`,
          },
        ],
      },
      {
        id: 's6-practice',
        title: 'Practice questions',
        blocks: [
          { type: 'h3', text: 'Pattern questions' },
          {
            type: 'ol',
            items: [
              'Print a square of stars with 4 rows and 4 columns.',
              'Print a right triangle of numbers: `1`, `1 2`, `1 2 3`, ...',
              'Print an inverted triangle of numbers: `1 2 3 4 5`, `1 2 3 4`, ...',
              'Print a pyramid of stars with 5 rows.',
              'Print a hollow square of stars (stars only on the border).',
            ],
          },
          { type: 'h3', text: 'Number program questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Take a number and print its factorial.',
              'Take a number and check whether it is prime.',
              'Print all prime numbers between 1 and 100.',
              'Print the first `n` Fibonacci numbers.',
              'Take a number and check whether it is a palindrome.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`for i in range(1, 4):
    for j in range(i):
        print(i, end=" ")
    print()`,
          },
          { type: 'h3', text: 'Try a pattern' },
          {
            type: 'code',
            label: 'Your turn: print a square of 4 x 4 stars, then press Run',
            runnable: true,
            code: raw`# use two loops and print()
`,
          },
        ],
      },
      {
        id: 's6-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Print a **diamond** of stars (a pyramid followed by an inverted pyramid).',
              'Print **Armstrong numbers** between 1 and 1000 (a number is an Armstrong number if the sum of the cubes of its digits equals the number, for example 153).',
              'Find all **perfect numbers** up to 1000 (a number equal to the sum of its divisors smaller than itself, for example 6 = 1 + 2 + 3).',
              'Take two numbers and print all **prime numbers between them**.',
              'Print the **multiplication tables from 1 to 5** side by side using nested loops.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Lists.',
          },
        ],
      },
    ],
  },
  {
    slug: 'lists',
    title: 'Lists',
    summary: 'Store many values in one variable: indexing, slicing, methods, list operations and loops over lists.',
    hero: {
      file: 'lists.py',
      lines: ['nums = [3, 1, 2]', 'nums.sort()', 'print(nums)'],
      output: '[1, 2, 3]',
    },
    sections: [
      {
        id: 's7-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What does `break` do inside a loop?',
              'Which numbers does `range(2, 10, 3)` give?',
              'How does a `for` loop take items from a string?',
            ],
          },
        ],
      },
      {
        id: 's7-what-is-a-list',
        title: 'What is a list?',
        blocks: [
          {
            type: 'p',
            text: 'A list is an **ordered collection of items** inside square brackets `[ ]`, separated by commas. One variable can hold **many values**.',
          },
          {
            type: 'code',
            label: 'lists.py',
            runnable: true,
            code: raw`numbers = [10, 20, 30]
names = ["Aman", "Riya"]
mixed = [1, "two", 3.0, True]
empty = []
print(numbers, names, mixed, empty)
print(len(numbers))
print(type(numbers))`,
          },
          {
            type: 'ul',
            items: [
              '**Ordered:** every item has a position (index), starting from 0.',
              '**Mixed types allowed:** one list can hold numbers, text and more.',
              '**Mutable:** you can change, add and remove items after the list is made.',
              '**Duplicates allowed:** the same value can appear many times.',
            ],
          },
          { type: 'h3', text: 'Making a list from other things' },
          {
            type: 'code',
            runnable: true,
            code: raw`print(list("Python"))
print(list(range(1, 6)))
print("a b c".split())`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What is the difference between `[1, 2, 3]` and `"123"`?',
          },
        ],
      },
      {
        id: 's7-indexing',
        title: 'Indexing',
        blocks: [
          {
            type: 'p',
            text: 'Indexing works **exactly like strings**: the first item is at index **0**, and **negative** indexes count from the end.',
          },
          {
            type: 'code',
            label: 'Index positions',
            code: raw`fruits = ["apple", "banana", "mango", "kiwi"]
            0        1         2        3
           -4       -3        -2       -1`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango", "kiwi"]
print(fruits[0])
print(fruits[2])
print(fruits[-1])
print(fruits[-2])`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What is `fruits[-4]`? What happens with `fruits[4]`?',
          },
          { type: 'h3', text: 'Going past the end' },
          {
            type: 'code',
            label: 'Try it: read the error',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango", "kiwi"]
print(fruits[4])`,
          },
          { type: 'h3', text: 'Lists can be changed' },
          {
            type: 'p',
            text: 'Unlike strings, a list is **mutable**. You can replace an item by assigning to its index.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango"]
fruits[1] = "orange"
print(fruits)`,
          },
        ],
      },
      {
        id: 's7-slicing',
        title: 'Slicing',
        blocks: [
          {
            type: 'p',
            text: 'Syntax: `list[start:stop:step]`. The **stop index is not included**, and a slice **gives a new list**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [10, 20, 30, 40, 50, 60]
print(nums[1:4])
print(nums[:3])
print(nums[3:])
print(nums[::2])
print(nums[::-1])
print(nums[-2:])`,
          },
          {
            type: 'ul',
            items: [
              'Leaving out **start** means from the beginning, leaving out **stop** means to the end.',
              'A step of **-1** reverses the list.',
              '`nums[:]` makes a **copy** of the whole list.',
            ],
          },
          { type: 'h3', text: 'Changing a slice' },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [10, 20, 30, 40, 50]
nums[1:3] = [21, 31]
print(nums)`,
          },
        ],
      },
      {
        id: 's7-methods',
        title: 'List methods',
        blocks: [
          {
            type: 'p',
            text: 'Methods are called with a dot, like string methods. Unlike string methods, most list methods **change the list itself**.',
          },
          { type: 'h3', text: 'Adding items' },
          {
            type: 'table',
            head: ['Method', 'What it does'],
            rows: [
              ['`append(x)`', 'adds `x` at the **end**'],
              ['`insert(i, x)`', 'adds `x` at **position i**'],
              ['`extend(items)`', 'adds **every item** of another list at the end'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana"]
fruits.append("mango")
fruits.insert(1, "kiwi")
fruits.extend(["grapes", "orange"])
print(fruits)`,
          },
          { type: 'h3', text: 'Removing items' },
          {
            type: 'table',
            head: ['Method', 'What it does'],
            rows: [
              ['`remove(x)`', 'removes the **first** `x`'],
              ['`pop()`', 'removes and **returns** the last item'],
              ['`pop(i)`', 'removes and returns the item at **position i**'],
              ['`del list[i]`', 'removes the item at position `i`'],
              ['`clear()`', 'removes **everything**'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [10, 20, 30, 20, 40]
nums.remove(20)
print(nums)
last = nums.pop()
print(last, nums)
first = nums.pop(0)
print(first, nums)
del nums[0]
print(nums)
nums.clear()
print(nums)`,
          },
          { type: 'h3', text: 'Searching' },
          {
            type: 'code',
            runnable: true,
            code: raw`colors = ["red", "green", "blue", "green"]
print(colors.index("blue"))
print(colors.count("green"))
print("red" in colors)
print("pink" in colors)`,
          },
          { type: 'h3', text: 'Sorting and reversing' },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [5, 2, 9, 1]
nums.sort()
print(nums)
nums.sort(reverse=True)
print(nums)
nums.reverse()
print(nums)
print(sorted([3, 1, 2]))`,
          },
          {
            type: 'p',
            text: '`sort()` **changes the list**. `sorted()` leaves the list alone and **gives a new sorted list**.',
          },
          { type: 'h3', text: 'Useful functions' },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = [72, 85, 60, 91]
print(len(marks), min(marks), max(marks), sum(marks))
print(sum(marks) / len(marks))`,
          },
          { type: 'h3', text: 'These methods return None' },
          {
            type: 'note',
            tone: 'warn',
            title: 'Important',
            text: '`append`, `sort`, `reverse` and similar methods change the list and **return None**. Do not write `nums = nums.sort()`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [3, 1, 2]
result = nums.sort()
print(result)
print(nums)`,
          },
        ],
      },
      {
        id: 's7-operations',
        title: 'List operations',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`a = [1, 2, 3]
b = [4, 5]
print(a + b)
print(b * 3)
print(2 in a)
print(7 not in a)
print(a == [1, 2, 3])`,
          },
          {
            type: 'ul',
            items: [
              '`+` **joins** two lists into a new one.',
              '`*` **repeats** a list.',
              '`in` and `not in` check whether a value is **present**.',
              '`==` compares **all items in order**.',
            ],
          },
          { type: 'h3', text: 'Copying a list' },
          {
            type: 'p',
            text: '`b = a` does **not** copy the list. Both names point to the **same list**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a = [1, 2, 3]
b = a
b.append(4)
print(a)
c = a.copy()
c.append(5)
print(a)
print(c)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Why did `a` change when we only appended to `b`?',
          },
        ],
      },
      {
        id: 's7-loops',
        title: 'Loops over lists',
        blocks: [
          { type: 'h3', text: 'Go through every item' },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print(fruit)`,
          },
          { type: 'h3', text: 'When you also need the index' },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango"]
for i in range(len(fruits)):
    print(i, fruits[i])
print("---")
for i, fruit in enumerate(fruits):
    print(i, fruit)`,
          },
          {
            type: 'p',
            text: '`enumerate()` hands you the **index and the item together**, which is shorter and harder to get wrong.',
          },
          { type: 'h3', text: 'With a while loop' },
          {
            type: 'code',
            runnable: true,
            code: raw`fruits = ["apple", "banana", "mango"]
i = 0
while i < len(fruits):
    print(fruits[i])
    i += 1`,
          },
          { type: 'h3', text: 'Building a list in a loop' },
          {
            type: 'code',
            runnable: true,
            code: raw`squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)`,
          },
          {
            type: 'p',
            text: 'Start with an **empty list**, then `append()` inside the loop.',
          },
          { type: 'h3', text: 'Picking items with a condition' },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [4, 7, 10, 3, 8]
evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print(evens)`,
          },
          { type: 'h3', text: 'A shorter way (preview)' },
          {
            type: 'p',
            text: 'A **list comprehension** builds the same list in one line. You will study it later.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`squares = [n * n for n in range(1, 6)]
print(squares)`,
          },
        ],
      },
      {
        id: 's7-nested',
        title: 'Lists inside lists',
        blocks: [
          {
            type: 'p',
            text: 'A list can hold **other lists**. This is how you store a **table of rows and columns**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`matrix = [[1, 2, 3], [4, 5, 6]]
print(matrix[0])
print(matrix[1][2])
for row in matrix:
    print(row)`,
          },
          {
            type: 'ul',
            items: [
              '`matrix[1]` is the **second row**.',
              '`matrix[1][2]` is the **third item of the second row**.',
              'A nested `for` loop visits **every item**.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`matrix = [[1, 2, 3], [4, 5, 6]]
for row in matrix:
    for item in row:
        print(item, end=" ")
    print()`,
          },
        ],
      },
      {
        id: 's7-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'table',
            head: ['Mistake', 'What happens', 'Fix'],
            rows: [
              ['Index too big: `fruits[4]` in a 4-item list', 'IndexError', 'the last index is `len(list) - 1`'],
              ['`nums = nums.append(5)`', 'nums becomes None', 'just write `nums.append(5)`'],
              ['`remove()` of a missing item', 'ValueError', 'check with `in` first'],
              ['`b = a` to copy', 'both names change together', 'use `a.copy()` or `a[:]`'],
              ['Adding a list with `append`', 'a list appears inside the list', 'use `extend()` to add its items'],
            ],
          },
          { type: 'h3', text: 'A missing item' },
          {
            type: 'code',
            label: 'Try it: read the error, then check with in before removing',
            runnable: true,
            code: raw`nums = [1, 2, 3]
nums.remove(10)`,
          },
          { type: 'h3', text: 'append or extend?' },
          {
            type: 'code',
            runnable: true,
            code: raw`a = [1, 2]
a.append([3, 4])
print(a)
b = [1, 2]
b.extend([3, 4])
print(b)`,
          },
        ],
      },
      {
        id: 's7-practice',
        title: 'Practice questions',
        blocks: [
          { type: 'h3', text: 'Basic questions' },
          {
            type: 'ol',
            items: [
              'Make a list of 5 numbers and print the sum and the average.',
              'Find the largest number in a list without using `max()`.',
              'Count how many even numbers are in a list.',
              'Print every item of a list with its index.',
              'Print a list in reverse order without using `reverse()` or slicing.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Remove the duplicates from a list.',
              'Find the second largest number in a list.',
              'Join two lists and sort the result.',
              'Take numbers from the user until they type 0, then print the list and its total.',
              'Make a list of the squares of the numbers 1 to 10.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`nums = [10, 20, 30, 40, 50]
print(nums[1:4])
print(nums[::-1][0])
nums.append(60)
nums.pop(0)
print(nums)
print(len(nums))`,
          },
          { type: 'h3', text: 'Try the average question' },
          {
            type: 'code',
            label: 'Your turn: print the average of the marks, then press Run',
            runnable: true,
            code: raw`marks = [72, 85, 60, 91, 78]
# print the sum and the average
`,
          },
        ],
      },
      {
        id: 's7-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a program that takes **5 marks**, stores them in a list, and prints the **highest, lowest and average**.',
              'Write a program that **separates** a list of numbers into two lists: **even** and **odd**.',
              'Write a program that **rotates** a list by one position: `[1, 2, 3, 4]` becomes `[2, 3, 4, 1]`.',
              'Write a program that finds the **common items** of two lists.',
              'Revise the **list methods** tables, especially which methods **return None**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Tuples and dictionaries.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tuples-and-sets',
    title: 'Tuples and Sets',
    summary: 'Data that cannot change and data without duplicates: tuples, immutability, unpacking and set operations.',
    hero: {
      file: 'tuples_sets.py',
      lines: ['a = {1, 2, 3}', 'b = {3, 4, 5}', 'print(a & b)'],
      output: '{3}',
    },
    sections: [
      {
        id: 's8-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What does `nums[::-1]` do to a list?',
              'What is the difference between `append()` and `extend()`?',
              'Which list method **returns None**?',
            ],
          },
        ],
      },
      {
        id: 's8-what-is-a-tuple',
        title: 'What is a tuple?',
        blocks: [
          {
            type: 'p',
            text: 'A tuple is an **ordered collection** inside round brackets `( )`. It looks like a list, but it **cannot be changed** after it is made.',
          },
          {
            type: 'code',
            label: 'tuples.py',
            runnable: true,
            code: raw`point = (3, 4)
colors = ("red", "green", "blue")
mixed = (1, "two", 3.0)
empty = ()
print(point, colors, mixed, empty)
print(len(colors))
print(type(point))`,
          },
          {
            type: 'ul',
            items: [
              '**Ordered:** every item has an index, starting from 0.',
              '**Immutable:** items cannot be changed, added or removed.',
              '**Mixed types allowed** and **duplicates allowed**, like a list.',
            ],
          },
          { type: 'h3', text: 'The one-item tuple' },
          {
            type: 'p',
            text: 'The **comma** makes the tuple, not the brackets. A single item needs a **trailing comma**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a = (5)
b = (5,)
c = 5,
print(type(a), type(b), type(c))`,
          },
          { type: 'h3', text: 'Making a tuple from other things' },
          {
            type: 'code',
            runnable: true,
            code: raw`print(tuple("abc"))
print(tuple([1, 2, 3]))
print(tuple(range(3)))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What type is `(5)`? Why is `(5,)` different?',
          },
        ],
      },
      {
        id: 's8-tuple-access',
        title: 'Indexing, slicing and methods',
        blocks: [
          {
            type: 'p',
            text: 'Reading a tuple works **exactly like a list or a string**: indexes, negative indexes and slices all work.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`days = ("Mon", "Tue", "Wed", "Thu", "Fri")
print(days[0], days[-1])
print(days[1:3])
print(days[::-1])
print("Tue" in days)`,
          },
          { type: 'h3', text: 'Only two methods' },
          {
            type: 'p',
            text: 'Because a tuple cannot change, it has only **two methods**, and both just read.',
          },
          {
            type: 'table',
            head: ['Method', 'What it does'],
            rows: [
              ['`count(x)`', 'how many times `x` appears'],
              ['`index(x)`', 'position of the **first** `x`'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`t = (1, 2, 2, 3, 2)
print(t.count(2))
print(t.index(3))`,
          },
        ],
      },
      {
        id: 's8-immutability',
        title: 'Immutability',
        blocks: [
          {
            type: 'p',
            text: '**Immutable** means the tuple cannot be changed after it is created. Any try to change it gives an **error**.',
          },
          {
            type: 'code',
            label: 'Try it: read the error',
            runnable: true,
            code: raw`t = (10, 20, 30)
t[0] = 99`,
          },
          {
            type: 'code',
            label: 'Try it: no append either',
            runnable: true,
            code: raw`t = (10, 20, 30)
t.append(40)`,
          },
          { type: 'h3', text: 'How to "change" a tuple' },
          {
            type: 'p',
            text: 'You cannot change it, but you can **build a new tuple** and give it the same name.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`t = (10, 20, 30)
t = t + (40,)
print(t)
t = t[:2] + (99,) + t[3:]
print(t)`,
          },
          { type: 'h3', text: 'Strings are immutable too' },
          {
            type: 'code',
            runnable: true,
            code: raw`s = "Python"
print(s.upper())
print(s)
nums = [1, 2, 3]
nums[0] = 100
print(nums)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: 'A tuple can hold a **list**, and that list can still change. The tuple only guarantees that it keeps the **same objects**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`t = (1, [2, 3])
t[1].append(4)
print(t)`,
          },
        ],
      },
      {
        id: 's8-why-tuples',
        title: 'Tuple or list?',
        blocks: [
          {
            type: 'p',
            text: 'Use a **list** when the data will change. Use a **tuple** when the data should stay fixed.',
          },
          {
            type: 'table',
            head: ['', 'List', 'Tuple'],
            rows: [
              ['Brackets', '`[ ]`', '`( )`'],
              ['Can be changed', '**Yes**', '**No**'],
              ['Methods', 'many', 'only `count`, `index`'],
              ['Good for', 'a shopping list, marks that grow', 'a point `(x, y)`, a date, fixed settings'],
            ],
          },
          {
            type: 'ul',
            items: [
              '**Safe:** nobody can change the data by mistake.',
              '**Slightly faster** and smaller than a list.',
              'Tuples can be **dictionary keys**, lists cannot (next class).',
              'A function that **returns many values** returns a tuple.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Would you store the days of the week in a list or a tuple? Why?',
          },
        ],
      },
      {
        id: 's8-unpacking',
        title: 'Unpacking',
        blocks: [
          {
            type: 'p',
            text: '**Unpacking** copies the items of a tuple into separate variables in one line. The number of variables must **match** the number of items.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`point = (3, 4)
x, y = point
print(x, y)

name, age, city = ("Aman", 20, "Delhi")
print(name, age, city)`,
          },
          {
            type: 'p',
            text: 'Unpacking works with **lists and strings** too, and the brackets can be left out.',
          },
          {
            type: 'code',
            label: 'Try it: wrong number of variables',
            runnable: true,
            code: raw`a, b = (1, 2, 3)`,
          },
          { type: 'h3', text: 'Swapping two variables' },
          {
            type: 'code',
            runnable: true,
            code: raw`a, b = 1, 2
a, b = b, a
print(a, b)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'In most languages swapping needs a third variable. Why does Python not?',
          },
        ],
      },
      {
        id: 's8-star-unpacking',
        title: 'Unpacking with *',
        blocks: [
          {
            type: 'p',
            text: 'A variable with a **star** `*` collects all the **extra items** into a **list**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`first, *rest = (1, 2, 3, 4)
print(first, rest)

*start, last = (1, 2, 3, 4)
print(start, last)

a, *mid, z = (1, 2, 3, 4, 5)
print(a, mid, z)`,
          },
          {
            type: 'ul',
            items: [
              'Only **one** starred variable is allowed in one unpacking.',
              'The starred variable is always a **list**, even if it gets nothing (`[]`).',
            ],
          },
          { type: 'h3', text: 'Unpacking in loops' },
          {
            type: 'code',
            runnable: true,
            code: raw`pairs = [(1, "one"), (2, "two"), (3, "three")]
for n, word in pairs:
    print(n, word)

for i, ch in enumerate("abc"):
    print(i, ch)`,
          },
          { type: 'h3', text: 'Returning many values' },
          {
            type: 'code',
            runnable: true,
            code: raw`def min_max(nums):
    return min(nums), max(nums)

result = min_max([4, 9, 2, 7])
print(result, type(result))

low, high = min_max([4, 9, 2, 7])
print(low, high)`,
          },
        ],
      },
      {
        id: 's8-tuple-operations',
        title: 'Tuple operations',
        blocks: [
          {
            type: 'p',
            text: 'Operators **build new tuples**; the old ones stay the same.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a = (1, 2)
b = (3, 4)
print(a + b)
print(a * 3)
print(max(a + b), min(a + b), sum(a + b))
print((1, 2) < (1, 3))`,
          },
          { type: 'h3', text: 'Looping over a tuple' },
          {
            type: 'code',
            runnable: true,
            code: raw`colors = ("red", "green", "blue")
for c in colors:
    print(c)

for i in range(len(colors)):
    print(i, colors[i])`,
          },
          { type: 'h3', text: 'Tuple to list and back' },
          {
            type: 'p',
            text: 'To change a tuple the long way: **convert to a list**, change it, **convert back**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`t = (3, 1, 2)
items = list(t)
items.sort()
t = tuple(items)
print(t)
print(sorted((3, 1, 2)))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Note',
            text: '`sorted()` always gives a **list**, even for a tuple.',
          },
        ],
      },
      {
        id: 's8-what-is-a-set',
        title: 'What is a set?',
        blocks: [
          {
            type: 'p',
            text: 'A set is a collection of **unique items** inside curly brackets `{ }`. Duplicates are **removed automatically**, and there is **no order**.',
          },
          {
            type: 'code',
            label: 'sets.py',
            runnable: true,
            code: raw`s = {3, 1, 2, 3, 1}
print(s)
print(len(s))
print(type(s))`,
          },
          {
            type: 'ul',
            items: [
              '**Unique:** every value appears only once.',
              '**Unordered:** no index, so `s[0]` is an error.',
              '**Mutable:** you can add and remove items.',
              'Items must be **immutable**: numbers, strings and tuples are fine, lists are not.',
            ],
          },
          { type: 'h3', text: 'Making a set' },
          {
            type: 'code',
            runnable: true,
            code: raw`print(sorted(set("hello")))
print(list(set([1, 2, 2, 3, 3, 3])))

print(type({}), type(set()))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: '`{}` is an empty **dictionary**, not an empty set. Use **`set()`** for an empty set.',
          },
        ],
      },
      {
        id: 's8-set-basics',
        title: 'Using a set',
        blocks: [
          {
            type: 'p',
            text: 'There are no indexes, but you can **check membership** and **loop**. Checking `in` on a set is very **fast**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`s = {1, 2, 3}
print(2 in s, 9 in s)
print(len(s))
for n in s:
    print(n)`,
          },
          { type: 'h3', text: 'What can go inside a set' },
          {
            type: 'code',
            label: 'Try it: a list cannot go inside a set',
            runnable: true,
            code: raw`s = {[1, 2], 3}`,
          },
          {
            type: 'code',
            label: 'Try it: a tuple can',
            runnable: true,
            code: raw`s = {(1, 2), 3}
print(len(s))`,
          },
          { type: 'h3', text: 'Removing duplicates from a list' },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [1, 2, 2, 3, 4, 4, 5]
print(sorted(set(nums)))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: 'A set has **no order**, so use `sorted()` when you need the items in order.',
          },
        ],
      },
      {
        id: 's8-set-methods',
        title: 'Set methods',
        blocks: [
          {
            type: 'p',
            text: 'Set methods **change the set itself**, like list methods.',
          },
          {
            type: 'table',
            head: ['Method', 'What it does'],
            rows: [
              ['`add(x)`', 'adds one item (nothing happens if it is already there)'],
              ['`update(items)`', 'adds **many** items'],
              ['`remove(x)`', 'removes `x`, **error** if missing'],
              ['`discard(x)`', 'removes `x`, **no error** if missing'],
              ['`pop()`', 'removes and returns **any** item'],
              ['`clear()`', 'removes everything'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`s = {1, 2}
s.add(3)
s.add(2)
print(s)
s.update([3, 4, 5])
print(s)
s.remove(5)
s.discard(99)
print(s)`,
          },
          {
            type: 'code',
            label: 'Try it: remove vs discard',
            runnable: true,
            code: raw`s = {1, 2, 3}
s.discard(99)
print("discard is quiet")
s.remove(99)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which one would you use when you are **not sure** the item is in the set?',
          },
        ],
      },
      {
        id: 's8-set-operations',
        title: 'Set operations',
        blocks: [
          {
            type: 'p',
            text: 'Sets follow **school maths**. Every operation has an **operator** and a **method**, and gives a **new set**.',
          },
          {
            type: 'table',
            head: ['Operation', 'Operator', 'Method', 'Gives'],
            rows: [
              ['Union', '`a | b`', '`a.union(b)`', 'everything in **either**'],
              ['Intersection', '`a & b`', '`a.intersection(b)`', 'only what is in **both**'],
              ['Difference', '`a - b`', '`a.difference(b)`', 'in `a` but **not** in `b`'],
              ['Symmetric difference', '`a ^ b`', '`a.symmetric_difference(b)`', 'in **one but not both**'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)
print(a & b)
print(a - b)
print(b - a)
print(a ^ b)`,
          },
          {
            type: 'code',
            label: 'Same thing with methods',
            runnable: true,
            code: raw`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.union(b))
print(a.intersection(b))
print(a.difference(b))
print(a.symmetric_difference(b))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: '`a - b` and `b - a` are **different**. The order matters for difference, not for union or intersection.',
          },
        ],
      },
      {
        id: 's8-set-compare',
        title: 'Comparing sets',
        blocks: [
          {
            type: 'p',
            text: 'Sets can be compared as **subsets** and **supersets**.',
          },
          {
            type: 'table',
            head: ['Check', 'Operator', 'Method'],
            rows: [
              ['`x` is inside `y`', '`x <= y`', '`x.issubset(y)`'],
              ['`y` contains `x`', '`y >= x`', '`y.issuperset(x)`'],
              ['nothing in common', '', '`x.isdisjoint(y)`'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`x = {1, 2}
y = {1, 2, 3}
print(x <= y, x.issubset(y))
print(y >= x, y.issuperset(x))
print({1, 2}.isdisjoint({3, 4}))
print({1, 2}.isdisjoint({2, 3}))
print({1, 2, 3} == {3, 2, 1})`,
          },
          { type: 'h3', text: 'Updating in place' },
          {
            type: 'p',
            text: 'Each operator has an **in-place** form that changes the set: `|=`, `&=`, `-=`, `^=`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a = {1, 2, 3}
a |= {4}
print(a)
a &= {1, 2, 4, 9}
print(a)
a -= {1}
print(a)
a ^= {2, 7}
print(a)`,
          },
          { type: 'h3', text: 'frozenset' },
          {
            type: 'p',
            text: 'A **frozenset** is an **immutable set**. It cannot change, so it can go inside another set.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`fs = frozenset([1, 2, 3])
print(fs)
fs.add(4)`,
          },
        ],
      },
      {
        id: 's8-real-use',
        title: 'Sets in real life',
        blocks: [
          {
            type: 'p',
            text: 'Two classes, and we want to know who is in **both**, in **either**, or in **only one**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`maths = {"Aman", "Riya", "Kabir"}
science = {"Riya", "Kabir", "Meera"}

print("Both:", sorted(maths & science))
print("Either:", sorted(maths | science))
print("Only maths:", sorted(maths - science))
print("Only one:", sorted(maths ^ science))`,
          },
          { type: 'h3', text: 'Unique letters' },
          {
            type: 'code',
            runnable: true,
            code: raw`word = "mississippi"
print(len(word))
print(len(set(word)))
print(sorted(set(word)))`,
          },
          { type: 'h3', text: 'Common items of two lists' },
          {
            type: 'code',
            runnable: true,
            code: raw`a = [1, 2, 3, 3]
b = [3, 4, 5]
print(sorted(set(a) & set(b)))`,
          },
        ],
      },
      {
        id: 's8-compare-all',
        title: 'List, tuple or set?',
        blocks: [
          {
            type: 'table',
            head: ['', 'List', 'Tuple', 'Set'],
            rows: [
              ['Brackets', '`[ ]`', '`( )`', '`{ }`'],
              ['Ordered', '**Yes**', '**Yes**', '**No**'],
              ['Duplicates', 'allowed', 'allowed', '**removed**'],
              ['Can change', '**Yes**', '**No**', '**Yes**'],
              ['Indexing', '`x[0]`', '`x[0]`', '**no**'],
              ['Empty one', '`[]`', '`()`', '`set()`'],
            ],
          },
          {
            type: 'ul',
            items: [
              'Need an **ordered, changing** collection? Use a **list**.',
              'Need **fixed** data that must not change? Use a **tuple**.',
              'Need **unique** items or fast membership checks and maths between groups? Use a **set**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which one would you pick for: the months of the year, the unique visitors to a site, a shopping cart?',
          },
        ],
      },
      {
        id: 's8-practice',
        title: 'Practice',
        blocks: [
          { type: 'h3', text: 'Warm-up questions' },
          {
            type: 'ol',
            items: [
              'Make a tuple of 5 numbers and print its length, first and last item.',
              'Unpack `(10, 20, 30)` into three variables and print their sum.',
              'Swap two variables without a third variable.',
              'Print the unique items of the list `[5, 3, 5, 1, 3]`.',
              'Print the common items of two sets.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Write a function that returns the minimum, maximum and average of a list as a tuple.',
              'Find the items that are in the first list but not in the second.',
              'Check whether a string has **all unique** characters.',
              'Count how many different words are in a sentence.',
              'Given `(1, 2, 3, 4, 5)`, use `*` to print the first, the last and the middle items.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`t = (1, 2, 3, 4, 5)
a, *b, c = t
print(a, b, c)
s = {1, 2, 3}
s.add(3)
s.add(4)
print(len(s))
print({1, 2, 3} & {2, 3, 4})
print({1, 2, 3} - {2, 3, 4})`,
          },
          { type: 'h3', text: 'Try the unique-word question' },
          {
            type: 'code',
            label: 'Your turn: count the different words, then press Run',
            runnable: true,
            code: raw`sentence = "the cat and the dog and the bird"
# print how many different words there are
`,
          },
        ],
      },
      {
        id: 's8-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a program that stores a **student record** `(name, age, marks)` as a tuple and prints it with **unpacking**.',
              'Write a program that removes the **duplicates** from a list and keeps the **original order**.',
              'Write a program that finds the **union, intersection and difference** of two sets typed by the user.',
              'Write a program that checks whether two strings are **anagrams** using `sorted()`.',
              'Revise the **list, tuple and set** comparison table.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Dictionaries.',
          },
        ],
      },
    ],
  },
]
