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
            text: 'An `if` **inside another `if`** is called a nested condition. The inner check happens **only if the outer one is True**.',
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
              'Revise the **indentation rules** and why the **order of `elif` blocks matters**.',
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
]
