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
names = ["Aman", "Ankit"]
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
            code: raw`maths = {"Aman", "Ankit", "Kabir"}
science = {"Ankit", "Kabir", "Meera"}

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
  {
    slug: 'dictionaries',
    title: 'Dictionaries',
    summary: 'Look values up by name: key-value pairs, methods, nested dictionaries and counting with dictionaries.',
    hero: {
      file: 'dictionaries.py',
      lines: ['marks = {"maths": 90, "science": 85}', 'marks["english"] = 78', 'print(marks["maths"])'],
      output: '90',
    },
    sections: [
      {
        id: 's9-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'Why can a tuple not be changed, but a list can?',
              'How do you make an **empty set**?',
              'What does `{1, 2, 3} & {2, 3, 4}` give?',
            ],
          },
        ],
      },
      {
        id: 's9-what-is-a-dictionary',
        title: 'What is a dictionary?',
        blocks: [
          {
            type: 'p',
            text: 'A dictionary stores **key-value pairs** inside curly brackets `{ }`. You find a value by its **key**, not by a position, like looking up a word in a real dictionary.',
          },
          {
            type: 'code',
            label: 'dictionaries.py',
            runnable: true,
            code: raw`student = {"name": "Aman", "age": 20, "city": "Delhi"}
print(student)
print(len(student))
print(type(student))`,
          },
          {
            type: 'ul',
            items: [
              '**Pairs:** each item is `key: value`, separated by commas.',
              '**Keys are unique:** a repeated key keeps only the **last** value.',
              '**Keys must be immutable:** strings, numbers and tuples work, lists do not.',
              '**Values can be anything:** numbers, text, lists, even other dictionaries.',
              '**Ordered:** a dictionary remembers the order the items were added.',
              '**Mutable:** you can add, change and remove pairs.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'In a list you find an item by its **position**. How do you find it in a dictionary?',
          },
        ],
      },
      {
        id: 's9-creating',
        title: 'Making a dictionary',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`empty = {}
a = {"x": 1, "y": 2}
b = dict(x=1, y=2)
c = dict([("x", 1), ("y", 2)])
print(empty, a, b, c)
print(a == b == c)`,
          },
          {
            type: 'ul',
            items: [
              '`{}` is an **empty dictionary** (that is why an empty set needs `set()`).',
              '`dict(x=1, y=2)` works when the keys are simple names.',
              '`dict()` also accepts a list of **(key, value) tuples**.',
            ],
          },
          { type: 'h3', text: 'Repeated keys' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`d = {"a": 1, "b": 2, "a": 3}
print(d)
print(len(d))`,
          },
          { type: 'h3', text: 'What can be a key' },
          {
            type: 'code',
            label: 'Try it: a list cannot be a key',
            runnable: true,
            code: raw`d = {[1, 2]: "list"}`,
          },
          {
            type: 'code',
            label: 'Try it: a tuple can',
            runnable: true,
            code: raw`d = {(1, 2): "point", 5: "number", "k": "text"}
print(d[(1, 2)])`,
          },
        ],
      },
      {
        id: 's9-access',
        title: 'Reading a value',
        blocks: [
          {
            type: 'p',
            text: 'Put the **key** in square brackets: `d[key]`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`student = {"name": "Aman", "age": 20, "city": "Delhi"}
print(student["name"])
print(student["age"] + 1)`,
          },
          { type: 'h3', text: 'A missing key' },
          {
            type: 'code',
            label: 'Try it: read the error',
            runnable: true,
            code: raw`student = {"name": "Aman", "age": 20}
print(student["city"])`,
          },
          { type: 'h3', text: 'get() is safer' },
          {
            type: 'p',
            text: '`d.get(key)` gives **None** instead of an error when the key is missing, and you can give a **default** value.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`student = {"name": "Aman", "age": 20}
print(student.get("name"))
print(student.get("city"))
print(student.get("city", "Unknown"))`,
          },
          { type: 'h3', text: 'Checking for a key' },
          {
            type: 'code',
            runnable: true,
            code: raw`student = {"name": "Aman", "age": 20}
print("name" in student)
print("city" in student)
print("Aman" in student)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: '`in` checks the **keys**, not the values. `"Aman" in student` is `False`.',
          },
        ],
      },
      {
        id: 's9-change',
        title: 'Adding and changing',
        blocks: [
          {
            type: 'p',
            text: 'The **same line** adds a new pair or changes an old one: `d[key] = value`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`student = {"name": "Aman", "age": 20}
student["city"] = "Delhi"
student["age"] = 21
print(student)`,
          },
          { type: 'h3', text: 'update() adds many at once' },
          {
            type: 'code',
            runnable: true,
            code: raw`student = {"name": "Aman"}
student.update({"age": 20, "city": "Delhi"})
student.update(age=21)
print(student)`,
          },
          { type: 'h3', text: 'setdefault()' },
          {
            type: 'p',
            text: '`setdefault(key, value)` adds the pair **only if the key is missing**, and returns the value that is stored.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`d = {"a": 1}
print(d.setdefault("a", 99))
print(d.setdefault("b", 2))
print(d)`,
          },
        ],
      },
      {
        id: 's9-remove',
        title: 'Removing pairs',
        blocks: [
          {
            type: 'table',
            head: ['Way', 'What it does'],
            rows: [
              ['`pop(key)`', 'removes the key and **returns its value**'],
              ['`pop(key, default)`', 'same, but **no error** if the key is missing'],
              ['`del d[key]`', 'removes the key'],
              ['`popitem()`', 'removes and returns the **last** pair'],
              ['`clear()`', 'removes **everything**'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`d = {"a": 1, "b": 2, "c": 3, "d": 4}
print(d.pop("a"))
print(d.pop("z", "not found"))
del d["b"]
print(d)
print(d.popitem())
print(d)
d.clear()
print(d)`,
          },
          {
            type: 'code',
            label: 'Try it: pop with a missing key',
            runnable: true,
            code: raw`d = {"a": 1}
d.pop("z")`,
          },
        ],
      },
      {
        id: 's9-methods',
        title: 'keys(), values() and items()',
        blocks: [
          {
            type: 'p',
            text: 'Three methods give you the **parts** of a dictionary.',
          },
          {
            type: 'table',
            head: ['Method', 'Gives'],
            rows: [
              ['`d.keys()`', 'all the **keys**'],
              ['`d.values()`', 'all the **values**'],
              ['`d.items()`', 'all the **(key, value) pairs**'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = {"maths": 90, "science": 85, "english": 78}
print(list(marks.keys()))
print(list(marks.values()))
print(list(marks.items()))`,
          },
          { type: 'h3', text: 'Handy functions on the values' },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = {"maths": 90, "science": 85, "english": 78}
print(sum(marks.values()))
print(max(marks.values()))
print(sum(marks.values()) / len(marks))
print(sorted(marks))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What does `sorted(marks)` sort, the keys or the values?',
          },
        ],
      },
      {
        id: 's9-loops',
        title: 'Looping over a dictionary',
        blocks: [
          {
            type: 'p',
            text: 'A plain `for` loop goes through the **keys**. Use `items()` to get **keys and values** together, with **unpacking** from last class.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = {"maths": 90, "science": 85, "english": 78}

for subject in marks:
    print(subject)

for value in marks.values():
    print(value)

for subject, mark in marks.items():
    print(subject, "->", mark)`,
          },
          { type: 'h3', text: 'Finding the best' },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = {"maths": 90, "science": 85, "english": 78}
best = None
for subject, mark in marks.items():
    if best is None or mark > marks[best]:
        best = subject
print(best, marks[best])
print(max(marks, key=marks.get))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: 'Do not **add or remove keys** while looping over a dictionary. Loop over a copy: `list(d)`.',
          },
        ],
      },
      {
        id: 's9-copy',
        title: 'Copying and joining',
        blocks: [
          {
            type: 'p',
            text: 'Like lists, `b = a` does **not** copy a dictionary. Both names point to the **same** dictionary.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`a = {"x": 1}
b = a
b["x"] = 99
print(a)

c = a.copy()
c["x"] = 5
print(a, c)`,
          },
          { type: 'h3', text: 'Joining two dictionaries' },
          {
            type: 'code',
            runnable: true,
            code: raw`a = {"x": 1, "y": 2}
b = {"y": 20, "z": 30}
print(a | b)
print({**a, **b})`,
          },
          {
            type: 'p',
            text: 'When the same key is in both, the **second** dictionary wins.',
          },
        ],
      },
      {
        id: 's9-nested',
        title: 'Nested dictionaries',
        blocks: [
          {
            type: 'p',
            text: 'A value can be **another dictionary**. Use **one pair of brackets for each level**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {
    "Aman": {"age": 20, "city": "Delhi"},
    "Ankit": {"age": 19, "city": "Mumbai"},
}
print(students["Ankit"])
print(students["Ankit"]["city"])`,
          },
          { type: 'h3', text: 'Changing a nested value' },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {
    "Aman": {"age": 20, "city": "Delhi"},
    "Ankit": {"age": 19, "city": "Mumbai"},
}
students["Aman"]["age"] = 21
students["Kabir"] = {"age": 22, "city": "Pune"}
print(students["Aman"])
print(len(students))`,
          },
          { type: 'h3', text: 'Looping through nested data' },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {
    "Aman": {"age": 20, "city": "Delhi"},
    "Ankit": {"age": 19, "city": "Mumbai"},
}
for name, info in students.items():
    print(name, "lives in", info["city"])`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'How would you read Ankit\'s age from `students`?',
          },
        ],
      },
      {
        id: 's9-list-of-dicts',
        title: 'Lists and dictionaries together',
        blocks: [
          {
            type: 'p',
            text: 'Real data is often a **list of dictionaries**: one dictionary for each row.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`people = [
    {"name": "Aman", "marks": 90},
    {"name": "Ankit", "marks": 85},
    {"name": "Kabir", "marks": 70},
]
for p in people:
    print(p["name"], p["marks"])

total = 0
for p in people:
    total += p["marks"]
print("Average:", total / len(people))`,
          },
          { type: 'h3', text: 'A dictionary with lists as values' },
          {
            type: 'code',
            runnable: true,
            code: raw`scores = {"Aman": [90, 80], "Ankit": [85, 95]}
scores["Aman"].append(70)
print(scores["Aman"])
for name, marks in scores.items():
    print(name, sum(marks) / len(marks))`,
          },
        ],
      },
      {
        id: 's9-counting',
        title: 'Counting with a dictionary',
        blocks: [
          {
            type: 'p',
            text: 'A very common job: **count how many times** each item appears. The item is the **key** and the count is the **value**.',
          },
          {
            type: 'code',
            label: 'Count the letters',
            runnable: true,
            code: raw`word = "banana"
count = {}
for ch in word:
    if ch in count:
        count[ch] += 1
    else:
        count[ch] = 1
print(count)`,
          },
          { type: 'h3', text: 'The shorter way with get()' },
          {
            type: 'p',
            text: '`count.get(ch, 0)` gives `0` for a new letter, so one line does the whole job.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`word = "banana"
count = {}
for ch in word:
    count[ch] = count.get(ch, 0) + 1
print(count)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Think',
            text: 'Walk through the loop for `"banana"` on paper. What is `count` after each letter?',
          },
        ],
      },
      {
        id: 's9-counting-words',
        title: 'Counting words',
        blocks: [
          {
            type: 'p',
            text: 'Use `split()` to get the words, then count them the same way.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`text = "the cat and the dog and the bird"
words = text.split()
count = {}
for w in words:
    count[w] = count.get(w, 0) + 1
print(count)
print(len(count))`,
          },
          { type: 'h3', text: 'The most common word' },
          {
            type: 'code',
            runnable: true,
            code: raw`text = "the cat and the dog and the bird"
count = {}
for w in text.split():
    count[w] = count.get(w, 0) + 1

top = max(count, key=count.get)
print(top, count[top])`,
          },
          { type: 'h3', text: 'Showing the result neatly' },
          {
            type: 'code',
            runnable: true,
            code: raw`text = "the cat and the dog and the bird"
count = {}
for w in text.split():
    count[w] = count.get(w, 0) + 1

for w in sorted(count):
    print(w, "-", count[w])`,
          },
        ],
      },
      {
        id: 's9-grouping',
        title: 'Grouping with a dictionary',
        blocks: [
          {
            type: 'p',
            text: 'Instead of a number, the value can be a **list**, so the dictionary **groups** items together.',
          },
          {
            type: 'code',
            label: 'Group the words by their first letter',
            runnable: true,
            code: raw`words = ["apple", "avocado", "banana", "blueberry", "cherry"]
groups = {}
for w in words:
    groups.setdefault(w[0], []).append(w)
print(groups)`,
          },
          { type: 'h3', text: 'Even and odd' },
          {
            type: 'code',
            runnable: true,
            code: raw`groups = {"even": [], "odd": []}
for n in range(1, 8):
    if n % 2 == 0:
        groups["even"].append(n)
    else:
        groups["odd"].append(n)
print(groups)`,
          },
        ],
      },
      {
        id: 's9-comprehension',
        title: 'A quick look at dictionary comprehensions',
        blocks: [
          {
            type: 'p',
            text: 'Just like list comprehensions, you can build a dictionary in **one line**: `{key: value for ... in ...}`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`squares = {n: n * n for n in range(1, 6)}
print(squares)

names = ["Aman", "Ankit"]
lengths = {name: len(name) for name in names}
print(lengths)`,
          },
          { type: 'h3', text: 'Swapping keys and values' },
          {
            type: 'code',
            runnable: true,
            code: raw`d = {"a": 1, "b": 2}
flipped = {v: k for k, v in d.items()}
print(flipped)`,
          },
          { type: 'h3', text: 'Sorting a dictionary' },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = {"maths": 90, "science": 85, "english": 78}
print(sorted(marks.items()))
print(sorted(marks.items(), key=lambda pair: pair[1]))`,
          },
        ],
      },
      {
        id: 's9-compare',
        title: 'List, tuple, set or dictionary?',
        blocks: [
          {
            type: 'table',
            head: ['', 'List', 'Tuple', 'Set', 'Dictionary'],
            rows: [
              ['Brackets', '`[ ]`', '`( )`', '`{ }`', '`{k: v}`'],
              ['Find by', 'index', 'index', 'membership', '**key**'],
              ['Duplicates', 'allowed', 'allowed', '**removed**', 'keys **unique**'],
              ['Can change', '**Yes**', '**No**', '**Yes**', '**Yes**'],
              ['Empty one', '`[]`', '`()`', '`set()`', '`{}`'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which one would you use for: a phone book, the days of the week, the unique words in a story, a shopping cart?',
          },
        ],
      },
      {
        id: 's9-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Using `d[key]` for a key that may be missing: use **`d.get(key)`** instead.',
              'Thinking `in` checks the **values**: it checks the **keys**.',
              'Using a **list as a key**: it is not allowed, use a tuple.',
              'Writing `{}` and expecting a **set**: it is an empty **dictionary**.',
              'Thinking `b = a` makes a copy: use **`a.copy()`**.',
              'Changing the dictionary **while looping** over it.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: which line is the mistake?',
            runnable: true,
            code: raw`prices = {"apple": 40, "mango": 80}
print(prices["apple"])
print(prices["banana"])`,
          },
        ],
      },
      {
        id: 's9-practice',
        title: 'Practice',
        blocks: [
          { type: 'h3', text: 'Warm-up questions' },
          {
            type: 'ol',
            items: [
              'Make a dictionary of a book with `title`, `author` and `price`, then print the author.',
              'Add a new key `year` to the dictionary, then change the `price`.',
              'Print every key and value of a dictionary on its own line.',
              'Print the sum of all the values of a dictionary of marks.',
              'Check whether the key `"email"` is in a dictionary, without getting an error.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Count how many times each **letter** appears in a word.',
              'Count how many times each **word** appears in a sentence, and print the most common one.',
              'Make a dictionary of the squares of the numbers 1 to 5.',
              'Swap the keys and values of a dictionary.',
              'Merge two dictionaries and add the values of keys that appear in both.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`d = {"a": 1, "b": 2}
d["c"] = 3
d["a"] = 10
print(d.get("z", 0))
print(list(d.values()))
print("b" in d, 2 in d)
d.pop("b")
print(len(d))`,
          },
          { type: 'h3', text: 'Try the count question' },
          {
            type: 'code',
            label: 'Your turn: count the vowels in the word, then press Run',
            runnable: true,
            code: raw`word = "education"
# make a dictionary that counts each vowel
`,
          },
        ],
      },
      {
        id: 's9-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a program that stores the **names and marks** of 5 students in a dictionary, and prints the **topper** and the **average**.',
              'Write a program that takes a sentence from the user and prints the **count of each word**.',
              'Write a program for a small **phone book**: add a contact, search for a contact, and print all contacts.',
              'Write a program that finds the **first letter that appears only once** in a word, using a dictionary.',
              'Revise the **list, tuple, set and dictionary** comparison table.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Functions.',
          },
        ],
      },
    ],
  },
  {
    slug: 'revision-and-mini-project',
    title: 'Revision and Mini Project',
    summary: 'Revise sessions 1 to 9, then build a student marks manager and a contact book step by step.',
    tag: 'Project',
    hero: {
      file: 'marks_manager.py',
      lines: ['marks = {"Aman": [90, 80, 85]}', 'm = marks["Aman"]', 'print(sum(m) / len(m))'],
      output: '85.0',
    },
    sections: [
      {
        id: 's10-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'How do you count how many times each word appears?',
              'What is the difference between `d[key]` and `d.get(key)`?',
              'Which collection would you use for a phone book?',
            ],
          },
        ],
      },
      {
        id: 's10-plan',
        title: 'Today\'s plan',
        blocks: [
          {
            type: 'p',
            text: 'Today has **two parts**. First a quick **revision** of everything so far. Then a **mini project**, built one small step at a time, using only what we have learned.',
          },
          {
            type: 'ol',
            items: [
              '**Revise** sessions 1 to 9 with short examples.',
              '**Project 1:** a student marks manager.',
              '**Project 2:** a contact book.',
              'Practice and homework.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Remember',
            text: 'A program is built **in small steps**. Make each step work and print the result before you start the next one.',
          },
        ],
      },
      {
        id: 's10-revision-map',
        title: 'What we learned',
        blocks: [
          {
            type: 'table',
            head: ['Session', 'Topic', 'The big idea'],
            rows: [
              ['1', 'Introduction and setup', '`print()`, running a `.py` file'],
              ['2', 'Variables and data types', '`int`, `float`, `str`, `bool`, `input()`, casting'],
              ['3', 'Strings and operators', 'indexing, slicing, methods, f-strings, comparison and logical operators'],
              ['4', 'Conditional statements', '`if`, `elif`, `else`, nested conditions'],
              ['5', 'Loops', '`for`, `while`, `range()`, `break`, `continue`'],
              ['6', 'Loop practice', 'nested loops, patterns, number programs'],
              ['7', 'Lists', 'indexing, slicing, methods, loops over lists'],
              ['8', 'Tuples and sets', 'immutability, unpacking, set operations'],
              ['9', 'Dictionaries', 'key-value pairs, nested data, counting'],
            ],
          },
        ],
      },
      {
        id: 's10-rev-basics',
        title: 'Revision: variables and strings',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`name = "Aman"
age = 20
height = 5.9
student = True
print(type(name), type(age), type(height), type(student))
print(int("42") + 1, str(7) + "8", float("2.5"))`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`word = "Python Programming"
print(word[0], word[-1], word[:6], word[::-1])
print(word.upper(), word.lower(), word.replace("P", "J"))
print(len(word), word.count("o"), word.split())
name = "Aman"
marks = 86.456
print(f"{name} scored {marks:.1f}")`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What type is `input()` always? What do you do to do maths on it?',
          },
        ],
      },
      {
        id: 's10-rev-conditions',
        title: 'Revision: conditions and loops',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`marks = 72
if marks >= 90:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "F"
print(grade)
print(marks > 50 and marks < 80, not marks > 50)`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for i in range(1, 6):
    if i == 4:
        continue
    print(i, end=" ")
print()

n = 5
total = 0
while n > 0:
    total += n
    n -= 1
print(total)`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`for row in range(1, 5):
    print("*" * row)`,
          },
        ],
      },
      {
        id: 's10-rev-collections',
        title: 'Revision: the four collections',
        blocks: [
          {
            type: 'table',
            head: ['', 'List', 'Tuple', 'Set', 'Dictionary'],
            rows: [
              ['Brackets', '`[ ]`', '`( )`', '`{ }`', '`{k: v}`'],
              ['Find by', 'index', 'index', 'membership', '**key**'],
              ['Duplicates', 'allowed', 'allowed', '**removed**', 'keys **unique**'],
              ['Can change', '**Yes**', '**No**', '**Yes**', '**Yes**'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [4, 8, 2, 8, 6]
nums.append(10)
nums.sort()
print(nums, nums[-1], nums[1:3])

point = (3, 4)
x, y = point
print(x, y)

print(set(nums))
print({1, 2, 3} & {2, 3, 4})

marks = {"maths": 90, "science": 85}
marks["english"] = 78
print(marks.get("hindi", 0), sum(marks.values()))`,
          },
        ],
      },
      {
        id: 's10-rev-output',
        title: 'Revision: find the output',
        blocks: [
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`a = [1, 2, 3]
b = a
b.append(4)
print(a)
t = (1, 2, 3)
x, *y = t
print(y)
s = {1, 2, 2, 3}
print(len(s))
d = {"a": 1}
d["b"] = d.get("b", 0) + 5
print(d)`,
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`text = "to be or not to be"
count = {}
for w in text.split():
    count[w] = count.get(w, 0) + 1
print(count)
print(max(count, key=count.get))`,
          },
        ],
      },
      {
        id: 's10-project-intro',
        title: 'Project 1: student marks manager',
        blocks: [
          {
            type: 'p',
            text: 'We will build a small program that **stores the marks of students** and shows a **report**, the **topper** and the **ranking**.',
          },
          { type: 'h3', text: 'What it must do' },
          {
            type: 'ul',
            items: [
              '**Add** a student with some marks, or add more marks later.',
              'Show a **report**: total, average and grade for each student.',
              'Show the **topper** and the **class average**.',
              'Show the **ranking** from best to worst.',
              '**Remove** a student.',
            ],
          },
          { type: 'h3', text: 'Choosing the data' },
          {
            type: 'p',
            text: 'One **dictionary**: the **key** is the student name and the **value** is a **list of marks**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {
    "Aman": [90, 80, 70],
    "Ankit": [85, 95, 88],
}
print(students["Ankit"])
print(students["Ankit"][0])`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Why a dictionary and not a list of lists? Think about how we find one student.',
          },
        ],
      },
      {
        id: 's10-p1-add',
        title: 'Step 1: adding students and marks',
        blocks: [
          {
            type: 'p',
            text: '`setdefault(name, [])` creates an **empty list** for a new student and leaves an old one alone, so one line works for **both**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {}
students.setdefault("Aman", []).extend([90, 80, 70])
students.setdefault("Ankit", []).extend([85, 95, 88])
students.setdefault("Aman", []).append(100)
print(students)`,
          },
        ],
      },
      {
        id: 's10-p1-report',
        title: 'Step 2: the report',
        blocks: [
          {
            type: 'p',
            text: 'Loop through `items()`, work out the **total**, the **average** and the **grade**, and print one neat row for each student.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {
    "Aman": [90, 80, 70],
    "Ankit": [85, 95, 88],
    "Kabir": [60, 55, 72],
}

print(f"{'Name':<8}{'Total':>6}{'Average':>9}  Grade")
for name, marks in students.items():
    total = sum(marks)
    avg = total / len(marks)
    if avg >= 85:
        grade = "A"
    elif avg >= 70:
        grade = "B"
    elif avg >= 50:
        grade = "C"
    else:
        grade = "F"
    print(f"{name:<8}{total:>6}{avg:>9.1f}  {grade}")`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Note',
            text: '`:<8` pads to 8 characters on the left, `:>6` on the right, and `:.1f` keeps one decimal.',
          },
        ],
      },
      {
        id: 's10-p1-topper',
        title: 'Step 3: topper and ranking',
        blocks: [
          {
            type: 'p',
            text: 'First make a dictionary of **averages**, then use `max()` and `sorted()` with `key=averages.get`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`students = {
    "Aman": [90, 80, 70],
    "Ankit": [85, 95, 88],
    "Kabir": [60, 55, 72],
}

averages = {name: sum(m) / len(m) for name, m in students.items()}

topper = max(averages, key=averages.get)
print("Topper:", topper, round(averages[topper], 1))

class_avg = sum(averages.values()) / len(averages)
print("Class average:", round(class_avg, 1))

print("Ranking:")
ranked = sorted(averages, key=averages.get, reverse=True)
for rank, name in enumerate(ranked, start=1):
    print(rank, name, round(averages[name], 1))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'What does `reverse=True` do? What would the ranking be without it?',
          },
        ],
      },
      {
        id: 's10-p1-menu',
        title: 'Step 4: commands in a loop',
        blocks: [
          {
            type: 'p',
            text: 'A real program keeps **asking** for commands inside a loop. Here the commands are in a **list** so you can run it in the browser. Next we replace the list with `input()`.',
          },
          {
            type: 'code',
            label: 'marks_manager.py (simulated commands)',
            runnable: true,
            code: raw`students = {}
commands = [
    "add Aman 90 80 70",
    "add Ankit 85 95 88",
    "add Aman 100",
    "report",
    "topper",
    "remove Ankit",
    "remove Zed",
    "report",
    "dance",
    "quit",
]

for command in commands:
    print(">", command)
    parts = command.split()
    action = parts[0]

    if action == "add":
        name = parts[1]
        marks = [int(x) for x in parts[2:]]
        students.setdefault(name, []).extend(marks)
        print("Added marks for", name, marks)
    elif action == "report":
        for name, marks in students.items():
            print(name, sum(marks), round(sum(marks) / len(marks), 1))
    elif action == "topper":
        best = max(students, key=lambda n: sum(students[n]) / len(students[n]))
        print("Topper:", best)
    elif action == "remove":
        name = parts[1]
        if name in students:
            del students[name]
            print("Removed", name)
        else:
            print("No such student")
    elif action == "quit":
        print("Bye")
        break
    else:
        print("Unknown command")`,
          },
          {
            type: 'ul',
            items: [
              '`split()` breaks a command into **words**; the first word is the **action**.',
              '`int(x)` turns each mark from text into a number.',
              '`break` ends the loop on `quit`; the last `else` catches **unknown** commands.',
            ],
          },
        ],
      },
      {
        id: 's10-p1-full',
        title: 'The full program with input()',
        blocks: [
          {
            type: 'p',
            text: 'This is the **complete marks manager**. Save it as `marks_manager.py` and run it on your computer, because it waits for you to **type**.',
          },
          {
            type: 'code',
            label: 'marks_manager.py (run on your computer)',
            code: raw`students = {}

while True:
    print()
    print("1 Add student   2 Add marks   3 Report")
    print("4 Topper        5 Remove      6 Quit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        if name in students:
            print("Already there")
        else:
            students[name] = []
            print("Added", name)

    elif choice == "2":
        name = input("Name: ")
        if name not in students:
            print("No such student")
        else:
            mark = int(input("Mark: "))
            students[name].append(mark)

    elif choice == "3":
        if not students:
            print("No students yet")
        for name, marks in students.items():
            if marks:
                avg = sum(marks) / len(marks)
                print(f"{name:<8}{sum(marks):>6}{avg:>9.1f}")
            else:
                print(f"{name:<8}   no marks")

    elif choice == "4":
        with_marks = {n: sum(m) / len(m) for n, m in students.items() if m}
        if with_marks:
            best = max(with_marks, key=with_marks.get)
            print("Topper:", best, round(with_marks[best], 1))
        else:
            print("No marks yet")

    elif choice == "5":
        name = input("Name: ")
        if students.pop(name, None) is None:
            print("No such student")
        else:
            print("Removed", name)

    elif choice == "6":
        print("Bye")
        break

    else:
        print("Please type 1 to 6")`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: '`int(input())` crashes if the user types a **word**. Next class we make the program safer with **functions**; for now, type numbers.',
          },
        ],
      },
      {
        id: 's10-project2-intro',
        title: 'Project 2: contact book',
        blocks: [
          {
            type: 'p',
            text: 'A contact book stores **people and their details**. It uses a **nested dictionary**: the key is the name and the value is another dictionary with the **phone** and the **email**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`contacts = {
    "Aman": {"phone": "9876543210", "email": "aman@mail.com"},
    "Ankit": {"phone": "9123456780", "email": "riya@mail.com"},
}
print(contacts["Ankit"]["phone"])
for name, info in contacts.items():
    print(name, info["phone"], info["email"])`,
          },
          { type: 'h3', text: 'What it must do' },
          {
            type: 'ul',
            items: [
              '**Add** a contact and **update** a detail.',
              '**Search** by name, even a part of the name.',
              '**Delete** a contact.',
              '**List** all contacts in alphabetical order.',
            ],
          },
        ],
      },
      {
        id: 's10-p2-steps',
        title: 'Contact book: search, update and delete',
        blocks: [
          { type: 'h3', text: 'Searching part of a name' },
          {
            type: 'code',
            runnable: true,
            code: raw`contacts = {
    "Aman": {"phone": "9876543210", "email": "aman@mail.com"},
    "Amit": {"phone": "9000000001", "email": "amit@mail.com"},
    "Ankit": {"phone": "9123456780", "email": "riya@mail.com"},
}
text = "am"
found = [n for n in contacts if text.lower() in n.lower()]
print(found)`,
          },
          { type: 'h3', text: 'Updating and deleting' },
          {
            type: 'code',
            runnable: true,
            code: raw`contacts = {"Aman": {"phone": "9876543210", "email": "aman@mail.com"}}
contacts["Aman"]["phone"] = "9000000000"
contacts["Ankit"] = {"phone": "9123456780", "email": "riya@mail.com"}
del contacts["Ankit"]
print(contacts)`,
          },
          { type: 'h3', text: 'Listing in order' },
          {
            type: 'code',
            runnable: true,
            code: raw`contacts = {
    "Ankit": {"phone": "9123456780"},
    "Aman": {"phone": "9876543210"},
    "Kabir": {"phone": "9000000002"},
}
for name in sorted(contacts):
    print(name, contacts[name]["phone"])`,
          },
        ],
      },
      {
        id: 's10-p2-menu',
        title: 'Contact book: commands in a loop',
        blocks: [
          {
            type: 'code',
            label: 'contact_book.py (simulated commands)',
            runnable: true,
            code: raw`contacts = {}
commands = [
    "add Aman 9876543210 aman@mail.com",
    "add Ankit 9123456780 riya@mail.com",
    "add Amit 9000000001 amit@mail.com",
    "search am",
    "update Aman phone 9000000000",
    "list",
    "delete Ankit",
    "delete Zed",
    "list",
    "quit",
]

for command in commands:
    print(">", command)
    parts = command.split()
    action = parts[0]

    if action == "add":
        contacts[parts[1]] = {"phone": parts[2], "email": parts[3]}
        print("Saved", parts[1])
    elif action == "search":
        found = [n for n in contacts if parts[1].lower() in n.lower()]
        print(sorted(found) if found else "Nothing found")
    elif action == "update":
        name, field, value = parts[1], parts[2], parts[3]
        if name in contacts and field in contacts[name]:
            contacts[name][field] = value
            print("Updated", name)
        else:
            print("Cannot update")
    elif action == "delete":
        if contacts.pop(parts[1], None) is None:
            print("No such contact")
        else:
            print("Deleted", parts[1])
    elif action == "list":
        for name in sorted(contacts):
            info = contacts[name]
            print(f"{name:<8}{info['phone']:<12}{info['email']}")
    elif action == "quit":
        print("Bye")
        break`,
          },
        ],
      },
      {
        id: 's10-p2-full',
        title: 'Contact book: the full program',
        blocks: [
          {
            type: 'code',
            label: 'contact_book.py (run on your computer)',
            code: raw`contacts = {}

while True:
    print()
    print("1 Add   2 Search   3 Update")
    print("4 Delete   5 List   6 Quit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        phone = input("Phone: ")
        email = input("Email: ")
        contacts[name] = {"phone": phone, "email": email}
        print("Saved", name)

    elif choice == "2":
        text = input("Search for: ").lower()
        found = [n for n in contacts if text in n.lower()]
        if found:
            for n in sorted(found):
                print(n, contacts[n]["phone"], contacts[n]["email"])
        else:
            print("Nothing found")

    elif choice == "3":
        name = input("Name: ")
        if name in contacts:
            field = input("phone or email: ")
            if field in contacts[name]:
                contacts[name][field] = input("New value: ")
                print("Updated")
            else:
                print("Type phone or email")
        else:
            print("No such contact")

    elif choice == "4":
        name = input("Name: ")
        if contacts.pop(name, None) is None:
            print("No such contact")
        else:
            print("Deleted", name)

    elif choice == "5":
        if not contacts:
            print("No contacts yet")
        for name in sorted(contacts):
            info = contacts[name]
            print(f"{name:<8}{info['phone']:<12}{info['email']}")

    elif choice == "6":
        print("Bye")
        break

    else:
        print("Please type 1 to 6")`,
          },
        ],
      },
      {
        id: 's10-ideas',
        title: 'Make it better',
        blocks: [
          {
            type: 'p',
            text: 'Real programs grow. Try these **extensions** on your own:',
          },
          {
            type: 'ul',
            items: [
              '**Marks manager:** give each student **several subjects** with a nested dictionary, and show the **highest mark** in each subject.',
              '**Marks manager:** list the students who **failed** (average below 50).',
              '**Contact book:** stop two contacts from having the **same phone number**.',
              '**Contact book:** search by **phone number** as well as by name.',
              '**Both:** save the data to a **file** so it is still there next time (we will learn files later).',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Functions: the same code can be **packed into named blocks** so the menu stays short and tidy.',
          },
        ],
      },
      {
        id: 's10-practice',
        title: 'Practice',
        blocks: [
          { type: 'h3', text: 'Revision questions' },
          {
            type: 'ol',
            items: [
              'Take a number from the user and say whether it is **even or odd**.',
              'Print the **multiplication table** of a number using a loop.',
              'Find the **largest and smallest** number in a list without using `max()` and `min()`.',
              'Remove the **duplicates** from a list and print it sorted.',
              'Count the **vowels** in a sentence using a dictionary.',
            ],
          },
          { type: 'h3', text: 'Project questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'In the marks manager, print the **grade** of every student next to their name.',
              'Add a **"best"** command that prints the highest single mark and who got it.',
              'In the contact book, add a **"count"** command that prints how many contacts there are.',
              'In the contact book, make **search** work on the email as well.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`students = {"Aman": [90, 80], "Ankit": [70]}
students.setdefault("Kabir", []).append(60)
students["Ankit"].extend([80, 90])
print(len(students))
print(sum(students["Ankit"]))
print(sorted(students))
print("Zed" in students)`,
          },
          { type: 'h3', text: 'Try the best-mark question' },
          {
            type: 'code',
            label: 'Your turn: print the highest mark of each student, then press Run',
            runnable: true,
            code: raw`students = {"Aman": [90, 80], "Ankit": [70, 85, 95], "Kabir": [60]}
# print each name with the highest mark
`,
          },
        ],
      },
      {
        id: 's10-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Finish **one of the two projects** on your computer and run it with the `input()` menu.',
              'Add **one extension** from the "Make it better" list.',
              'Write a **small program of your own** that uses a dictionary, a list and a loop (for example a shopping list or a quiz score).',
              'Revise sessions **1 to 9** using the revision table, and write down **three things** you still find hard.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Functions.',
          },
        ],
      },
    ],
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Pack code into reusable named blocks: def, parameters, return values and scope.',
    hero: {
      file: 'functions.py',
      lines: ['def square(n):', '    return n * n', 'print(square(7))'],
      output: '49',
    },
    sections: [
      {
        id: 's11-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'In the marks manager, which code did we **repeat** for every command?',
              'What does `max(d, key=d.get)` give?',
              'Why did `int(input())` crash when the user typed a word?',
            ],
          },
        ],
      },
      {
        id: 's11-what-is-a-function',
        title: 'What is a function?',
        blocks: [
          {
            type: 'p',
            text: 'A function is a **named block of code** that you can run **again and again**. You have already used many: `print()`, `len()`, `input()`, `sum()`.',
          },
          {
            type: 'ul',
            items: [
              '**Reuse:** write the code once, use it many times.',
              '**Tidy:** a long program becomes small named pieces.',
              '**Easy to fix:** a mistake is fixed in one place.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'You write `len("hello")` without knowing how `len` works inside. Why is that useful?',
          },
        ],
      },
      {
        id: 's11-def',
        title: 'Defining and calling',
        blocks: [
          {
            type: 'p',
            text: 'Use the keyword **`def`**, a **name**, round brackets, a **colon**, and an **indented body**.',
          },
          {
            type: 'code',
            label: 'functions.py',
            runnable: true,
            code: raw`def greet():
    print("Hello!")
    print("Welcome to Python")

greet()
greet()`,
          },
          {
            type: 'ul',
            items: [
              '`def` only **defines** the function. Nothing runs yet.',
              'Writing **`greet()`** (with brackets) **calls** it, and the body runs.',
              'A function must be **defined before** it is called.',
            ],
          },
          { type: 'h3', text: 'Forgetting the brackets' },
          {
            type: 'code',
            runnable: true,
            code: raw`def greet():
    print("Hello!")

greet
print(type(greet))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: '`greet` without brackets is just the **function itself**. It does **not** run.',
          },
        ],
      },
      {
        id: 's11-parameters',
        title: 'Parameters and arguments',
        blocks: [
          {
            type: 'p',
            text: 'A **parameter** is a name inside the brackets of `def`. An **argument** is the real value you pass when you call.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def greet(name):
    print("Hello,", name)

greet("Aman")
greet("Ankit")`,
          },
          { type: 'h3', text: 'More than one parameter' },
          {
            type: 'code',
            runnable: true,
            code: raw`def add(a, b):
    print(a + b)

add(3, 4)
add("Py", "thon")`,
          },
          {
            type: 'ul',
            items: [
              'Arguments match the parameters **by position**: the first argument goes to the first parameter.',
              'The number of arguments must **match** the number of parameters.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: wrong number of arguments',
            runnable: true,
            code: raw`def add(a, b):
    print(a + b)

add(3)`,
          },
        ],
      },
      {
        id: 's11-return',
        title: 'return',
        blocks: [
          {
            type: 'p',
            text: '`return` **sends a value back** to the place where the function was called, and **ends** the function.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def square(n):
    return n * n

result = square(7)
print(result)
print(square(3) + square(4))`,
          },
          { type: 'h3', text: 'print() is not return' },
          {
            type: 'code',
            runnable: true,
            code: raw`def show_double(n):
    print(n * 2)

def get_double(n):
    return n * 2

a = show_double(5)
b = get_double(5)
print(a)
print(b)`,
          },
          {
            type: 'ul',
            items: [
              '`print()` only **shows** a value on the screen.',
              '`return` **gives** the value back so you can **keep using it**.',
              'A function with **no return** gives back **`None`**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Why is `show_double(5) + 1` an error but `get_double(5) + 1` works?',
          },
        ],
      },
      {
        id: 's11-return-more',
        title: 'return ends the function',
        blocks: [
          {
            type: 'p',
            text: 'Code **after** a `return` never runs. A function can have **several** `return` lines, but only **one** runs.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def sign(n):
    if n > 0:
        return "positive"
    elif n < 0:
        return "negative"
    return "zero"

print(sign(5), sign(-2), sign(0))`,
          },
          { type: 'h3', text: 'Returning many values' },
          {
            type: 'p',
            text: 'Returning several values with commas gives **one tuple**. Unpack it, like in Session 8.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def min_max(nums):
    return min(nums), max(nums)

print(min_max([4, 9, 2, 7]))
low, high = min_max([4, 9, 2, 7])
print(low, high)`,
          },
          { type: 'h3', text: 'Functions that answer yes or no' },
          {
            type: 'code',
            runnable: true,
            code: raw`def is_even(n):
    return n % 2 == 0

print(is_even(10), is_even(7))
if is_even(4):
    print("4 is even")`,
          },
        ],
      },
      {
        id: 's11-defaults',
        title: 'Default and keyword arguments',
        blocks: [
          {
            type: 'p',
            text: 'A parameter can have a **default value**. It is used when the caller does **not** give that argument.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def greet(name, greeting="Hello"):
    return greeting + ", " + name

print(greet("Aman"))
print(greet("Aman", "Good morning"))`,
          },
          { type: 'h3', text: 'Keyword arguments' },
          {
            type: 'p',
            text: 'You can name the argument when you call. The **order then does not matter**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def power(base, exponent=2):
    return base ** exponent

print(power(5))
print(power(2, 10))
print(power(exponent=3, base=2))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: 'Parameters **with** a default must come **after** those without one: `def f(a, b=1)` is fine, `def f(a=1, b)` is an error.',
          },
          { type: 'h3', text: 'Built-in functions use this too' },
          {
            type: 'code',
            runnable: true,
            code: raw`print("a", "b", "c", sep="-")
print("no new line", end="!")
print()
print(round(3.14159, 2))`,
          },
        ],
      },
      {
        id: 's11-args',
        title: 'Any number of arguments',
        blocks: [
          {
            type: 'p',
            text: 'A parameter with a **star** collects **all the extra arguments** into a **tuple**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def total(*nums):
    print(nums)
    return sum(nums)

print(total(1, 2, 3))
print(total(10, 20))
print(total())`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Note',
            text: 'This is the same `*` idea as star unpacking in Session 8. `print()` itself works this way.',
          },
        ],
      },
      {
        id: 's11-docstring',
        title: 'Docstrings and good names',
        blocks: [
          {
            type: 'p',
            text: 'A string on the **first line** of a function describes what it does. It is called a **docstring**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def average(marks):
    """Return the average of a list of marks."""
    return sum(marks) / len(marks)

print(average([90, 80, 70]))
print(average.__doc__)`,
          },
          {
            type: 'ul',
            items: [
              'Name a function by what it **does**: `average`, `is_even`, `get_grade`.',
              'Use **lowercase with underscores**, like variable names.',
              'Keep each function to **one job**.',
            ],
          },
        ],
      },
      {
        id: 's11-scope',
        title: 'Scope: local and global',
        blocks: [
          {
            type: 'p',
            text: '**Scope** is where a variable can be **seen**. A variable made **inside** a function is **local**: it only exists while the function runs.',
          },
          {
            type: 'code',
            label: 'Try it: a local variable is not visible outside',
            runnable: true,
            code: raw`def make():
    secret = 42
    print("inside:", secret)

make()
print("outside:", secret)`,
          },
          {
            type: 'ul',
            items: [
              '**Local:** made inside a function, gone when it ends.',
              '**Global:** made outside every function, can be **read** anywhere.',
              'Parameters are local variables too.',
            ],
          },
          { type: 'h3', text: 'Reading a global' },
          {
            type: 'code',
            runnable: true,
            code: raw`rate = 10

def price(qty):
    return qty * rate

print(price(5))`,
          },
        ],
      },
      {
        id: 's11-shadowing',
        title: 'Same name, different variable',
        blocks: [
          {
            type: 'p',
            text: 'If a function **assigns** to a name, Python makes a **new local** variable, even if a global with the same name exists. The global stays **unchanged**.',
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`x = 10

def change():
    x = 99
    print("inside:", x)

change()
print("outside:", x)`,
          },
          { type: 'h3', text: 'The global keyword' },
          {
            type: 'p',
            text: 'To really change a global from inside a function, say **`global`** first.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`count = 0

def add_one():
    global count
    count += 1

add_one()
add_one()
print(count)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Better habit',
            text: 'Avoid `global`. Pass values **in** as arguments and send results **out** with `return`. The code is then easier to understand and test.',
          },
          {
            type: 'code',
            label: 'The better way',
            runnable: true,
            code: raw`def add_one(count):
    return count + 1

count = 0
count = add_one(count)
count = add_one(count)
print(count)`,
          },
        ],
      },
      {
        id: 's11-lists-arguments',
        title: 'Lists and functions',
        blocks: [
          {
            type: 'p',
            text: 'A function gets the **same list**, not a copy. Changing it inside **changes it outside** too (lists are mutable). Numbers and strings cannot be changed this way.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def add_item(items):
    items.append("new")

def add_ten(n):
    n = n + 10

stuff = ["a", "b"]
add_item(stuff)
print(stuff)

x = 5
add_ten(x)
print(x)`,
          },
          { type: 'h3', text: 'Passing a copy' },
          {
            type: 'code',
            runnable: true,
            code: raw`def add_item(items):
    items.append("new")

stuff = ["a", "b"]
add_item(stuff.copy())
print(stuff)`,
          },
        ],
      },
      {
        id: 's11-calling-functions',
        title: 'Functions calling functions',
        blocks: [
          {
            type: 'p',
            text: 'Small functions can be **combined**. Each one does one job.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def average(marks):
    return sum(marks) / len(marks)

def grade(avg):
    if avg >= 85:
        return "A"
    elif avg >= 70:
        return "B"
    elif avg >= 50:
        return "C"
    return "F"

def report(name, marks):
    avg = average(marks)
    return f"{name}: {avg:.1f} ({grade(avg)})"

print(report("Aman", [90, 80, 70]))
print(report("Ankit", [85, 95, 88]))`,
          },
          { type: 'h3', text: 'A function that calls itself' },
          {
            type: 'p',
            text: 'A function can call **itself**. This is called **recursion**. It needs a **stopping case**, or it never ends.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
          },
        ],
      },
      {
        id: 's11-marks-manager',
        title: 'Back to the marks manager',
        blocks: [
          {
            type: 'p',
            text: 'Last class the commands were one **long block**. With functions each job gets a **name**, and the main loop becomes **short and clear**.',
          },
          {
            type: 'code',
            label: 'marks_manager.py (with functions)',
            runnable: true,
            code: raw`students = {}

def add_marks(name, marks):
    students.setdefault(name, []).extend(marks)

def average(marks):
    return sum(marks) / len(marks)

def topper():
    return max(students, key=lambda n: average(students[n]))

def show_report():
    for name, marks in students.items():
        print(f"{name:<8}{sum(marks):>6}{average(marks):>9.1f}")

add_marks("Aman", [90, 80, 70])
add_marks("Ankit", [85, 95, 88])
add_marks("Aman", [100])
show_report()
print("Topper:", topper())`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which version is easier to **read**, last class or this one? Which is easier to **fix**?',
          },
        ],
      },
      {
        id: 's11-safe-input',
        title: 'A safe number reader',
        blocks: [
          {
            type: 'p',
            text: 'Remember `int(input())` crashing on a word? A function can read a number **until the user types a valid one**. This is for your computer, because it uses `input()`.',
          },
          {
            type: 'code',
            label: 'read_number.py (run on your computer)',
            code: raw`def read_number(prompt):
    while True:
        text = input(prompt)
        if text.isdigit():
            return int(text)
        print("Please type a whole number")

age = read_number("Age: ")
print("Next year you will be", age + 1)`,
          },
          {
            type: 'ul',
            items: [
              '`isdigit()` checks that the text is only digits.',
              '`return` ends the function **and the loop** as soon as the input is good.',
              'Use `read_number()` in the marks manager instead of `int(input())`.',
            ],
          },
        ],
      },
      {
        id: 's11-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Forgetting the **brackets** when calling: `greet` instead of `greet()`.',
              'Using **`print`** when you meant **`return`**, then getting `None`.',
              'Forgetting the **colon** or the **indentation** after `def`.',
              'Using a **local** variable outside its function.',
              'Calling a function **before** defining it.',
              'Giving the **wrong number** of arguments.',
              'A function with **no `return` on some paths** quietly gives `None`.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: why does this print None?',
            runnable: true,
            code: raw`def double(n):
    n * 2

print(double(4))`,
          },
        ],
      },
      {
        id: 's11-practice',
        title: 'Practice',
        blocks: [
          { type: 'h3', text: 'Warm-up questions' },
          {
            type: 'ol',
            items: [
              'Write a function `cube(n)` that **returns** the cube of a number.',
              'Write a function `is_positive(n)` that returns `True` or `False`.',
              'Write a function `greet(name, greeting="Hello")` and call it both ways.',
              'Write a function that **returns the larger** of two numbers without using `max()`.',
              'Write a function `count_vowels(text)` that returns the number of vowels.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Write `is_prime(n)` and use it to print all primes up to 50.',
              'Write `fibonacci(n)` that returns a **list** of the first `n` Fibonacci numbers.',
              'Write `reverse_words(sentence)` that returns the sentence with the words in **reverse order**.',
              'Write `stats(nums)` that returns the **minimum, maximum and average** together.',
              'Rewrite the **contact book** from last class using one function for each command.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`def f(a, b=2):
    return a * b

def g(items):
    items.append(0)

x = 3
print(f(x), f(x, 5), f(b=4, a=1))
nums = [1]
g(nums)
g(nums)
print(nums)
print(f(f(2)))`,
          },
          { type: 'h3', text: 'Try the even-numbers question' },
          {
            type: 'code',
            label: 'Your turn: finish evens() so it returns the even numbers of a list, then press Run',
            runnable: true,
            code: raw`def evens(nums):
    # return a new list with only the even numbers
    pass

print(evens([1, 2, 3, 4, 5, 6]))`,
          },
        ],
      },
      {
        id: 's11-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a **calculator** with one function for each of `add`, `subtract`, `multiply` and `divide`, and a function that picks one by the operator typed.',
              'Write a function `is_palindrome(text)` and test it with 5 words.',
              'Rewrite the **marks manager** or the **contact book** so every command is a **function**.',
              'Write a function that takes a list and returns a **new list without duplicates**, keeping the order.',
              'Revise: **def**, **parameters**, **return**, **default arguments** and **scope**.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Files and error handling.',
          },
        ],
      },
    ],
  },
  {
    slug: 'advanced-functions',
    title: 'Advanced Functions',
    summary: 'Default and keyword arguments, *args, **kwargs, lambda, map and filter.',
    hero: {
      file: 'advanced.py',
      lines: ['nums = [1, 2, 3, 4]', 'print(list(map(lambda n: n * n, nums)))'],
      output: '[1, 4, 9, 16]',
    },
    sections: [
      {
        id: 's12-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between a **parameter** and an **argument**?',
              'What does a function with **no `return`** give back?',
              'Can a function read a **global** variable? Can it change one?',
            ],
          },
        ],
      },
      {
        id: 's12-defaults',
        title: 'Default arguments',
        blocks: [
          {
            type: 'p',
            text: 'A parameter with a **default value** becomes **optional**. The caller can leave it out.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def welcome(name, greeting="Hello", punctuation="!"):
    return greeting + ", " + name + punctuation

print(welcome("Aman"))
print(welcome("Aman", "Good morning"))
print(welcome("Aman", "Hi", "?"))`,
          },
          {
            type: 'ul',
            items: [
              'Parameters **without** a default come **first**, then the ones **with** a default.',
              'The default is made **once**, when the function is **defined**.',
            ],
          },
          { type: 'h3', text: 'The mutable default trap' },
          {
            type: 'p',
            text: 'A **list as a default** is shared by **every call**. It keeps growing!',
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))
print(add_item("b"))
print(add_item("c"))`,
          },
          { type: 'h3', text: 'The safe way' },
          {
            type: 'p',
            text: 'Use **`None`** as the default and make the list **inside** the function.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))
print(add_item("b"))
print(add_item("c", ["x"]))`,
          },
        ],
      },
      {
        id: 's12-keyword',
        title: 'Keyword arguments',
        blocks: [
          {
            type: 'p',
            text: 'Name the argument in the call: `name=value`. The **order no longer matters**, and the code is **easier to read**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def book(title, author, year=2020):
    return f"{title} by {author} ({year})"

print(book("Python Basics", "Aman"))
print(book(author="Ankit", title="Data Tricks"))
print(book("Loops", "Kabir", year=2018))`,
          },
          {
            type: 'ul',
            items: [
              '**Positional** arguments come **first**, **keyword** arguments after them.',
              'You cannot give the **same parameter twice**.',
              'Built-in functions use this: `print(..., sep="-", end="!")` and `sorted(..., reverse=True)`.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: a positional argument after a keyword one',
            runnable: true,
            code: raw`def book(title, author):
    return title + " by " + author

print(book(title="Python", "Aman"))`,
          },
        ],
      },
      {
        id: 's12-args',
        title: '*args: any number of arguments',
        blocks: [
          {
            type: 'p',
            text: 'A parameter with a **single star** collects **all the extra positional arguments** into a **tuple**. By habit it is called **`args`**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def total(*args):
    print(args, type(args))
    result = 0
    for n in args:
        result += n
    return result

print(total(1, 2, 3))
print(total(10, 20, 30, 40))
print(total())`,
          },
          { type: 'h3', text: 'Normal parameters plus *args' },
          {
            type: 'code',
            runnable: true,
            code: raw`def show(first, *others):
    print("first:", first)
    print("others:", others)

show(1)
show(1, 2, 3)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which built-in function takes any number of arguments? Hint: you have used it since Session 1.',
          },
        ],
      },
      {
        id: 's12-kwargs',
        title: '**kwargs: any number of keyword arguments',
        blocks: [
          {
            type: 'p',
            text: 'A parameter with a **double star** collects all the extra **keyword arguments** into a **dictionary**. By habit it is called **`kwargs`**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def profile(**kwargs):
    print(kwargs, type(kwargs))
    for key, value in kwargs.items():
        print(key, "=", value)

profile(name="Aman", age=20, city="Delhi")`,
          },
          { type: 'h3', text: 'All of them together' },
          {
            type: 'p',
            text: 'The **order** in the definition is: normal parameters, `*args`, then `**kwargs`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def demo(a, b=2, *args, **kwargs):
    print("a =", a)
    print("b =", b)
    print("args =", args)
    print("kwargs =", kwargs)

demo(1)
print()
demo(1, 5, 6, 7, x=10, y=20)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: 'The names `args` and `kwargs` are only a **habit**. The stars are what matter. `*numbers` and `**options` work just as well.',
          },
        ],
      },
      {
        id: 's12-unpacking-calls',
        title: 'Unpacking when you call',
        blocks: [
          {
            type: 'p',
            text: 'The stars also work **in the call**. `*` spreads a list or tuple into **positional** arguments, `**` spreads a dictionary into **keyword** arguments.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def volume(length, width, height):
    return length * width * height

sizes = [2, 3, 4]
print(volume(*sizes))

info = {"length": 5, "width": 2, "height": 3}
print(volume(**info))`,
          },
          { type: 'h3', text: 'Passing everything on' },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [5, 1, 9, 3]
print(max(*nums))
print(*nums)
print(*nums, sep=", ")

first = {"a": 1}
second = {"b": 2}
print({**first, **second})`,
          },
        ],
      },
      {
        id: 's12-keyword-only',
        title: 'Keyword-only parameters',
        blocks: [
          {
            type: 'p',
            text: 'Parameters written **after `*args`** (or after a bare `*`) can **only** be given by **name**. This stops mix-ups.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def connect(host, *, port=80, secure=False):
    return f"{host}:{port} secure={secure}"

print(connect("example.com"))
print(connect("example.com", port=443, secure=True))`,
          },
          {
            type: 'code',
            label: 'Try it: port must be named',
            runnable: true,
            code: raw`def connect(host, *, port=80):
    return host + ":" + str(port)

print(connect("example.com", 443))`,
          },
        ],
      },
      {
        id: 's12-functions-as-values',
        title: 'Functions are values',
        blocks: [
          {
            type: 'p',
            text: 'In Python a function is **a value like any other**. You can put it in a variable, a list, or **pass it to another function**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def shout(text):
    return text.upper() + "!"

say = shout
print(say("hello"))

def apply(func, value):
    return func(value)

print(apply(shout, "python"))
print(apply(len, "python"))
print(apply(abs, -7))`,
          },
          { type: 'h3', text: 'A list of functions' },
          {
            type: 'code',
            runnable: true,
            code: raw`def double(n):
    return n * 2

def square(n):
    return n * n

for func in [double, square, abs]:
    print(func(-3))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Why do we write `apply(shout, ...)` and not `apply(shout(), ...)`?',
          },
        ],
      },
      {
        id: 's12-lambda',
        title: 'lambda: a function in one line',
        blocks: [
          {
            type: 'p',
            text: 'A **lambda** is a small **nameless function** written in one line: `lambda parameters: expression`. It **returns** the expression automatically.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`square = lambda n: n * n
add = lambda a, b: a + b
greet = lambda name="friend": "Hello, " + name

print(square(6))
print(add(3, 4))
print(greet())
print(greet("Aman"))`,
          },
          {
            type: 'table',
            head: ['`def` function', '`lambda`'],
            rows: [
              ['`def square(n):`  `return n * n`', '`lambda n: n * n`'],
              ['has a **name**', 'is **nameless** (unless you store it)'],
              ['many lines allowed', '**one expression** only'],
              ['uses `return`', 'returns the value **automatically**'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'When to use it',
            text: 'Use a `lambda` for a **tiny, one-time** function, usually **passed to another function**. For anything longer, write a normal `def`.',
          },
        ],
      },
      {
        id: 's12-lambda-key',
        title: 'lambda with sorted, min and max',
        blocks: [
          {
            type: 'p',
            text: 'The **`key=`** argument takes a function that says **what to compare**. A `lambda` is perfect for it.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`words = ["banana", "kiwi", "apple", "fig"]
print(sorted(words))
print(sorted(words, key=len))
print(sorted(words, key=lambda w: w[-1]))
print(max(words, key=len))
print(min(words, key=lambda w: w[1]))`,
          },
          { type: 'h3', text: 'Sorting records' },
          {
            type: 'code',
            runnable: true,
            code: raw`students = [("Aman", 85), ("Ankit", 92), ("Kabir", 78)]
print(sorted(students, key=lambda s: s[1]))
print(sorted(students, key=lambda s: s[1], reverse=True))

people = [{"name": "Aman", "age": 20}, {"name": "Ankit", "age": 19}]
print(sorted(people, key=lambda p: p["age"]))`,
          },
        ],
      },
      {
        id: 's12-map',
        title: 'map()',
        blocks: [
          {
            type: 'p',
            text: '`map(function, items)` **applies a function to every item** and gives a **new sequence** of the results. Wrap it in `list()` to see the values.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [1, 2, 3, 4]
print(list(map(lambda n: n * n, nums)))
print(list(map(str, nums)))
print(list(map(len, ["hi", "python", "a"])))
print(list(map(float, ["1.5", "2", "3.25"])))`,
          },
          { type: 'h3', text: 'map with a named function' },
          {
            type: 'code',
            runnable: true,
            code: raw`def to_fahrenheit(c):
    return c * 9 / 5 + 32

celsius = [0, 20, 37, 100]
print(list(map(to_fahrenheit, celsius)))`,
          },
          { type: 'h3', text: 'map with two lists' },
          {
            type: 'code',
            runnable: true,
            code: raw`a = [1, 2, 3]
b = [10, 20, 30]
print(list(map(lambda x, y: x + y, a, b)))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Careful',
            text: '`map()` does **not** give a list. `print(map(...))` shows something like `<map object ...>`. Use `list(map(...))`.',
          },
        ],
      },
      {
        id: 's12-filter',
        title: 'filter()',
        blocks: [
          {
            type: 'p',
            text: '`filter(function, items)` **keeps only the items** for which the function returns **True**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [1, 2, 3, 4, 5, 6, 7, 8]
print(list(filter(lambda n: n % 2 == 0, nums)))
print(list(filter(lambda n: n > 5, nums)))

words = ["apple", "", "kiwi", "", "fig"]
print(list(filter(None, words)))
print(list(filter(lambda w: len(w) > 3, words)))`,
          },
          {
            type: 'ul',
            items: [
              'The function must answer **True or False** for each item.',
              '`filter(None, items)` removes every **falsy** item: `0`, `""`, `None`, `[]`.',
              'Like `map`, it needs `list()` to show the result.',
            ],
          },
          { type: 'h3', text: 'Passing marks' },
          {
            type: 'code',
            runnable: true,
            code: raw`marks = {"Aman": 85, "Ankit": 42, "Kabir": 67, "Meera": 30}
passed = list(filter(lambda name: marks[name] >= 50, marks))
print(passed)`,
          },
        ],
      },
      {
        id: 's12-combine',
        title: 'map and filter together',
        blocks: [
          {
            type: 'p',
            text: 'Chain them: **filter first**, then **map**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [1, 2, 3, 4, 5, 6]
even_squares = list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, nums)))
print(even_squares)`,
          },
          { type: 'h3', text: 'The same with a list comprehension' },
          {
            type: 'p',
            text: 'Many Python programmers prefer a **list comprehension**: it says the same thing and reads more clearly.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`nums = [1, 2, 3, 4, 5, 6]
print([n * n for n in nums if n % 2 == 0])
print([n * n for n in nums])
print([n for n in nums if n > 3])`,
          },
          {
            type: 'table',
            head: ['Job', 'map / filter', 'Comprehension'],
            rows: [
              ['change every item', '`map(f, items)`', '`[f(x) for x in items]`'],
              ['keep some items', '`filter(f, items)`', '`[x for x in items if f(x)]`'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Ask',
            text: 'Which one is easier to read for you, the `map`/`filter` line or the comprehension?',
          },
        ],
      },
      {
        id: 's12-more-tools',
        title: 'Two more helpers: zip and reduce',
        blocks: [
          {
            type: 'p',
            text: '`zip()` **pairs up** items from two lists. `functools.reduce()` **combines** all the items into **one value**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`names = ["Aman", "Ankit", "Kabir"]
marks = [85, 92, 78]
print(list(zip(names, marks)))
print(dict(zip(names, marks)))

for name, mark in zip(names, marks):
    print(name, mark)`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from functools import reduce

nums = [1, 2, 3, 4, 5]
print(reduce(lambda a, b: a + b, nums))
print(reduce(lambda a, b: a * b, nums))
print(reduce(lambda a, b: a if a > b else b, nums))`,
          },
        ],
      },
      {
        id: 's12-return-function',
        title: 'A function that returns a function',
        blocks: [
          {
            type: 'p',
            text: 'Since functions are values, a function can **build and return another function**. The inner one **remembers** the argument it was made with.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def make_multiplier(n):
    return lambda x: x * n

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5), triple(5))
print(make_multiplier(10)(4))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Note',
            text: 'You do not need this every day, but you will see it in real code, for example in **decorators** (a later topic).',
          },
        ],
      },
      {
        id: 's12-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'A **list or dictionary as a default** value: use `None` instead.',
              'A **positional argument after a keyword** argument: it is a `SyntaxError`.',
              'Writing a **long `lambda`**: if it is hard to read, use `def`.',
              'Printing `map(...)` or `filter(...)` **without `list()`**.',
              'Calling the function inside `map`: `map(f(), items)` is wrong, write `map(f, items)`.',
              'A `lambda` for `filter` that **returns a value** but not a **True or False** meaning.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: what is wrong here?',
            runnable: true,
            code: raw`nums = [1, 2, 3]
print(map(lambda n: n * 2, nums))
print(list(map(lambda n: n * 2, nums())))`,
          },
        ],
      },
      {
        id: 's12-practice',
        title: 'Practice',
        blocks: [
          { type: 'h3', text: 'Warm-up questions' },
          {
            type: 'ol',
            items: [
              'Write a function `power(base, exp=2)` and call it with and without the second argument.',
              'Write a function `average(*nums)` that works for any number of numbers.',
              'Write a function that takes `**kwargs` and prints each key and value on its own line.',
              'Use `map` and a `lambda` to turn `[1, 2, 3]` into `["#1", "#2", "#3"]`.',
              'Use `filter` and a `lambda` to keep the words longer than 3 letters.',
            ],
          },
          { type: 'h3', text: 'Harder questions' },
          {
            type: 'ol',
            start: 6,
            items: [
              'Sort a list of `(name, marks)` tuples by marks, highest first.',
              'Use `map` and `filter` to print the squares of the odd numbers from 1 to 10.',
              'Write `make_adder(n)` that returns a function adding `n` to its argument.',
              'Write a function `describe(name, *hobbies, **details)` and call it in two different ways.',
              'Rewrite your `map` and `filter` answers as list comprehensions.',
            ],
          },
          { type: 'h3', text: 'Find the output' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`def f(a, *args, **kwargs):
    return a, args, kwargs

print(f(1))
print(f(1, 2, 3, x=4))
nums = [3, 8, 5, 10]
print(list(filter(lambda n: n > 4, nums)))
print(list(map(lambda n: n // 2, nums)))
print(sorted(nums, key=lambda n: -n))`,
          },
          { type: 'h3', text: 'Try the lambda question' },
          {
            type: 'code',
            label: 'Your turn: print the names sorted by length, then press Run',
            runnable: true,
            code: raw`names = ["Meera", "Aman", "Kabir", "Ria"]
# sort by the length of each name
`,
          },
        ],
      },
      {
        id: 's12-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a function `join_words(*words, sep=" ")` that joins any number of words.',
              'Write a function that takes a list of numbers and returns the **squares of the even numbers** using `filter` and `map`, then again with a comprehension.',
              'Given a list of dictionaries with `name` and `price`, print them **sorted by price** using a `lambda`.',
              'Write a function `make_greeter(greeting)` that returns a function, and use it to make `hello` and `namaste`.',
              'Revise: **defaults**, **keyword arguments**, `*args`, `**kwargs`, `lambda`, `map`, `filter`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Files and error handling.',
          },
        ],
      },
    ],
  },
  {
    slug: 'modules-and-packages',
    title: 'Modules and Packages',
    summary: 'import, math, random, datetime, your own modules and pip install.',
    hero: {
      file: 'modules.py',
      lines: ['import math', 'print(math.sqrt(144))'],
      output: '12.0',
    },
    sections: [
      {
        id: 's13-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What does `*args` collect, and what type is it?',
              'What does `lambda n: n * n` do?',
              'What is the difference between `map` and `filter`?',
            ],
          },
        ],
      },
      {
        id: 's13-what',
        title: 'What is a module?',
        blocks: [
          {
            type: 'p',
            text: 'A **module** is a Python file full of ready-made code: functions, values and more. Instead of writing everything yourself, you **import** a module and use what is inside.',
          },
          {
            type: 'ul',
            items: [
              'Python comes with hundreds of modules. This is called the **standard library**: "batteries included".',
              'Other people share **packages** (groups of modules) that you can install.',
              'You can also write **your own** modules.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import math

print(math.sqrt(144))
print(math.pi)`,
          },
          {
            type: 'ul',
            items: [
              '`import math` loads the module.',
              '`math.sqrt` means: the `sqrt` function that lives inside `math`. The **dot** goes inside the module.',
            ],
          },
        ],
      },
      {
        id: 's13-import',
        title: 'Ways to import',
        blocks: [
          {
            type: 'table',
            head: ['Style', 'How you use it'],
            rows: [
              ['`import math`', '`math.sqrt(16)`'],
              ['`from math import sqrt`', '`sqrt(16)`'],
              ['`from math import sqrt, pi`', '`sqrt(16)` and `pi`'],
              ['`import math as m`', '`m.sqrt(16)`'],
              ['`from math import *`', 'everything, with no `math.` (avoid this)'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import math
print(math.sqrt(16))

from math import sqrt, pi
print(sqrt(25))
print(pi)

import math as m
print(m.floor(3.9))`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Avoid import *',
            text: '`from math import *` pours every name into your program. You cannot tell where a name came from, and it can hide your own names. Import only what you need.',
          },
          {
            type: 'p',
            text: 'Put all your `import` lines at the **top** of the file.',
          },
        ],
      },
      {
        id: 's13-math',
        title: 'The math module',
        blocks: [
          {
            type: 'table',
            head: ['Name', 'What it gives', 'Example'],
            rows: [
              ['`math.sqrt(x)`', 'square root', '`sqrt(49)` is `7.0`'],
              ['`math.pi`', 'the number pi', '`3.14159...`'],
              ['`math.floor(x)`', 'round **down**', '`floor(3.9)` is `3`'],
              ['`math.ceil(x)`', 'round **up**', '`ceil(3.1)` is `4`'],
              ['`math.factorial(n)`', 'n times n-1 ... times 1', '`factorial(5)` is `120`'],
              ['`math.gcd(a, b)`', 'biggest number that divides both', '`gcd(12, 18)` is `6`'],
              ['`math.pow(a, b)`', 'a to the power b (a float)', '`pow(2, 3)` is `8.0`'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import math

print(math.sqrt(49))
print(math.floor(3.9), math.ceil(3.1))
print(math.factorial(5))
print(math.gcd(12, 18))
print(math.pow(2, 3))`,
          },
          { type: 'h3', text: 'floor, ceil and round' },
          {
            type: 'code',
            runnable: true,
            code: raw`import math

x = 2.5
print(math.floor(x))
print(math.ceil(x))
print(round(x))
print(round(3.5))
print(round(3.14159, 2))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'round() is a little surprising',
            text: '`round(2.5)` gives `2` and `round(3.5)` gives `4`. Python rounds a half to the **nearest even** number. Use `floor` or `ceil` when you need a fixed direction.',
          },
          { type: 'h3', text: 'Example: area of a circle' },
          {
            type: 'code',
            runnable: true,
            code: raw`import math

radius = 7
area = math.pi * radius ** 2
print("Area:", round(area, 2))`,
          },
        ],
      },
      {
        id: 's13-random',
        title: 'The random module',
        blocks: [
          {
            type: 'p',
            text: 'The `random` module makes **random** numbers and choices: games, quizzes, passwords, samples.',
          },
          {
            type: 'table',
            head: ['Name', 'What it does'],
            rows: [
              ['`random.random()`', 'a float from 0.0 up to (not including) 1.0'],
              ['`random.randint(a, b)`', 'a whole number from a to b, **both included**'],
              ['`random.uniform(a, b)`', 'a float between a and b'],
              ['`random.choice(items)`', 'one random item'],
              ['`random.sample(items, k)`', 'k different items'],
              ['`random.shuffle(items)`', 'mixes a list **in place**'],
              ['`random.seed(n)`', 'makes the "random" numbers repeat'],
            ],
          },
          {
            type: 'p',
            text: 'The numbers change every run, so this box prints different things each time you press **Run**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import random

print(random.randint(1, 6))
print(random.choice(["red", "green", "blue"]))
print(random.random())`,
          },
          { type: 'h3', text: 'shuffle and sample' },
          {
            type: 'code',
            runnable: true,
            code: raw`import random

cards = ["A", "K", "Q", "J", "10"]
random.shuffle(cards)
print(cards)

print(random.sample(range(1, 50), 6))`,
          },
          {
            type: 'ul',
            items: [
              '`shuffle` **changes** the list and returns `None`. Do not write `cards = random.shuffle(cards)`.',
              '`sample` never repeats an item, so it is good for lottery numbers or picking winners.',
            ],
          },
          { type: 'h3', text: 'seed: the same "random" numbers again' },
          {
            type: 'p',
            text: 'Computers do not make truly random numbers. They follow a recipe. `seed` picks the **starting point**, so the same seed gives the **same sequence**. This is useful for testing.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import random

random.seed(10)
first = [random.randint(1, 100) for _ in range(3)]

random.seed(10)
second = [random.randint(1, 100) for _ in range(3)]

print(first == second)`,
          },
        ],
      },
      {
        id: 's13-random-ex',
        title: 'Examples with random',
        blocks: [
          { type: 'h3', text: 'Roll two dice' },
          {
            type: 'code',
            runnable: true,
            code: raw`import random

d1 = random.randint(1, 6)
d2 = random.randint(1, 6)
print("You rolled", d1, "and", d2)
print("Total:", d1 + d2)`,
          },
          { type: 'h3', text: 'A one-time password (OTP)' },
          {
            type: 'code',
            runnable: true,
            code: raw`import random

otp = ""
for _ in range(6):
    otp += str(random.randint(0, 9))
print("Your OTP is", otp)`,
          },
          { type: 'h3', text: 'A random password' },
          {
            type: 'code',
            runnable: true,
            code: raw`import random
import string

letters = string.ascii_letters + string.digits
password = "".join(random.choice(letters) for _ in range(10))
print(password)`,
          },
          {
            type: 'ul',
            items: [
              '`string.ascii_letters` is all the letters, and `string.digits` is `"0123456789"`.',
              '`"".join(...)` glues the 10 chosen characters into one string.',
            ],
          },
          { type: 'h3', text: 'Heads or tails, 1000 times' },
          {
            type: 'code',
            runnable: true,
            code: raw`import random

heads = 0
for _ in range(1000):
    if random.choice(["H", "T"]) == "H":
        heads += 1
print("Heads:", heads)
print("Tails:", 1000 - heads)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Not for real security',
            text: '`random` is fine for games and practice, but it is **not safe for real passwords or bank codes**. For those, Python has the `secrets` module.',
          },
        ],
      },
      {
        id: 's13-datetime',
        title: 'The datetime module',
        blocks: [
          {
            type: 'p',
            text: 'The `datetime` module works with **dates and times**. It has three main parts:',
          },
          {
            type: 'table',
            head: ['Name', 'What it holds', 'Example'],
            rows: [
              ['`date`', 'year, month, day', '`date(2026, 8, 15)`'],
              ['`datetime`', 'date and time together', '`datetime(2026, 8, 15, 9, 30)`'],
              ['`timedelta`', 'a **length of time**', '`timedelta(days=7)`'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from datetime import date, datetime

d = date(2026, 8, 15)
print(d)
print(d.year, d.month, d.day)

dt = datetime(2026, 8, 15, 9, 30)
print(dt)
print(dt.hour, dt.minute)`,
          },
          { type: 'h3', text: 'Today and now' },
          {
            type: 'p',
            text: '`date.today()` and `datetime.now()` read the **computer clock**, so the answer is different every time. This box only checks the type and the year.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from datetime import date, datetime

today = date.today()
now = datetime.now()
print(type(today))
print(today.year >= 2025)
print(type(now))`,
          },
          { type: 'h3', text: 'Dates and timedelta' },
          {
            type: 'p',
            text: 'Subtract two dates to get a `timedelta`. Add a `timedelta` to a date to move forward or back.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from datetime import date, timedelta

start = date(2026, 1, 1)
end = date(2026, 3, 1)
gap = end - start
print(gap)
print(gap.days)

print(start + timedelta(days=30))
print(end - timedelta(weeks=1))`,
          },
          { type: 'h3', text: 'Weekday name' },
          {
            type: 'code',
            runnable: true,
            code: raw`from datetime import date

d = date(2026, 8, 15)
print(d.weekday())
print(d.strftime("%A"))`,
          },
          {
            type: 'p',
            text: '`weekday()` gives a number: Monday is `0` and Sunday is `6`.',
          },
        ],
      },
      {
        id: 's13-format',
        title: 'Formatting and reading dates',
        blocks: [
          {
            type: 'p',
            text: '`strftime` turns a date **into text** in the shape you want. `strptime` does the reverse: it reads text **into a date**.',
          },
          {
            type: 'table',
            head: ['Code', 'Meaning', 'Example'],
            rows: [
              ['`%d`', 'day (2 digits)', '`05`'],
              ['`%m`', 'month number', '`08`'],
              ['`%B`', 'month name', '`August`'],
              ['`%b`', 'short month', '`Aug`'],
              ['`%Y`', 'year (4 digits)', '`2026`'],
              ['`%A`', 'weekday name', '`Saturday`'],
              ['`%H:%M`', 'hour and minute (24 hour)', '`09:30`'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from datetime import datetime

dt = datetime(2026, 8, 5, 9, 30)
print(dt.strftime("%d/%m/%Y"))
print(dt.strftime("%d %B %Y"))
print(dt.strftime("%A, %H:%M"))`,
          },
          { type: 'h3', text: 'Reading a date from text' },
          {
            type: 'code',
            runnable: true,
            code: raw`from datetime import datetime

text = "25/12/2026"
d = datetime.strptime(text, "%d/%m/%Y")
print(d)
print(d.strftime("%A"))`,
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`from datetime import date

born = date(2000, 6, 15)
check = date(2026, 6, 14)
age = check.year - born.year
if (check.month, check.day) < (born.month, born.day):
    age -= 1
print("Age:", age)`,
          },
          {
            type: 'p',
            text: 'The `if` line lowers the age by one when the birthday has **not happened yet** this year. Tuples compare month first, then day.',
          },
        ],
      },
      {
        id: 's13-others',
        title: 'More useful modules',
        blocks: [
          {
            type: 'table',
            head: ['Module', 'Use it for'],
            rows: [
              ['`math`', 'maths functions'],
              ['`random`', 'random numbers and choices'],
              ['`datetime`', 'dates and times'],
              ['`statistics`', 'mean, median, mode'],
              ['`collections`', '`Counter` and other special containers'],
              ['`time`', 'time in seconds, `sleep`'],
              ['`os`', 'files, folders and the system'],
              ['`sys`', 'Python itself (version, arguments)'],
              ['`json`', 'reading and writing JSON'],
            ],
          },
          { type: 'h3', text: 'statistics' },
          {
            type: 'code',
            runnable: true,
            code: raw`import statistics

marks = [70, 85, 85, 90, 100]
print(statistics.mean(marks))
print(statistics.median(marks))
print(statistics.mode(marks))`,
          },
          { type: 'h3', text: 'collections.Counter' },
          {
            type: 'p',
            text: '`Counter` does the counting from the dictionary session in one line.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from collections import Counter

word = "banana"
counts = Counter(word)
print(counts)
print(counts.most_common(1))`,
          },
          { type: 'h3', text: 'time' },
          {
            type: 'code',
            runnable: true,
            code: raw`import time

start = time.time()
total = sum(range(1_000_000))
took = time.time() - start
print(total)
print(took < 5)`,
          },
          {
            type: 'p',
            text: '`time.time()` is the number of seconds since 1 January 1970. Subtract two readings to time a piece of code. `time.sleep(2)` makes the program wait 2 seconds.',
          },
        ],
      },
      {
        id: 's13-find',
        title: 'Finding what is inside a module',
        blocks: [
          {
            type: 'p',
            text: 'You do not need to remember everything. Python can tell you what a module has.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import math

print(math.sqrt.__doc__)
print("floor" in dir(math))
print(len(dir(math)) > 40)`,
          },
          {
            type: 'ul',
            items: [
              '`dir(module)` lists the names inside a module.',
              '`help(module.name)` shows the full help text (best in a terminal or IDLE).',
              'The Python documentation at docs.python.org has an example for every module.',
            ],
          },
        ],
      },
      {
        id: 's13-own',
        title: 'Writing your own module',
        blocks: [
          {
            type: 'p',
            text: 'Any `.py` file is a module. Save the code you reuse in one file, and import it from another file **in the same folder**.',
          },
          {
            type: 'code',
            label: 'File 1: shapes.py',
            code: raw`PI = 3.14159

def circle_area(r):
    return PI * r ** 2

def square_area(side):
    return side * side`,
          },
          {
            type: 'code',
            label: 'File 2: main.py (same folder)',
            code: raw`import shapes

print(shapes.circle_area(2))
print(shapes.square_area(5))`,
            output: '12.56636\n25',
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'This one needs two real files',
            text: 'The Try it boxes run one piece of code, so these two boxes are for reading. Try them on your own computer, or in your IDE, with both files in one folder.',
          },
          { type: 'h3', text: '__name__ == "__main__"' },
          {
            type: 'p',
            text: 'Every file has a built-in name called `__name__`. When you **run** the file directly it is `"__main__"`. When another file **imports** it, `__name__` is the module name instead.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`print(__name__)

def main():
    print("Running as the main program")

if __name__ == "__main__":
    main()`,
          },
          {
            type: 'p',
            text: 'Code under `if __name__ == "__main__":` runs **only when the file is started directly**, not when it is imported. That is how a module can have test code that stays quiet when imported.',
          },
        ],
      },
      {
        id: 's13-packages',
        title: 'Packages',
        blocks: [
          {
            type: 'p',
            text: 'A **package** is a **folder** of modules. Python knows a folder is a package when it holds a file called `__init__.py` (it can be empty).',
          },
          {
            type: 'code',
            label: 'A small package',
            code: raw`my_project/
    main.py
    tools/
        __init__.py
        maths.py
        text.py`,
          },
          {
            type: 'code',
            label: 'main.py',
            code: raw`from tools import maths
from tools.text import shout

print(maths.double(4))
print(shout("hi"))`,
            output: '8\nHI!',
          },
          {
            type: 'ul',
            items: [
              '`tools.maths` means: the `maths` module inside the `tools` package.',
              'Big libraries such as `numpy` and `pandas` are packages with many modules inside.',
            ],
          },
        ],
      },
      {
        id: 's13-pip',
        title: 'pip install',
        blocks: [
          {
            type: 'p',
            text: 'The standard library is only the start. Thousands of free packages are shared on **PyPI**, the Python Package Index. **`pip`** is the tool that downloads and installs them.',
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'pip runs in the terminal',
            text: 'Type `pip` commands in **Command Prompt** or **PowerShell** (the terminal), not inside a Python file and not in the Try it boxes on this site.',
          },
          {
            type: 'code',
            label: 'Terminal commands',
            code: raw`pip --version
pip install requests
pip install requests==2.31.0
pip list
pip show requests
pip uninstall requests`,
          },
          {
            type: 'table',
            head: ['Command', 'What it does'],
            rows: [
              ['`pip install name`', 'download and install a package'],
              ['`pip install name==1.2.3`', 'install one exact version'],
              ['`pip install --upgrade name`', 'update to the newest version'],
              ['`pip list`', 'show everything installed'],
              ['`pip show name`', 'details about one package'],
              ['`pip uninstall name`', 'remove a package'],
              ['`pip freeze`', 'list packages with exact versions'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'If "pip" is not found on Windows',
            text: 'Try `py -m pip install requests`. It runs pip through the Python launcher, so it works even when `pip` is not on the PATH.',
          },
          { type: 'h3', text: 'After installing' },
          {
            type: 'p',
            text: 'Import an installed package just like a standard module.',
          },
          {
            type: 'code',
            label: 'Needs the internet and: pip install requests',
            code: raw`import requests

reply = requests.get("https://www.python.org")
print(reply.status_code)`,
            output: '200',
          },
          {
            type: 'p',
            text: '`200` means "OK". That is the web server saying the page was found.',
          },
        ],
      },
      {
        id: 's13-venv',
        title: 'Virtual environments and requirements.txt',
        blocks: [
          {
            type: 'p',
            text: 'Different projects may need different versions of the same package. A **virtual environment** gives each project its **own private set of packages**.',
          },
          {
            type: 'code',
            label: 'Terminal commands (Windows)',
            code: raw`python -m venv venv
venv\Scripts\activate
pip install requests
pip freeze > requirements.txt
deactivate`,
          },
          {
            type: 'ul',
            items: [
              '`python -m venv venv` makes a folder called `venv` for this project.',
              '`activate` switches it on. The prompt starts with `(venv)`.',
              '`pip freeze > requirements.txt` saves the list of packages and versions.',
              'A friend can then run `pip install -r requirements.txt` to get the same packages.',
              '`deactivate` switches it off.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'On Mac or Linux',
            text: 'Use `python3` instead of `python`, and activate with `source venv/bin/activate`.',
          },
        ],
      },
      {
        id: 's13-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Forgetting to import.** Using `sqrt(9)` without `from math import sqrt` gives a `NameError`.',
              '**A misspelled or missing module** gives `ModuleNotFoundError`. For a package, you may need `pip install` first.',
              '**Naming your own file like a module.** A file called `random.py` or `math.py` hides the real one, and your imports break.',
              '**Writing `import math` but then calling `sqrt(9)`.** You need `math.sqrt(9)`.',
              '**Installing with a different Python than you run.** Use `py -m pip install` so they match.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`import mathh

print(mathh.sqrt(4))`,
          },
          {
            type: 'code',
            label: 'Try it: this also fails on purpose',
            runnable: true,
            code: raw`import math

print(sqrt(9))`,
          },
        ],
      },
      {
        id: 's13-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: print the area of a circle with radius 10, rounded to 1 decimal place',
            runnable: true,
            code: raw`import math

`,
          },
          {
            type: 'code',
            label: 'Your turn: pick 3 different names at random from the list',
            runnable: true,
            code: raw`import random

names = ["Aman", "Ankit", "Neha", "Rohit", "Sara"]
`,
          },
          {
            type: 'code',
            label: 'Your turn: print how many days from 1 Jan 2026 to 25 Dec 2026',
            runnable: true,
            code: raw`from datetime import date

`,
          },
        ],
      },
      {
        id: 's13-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a program that rolls **two dice 100 times** and counts how many times the total is 7.',
              'Write a function that makes a **random password** of any length.',
              'Ask for a birth date as text (`dd/mm/yyyy`), read it with `strptime`, and print the **age** and the **weekday** of birth.',
              'Make your own module `mytools.py` with two functions, then import it in another file.',
              'Install a package with `pip install` and print its version with `pip show`.',
              'Revise: **import styles**, `math`, `random`, `datetime`, **modules vs packages**, `pip`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'File handling: read, write, append, `with`, and working with text and CSV files.',
          },
        ],
      },
    ],
  },
  {
    slug: 'file-handling',
    title: 'File Handling',
    summary: 'Read, write, append, with, and working with text and CSV files.',
    hero: {
      file: 'files.py',
      lines: ['with open("hi.txt", "w") as f:', '    f.write("Hello file")', 'print(open("hi.txt").read())'],
      output: 'Hello file',
    },
    sections: [
      {
        id: 's14-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between `import math` and `from math import sqrt`?',
              'What does `random.randint(1, 6)` give?',
              'Where do you type `pip install`?',
            ],
          },
        ],
      },
      {
        id: 's14-why',
        title: 'Why files?',
        blocks: [
          {
            type: 'p',
            text: 'Variables live in **memory**. When the program ends, everything is **gone**. A **file** keeps data on the disk, so it is still there next time.',
          },
          {
            type: 'ul',
            items: [
              'Save marks, contacts, a to-do list or a game score.',
              'Read data that someone else made, such as a list of names.',
              'Write a **report** or a **log** of what the program did.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Files in the Try it boxes',
            text: 'The Try it boxes run inside your browser and use a **temporary** file area. Files you write there are real for that page, but they disappear when you reload. On your own computer the files stay on the disk.',
          },
        ],
      },
      {
        id: 's14-open',
        title: 'open() and the modes',
        blocks: [
          {
            type: 'p',
            text: '`open(name, mode)` opens a file and gives back a **file object**. The **mode** says what you want to do.',
          },
          {
            type: 'table',
            head: ['Mode', 'Meaning', 'If the file does not exist'],
            rows: [
              ['`"r"`', 'read (the default)', 'error'],
              ['`"w"`', 'write: **erases** the old content', 'creates it'],
              ['`"a"`', 'append: adds to the **end**', 'creates it'],
              ['`"x"`', 'create new, fail if it exists', 'creates it'],
              ['`"r+"`', 'read and write', 'error'],
            ],
          },
          {
            type: 'p',
            text: 'Add `"b"` for a **binary** file such as an image (`"rb"`, `"wb"`). Without it the file is **text**.',
          },
        ],
      },
      {
        id: 's14-write',
        title: 'Writing a file',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`f = open("hello.txt", "w")
f.write("Hello, file!")
f.close()

f = open("hello.txt", "r")
print(f.read())
f.close()`,
          },
          {
            type: 'ul',
            items: [
              '`"w"` makes the file if it is not there.',
              '`write()` puts text in the file. It does **not** add a new line for you.',
              '`close()` finishes the job. Always close a file you open.',
            ],
          },
          { type: 'h3', text: 'New lines' },
          {
            type: 'p',
            text: 'Put `\\n` at the end of each line to start the next line.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`f = open("names.txt", "w")
f.write("Aman\n")
f.write("Ankit\n")
f.write("Neha\n")
f.close()

print(open("names.txt").read())`,
          },
          { type: 'h3', text: 'writelines' },
          {
            type: 'code',
            runnable: true,
            code: raw`lines = ["one\n", "two\n", "three\n"]

f = open("numbers.txt", "w")
f.writelines(lines)
f.close()

print(open("numbers.txt").read())`,
          },
          {
            type: 'p',
            text: '`writelines` writes a list of strings, but it does **not** add the `\\n` for you. Put it in each string.',
          },
        ],
      },
      {
        id: 's14-with',
        title: 'The with statement',
        blocks: [
          {
            type: 'p',
            text: 'If you forget `close()`, or the program crashes in the middle, the file can stay open. The **`with`** statement closes it **automatically** when the block ends. This is the **best way** to work with files.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("notes.txt", "w") as f:
    f.write("Line 1\n")
    f.write("Line 2\n")

with open("notes.txt") as f:
    print(f.read())`,
          },
          {
            type: 'ul',
            items: [
              '`as f` gives the file object the name `f`.',
              'The indented lines run while the file is open.',
              'When the indent ends, Python closes the file for you.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("data.txt", "w") as f:
    f.write("hi")

print(f.closed)`,
          },
          {
            type: 'p',
            text: '`f.closed` is `True` after the `with` block. The file is shut for you.',
          },
        ],
      },
      {
        id: 's14-read',
        title: 'Reading a file',
        blocks: [
          {
            type: 'p',
            text: 'First, make a small file to practise on. The next boxes each build their own copy.',
          },
          {
            type: 'table',
            head: ['Method', 'What it gives'],
            rows: [
              ['`f.read()`', 'the **whole file** as one string'],
              ['`f.readline()`', 'the **next line** (with its `\\n`)'],
              ['`f.readlines()`', 'a **list** of all the lines'],
              ['`for line in f:`', 'one line at a time (best for big files)'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("fruits.txt", "w") as f:
    f.write("apple\nbanana\ncherry\n")

with open("fruits.txt") as f:
    text = f.read()
print(text)
print(len(text))`,
          },
          { type: 'h3', text: 'readline and readlines' },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("fruits.txt", "w") as f:
    f.write("apple\nbanana\ncherry\n")

with open("fruits.txt") as f:
    print(f.readline())
    print(f.readline())

with open("fruits.txt") as f:
    print(f.readlines())`,
          },
          {
            type: 'p',
            text: 'Each line ends with `\\n`. That is why `print` leaves a blank line after the first two lines.',
          },
          { type: 'h3', text: 'Looping over the lines' },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("fruits.txt", "w") as f:
    f.write("apple\nbanana\ncherry\n")

with open("fruits.txt") as f:
    for line in f:
        print(line.strip())`,
          },
          {
            type: 'p',
            text: '`strip()` removes the `\\n` (and spaces) at the ends of each line.',
          },
          { type: 'h3', text: 'Reading numbers' },
          {
            type: 'p',
            text: 'Everything you read from a text file is a **string**. Convert with `int()` or `float()` before doing maths.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("marks.txt", "w") as f:
    f.write("70\n85\n90\n")

total = 0
with open("marks.txt") as f:
    for line in f:
        total += int(line)

print("Total:", total)`,
          },
        ],
      },
      {
        id: 's14-pointer',
        title: 'The file position',
        blocks: [
          {
            type: 'p',
            text: 'A file remembers **where you are** in it. After `read()` you are at the **end**, so a second `read()` gives an **empty string**.',
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`with open("p.txt", "w") as f:
    f.write("abc")

with open("p.txt") as f:
    print(repr(f.read()))
    print(repr(f.read()))
    f.seek(0)
    print(repr(f.read()))`,
          },
          {
            type: 'ul',
            items: [
              '`f.seek(0)` jumps back to the start.',
              '`f.tell()` tells you the current position.',
              'To read the file again, just open it again in a new `with`.',
            ],
          },
        ],
      },
      {
        id: 's14-append',
        title: 'Appending',
        blocks: [
          {
            type: 'p',
            text: '`"w"` **wipes** the old content. To **add** to the end, use **`"a"`**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("log.txt", "w") as f:
    f.write("Start\n")

with open("log.txt", "a") as f:
    f.write("Step 1\n")
    f.write("Step 2\n")

with open("log.txt") as f:
    print(f.read())`,
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`with open("w.txt", "w") as f:
    f.write("first\n")

with open("w.txt", "w") as f:
    f.write("second\n")

with open("w.txt") as f:
    print(f.read())`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: '"w" erases the file',
            text: 'Opening an existing file with `"w"` throws away what was in it, **even if you never write anything**. Use `"a"` when you want to keep the old content.',
          },
        ],
      },
      {
        id: 's14-examples',
        title: 'Examples with text files',
        blocks: [
          { type: 'h3', text: 'Count lines and words' },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("poem.txt", "w") as f:
    f.write("Roses are red\nViolets are blue\nPython is fun\n")

lines = 0
words = 0
with open("poem.txt") as f:
    for line in f:
        lines += 1
        words += len(line.split())

print("Lines:", lines)
print("Words:", words)`,
          },
          { type: 'h3', text: 'Search for a word' },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("poem.txt", "w") as f:
    f.write("Roses are red\nViolets are blue\nPython is fun\n")

with open("poem.txt") as f:
    for number, line in enumerate(f, start=1):
        if "are" in line:
            print(number, line.strip())`,
          },
          { type: 'h3', text: 'Copy a file with changes' },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("small.txt", "w") as f:
    f.write("hello\nworld\n")

with open("small.txt") as src, open("big.txt", "w") as dst:
    for line in src:
        dst.write(line.upper())

with open("big.txt") as f:
    print(f.read())`,
          },
          {
            type: 'p',
            text: 'One `with` can open **two files** at once, separated by a comma.',
          },
        ],
      },
      {
        id: 's14-exists',
        title: 'Does the file exist?',
        blocks: [
          {
            type: 'p',
            text: 'Opening a file that is not there for reading gives a **`FileNotFoundError`**.',
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`with open("missing.txt") as f:
    print(f.read())`,
          },
          {
            type: 'p',
            text: 'You can check first with the `os` module.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import os

print(os.path.exists("missing.txt"))

with open("here.txt", "w") as f:
    f.write("hi")

print(os.path.exists("here.txt"))
print(os.path.getsize("here.txt"))

os.remove("here.txt")
print(os.path.exists("here.txt"))`,
          },
          {
            type: 'table',
            head: ['Name', 'What it does'],
            rows: [
              ['`os.path.exists(p)`', '`True` if the file or folder is there'],
              ['`os.path.getsize(p)`', 'size in bytes'],
              ['`os.remove(p)`', 'delete a file'],
              ['`os.rename(a, b)`', 'rename a file'],
              ['`os.listdir()`', 'names of the files in the folder'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'There is a better way to handle a missing file than checking first: `try` and `except`. We learn it in the next session.',
          },
        ],
      },
      {
        id: 's14-paths',
        title: 'Paths and encoding',
        blocks: [
          {
            type: 'p',
            text: 'A **path** says where a file is. A name like `"data.txt"` means "in the **current folder**" (the folder the program runs from).',
          },
          {
            type: 'ul',
            items: [
              '**Relative path:** `"data/marks.txt"` starts from the current folder.',
              '**Absolute path:** `"C:/Users/Aman/marks.txt"` starts from the drive.',
            ],
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Backslashes on Windows',
            text: 'Write `"C:/Users/Aman/marks.txt"` with **forward slashes**, or a raw string `r"C:\\Users\\Aman\\marks.txt"`. A plain `"C:\\new\\table.txt"` breaks, because `\\n` and `\\t` are special characters.',
          },
          { type: 'h3', text: 'pathlib' },
          {
            type: 'p',
            text: 'The `pathlib` module treats a path as an object. `write_text` and `read_text` do a whole file in one line.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`from pathlib import Path

p = Path("quick.txt")
p.write_text("Short and sweet")
print(p.read_text())
print(p.exists())
print(p.suffix)`,
          },
          { type: 'h3', text: 'Encoding' },
          {
            type: 'p',
            text: 'A text file stores letters as numbers using an **encoding**. Use **`encoding="utf-8"`** so names like `Zoë` or Hindi text are safe on every computer.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("name.txt", "w", encoding="utf-8") as f:
    f.write("Zoë")

with open("name.txt", encoding="utf-8") as f:
    print(f.read())`,
          },
        ],
      },
      {
        id: 's14-todo',
        title: 'Example: a to-do list',
        blocks: [
          {
            type: 'p',
            text: 'A to-do list that **keeps its tasks** between runs. It uses `input()`, so run it on your own computer.',
          },
          {
            type: 'code',
            label: 'todo.py (run it on your computer)',
            code: raw`FILE = "todo.txt"

def load():
    tasks = []
    try:
        with open(FILE) as f:
            for line in f:
                tasks.append(line.strip())
    except FileNotFoundError:
        pass
    return tasks

def save(tasks):
    with open(FILE, "w") as f:
        for task in tasks:
            f.write(task + "\n")

tasks = load()
print("You have", len(tasks), "tasks")

new = input("New task (or press Enter to skip): ")
if new:
    tasks.append(new)
    save(tasks)

for i, task in enumerate(tasks, start=1):
    print(i, task)`,
            output: 'You have 0 tasks\nNew task (or press Enter to skip): Buy milk\n1 Buy milk',
          },
          {
            type: 'p',
            text: 'Run it twice. The second run starts with `You have 1 tasks`, because the list was **saved in a file**. (The `try` and `except` part is next class.)',
          },
          { type: 'h3', text: 'The same idea, without input()' },
          {
            type: 'code',
            runnable: true,
            code: raw`def save(tasks):
    with open("todo.txt", "w") as f:
        for task in tasks:
            f.write(task + "\n")

def load():
    with open("todo.txt") as f:
        return [line.strip() for line in f]

save(["Buy milk", "Call Neha", "Study Python"])
tasks = load()
tasks.append("Do homework")
save(tasks)

for i, task in enumerate(load(), start=1):
    print(i, task)`,
          },
        ],
      },
      {
        id: 's14-csv',
        title: 'CSV files',
        blocks: [
          {
            type: 'p',
            text: '**CSV** means **comma separated values**. It is a plain text file for a **table**: one row per line, columns separated by commas. Excel and Google Sheets open it.',
          },
          {
            type: 'code',
            label: 'marks.csv',
            code: raw`name,maths,science
Aman,85,90
Ankit,70,65
Neha,92,88`,
          },
          {
            type: 'p',
            text: 'You could split each line yourself, but the **`csv`** module handles quotes and commas inside values for you.',
          },
          { type: 'h3', text: 'Writing a CSV' },
          {
            type: 'code',
            runnable: true,
            code: raw`import csv

rows = [
    ["name", "maths", "science"],
    ["Aman", 85, 90],
    ["Ankit", 70, 65],
    ["Neha", 92, 88],
]

with open("marks.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

print(open("marks.csv").read())`,
          },
          {
            type: 'ul',
            items: [
              '`newline=""` stops blank lines appearing between rows on Windows. Always use it with `csv`.',
              '`writerow(list)` writes one row. `writerows(list of lists)` writes many.',
            ],
          },
          { type: 'h3', text: 'Reading a CSV' },
          {
            type: 'code',
            runnable: true,
            code: raw`import csv

with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows([["name", "maths"], ["Aman", 85], ["Ankit", 70]])

with open("marks.csv", newline="") as f:
    for row in csv.reader(f):
        print(row)`,
          },
          {
            type: 'p',
            text: 'Each row is a **list of strings**. The numbers come back as text, such as `"85"`. Convert them with `int()`.',
          },
          { type: 'h3', text: 'Skipping the header' },
          {
            type: 'code',
            runnable: true,
            code: raw`import csv

with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows([["name", "maths"], ["Aman", 85], ["Ankit", 70]])

with open("marks.csv", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)
    print("Columns:", header)
    for name, maths in reader:
        print(name, int(maths) + 5)`,
          },
          {
            type: 'p',
            text: '`next(reader)` takes the first row (the header) off, so the loop starts at the data.',
          },
        ],
      },
      {
        id: 's14-dictcsv',
        title: 'DictReader and DictWriter',
        blocks: [
          {
            type: 'p',
            text: 'Instead of numbering the columns, use **names**. `DictReader` gives each row as a **dictionary**, using the header as the keys.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import csv

with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows([
        ["name", "maths", "science"],
        ["Aman", 85, 90],
        ["Ankit", 70, 65],
        ["Neha", 92, 88],
    ])

with open("marks.csv", newline="") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["maths"])`,
          },
          { type: 'h3', text: 'DictWriter' },
          {
            type: 'code',
            runnable: true,
            code: raw`import csv

students = [
    {"name": "Aman", "city": "Delhi"},
    {"name": "Neha", "city": "Pune"},
]

with open("people.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "city"])
    writer.writeheader()
    writer.writerows(students)

print(open("people.csv").read())`,
          },
          {
            type: 'p',
            text: '`fieldnames` sets the column order. `writeheader()` writes the first line.',
          },
        ],
      },
      {
        id: 's14-marks',
        title: 'Example: marks report',
        blocks: [
          {
            type: 'p',
            text: 'Read a CSV of marks, work out each student\'s total and average, find the topper, and write a **report file**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import csv

with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows([
        ["name", "maths", "science", "english"],
        ["Aman", 85, 90, 78],
        ["Ankit", 70, 65, 80],
        ["Neha", 92, 88, 95],
    ])

results = []
with open("marks.csv", newline="") as f:
    for row in csv.DictReader(f):
        marks = [int(row["maths"]), int(row["science"]), int(row["english"])]
        results.append((row["name"], sum(marks), sum(marks) / 3))

topper = max(results, key=lambda r: r[1])

with open("report.txt", "w") as out:
    for name, total, avg in results:
        out.write(f"{name}: total {total}, average {avg:.1f}\n")
    out.write(f"Topper: {topper[0]}\n")

print(open("report.txt").read())`,
          },
          {
            type: 'ul',
            items: [
              '`max(..., key=lambda ...)` from the advanced functions class finds the top total.',
              'We read one file and wrote another in the same program.',
            ],
          },
        ],
      },
      {
        id: 's14-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Opening with `"w"` when you meant `"a"`.** The old content is gone.',
              '**Forgetting `\\n`.** All the text ends up on **one line**.',
              '**Forgetting `close()`.** Use `with` and you never forget.',
              '**Reading twice.** The second `read()` is empty. Open the file again, or use `seek(0)`.',
              '**Using numbers from a file as numbers.** They are strings. Use `int()` first.',
              '**Writing a number.** `f.write(5)` is a `TypeError`. Write `str(5)`.',
              '**Missing `newline=""` with csv** (blank lines on Windows).',
              '**Wrong folder.** The file name is relative to where the program **runs**, not where the `.py` file sits.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`with open("number.txt", "w") as f:
    f.write(5)`,
          },
        ],
      },
      {
        id: 's14-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: write the numbers 1 to 5, one per line, into nums.txt, then print the file',
            runnable: true,
            code: raw`with open("nums.txt", "w") as f:
    pass
`,
          },
          {
            type: 'code',
            label: 'Your turn: read nums.txt and print the sum of the numbers',
            runnable: true,
            code: raw`with open("nums.txt", "w") as f:
    f.write("1\n2\n3\n4\n5\n")

`,
          },
          {
            type: 'code',
            label: 'Your turn: append the line "6" to nums.txt, then print the number of lines',
            runnable: true,
            code: raw`with open("nums.txt", "w") as f:
    f.write("1\n2\n3\n4\n5\n")

`,
          },
        ],
      },
      {
        id: 's14-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a program that saves **5 names** typed by the user into `names.txt`, one per line.',
              'Read a text file and print the **longest line** and the **number of words**.',
              'Make a **contact book** that saves `name,phone` rows in a CSV and can search by name.',
              'Read `marks.csv` and write a second CSV with the **total and average** added as new columns.',
              'Make a **diary** program: each run **appends** today\'s entry with the date from `datetime`.',
              'Revise: **modes** `r`, `w`, `a`, `with`, `read`, `readline`, `readlines`, `csv.reader`, `DictReader`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Exception handling: `try`, `except`, `finally`, common errors and debugging tips.',
          },
        ],
      },
    ],
  },
]
