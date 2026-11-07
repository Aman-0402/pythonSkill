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
              ['`title()`', 'first letter of each word capital', '`"hello world".title()` gives `Hello World`'],
              ['`capitalize()`', 'first letter of the string capital', '`"hello world".capitalize()` gives `Hello world`'],
              ['`strip()`', 'remove spaces at both ends', '`"  hi  ".strip()` gives `"hi"`'],
              ['`lstrip()`', 'remove spaces on the left', '`"  hi  ".lstrip()` gives `"hi  "`'],
              ['`rstrip()`', 'remove spaces on the right', '`"  hi  ".rstrip()` gives `"  hi"`'],
              ['`replace(a, b)`', 'replace text', '`"cat".replace("c", "b")` gives `bat`'],
            ],
          },
          { type: 'h3', text: 'upper() and lower()' },
          {
            type: 'code',
            runnable: true,
            label: 'upper(): make every letter a capital',
            code: raw`text = "hello python"
print(text.upper())`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'lower(): make every letter small',
            code: raw`text = "HELLO Python"
print(text.lower())`,
          },
          { type: 'h3', text: 'title() and capitalize()' },
          {
            type: 'code',
            runnable: true,
            label: 'title(): capital letter at the start of every word',
            code: raw`text = "learning python is fun"
print(text.title())`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'capitalize(): capital only at the start of the string',
            code: raw`text = "learning python is fun"
print(text.capitalize())`,
          },
          { type: 'h3', text: 'strip(), lstrip() and rstrip()' },
          {
            type: 'p',
            text: 'The `[` and `]` in these examples make the spaces easy to see.',
          },
          {
            type: 'code',
            runnable: true,
            label: 'strip(): remove spaces from both ends',
            code: raw`text = "   hi there   "
print("[" + text + "]")
print("[" + text.strip() + "]")`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'lstrip() and rstrip(): remove spaces from one end only',
            code: raw`text = "   hi there   "
print("[" + text.lstrip() + "]")
print("[" + text.rstrip() + "]")`,
          },
          { type: 'h3', text: 'replace()' },
          {
            type: 'code',
            runnable: true,
            label: 'replace(a, b): change every a into b',
            code: raw`text = "I like cats. Cats are cute."
print(text.replace("cats", "dogs"))
print(text.replace("c", "k"))`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'replace(a, b, n): change only the first n',
            code: raw`text = "a-b-c-d"
print(text.replace("-", " "))
print(text.replace("-", " ", 2))`,
          },
          { type: 'h3', text: 'Searching and checking' },
          {
            type: 'table',
            head: ['Method', 'Purpose', 'Example'],
            rows: [
              ['`find(x)`', 'first index, or -1 if not found', '`"hello".find("l")` gives `2`, `"hello".find("z")` gives `-1`'],
              ['`count(x)`', 'number of occurrences', '`"banana".count("a")` gives `3`'],
              ['`startswith(x)`', 'True or False', '`"python".startswith("py")` gives `True`'],
              ['`endswith(x)`', 'True or False', '`"file.py".endswith(".py")` gives `True`'],
              ['`isdigit()`', 'only digits?', '`"123".isdigit()` gives `True`'],
              ['`isalpha()`', 'only letters?', '`"abc".isalpha()` gives `True`, `"ab1".isalpha()` gives `False`'],
            ],
          },
          { type: 'h3', text: 'find() and count()' },
          {
            type: 'code',
            runnable: true,
            label: 'find(x): index of the first match, or -1',
            code: raw`word = "banana"
print(word.find("n"))
print(word.find("an"))
print(word.find("z"))`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'count(x): how many times x appears',
            code: raw`word = "banana"
print(word.count("a"))
print(word.count("an"))
print(word.count("z"))`,
          },
          { type: 'h3', text: 'startswith() and endswith()' },
          {
            type: 'code',
            runnable: true,
            label: 'startswith(x): does the text begin with x?',
            code: raw`name = "python.py"
print(name.startswith("py"))
print(name.startswith("java"))`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'endswith(x): does the text end with x?',
            code: raw`name = "python.py"
print(name.endswith(".py"))
print(name.endswith(".txt"))`,
          },
          { type: 'h3', text: 'isdigit() and isalpha()' },
          {
            type: 'code',
            runnable: true,
            label: 'isdigit(): are all characters digits?',
            code: raw`print("123".isdigit())
print("12a".isdigit())
print("".isdigit())`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'isalpha(): are all characters letters?',
            code: raw`print("abc".isalpha())
print("ab1".isalpha())
print("hello world".isalpha())`,
          },
          { type: 'h3', text: 'Splitting and joining' },
          {
            type: 'table',
            head: ['Method', 'Purpose', 'Example'],
            rows: [
              ['`split()`', 'break into a list', '`"a b c".split()` gives `["a", "b", "c"]`'],
              ['`join()`', 'join a list into a string', '`"-".join(["a","b"])` gives `a-b`'],
            ],
          },
          { type: 'h3', text: 'split()' },
          {
            type: 'code',
            runnable: true,
            label: 'split(): break the text into a list of words',
            code: raw`text = "red green blue"
print(text.split())
print(len(text.split()))`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'split(x): break at every x',
            code: raw`data = "Aman,22,Delhi"
print(data.split(","))
name = data.split(",")[0]
print(name)`,
          },
          { type: 'h3', text: 'join()' },
          {
            type: 'code',
            runnable: true,
            label: 'join(): glue the items of a list together',
            code: raw`words = ["red", "green", "blue"]
print("-".join(words))
print(" ".join(words))
print("".join(words))`,
          },
          {
            type: 'code',
            runnable: true,
            label: 'split() and join() together',
            code: raw`sentence = "python is easy"
words = sentence.split()
print("_".join(words))`,
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
  {
    slug: 'exception-handling',
    title: 'Exception Handling',
    summary: 'try, except, finally, common errors and debugging tips.',
    hero: {
      file: 'safe.py',
      lines: ['try:', '    print(10 / 0)', 'except ZeroDivisionError:', '    print("Cannot divide by zero")'],
      output: 'Cannot divide by zero',
    },
    sections: [
      {
        id: 's15-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between mode `"w"` and mode `"a"`?',
              'Why do we use `with open(...)`?',
              'What error do you get when you open a file that is not there?',
            ],
          },
        ],
      },
      {
        id: 's15-what',
        title: 'What is an exception?',
        blocks: [
          {
            type: 'p',
            text: 'An **exception** is an error that happens **while the program is running**. If nothing handles it, the program **stops** and prints an error message.',
          },
          {
            type: 'code',
            label: 'Try it: this crashes on purpose',
            runnable: true,
            code: raw`print("Before")
print(10 / 0)
print("After")`,
          },
          {
            type: 'ul',
            items: [
              '`Before` is printed, then the error stops the program.',
              '`After` **never runs**.',
              'The error type here is **`ZeroDivisionError`**.',
            ],
          },
          { type: 'h3', text: 'Two kinds of errors' },
          {
            type: 'table',
            head: ['Kind', 'When it appears', 'Example'],
            rows: [
              ['**Syntax error**', 'before the program runs: Python cannot read the code', '`print("hi"`'],
              ['**Exception**', 'while it runs: the code is fine but something goes wrong', '`10 / 0`'],
            ],
          },
          {
            type: 'p',
            text: 'Exception handling lets your program **deal with the problem** and keep going.',
          },
        ],
      },
      {
        id: 's15-try',
        title: 'try and except',
        blocks: [
          {
            type: 'p',
            text: 'Put the risky code in **`try`**. Put the plan for a problem in **`except`**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`try:
    print(10 / 0)
except ZeroDivisionError:
    print("You cannot divide by zero")

print("The program keeps going")`,
          },
          {
            type: 'ul',
            items: [
              'Python runs the `try` block.',
              'If an error happens, it **jumps** to the `except` block.',
              'If no error happens, the `except` block is **skipped**.',
              'Then the program continues after the whole `try` statement.',
            ],
          },
          { type: 'h3', text: 'Code after the error is skipped' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`try:
    print("A")
    print(5 / 0)
    print("B")
except ZeroDivisionError:
    print("C")
print("D")`,
          },
          {
            type: 'p',
            text: '`B` is **skipped**. Once the error happens, the rest of the `try` block does not run.',
          },
        ],
      },
      {
        id: 's15-specific',
        title: 'Catching specific errors',
        blocks: [
          {
            type: 'p',
            text: 'Name the error you expect. Different errors can have different plans.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("b cannot be zero")
    except TypeError:
        print("both must be numbers")

print(divide(10, 2))
print(divide(10, 0))
print(divide(10, "x"))`,
          },
          {
            type: 'ul',
            items: [
              'Python checks the `except` blocks **in order** and runs the **first match**.',
              'The failed calls print their message and then give back `None`.',
            ],
          },
          { type: 'h3', text: 'The error message: as e' },
          {
            type: 'code',
            runnable: true,
            code: raw`try:
    number = int("abc")
except ValueError as e:
    print("Problem:", e)
    print(type(e).__name__)`,
          },
          {
            type: 'p',
            text: '`as e` gives a name to the **error object**. Printing it shows Python\'s own message.',
          },
          { type: 'h3', text: 'One plan for several errors' },
          {
            type: 'code',
            runnable: true,
            code: raw`values = ["12", "abc", None]

for v in values:
    try:
        print(int(v) * 2)
    except (ValueError, TypeError):
        print("cannot use", v)`,
          },
          {
            type: 'p',
            text: 'Put the error names in a **tuple** to handle them the same way.',
          },
        ],
      },
      {
        id: 's15-else-finally',
        title: 'else and finally',
        blocks: [
          {
            type: 'table',
            head: ['Block', 'When it runs'],
            rows: [
              ['`try`', 'always first'],
              ['`except`', 'only if an error happened'],
              ['`else`', 'only if there was **no** error'],
              ['`finally`', '**always**, error or not'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def show(x):
    try:
        result = 10 / x
    except ZeroDivisionError:
        print("error")
    else:
        print("result is", result)
    finally:
        print("done")

show(2)
print("---")
show(0)`,
          },
          {
            type: 'ul',
            items: [
              '`else` keeps the "everything went well" code **separate** from the risky line.',
              '`finally` is for **clean-up**: closing a file, saying goodbye, releasing something.',
            ],
          },
          { type: 'h3', text: 'finally runs even with return' },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`def test():
    try:
        return "from try"
    finally:
        print("finally runs first")

print(test())`,
          },
        ],
      },
      {
        id: 's15-common',
        title: 'Common errors',
        blocks: [
          {
            type: 'table',
            head: ['Error', 'Typical cause', 'Example'],
            rows: [
              ['`SyntaxError`', 'broken Python grammar', '`print("hi"`'],
              ['`IndentationError`', 'wrong spaces at the start of a line', 'a body that is not indented'],
              ['`NameError`', 'a name that does not exist', '`print(total)` before `total = 0`'],
              ['`TypeError`', 'wrong type for an operation', '`"5" + 3`'],
              ['`ValueError`', 'right type, wrong value', '`int("abc")`'],
              ['`ZeroDivisionError`', 'dividing by zero', '`10 / 0`'],
              ['`IndexError`', 'list position out of range', '`[1, 2][5]`'],
              ['`KeyError`', 'dictionary key not found', '`{"a": 1}["b"]`'],
              ['`AttributeError`', 'a thing has no such method', '`"hi".push(1)`'],
              ['`FileNotFoundError`', 'file is not there', '`open("nope.txt")`'],
              ['`ModuleNotFoundError`', 'module not installed or misspelt', '`import mathh`'],
            ],
          },
          {
            type: 'p',
            text: 'This box **causes** each of these on purpose, **catches** it, and prints the name of the error.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`tests = [
    lambda: print(total),
    lambda: "5" + 3,
    lambda: int("abc"),
    lambda: 10 / 0,
    lambda: [1, 2][5],
    lambda: {"a": 1}["b"],
    lambda: "hi".push(1),
    lambda: open("nope.txt"),
    lambda: __import__("mathh"),
]

for test in tests:
    try:
        test()
    except Exception as e:
        print(type(e).__name__, "-", e)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'SyntaxError cannot be caught',
            text: 'A `SyntaxError` happens **before** the program runs, so a `try` block cannot catch it in the same file. Fix the code instead.',
          },
        ],
      },
      {
        id: 's15-input',
        title: 'Example: safe number input',
        blocks: [
          {
            type: 'p',
            text: 'Users type anything. A loop with `try` keeps asking until the input is valid.',
          },
          {
            type: 'code',
            label: 'safe_input.py (run it on your computer)',
            code: raw`while True:
    text = input("Enter your age: ")
    try:
        age = int(text)
    except ValueError:
        print("Please type a whole number.")
        continue
    if age < 0:
        print("Age cannot be negative.")
        continue
    break

print("Your age is", age)`,
            output: 'Enter your age: abc\nPlease type a whole number.\nEnter your age: -5\nAge cannot be negative.\nEnter your age: 20\nYour age is 20',
          },
          { type: 'h3', text: 'The same idea with a list of "typed" answers' },
          {
            type: 'code',
            runnable: true,
            code: raw`answers = ["abc", "-5", "20"]

for text in answers:
    try:
        age = int(text)
    except ValueError:
        print(text, "is not a whole number")
        continue
    if age < 0:
        print(age, "is negative")
        continue
    print("Your age is", age)
    break`,
          },
          { type: 'h3', text: 'A function you can reuse' },
          {
            type: 'code',
            runnable: true,
            code: raw`def to_number(text):
    try:
        return float(text)
    except ValueError:
        return None

print(to_number("3.5"))
print(to_number("hello"))
print(to_number(""))`,
          },
        ],
      },
      {
        id: 's15-raise',
        title: 'Raising your own errors',
        blocks: [
          {
            type: 'p',
            text: 'You can **raise** an exception yourself with `raise`, when your code finds something wrong.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def set_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")
    return age

try:
    set_age(-3)
except ValueError as e:
    print("Caught:", e)

print(set_age(20))`,
          },
          {
            type: 'ul',
            items: [
              'Choose the **right type**: `ValueError` for a bad value, `TypeError` for a bad type.',
              'Write a **clear message** so the next person knows what went wrong.',
              'The function that finds the problem **raises**. The code that calls it decides what to do and **catches**.',
            ],
          },
          { type: 'h3', text: 'Your own exception class' },
          {
            type: 'code',
            runnable: true,
            code: raw`class LowBalanceError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise LowBalanceError("not enough money")
    return balance - amount

try:
    print(withdraw(100, 30))
    print(withdraw(100, 500))
except LowBalanceError as e:
    print("Sorry:", e)`,
          },
          {
            type: 'p',
            text: 'A custom exception is a class that **inherits from `Exception`**. We learn classes properly later; for now just copy this pattern when you want an error with your own name.',
          },
        ],
      },
      {
        id: 's15-files',
        title: 'Exceptions and files',
        blocks: [
          {
            type: 'p',
            text: 'Last class we checked whether a file exists. A `try` block is the better way: it handles the missing file **and** other problems.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def read_file(name):
    try:
        with open(name) as f:
            return f.read()
    except FileNotFoundError:
        return "(file not found)"

with open("hello.txt", "w") as f:
    f.write("Hello!")

print(read_file("hello.txt"))
print(read_file("missing.txt"))`,
          },
          { type: 'h3', text: 'Reading numbers from a file safely' },
          {
            type: 'code',
            runnable: true,
            code: raw`with open("scores.txt", "w") as f:
    f.write("80\nabc\n95\n\n70\n")

total = 0
bad = 0
with open("scores.txt") as f:
    for line in f:
        try:
            total += int(line)
        except ValueError:
            bad += 1

print("Total:", total)
print("Bad lines:", bad)`,
          },
          {
            type: 'ul',
            items: [
              'The bad line `abc` and the blank line are **skipped**, and the loop carries on.',
              'Without `try`, the first bad line would stop the whole program.',
            ],
          },
          { type: 'h3', text: 'finally with a file opened by hand' },
          {
            type: 'code',
            runnable: true,
            code: raw`f = open("temp.txt", "w")
try:
    f.write("saving...")
    print(10 / 0)
except ZeroDivisionError:
    print("something went wrong")
finally:
    f.close()
    print("file closed:", f.closed)`,
          },
          {
            type: 'p',
            text: '`with` does this job for you, but `finally` is the idea behind it: **clean up no matter what**.',
          },
        ],
      },
      {
        id: 's15-bare',
        title: 'Catching too much',
        blocks: [
          {
            type: 'code',
            label: 'Do not do this',
            code: raw`try:
    total = pric * 2
except:
    print("something went wrong")`,
          },
          {
            type: 'p',
            text: 'A **bare `except:`** catches **every** error, even your own typing mistakes. Here `pric` is a typo for `price`, but the program only says "something went wrong", and you never learn why.',
          },
          {
            type: 'ul',
            items: [
              'Catch the **specific** error you expect.',
              'If you must catch everything, write `except Exception as e:` and **print or log `e`**.',
              'Keep the `try` block **small**: only the line that can fail.',
              'Never write `except: pass`. It hides bugs.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`try:
    total = pric * 2
except Exception as e:
    print(type(e).__name__, "-", e)`,
          },
        ],
      },
      {
        id: 's15-traceback',
        title: 'Reading a traceback',
        blocks: [
          {
            type: 'p',
            text: 'When a program crashes, Python prints a **traceback**. Do not be scared of it. It tells you exactly what happened.',
          },
          {
            type: 'code',
            label: 'Try it: this crashes on purpose, then read the message',
            runnable: true,
            code: raw`def average(numbers):
    return sum(numbers) / len(numbers)

def report(marks):
    avg = average(marks)
    print("Average:", avg)

report([])`,
          },
          {
            type: 'ol',
            items: [
              '**Read the last line first.** It names the error and gives the reason: `ZeroDivisionError: division by zero`.',
              'The lines above show **where**: each `File ... line N, in name` is one step of the call chain.',
              'The **last** step before the error is where the crash happened (inside `average`).',
              'The steps above it show **how we got there** (`report` called `average`).',
            ],
          },
          {
            type: 'p',
            text: 'The real cause is that `marks` was empty, so `len(numbers)` was `0`. The error shows in `average`, but the **fix** may belong in the code that called it.',
          },
        ],
      },
      {
        id: 's15-debug',
        title: 'Debugging tips',
        blocks: [
          {
            type: 'p',
            text: '**Debugging** means finding and fixing the cause of a bug. A calm method beats guessing.',
          },
          {
            type: 'ol',
            items: [
              '**Read the error.** Last line first, then the line number.',
              '**Reproduce it.** Find the smallest input that makes it fail.',
              '**Print the values.** Show variables just before the failing line.',
              '**Check the types.** `print(type(x))` solves many `TypeError` problems.',
              '**Split the problem.** Test one function at a time with easy inputs.',
              '**Change one thing at a time**, then run again.',
              '**Explain it aloud** to a friend or a rubber duck. You often spot it while talking.',
              '**Take a break.** A fresh look finds what a tired one missed.',
            ],
          },
          { type: 'h3', text: 'Print debugging' },
          {
            type: 'code',
            runnable: true,
            code: raw`def total_price(prices, discount):
    total = 0
    for p in prices:
        total += p
    print("DEBUG total before discount:", total)
    total = total - total * discount
    print("DEBUG total after discount:", total)
    return total

print(total_price([100, 200, 50], 10))`,
          },
          {
            type: 'p',
            text: 'The debug lines show the total is `350`, then `-3150`. The bug is clear: `discount` should be `0.10`, not `10`. Remove the debug prints when you are done.',
          },
          { type: 'h3', text: 'Common bug patterns' },
          {
            type: 'ul',
            items: [
              '**Off by one:** `range(5)` stops at `4`.',
              '**`=` instead of `==`** in a condition.',
              '**Changing a list while looping over it.**',
              '**Forgetting `return`**, so the result is `None`.',
              '**Comparing text with a number:** `"5" == 5` is `False`.',
            ],
          },
        ],
      },
      {
        id: 's15-assert',
        title: 'assert',
        blocks: [
          {
            type: 'p',
            text: '`assert` checks that something is **true**. If it is false, Python raises an **`AssertionError`**. It is a quick way to test your own code.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`def square(n):
    return n * n

assert square(4) == 16
assert square(-3) == 9
print("All tests passed")

try:
    assert square(5) == 20, "square(5) should be 25"
except AssertionError as e:
    print("Test failed:", e)`,
          },
          {
            type: 'ul',
            items: [
              '`assert condition, "message"` shows the message if the condition is false.',
              'Use `assert` to check your **own** code. Use `try` and `except` for problems that can happen in real use, like bad input or a missing file.',
            ],
          },
        ],
      },
      {
        id: 's15-fix',
        title: 'Find and fix the bugs',
        blocks: [
          {
            type: 'p',
            text: 'Each box has a bug. Read the error, find the cause, fix it, and press **Run**.',
          },
          {
            type: 'code',
            label: 'Your turn: fix the bug',
            runnable: true,
            code: raw`marks = [70, 85, 90]
for i in range(1, len(marks) + 1):
    print(marks[i])`,
          },
          {
            type: 'code',
            label: 'Your turn: fix the bug',
            runnable: true,
            code: raw`age = "20"
print("Next year you will be", age + 1)`,
          },
          {
            type: 'code',
            label: 'Your turn: fix the bug',
            runnable: true,
            code: raw`student = {"name": "Aman", "city": "Delhi"}
print(student["age"])`,
          },
          {
            type: 'code',
            label: 'Your turn: make this safe with try and except',
            runnable: true,
            code: raw`text = "twenty"
number = int(text)
print(number * 2)`,
          },
        ],
      },
      {
        id: 's15-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**A bare `except:`** that hides every bug.',
              '**A huge `try` block.** Wrap only the line that can fail.',
              '**`except: pass`**, which throws the error away without a word.',
              '**Catching an error and carrying on with a wrong value.** Return `None` or stop clearly.',
              '**Using `try` where an `if` is clearer.** If you can simply check `if b != 0`, that is fine.',
              '**Expecting `try` to catch a `SyntaxError`.** It cannot.',
              '**Forgetting the order of `except` blocks.** Put the specific one before the general one.',
            ],
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`try:
    int("x")
except Exception:
    print("general")
except ValueError:
    print("specific")`,
          },
          {
            type: 'p',
            text: 'The general `Exception` matches first, so `specific` can never run. Put `ValueError` **above** `Exception`.',
          },
        ],
      },
      {
        id: 's15-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: write a function safe_divide(a, b) that returns None when b is 0',
            runnable: true,
            code: raw`def safe_divide(a, b):
    pass

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
          },
          {
            type: 'code',
            label: 'Your turn: add up the numbers and skip the items that are not numbers',
            runnable: true,
            code: raw`items = ["10", "x", "25", "", "5"]
total = 0
`,
          },
          {
            type: 'code',
            label: 'Your turn: raise a ValueError if the password is shorter than 6 characters',
            runnable: true,
            code: raw`def check_password(p):
    pass

try:
    check_password("abc")
except ValueError as e:
    print("Rejected:", e)`,
          },
        ],
      },
      {
        id: 's15-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Write a **calculator** that asks for two numbers and an operator, and handles bad numbers and division by zero.',
              'Write a function that reads a file and returns its lines, and prints a **friendly message** if the file is missing.',
              'Make a **marks reader** that reads numbers from a CSV and skips bad rows, then prints how many were bad.',
              'Write `get_positive_int(prompt)` that keeps asking until the user types a **positive whole number**.',
              'Make a **bank account** with a custom `InsufficientFunds` exception.',
              'Take one of your older programs and add **`print` debugging** to find a bug on purpose.',
              'Revise: **`try`, `except`, `else`, `finally`, `raise`**, common error names, how to read a traceback.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Object-oriented programming: classes and objects.',
          },
        ],
      },
    ],
  },
  {
    slug: 'numpy-basics',
    title: 'NumPy Basics',
    summary: 'Arrays, shape, dtype, indexing and slicing.',
    hero: {
      file: 'arrays.py',
      lines: ['import numpy as np', 'a = np.array([1, 2, 3])', 'print(a * 2)'],
      output: '[2 4 6]',
    },
    sections: [
      {
        id: 's16-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between `try`, `except`, `else` and `finally`?',
              'What error does `int("abc")` cause?',
              'How do you read a traceback: which line first?',
            ],
          },
        ],
      },
      {
        id: 's16-what',
        title: 'What is NumPy?',
        blocks: [
          {
            type: 'p',
            text: '**NumPy** (Numerical Python) is a package for working with **numbers in bulk**. Its main tool is the **array**: a grid of numbers, all of the same type.',
          },
          {
            type: 'ul',
            items: [
              '**Fast:** it does the loops in fast compiled code, not in slow Python.',
              '**Short:** one line works on a million numbers at once.',
              '**The base** of `pandas`, `matplotlib`, `scikit-learn` and most data science and machine learning tools.',
            ],
          },
          {
            type: 'code',
            label: 'Install it once on your computer (terminal)',
            code: raw`pip install numpy`,
          },
          {
            type: 'p',
            text: 'By convention we import it with the short name **`np`**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

print(np.__name__)
print(type(np.array([1, 2, 3])))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'NumPy in the Try it boxes',
            text: 'The first time a box imports NumPy, the page downloads it (a few seconds). After that it is quick. The browser version of Python is a little different from the one on your computer, so one or two outputs below (marked in the notes) may differ slightly.',
          },
        ],
      },
      {
        id: 's16-vs',
        title: 'Lists vs arrays',
        blocks: [
          {
            type: 'p',
            text: 'A list repeats when you multiply it. An array does **maths on every item**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

nums = [1, 2, 3]
arr = np.array([1, 2, 3])

print(nums * 2)
print(arr * 2)
print(nums + nums)
print(arr + arr)`,
          },
          {
            type: 'p',
            text: 'This is called **vectorised** (or element-wise) maths. No loop needed.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

prices = np.array([100, 250, 80, 400])

print(prices * 1.18)
print(prices - 20)
print(prices > 200)`,
          },
          {
            type: 'table',
            head: ['', 'list', 'NumPy array'],
            rows: [
              ['items', 'any mix of types', 'all the **same** type'],
              ['`* 2`', 'repeats the list', 'doubles each number'],
              ['speed', 'slower for big data', 'much faster'],
              ['maths on all items', 'needs a loop', 'one line'],
            ],
          },
        ],
      },
      {
        id: 's16-create',
        title: 'Creating arrays',
        blocks: [
          { type: 'h3', text: 'From a list' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([10, 20, 30, 40])
print(a)

b = np.array([[1, 2, 3],
              [4, 5, 6]])
print(b)`,
          },
          {
            type: 'ul',
            items: [
              'A list of numbers makes a **1D** array (a row).',
              'A list of lists makes a **2D** array (a table with rows and columns).',
              'Printing an array shows the numbers **without commas**.',
            ],
          },
          { type: 'h3', text: 'Ready-made arrays' },
          {
            type: 'table',
            head: ['Function', 'What it makes'],
            rows: [
              ['`np.zeros(5)`', 'five `0.0`s'],
              ['`np.ones((2, 3))`', '2 rows and 3 columns of `1.0`'],
              ['`np.full((2, 2), 7)`', 'a 2 by 2 grid of `7`'],
              ['`np.arange(0, 10, 2)`', 'like `range`, as an array'],
              ['`np.linspace(0, 1, 5)`', '5 evenly spaced numbers from 0 to 1'],
              ['`np.eye(3)`', 'the 3 by 3 identity grid'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

print(np.zeros(5))
print(np.ones((2, 3)))
print(np.full((2, 2), 7))
print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))
print(np.eye(3))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'arange vs linspace',
            text: '`arange(start, stop, step)` is told the **step** and the stop is **not** included. `linspace(start, stop, count)` is told **how many numbers** and the stop **is** included.',
          },
        ],
      },
      {
        id: 's16-attrs',
        title: 'Array attributes',
        blocks: [
          {
            type: 'p',
            text: 'Every array knows facts about itself. They are **attributes**, so there are **no brackets**.',
          },
          {
            type: 'table',
            head: ['Attribute', 'Meaning'],
            rows: [
              ['`a.ndim`', 'number of dimensions (1, 2, 3 ...)'],
              ['`a.shape`', 'size in each dimension, as a tuple'],
              ['`a.size`', 'total number of items'],
              ['`a.dtype`', 'the data type of the items'],
              ['`a.itemsize`', 'bytes used by one item'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])

print(a.ndim)
print(a.shape)
print(a.size)
print(len(a))`,
          },
          {
            type: 'ul',
            items: [
              '`shape` is `(2, 3)`: **2 rows** and **3 columns**.',
              '`size` is `2 * 3 = 6`.',
              '`len(a)` gives only the length of the **first** dimension (the number of rows).',
            ],
          },
        ],
      },
      {
        id: 's16-shape',
        title: 'Understanding shape',
        blocks: [
          {
            type: 'table',
            head: ['Array', 'shape', 'Picture'],
            rows: [
              ['`np.array([1, 2, 3])`', '`(3,)`', 'a row of 3'],
              ['`np.array([[1, 2, 3]])`', '`(1, 3)`', '1 row, 3 columns'],
              ['`np.array([[1], [2], [3]])`', '`(3, 1)`', '3 rows, 1 column'],
              ['`np.zeros((2, 3, 4))`', '`(2, 3, 4)`', '2 tables of 3 rows and 4 columns'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

print(np.array([1, 2, 3]).shape)
print(np.array([[1, 2, 3]]).shape)
print(np.array([[1], [2], [3]]).shape)
print(np.zeros((2, 3, 4)).shape)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'The comma in (3,)',
            text: 'A tuple with one item is written `(3,)`. The comma tells Python it is a tuple. So `(3,)` means a **1D array with 3 items**.',
          },
          {
            type: 'code',
            label: 'Work out the shape first, then press Run to check',
            runnable: true,
            code: raw`import numpy as np

a = np.zeros((4, 5))
print(a.shape)
print(a.size)
print(a.ndim)`,
          },
        ],
      },
      {
        id: 's16-dtype',
        title: 'dtype: the data type',
        blocks: [
          {
            type: 'p',
            text: 'All items in an array share **one type**, called the **`dtype`**. This is what makes arrays fast and compact.',
          },
          {
            type: 'table',
            head: ['dtype', 'Meaning'],
            rows: [
              ['`int8`, `int16`, `int32`, `int64`', 'whole numbers, using 1, 2, 4 or 8 bytes'],
              ['`float32`, `float64`', 'decimals (`float64` is the usual one)'],
              ['`bool`', '`True` or `False`'],
              ['`<U5`', 'text, up to 5 characters'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

print(np.array([1.5, 2.5, 3.5]).dtype)
print(np.array([True, False]).dtype)
print(np.array(["cat", "horse"]).dtype)
print(np.array([1, 2, 3], dtype=np.int8).dtype)
print(np.array([1, 2, 3], dtype=np.float64).dtype)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Whole numbers: int64 or int32?',
            text: 'On most computers `np.array([1, 2, 3]).dtype` is `int64`. In the browser version of Python used by these boxes it can show `int32`. Both are whole numbers. To be sure, ask for the type you want with `dtype=`.',
          },
          { type: 'h3', text: 'Mixed types become one type' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

print(np.array([1, 2.5, 3]))
print(np.array([1, 2.5, 3]).dtype)
print(np.array([1, "a", 3]))
print(np.array([True, 2, 3.5]))`,
          },
          {
            type: 'ul',
            items: [
              'NumPy picks a type that fits **everything**: ints and floats become floats.',
              'Text and numbers together become **text**.',
              'A `True` becomes `1.0` when mixed with floats.',
            ],
          },
          { type: 'h3', text: 'Changing the type: astype' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1.9, 2.5, 3.1])
print(a.astype(int))
print(a.astype(str))

b = np.array([0, 1, 2, 0])
print(b.astype(bool))`,
          },
          {
            type: 'p',
            text: '`astype` makes a **new** array. Turning floats into ints **cuts off** the decimals (it does not round).',
          },
        ],
      },
      {
        id: 's16-reshape',
        title: 'reshape, flatten and transpose',
        blocks: [
          {
            type: 'p',
            text: '`reshape` gives the **same numbers** a new shape. The new shape must hold the same **total count**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 13)
print(a)

print(a.reshape(3, 4))
print(a.reshape(4, 3))
print(a.reshape(2, 2, 3).shape)`,
          },
          {
            type: 'ul',
            items: [
              '12 numbers can be `3 x 4`, `4 x 3`, `2 x 6` or `2 x 2 x 3`, but **not** `5 x 3`.',
              'Use **`-1`** for "work this size out for me": `a.reshape(3, -1)`.',
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 7).reshape(2, 3)
print(a)
print(a.T)
print(a.T.shape)
print(a.flatten())
print(a.reshape(-1))`,
          },
          {
            type: 'table',
            head: ['Name', 'What it does'],
            rows: [
              ['`a.reshape(r, c)`', 'new shape, same numbers'],
              ['`a.T`', '**transpose**: rows become columns'],
              ['`a.flatten()`', 'turn into a 1D array (a copy)'],
              ['`a.reshape(-1)`', 'also 1D, with the size worked out'],
            ],
          },
        ],
      },
      {
        id: 's16-index1',
        title: 'Indexing a 1D array',
        blocks: [
          {
            type: 'p',
            text: 'Indexing a 1D array works like a list: position **starts at 0**, and **negative** positions count from the end.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([10, 20, 30, 40, 50])

print(a[0])
print(a[2])
print(a[-1])
print(a[-2])`,
          },
          {
            type: 'p',
            text: 'You can **change** an item by assigning to it.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([10, 20, 30])
a[1] = 99
print(a)

a[0] = 5.7
print(a)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'The dtype stays the same',
            text: 'The array is a whole-number array, so `5.7` was **cut** to `5`. Choose the right `dtype` at the start if you need decimals.',
          },
        ],
      },
      {
        id: 's16-index2',
        title: 'Indexing a 2D array',
        blocks: [
          {
            type: 'p',
            text: 'In a 2D array you give the **row**, then the **column**: `a[row, column]`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print(a[0, 0])
print(a[1, 2])
print(a[2, 1])
print(a[-1, -1])`,
          },
          {
            type: 'ul',
            items: [
              '`a[1, 2]` means row `1`, column `2`, which is `6`.',
              '`a[1][2]` also works (index twice), but `a[1, 2]` is the NumPy way and is faster.',
            ],
          },
          { type: 'h3', text: 'One whole row' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print(a[0])
print(a[2])
print(a[1][1])`,
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[10, 20, 30],
              [40, 50, 60]])

print(a[1, 0])
print(a[0, -1])
print(a[1])`,
          },
        ],
      },
      {
        id: 's16-slice1',
        title: 'Slicing a 1D array',
        blocks: [
          {
            type: 'p',
            text: 'A slice takes a **part** of an array: `a[start:stop:step]`. The `stop` position is **not included**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(10, 100, 10)
print(a)

print(a[2:5])
print(a[:3])
print(a[6:])
print(a[::2])
print(a[::-1])
print(a[-3:])`,
          },
          {
            type: 'table',
            head: ['Slice', 'Meaning'],
            rows: [
              ['`a[2:5]`', 'positions 2, 3, 4'],
              ['`a[:3]`', 'the first 3'],
              ['`a[6:]`', 'from position 6 to the end'],
              ['`a[::2]`', 'every second item'],
              ['`a[::-1]`', 'reversed'],
              ['`a[-3:]`', 'the last 3'],
            ],
          },
          { type: 'h3', text: 'A slice is a view, not a copy' },
          {
            type: 'p',
            text: 'This is the **big difference from lists**. A NumPy slice **shares memory** with the original. Change the slice and the original changes too.',
          },
          {
            type: 'code',
            label: 'Work out the output first, then press Run to check',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3, 4, 5])
part = a[1:4]
part[0] = 99

print(part)
print(a)`,
          },
          {
            type: 'p',
            text: 'Use **`.copy()`** when you want an independent array.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3, 4, 5])
safe = a[1:4].copy()
safe[0] = 99

print(safe)
print(a)`,
          },
        ],
      },
      {
        id: 's16-slice2',
        title: 'Slicing a 2D array',
        blocks: [
          {
            type: 'p',
            text: 'Give a slice for the **rows**, a comma, then a slice for the **columns**: `a[rows, columns]`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 17).reshape(4, 4)
print(a)

print(a[0:2, 1:3])
print(a[:, 0])
print(a[1, :])
print(a[2:, 2:])`,
          },
          {
            type: 'table',
            head: ['Slice', 'Meaning'],
            rows: [
              ['`a[0:2, 1:3]`', 'rows 0 and 1, columns 1 and 2'],
              ['`a[:, 0]`', 'every row, column 0: **the first column**'],
              ['`a[1, :]`', 'row 1, every column: **the second row**'],
              ['`a[2:, 2:]`', 'from row 2 down and column 2 across'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'The colon means "all"',
            text: 'A lone `:` means **everything in that direction**. `a[:, 1]` reads as "all rows, column 1". Say it aloud as you write it.',
          },
          { type: 'h3', text: 'Changing a block' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.zeros((3, 4), dtype=np.int8)
a[1, :] = 5
a[:, 3] = 9
a[0:2, 0:2] = 1
print(a)`,
          },
        ],
      },
      {
        id: 's16-bool',
        title: 'Boolean and fancy indexing',
        blocks: [
          {
            type: 'p',
            text: 'A comparison on an array gives an array of `True` and `False`. Use it as a **filter**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])

passed = marks >= 50
print(passed)
print(marks[passed])
print(marks[marks > 80])
print(marks[(marks > 40) & (marks < 80)])`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Use & and |, with brackets',
            text: 'Combine conditions with `&` (and) and `|` (or), and put **each condition in brackets**. The words `and` and `or` do not work on whole arrays.',
          },
          { type: 'h3', text: 'Change items that match' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])
marks[marks < 50] = 50
print(marks)

print((marks > 70).sum())`,
          },
          {
            type: 'p',
            text: '`True` counts as `1`, so `(marks > 70).sum()` counts **how many** items match.',
          },
          { type: 'h3', text: 'Fancy indexing: a list of positions' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([10, 20, 30, 40, 50])
print(a[[0, 2, 4]])
print(a[[4, 0]])

b = np.arange(12).reshape(3, 4)
print(b[[0, 2]])`,
          },
          {
            type: 'p',
            text: 'Unlike a slice, fancy and boolean indexing give a **copy**, not a view.',
          },
        ],
      },
      {
        id: 's16-maths',
        title: 'Maths on arrays',
        blocks: [
          {
            type: 'table',
            head: ['Name', 'What it gives'],
            rows: [
              ['`a.sum()`', 'total'],
              ['`a.mean()`', 'average'],
              ['`a.max()` / `a.min()`', 'biggest / smallest'],
              ['`a.argmax()` / `a.argmin()`', '**position** of the biggest / smallest'],
              ['`np.sort(a)`', 'a sorted copy'],
              ['`a.std()`', 'standard deviation'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])

print(marks.sum())
print(marks.mean())
print(marks.max(), marks.min())
print(marks.argmax())
print(np.sort(marks))`,
          },
          { type: 'h3', text: 'axis: rows or columns' },
          {
            type: 'p',
            text: 'On a 2D array, **`axis=0`** works **down the columns** and **`axis=1`** works **across the rows**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])

print(a.sum())
print(a.sum(axis=0))
print(a.sum(axis=1))
print(a.mean(axis=0))`,
          },
          {
            type: 'ul',
            items: [
              '`axis=0` collapses the **rows**, so you get one answer per **column**: `[5 7 9]`.',
              '`axis=1` collapses the **columns**, so you get one answer per **row**: `[ 6 15]`.',
            ],
          },
          { type: 'h3', text: 'Two arrays together' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b)
print(a * b)
print(b / a)
print(a ** 2)
print(np.sqrt(np.array([4, 9, 16])))`,
          },
          {
            type: 'p',
            text: 'Arrays of the **same shape** are combined **item by item**. An array and a single number also work: the number is used for every item. This is called **broadcasting**.',
          },
        ],
      },
      {
        id: 's16-example',
        title: 'Example: a marks table',
        blocks: [
          {
            type: 'p',
            text: 'Rows are students, columns are subjects (maths, science, english).',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([
    [85, 90, 78],
    [70, 65, 80],
    [92, 88, 95],
    [55, 60, 48],
])

print("Shape:", marks.shape)
print("Student totals:", marks.sum(axis=1))
print("Subject averages:", marks.mean(axis=0))
print("Best maths mark:", marks[:, 0].max())
print("Top student (row):", marks.sum(axis=1).argmax())
print("Marks below 50:", marks[marks < 50])`,
          },
          {
            type: 'ul',
            items: [
              '`marks[:, 0]` is the **maths column**.',
              '`sum(axis=1)` adds each **student**. `mean(axis=0)` averages each **subject**.',
              '`argmax()` gives the **position** of the best total, which is the student number (starting at `0`).',
            ],
          },
          {
            type: 'code',
            label: 'Your turn: add 5 bonus marks to every mark, then print the new student totals',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([
    [85, 90, 78],
    [70, 65, 80],
])

`,
          },
        ],
      },
      {
        id: 's16-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Forgetting `import numpy as np`.** You get `NameError: name \'np\' is not defined`.',
              '**Expecting a slice to be a copy.** Changing it changes the original. Use `.copy()`.',
              '**Writing `a(0)` instead of `a[0]`.** Indexing uses **square** brackets.',
              '**Writing `a.shape()`.** `shape` is an attribute, with no brackets.',
              '**Using `and` / `or` on arrays.** Use `&` and `|` with brackets.',
              '**A wrong `reshape`.** The total number of items must stay the same.',
              '**Mixing up `axis=0` and `axis=1`.** Remember: `axis=0` goes **down**, `axis=1` goes **across**.',
              '**Putting different shapes together.** `(3,)` and `(4,)` cannot be added.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(12)
print(a.reshape(5, 3))`,
          },
          {
            type: 'code',
            label: 'Try it: this also fails on purpose',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3])
b = np.array([1, 2, 3, 4])
print(a + b)`,
          },
        ],
      },
      {
        id: 's16-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: make the numbers 1 to 20 as a 4 by 5 array and print its shape',
            runnable: true,
            code: raw`import numpy as np

`,
          },
          {
            type: 'code',
            label: 'Your turn: print the last column and the first row',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 13).reshape(3, 4)
`,
          },
          {
            type: 'code',
            label: 'Your turn: print only the even numbers of the array',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 11)
`,
          },
        ],
      },
      {
        id: 's16-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Make an array of the numbers `0` to `99`, reshape it to `10 x 10`, and print the **diagonal** items (`a[0, 0]`, `a[1, 1]` ...) using a loop.',
              'Create a `5 x 5` array of zeros, then set the **border** items to `1` using slices.',
              'Store the marks of 5 students in 4 subjects. Print each student\'s **average**, each subject\'s **highest** mark, and **who has the best total**.',
              'Given daily temperatures in an array, print how many days were **above the average**.',
              'Show that a slice is a **view** by changing it, then repeat with `.copy()`.',
              'Revise: `np.array`, `shape`, `ndim`, `size`, `dtype`, `reshape`, indexing, slicing, boolean masks, `axis`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'More NumPy, or Pandas basics: tables of data with Series and DataFrame.',
          },
        ],
      },
    ],
  },
  {
    slug: 'numpy-operations',
    title: 'NumPy Operations',
    summary: 'Vectorised maths, aggregation, reshaping and random numbers.',
    hero: {
      file: 'numpy_ops.py',
      lines: ['import numpy as np', 'a = np.array([3, 1, 4, 1, 5])', 'print(a.cumsum())'],
      output: '[ 3  4  8  9 14]',
    },
    sections: [
      {
        id: 's17-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What does `a.shape` tell you for a table with 3 rows and 4 columns?',
              'Is a NumPy slice a **copy** or a **view**?',
              'What does `a[:, 1]` give for a 2D array?',
            ],
          },
          {
            type: 'p',
            text: 'Today: do **maths** on whole arrays, **summarise** them, **reshape** and join them, and make **random** numbers.',
          },
        ],
      },
      {
        id: 's17-vector',
        title: 'Vectorised maths',
        blocks: [
          {
            type: 'p',
            text: 'Arithmetic on an array happens on **every item at once**. No loop needed.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([10, 20, 30, 40])

print(a + 5)
print(a - 5)
print(a * 3)
print(a / 4)
print(a // 3)
print(a % 3)
print(a ** 2)`,
          },
          {
            type: 'p',
            text: 'Two arrays of the **same shape** work **item by item**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

price = np.array([100, 250, 80])
qty = np.array([2, 1, 5])

cost = price * qty
print(cost)
print(cost.sum())`,
          },
          { type: 'h3', text: 'Maths functions' },
          {
            type: 'table',
            head: ['Function', 'What it does'],
            rows: [
              ['`np.sqrt(a)`', 'square root of each item'],
              ['`np.abs(a)`', 'remove the minus sign'],
              ['`np.exp(a)`', 'e to the power of each item'],
              ['`np.log(a)`', 'natural logarithm'],
              ['`np.sin(a)`, `np.cos(a)`', 'trigonometry (angles in radians)'],
              ['`np.round(a, 2)`', 'round to 2 decimal places'],
              ['`np.floor(a)`, `np.ceil(a)`', 'round down / up'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 4, 9, 16])
print(np.sqrt(a))

b = np.array([-3, 2, -7])
print(np.abs(b))

c = np.array([1.234, 5.678, 9.1011])
print(np.round(c, 2))
print(np.floor(c))
print(np.ceil(c))

print(np.exp(np.array([0, 1])))
print(np.log(np.array([1, 10])))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Use np.sqrt, not math.sqrt',
            text: '`math.sqrt` works on **one** number. `np.sqrt` works on a **whole array**. Mixing them up gives a `TypeError`.',
          },
        ],
      },
      {
        id: 's17-examples',
        title: 'Examples of vectorised maths',
        blocks: [
          { type: 'h3', text: 'Celsius to Fahrenheit' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

celsius = np.array([0, 25, 37, 100])
fahrenheit = celsius * 9 / 5 + 32
print(fahrenheit)`,
          },
          { type: 'h3', text: 'Add GST to every price' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

prices = np.array([100, 250, 80, 400])
with_gst = np.round(prices * 1.18, 2)
print(with_gst)
print("Bill total:", with_gst.sum())`,
          },
          { type: 'h3', text: 'Distance between points' },
          {
            type: 'p',
            text: 'The distance from the origin to the points `(3, 4)`, `(6, 8)` and `(5, 12)`:',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

x = np.array([3, 6, 5])
y = np.array([4, 8, 12])

distance = np.sqrt(x ** 2 + y ** 2)
print(distance)`,
          },
          { type: 'h3', text: 'Is it really faster?' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import time

n = 300000
data = list(range(n))
arr = np.arange(n)

t0 = time.time()
slow = [x * 2 for x in data]
t_list = time.time() - t0

t0 = time.time()
fast = arr * 2
t_numpy = time.time() - t0

print("Same answer:", slow[-1] == fast[-1])
print("NumPy was faster:", t_numpy < t_list)`,
          },
          {
            type: 'p',
            text: 'The exact times change from computer to computer, but NumPy is usually **many times faster** on big data.',
          },
        ],
      },
      {
        id: 's17-broadcast',
        title: 'Broadcasting',
        blocks: [
          {
            type: 'p',
            text: '**Broadcasting** is how NumPy combines arrays of **different shapes**. The smaller one is **stretched** to fit the bigger one.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])

print(a + 10)

row = np.array([100, 200, 300])
print(a + row)

col = np.array([[10],
                [20]])
print(a + col)`,
          },
          {
            type: 'ul',
            items: [
              '`a + 10`: the single number is used for **every** item.',
              '`a + row`: the row `[100 200 300]` is added to **each row**.',
              '`a + col`: the column is added to **each column** (the `10` goes across row 0, the `20` across row 1).',
            ],
          },
          { type: 'h3', text: 'The rule' },
          {
            type: 'p',
            text: 'Compare the shapes from the **right-hand end**. Two sizes fit if they are **equal**, or one of them is **1**.',
          },
          {
            type: 'table',
            head: ['Shapes', 'Works?', 'Why'],
            rows: [
              ['`(2, 3)` and `(3,)`', 'yes', '3 matches 3; the missing size is stretched'],
              ['`(2, 3)` and `(2, 1)`', 'yes', 'the 1 is stretched to 3'],
              ['`(2, 3)` and `(2,)`', '**no**', '3 does not match 2'],
              ['`(3,)` and `(4,)`', '**no**', '3 does not match 4'],
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`import numpy as np

a = np.ones((2, 3))
b = np.array([1, 2])
print(a + b)`,
          },
          { type: 'h3', text: 'Use it: subtract each subject\'s average' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([[80, 70, 90],
                  [60, 90, 75],
                  [70, 80, 60]])

avg = marks.mean(axis=0)
print(avg)
print(marks - avg)`,
          },
        ],
      },
      {
        id: 's17-cond',
        title: 'Conditions: where, clip, any, all',
        blocks: [
          {
            type: 'p',
            text: '**`np.where(condition, a, b)`** picks `a` where the condition is `True` and `b` where it is `False`. It is a vectorised `if` and `else`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])

result = np.where(marks >= 50, "Pass", "Fail")
print(result)

bonus = np.where(marks < 50, marks + 5, marks)
print(bonus)`,
          },
          { type: 'h3', text: 'Grades with more than two choices' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])

grade = np.where(marks >= 80, "A",
         np.where(marks >= 60, "B",
          np.where(marks >= 40, "C", "D")))
print(grade)`,
          },
          { type: 'h3', text: 'clip: keep numbers in a range' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([-5, 3, 12, 7, 20])
print(np.clip(a, 0, 10))`,
          },
          {
            type: 'p',
            text: 'Anything below `0` becomes `0`, and anything above `10` becomes `10`.',
          },
          { type: 'h3', text: 'any, all and counting' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])

print((marks > 90).any())
print((marks > 30).all())
print((marks >= 50).sum())
print(np.count_nonzero(marks < 50))`,
          },
          {
            type: 'ul',
            items: [
              '`.any()` is `True` if **at least one** item matches.',
              '`.all()` is `True` if **every** item matches.',
              '`.sum()` on `True`/`False` counts the matches, because `True` is `1`.',
            ],
          },
        ],
      },
      {
        id: 's17-agg',
        title: 'Aggregation',
        blocks: [
          {
            type: 'p',
            text: '**Aggregation** squeezes many numbers into **one** (or a few). You met `sum` and `mean`. Here are the rest.',
          },
          {
            type: 'table',
            head: ['Function', 'What it gives'],
            rows: [
              ['`a.sum()`', 'total'],
              ['`a.mean()`', 'average'],
              ['`np.median(a)`', 'the middle value'],
              ['`a.min()`, `a.max()`', 'smallest, biggest'],
              ['`a.std()`', 'standard deviation (how spread out)'],
              ['`a.var()`', 'variance (the square of `std`)'],
              ['`a.prod()`', 'everything multiplied together'],
              ['`np.percentile(a, 90)`', 'the value 90 percent of items are below'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74, 88, 59])

print("sum   :", marks.sum())
print("mean  :", marks.mean())
print("median:", np.median(marks))
print("min   :", marks.min())
print("max   :", marks.max())
print("range :", marks.max() - marks.min())
print("std   :", round(marks.std(), 2))
print("90th percentile:", np.percentile(marks, 90))`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Mean or median?',
            text: 'One huge number pulls the **mean** up, but barely moves the **median**. For `[1, 2, 3, 4, 1000]` the mean is `202` and the median is `3`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3, 4, 1000])
print(a.mean())
print(np.median(a))`,
          },
        ],
      },
      {
        id: 's17-axis',
        title: 'Aggregation along an axis',
        blocks: [
          {
            type: 'p',
            text: 'On a table, **`axis=0`** gives one answer **per column** and **`axis=1`** gives one answer **per row**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([[85, 90, 78],
                  [70, 65, 80],
                  [92, 88, 95],
                  [55, 60, 48]])

print(marks.sum(axis=0))
print(marks.sum(axis=1))
print(marks.mean(axis=0))
print(marks.max(axis=1))
print(marks.argmax(axis=0))`,
          },
          {
            type: 'ul',
            items: [
              '`sum(axis=0)`: the total of **each subject** (column).',
              '`sum(axis=1)`: the total of **each student** (row).',
              '`argmax(axis=0)`: which **student** (row number) has the top mark in each subject.',
            ],
          },
          { type: 'h3', text: 'keepdims' },
          {
            type: 'p',
            text: '`keepdims=True` keeps the result as a table, so it can be used in more maths.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])

totals = a.sum(axis=1, keepdims=True)
print(totals.shape)
print(a / totals)`,
          },
          {
            type: 'p',
            text: 'Each item is divided by its **row total**, so every row now adds up to `1`.',
          },
        ],
      },
      {
        id: 's17-cum',
        title: 'Cumulative maths and unique values',
        blocks: [
          { type: 'h3', text: 'cumsum, cumprod and diff' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

daily = np.array([5, 3, 8, 2, 7])

print(np.cumsum(daily))
print(np.cumprod(np.array([1, 2, 3, 4])))
print(np.diff(daily))`,
          },
          {
            type: 'ul',
            items: [
              '`cumsum` is a **running total**: `5, 5+3, 5+3+8 ...`',
              '`cumprod` is a running product.',
              '`diff` is the **change** from one item to the next. It is one item shorter.',
            ],
          },
          { type: 'h3', text: 'sort and argsort' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([45, 82, 67, 91, 38])

print(np.sort(marks))
print(np.sort(marks)[::-1])
print(np.argsort(marks))`,
          },
          {
            type: 'p',
            text: '`argsort` gives the **positions** that would sort the array. The first one, `4`, is the position of the smallest mark (`38`).',
          },
          { type: 'h3', text: 'unique and counting' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

colours = np.array(["red", "blue", "red", "green", "blue", "red"])

names, counts = np.unique(colours, return_counts=True)
print(names)
print(counts)`,
          },
        ],
      },
      {
        id: 's17-reshape',
        title: 'Reshaping',
        blocks: [
          {
            type: 'p',
            text: 'Last class: `reshape`, `T` and `flatten`. A quick recap, then new tools.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 13)
print(a.reshape(3, 4))
print(a.reshape(2, -1).shape)
print(a.reshape(3, 4).T.shape)
print(a.reshape(3, 4).ravel())`,
          },
          {
            type: 'table',
            head: ['Name', 'What it does'],
            rows: [
              ['`ravel()`', 'flatten to 1D (a view when it can, so it is quick)'],
              ['`flatten()`', 'flatten to 1D, always a **copy**'],
              ['`np.expand_dims(a, axis)`', 'add a new dimension of size 1'],
              ['`a[:, np.newaxis]`', 'also adds a dimension: row to column'],
              ['`np.squeeze(a)`', 'remove dimensions of size 1'],
            ],
          },
          { type: 'h3', text: 'Rows into columns' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3])
print(a.shape)

col = a[:, np.newaxis]
print(col)
print(col.shape)

row = col.reshape(1, 3)
print(row.shape)

print(np.squeeze(row).shape)`,
          },
          {
            type: 'p',
            text: 'A **1D** array `(3,)` is neither a row nor a column. `newaxis` turns it into a **column** `(3, 1)`, which broadcasting can then use.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3])
col = np.array([10, 20, 30])[:, np.newaxis]

print(a + col)`,
          },
          {
            type: 'p',
            text: 'Every item of `a` is added to every item of `col`. This makes a **table of all the sums**, like a times table.',
          },
        ],
      },
      {
        id: 's17-join',
        title: 'Joining and splitting arrays',
        blocks: [
          {
            type: 'table',
            head: ['Function', 'What it does'],
            rows: [
              ['`np.concatenate([a, b])`', 'join end to end (choose the `axis`)'],
              ['`np.vstack([a, b])`', 'stack **vertically**: add more rows'],
              ['`np.hstack([a, b])`', 'stack **horizontally**: add more columns'],
              ['`np.split(a, 3)`', 'cut into 3 equal parts'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.concatenate([a, b]))
print(np.vstack([a, b]))
print(np.hstack([a, b]))`,
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

t1 = np.array([[1, 2],
               [3, 4]])
t2 = np.array([[5, 6],
               [7, 8]])

print(np.concatenate([t1, t2], axis=0))
print(np.concatenate([t1, t2], axis=1))`,
          },
          {
            type: 'ul',
            items: [
              '`axis=0` adds the second table **below** the first (more rows).',
              '`axis=1` adds it **beside** the first (more columns).',
              'The sizes of the **other** direction must match.',
            ],
          },
          { type: 'h3', text: 'Adding a total column' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([[85, 90, 78],
                  [70, 65, 80]])

totals = marks.sum(axis=1, keepdims=True)
print(np.hstack([marks, totals]))`,
          },
          { type: 'h3', text: 'split' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.arange(1, 10)
parts = np.split(a, 3)
print(parts)
print(len(parts))

for p in parts:
    print(p.sum())`,
          },
        ],
      },
      {
        id: 's17-random',
        title: 'Random numbers',
        blocks: [
          {
            type: 'p',
            text: 'NumPy can make a **whole array** of random numbers in one go, and much faster than the `random` module in a loop.',
          },
          {
            type: 'p',
            text: 'The modern way is to make a **generator** with `np.random.default_rng()` and ask it for numbers.',
          },
          {
            type: 'table',
            head: ['Method', 'What it gives'],
            rows: [
              ['`rng.random(size)`', 'floats from `0.0` up to (not including) `1.0`'],
              ['`rng.integers(low, high, size)`', 'whole numbers from `low` up to (not including) `high`'],
              ['`rng.normal(mean, std, size)`', 'bell-curve numbers around the mean'],
              ['`rng.choice(items, size)`', 'pick items at random'],
              ['`rng.shuffle(a)`', 'mix an array in place'],
              ['`rng.permutation(a)`', 'a shuffled **copy**'],
            ],
          },
          {
            type: 'p',
            text: 'The numbers change every run, so this box prints **different** numbers each time you press **Run**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

rng = np.random.default_rng()

print(rng.random(3))
print(rng.integers(1, 7, size=5))
print(rng.random((2, 3)).shape)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'integers excludes the top',
            text: 'Unlike `random.randint(1, 6)`, **`rng.integers(1, 7)`** gives `1` to `6`. The `high` value is **not** included. Roll a die with `integers(1, 7)`.',
          },
          { type: 'h3', text: 'A seed repeats the numbers' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

a = np.random.default_rng(42).random(4)
b = np.random.default_rng(42).random(4)
c = np.random.default_rng(7).random(4)

print(np.array_equal(a, b))
print(np.array_equal(a, c))`,
          },
          {
            type: 'p',
            text: 'The **same seed** gives the **same numbers**. That is how a data scientist makes an experiment **repeatable**.',
          },
        ],
      },
      {
        id: 's17-random-ex',
        title: 'Examples with random numbers',
        blocks: [
          { type: 'h3', text: 'Roll a die 6000 times' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

rng = np.random.default_rng()
rolls = rng.integers(1, 7, size=6000)

print(rolls.min(), rolls.max())
print(np.bincount(rolls)[1:])`,
          },
          {
            type: 'p',
            text: '`bincount` counts how many times each number appears. Each face should come up about **1000** times.',
          },
          { type: 'h3', text: 'Random marks table' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

rng = np.random.default_rng(1)
marks = rng.integers(35, 101, size=(4, 3))

print(marks.shape)
print(marks.min() >= 35, marks.max() <= 100)
print(marks.mean(axis=0).shape)`,
          },
          { type: 'h3', text: 'Pick winners without repeats' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

names = np.array(["Aman", "Ankit", "Neha", "Rohit", "Sara", "Tara"])
rng = np.random.default_rng()

winners = rng.choice(names, size=3, replace=False)
print(winners)
print(len(set(winners)))`,
          },
          {
            type: 'p',
            text: '`replace=False` means the same name **cannot** be picked twice.',
          },
          { type: 'h3', text: 'Bell-curve numbers' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

rng = np.random.default_rng()
heights = rng.normal(170, 10, size=10000)

print(round(heights.mean()))
print(round(heights.std()))`,
          },
          {
            type: 'p',
            text: 'The mean is close to `170` and the standard deviation close to `10`, as we asked.',
          },
          { type: 'h3', text: 'The older way' },
          {
            type: 'p',
            text: 'You will see old code that uses `np.random.seed(5)`, `np.random.rand(3)` and `np.random.randint(1, 7, 5)`. They still work, but a **generator** (`default_rng`) is the recommended way today.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

np.random.seed(5)
x = np.random.rand(3)

np.random.seed(5)
y = np.random.rand(3)

print(np.array_equal(x, y))
print(np.random.randint(1, 7, 5).shape)`,
          },
        ],
      },
      {
        id: 's17-example',
        title: 'Example: marks analysis',
        blocks: [
          {
            type: 'p',
            text: 'Put it all together. Rows are students, columns are maths, science and english.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

names = np.array(["Aman", "Ankit", "Neha", "Rohit"])
marks = np.array([[85, 90, 78],
                  [70, 65, 80],
                  [92, 88, 95],
                  [55, 60, 48]])

total = marks.sum(axis=1)
average = marks.mean(axis=1)
grade = np.where(average >= 80, "A", np.where(average >= 60, "B", "C"))
rank = np.argsort(-total)

print("Totals :", total)
print("Average:", np.round(average, 1))
print("Grades :", grade)
print("Best to worst:", names[rank])
print("Hardest subject (lowest mean):", ["maths", "science", "english"][marks.mean(axis=0).argmin()])`,
          },
          {
            type: 'ul',
            items: [
              '`np.where` makes the grades for everyone at once.',
              '`argsort(-total)` sorts **biggest first** (the minus flips the order).',
              '`names[rank]` uses the positions to **reorder the names**: fancy indexing.',
            ],
          },
          { type: 'h3', text: 'Standardising marks' },
          {
            type: 'p',
            text: 'A **z-score** says how many standard deviations a mark is from the average. It lets you compare marks from different subjects.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([[85, 90, 78],
                  [70, 65, 80],
                  [92, 88, 95],
                  [55, 60, 48]])

z = (marks - marks.mean(axis=0)) / marks.std(axis=0)
print(np.round(z, 2))
print(np.allclose(z.mean(axis=0), 0))`,
          },
          {
            type: 'p',
            text: 'Broadcasting does the work: the column averages are subtracted from **every row**. After standardising, each column has a mean of `0`, and `allclose` confirms it (`True`).',
          },
          {
            type: 'code',
            label: 'Your turn: print each student\'s percentage (out of 300), rounded to 1 decimal place',
            runnable: true,
            code: raw`import numpy as np

marks = np.array([[85, 90, 78],
                  [70, 65, 80]])

`,
          },
        ],
      },
      {
        id: 's17-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Using `math.sqrt` on an array.** Use `np.sqrt`.',
              '**Using `and` / `or` instead of `&` / `|`** in array conditions.',
              '**Mixing up `axis=0` and `axis=1`.** `axis=0` goes **down** (one answer per column); `axis=1` goes **across** (one answer per row).',
              '**Forgetting that `integers(1, 6)` stops at 5.** Use `integers(1, 7)` for a die.',
              '**Expecting `rng.shuffle(a)` to return something.** It changes `a` in place and returns `None`.',
              '**Comparing shapes that do not fit.** `(2, 3)` and `(2,)` cannot broadcast.',
              '**Forgetting the extra brackets in `np.concatenate([a, b])`.** The arrays go in a **list**.',
              '**Expecting random numbers to repeat.** Use a **seed** when you need the same numbers again.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`import numpy as np
import math

a = np.array([4, 9, 16])
print(math.sqrt(a))`,
          },
          {
            type: 'code',
            label: 'Try it: this also fails on purpose',
            runnable: true,
            code: raw`import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.concatenate(a, b))`,
          },
        ],
      },
      {
        id: 's17-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: turn the prices into prices after a 10 percent discount, rounded to 2 places',
            runnable: true,
            code: raw`import numpy as np

prices = np.array([199.99, 49.5, 1200, 75.25])
`,
          },
          {
            type: 'code',
            label: 'Your turn: use np.where to print "even" or "odd" for each number',
            runnable: true,
            code: raw`import numpy as np

nums = np.arange(1, 9)
`,
          },
          {
            type: 'code',
            label: 'Your turn: print the running total of the daily sales',
            runnable: true,
            code: raw`import numpy as np

sales = np.array([120, 80, 150, 95, 200])
`,
          },
          {
            type: 'code',
            label: 'Your turn: make 10 random whole numbers from 1 to 100 and print the biggest',
            runnable: true,
            code: raw`import numpy as np

rng = np.random.default_rng()
`,
          },
        ],
      },
      {
        id: 's17-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Make an array of the temperatures of a week in Celsius and print them in **Fahrenheit** and **Kelvin**.',
              'Roll **two dice 10 000 times** with NumPy and count how many times the total is **7**.',
              'Create a `5 x 4` marks table with random whole numbers from 35 to 100. Print each student\'s **average**, each subject\'s **highest** mark, and the student with the **best total**.',
              'Normalise an array so its smallest value becomes `0` and its biggest becomes `1`: `(a - a.min()) / (a.max() - a.min())`.',
              'Use `np.where` and `np.clip` to cap all values above 100 at 100 and replace negative values with 0.',
              'Join two tables with `vstack` and `hstack`, and print the shape of each result.',
              'Revise: broadcasting, `where`, aggregation with `axis`, `cumsum`, `concatenate`, `default_rng`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Pandas basics: Series and DataFrame.',
          },
        ],
      },
    ],
  },
  {
    slug: 'pandas-introduction',
    title: 'Pandas Introduction',
    summary: 'Series, DataFrame and creating data.',
    hero: {
      file: 'students.py',
      lines: ['import pandas as pd', 's = pd.Series([85, 90, 78], index=["Aman", "Ankit", "Neha"])', 'print(s["Neha"])'],
      output: '78',
    },
    sections: [
      {
        id: 's18-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What does `axis=0` mean in `a.sum(axis=0)`?',
              'What does `np.where(marks >= 50, "Pass", "Fail")` do?',
              'What is broadcasting?',
            ],
          },
        ],
      },
      {
        id: 's18-what',
        title: 'What is pandas?',
        blocks: [
          {
            type: 'p',
            text: '**pandas** is the main Python package for **tables of data**, like an Excel sheet inside Python. It sits on top of NumPy and adds **labels**: names for rows and columns.',
          },
          {
            type: 'ul',
            items: [
              'Read data from **CSV**, Excel and more.',
              'Clean it, filter it, sort it and summarise it.',
              'Used everywhere in **data analysis** and machine learning.',
            ],
          },
          {
            type: 'code',
            label: 'Install it once on your computer (terminal)',
            code: raw`pip install pandas`,
          },
          {
            type: 'p',
            text: 'By convention we import it as **`pd`**. pandas has two main building blocks:',
          },
          {
            type: 'table',
            head: ['Name', 'What it is', 'Think of it as'],
            rows: [
              ['**Series**', 'one column of data with labels', 'one column of a spreadsheet'],
              ['**DataFrame**', 'a whole table: many Series side by side', 'the whole spreadsheet'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

print(pd.__name__)
print(type(pd.Series([1, 2, 3])).__name__)
print(type(pd.DataFrame({"a": [1, 2]})).__name__)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'pandas in the Try it boxes',
            text: 'The first box that imports pandas downloads it (a few seconds, more than NumPy). After that it is quick. Some printed details, like the word `object` for text columns, can be different in newer versions of pandas on your own computer.',
          },
        ],
      },
      {
        id: 's18-series',
        title: 'Series',
        blocks: [
          {
            type: 'p',
            text: 'A **Series** is a one-dimensional column. Each value has a **label** called the **index**.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

marks = pd.Series([85, 90, 78, 92])
print(marks)`,
          },
          {
            type: 'ul',
            items: [
              'The **left** column (`0 1 2 3`) is the **index**.',
              'The **right** column is the **values**.',
              'The last line shows the **dtype** (the data type), here `int64`.',
            ],
          },
          { type: 'h3', text: 'Your own index' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

marks = pd.Series([85, 90, 78, 92],
                  index=["Aman", "Ankit", "Neha", "Rohit"],
                  name="maths")
print(marks)
print(list(marks.index))
print(marks.values)
print(marks.name)`,
          },
          {
            type: 'ul',
            items: [
              '`index=` gives each value a **name** instead of a number.',
              '`name=` names the Series (it becomes the column name in a table).',
              '`.index` and `.values` give the two parts.',
            ],
          },
          { type: 'h3', text: 'From a dictionary' },
          {
            type: 'p',
            text: 'A dictionary becomes a Series: the **keys** are the index and the **values** are the data.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

stock = pd.Series({"apples": 30, "bananas": 12, "cherries": 45})
print(stock)`,
          },
          { type: 'h3', text: 'A single value for all' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

print(pd.Series(0, index=["a", "b", "c"]))
print(pd.Series(range(1, 6)))`,
          },
        ],
      },
      {
        id: 's18-series-access',
        title: 'Using a Series',
        blocks: [
          { type: 'h3', text: 'Getting values' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

marks = pd.Series([85, 90, 78, 92],
                  index=["Aman", "Ankit", "Neha", "Rohit"])

print(marks["Neha"])
print(marks.iloc[0])
print(marks[["Aman", "Rohit"]])
print(marks["Ankit":"Rohit"])`,
          },
          {
            type: 'table',
            head: ['Way', 'Meaning'],
            rows: [
              ['`marks["Neha"]`', 'by **label**'],
              ['`marks.loc["Neha"]`', 'by label (the clear way)'],
              ['`marks.iloc[2]`', 'by **position** (0, 1, 2 ...)'],
              ['`marks[["Aman", "Rohit"]]`', 'several labels, in a list'],
              ['`marks["Ankit":"Rohit"]`', 'a label slice: **includes** the last label'],
            ],
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Label slices include the end',
            text: 'A normal slice like `a[1:3]` stops **before** 3. A **label** slice like `"Ankit":"Rohit"` **includes** `"Rohit"`.',
          },
          { type: 'h3', text: 'Maths and filtering' },
          {
            type: 'p',
            text: 'A Series works like a NumPy array: maths happens on every value, and a condition works as a filter.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

marks = pd.Series([85, 90, 78, 92],
                  index=["Aman", "Ankit", "Neha", "Rohit"])

print(marks + 5)
print(marks[marks > 85])
print(marks.sum(), marks.mean(), marks.max())
print(marks.idxmax())`,
          },
          {
            type: 'ul',
            items: [
              '`marks + 5` keeps the labels and adds 5 to each value.',
              '`marks[marks > 85]` keeps only the matching rows.',
              '`idxmax()` gives the **label** of the biggest value (the topper\'s name).',
            ],
          },
          { type: 'h3', text: 'Series with Series' },
          {
            type: 'p',
            text: 'When you add two Series, pandas lines the values up by **label**, not by position.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

a = pd.Series([1, 2, 3], index=["x", "y", "z"])
b = pd.Series([10, 20, 30], index=["z", "y", "x"])

print(a + b)`,
          },
        ],
      },
      {
        id: 's18-df',
        title: 'DataFrame',
        blocks: [
          {
            type: 'p',
            text: 'A **DataFrame** is a table: **rows** and **columns**, each column its own Series. The easiest way to make one is from a **dictionary**: each key is a column name, each value is a list for that column.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

data = {
    "name":    ["Aman", "Ankit", "Neha", "Rohit"],
    "maths":   [85, 70, 92, 55],
    "science": [90, 65, 88, 60],
}

df = pd.DataFrame(data)
print(df)`,
          },
          {
            type: 'ul',
            items: [
              'The **bold column on the left** (`0 1 2 3`) is the row **index**.',
              'The top row has the **column names**.',
              'All the lists must be the **same length**.',
            ],
          },
          { type: 'h3', text: 'The parts of a DataFrame' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit"],
    "maths":   [85, 70, 92, 55],
    "science": [90, 65, 88, 60],
})

print(df.shape)
print(list(df.columns))
print(list(df.index))
print(df.size)`,
          },
          {
            type: 'table',
            head: ['Attribute', 'Meaning'],
            rows: [
              ['`df.shape`', '`(rows, columns)`'],
              ['`df.columns`', 'the column names'],
              ['`df.index`', 'the row labels'],
              ['`df.dtypes`', 'the type of each column'],
              ['`df.size`', 'rows times columns'],
              ['`df.values`', 'the data as a NumPy array'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"maths": [85, 70, 92], "ratio": [0.5, 0.25, 0.75]})

print(df.dtypes)
print(df.values)`,
          },
          {
            type: 'p',
            text: 'A column of **text** shows the dtype `object`. (Some newer versions of pandas call it `str`.)',
          },
        ],
      },
      {
        id: 's18-create',
        title: 'Creating a DataFrame in other ways',
        blocks: [
          { type: 'h3', text: 'A list of dictionaries (one per row)' },
          {
            type: 'p',
            text: 'This matches how data often arrives: each record is a dictionary.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

rows = [
    {"name": "Aman",  "city": "Delhi", "age": 21},
    {"name": "Neha",  "city": "Pune",  "age": 23},
    {"name": "Rohit", "city": "Goa"},
]

df = pd.DataFrame(rows)
print(df)`,
          },
          {
            type: 'p',
            text: 'Rohit has no `age`, so pandas fills the gap with **`NaN`** (not a number): the sign of a **missing value**.',
          },
          { type: 'h3', text: 'A list of lists, with column names' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

rows = [
    ["Aman", 85, 90],
    ["Ankit", 70, 65],
    ["Neha", 92, 88],
]

df = pd.DataFrame(rows, columns=["name", "maths", "science"])
print(df)`,
          },
          { type: 'h3', text: 'A NumPy array' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

arr = np.array([[1, 2, 3],
                [4, 5, 6]])

df = pd.DataFrame(arr, columns=["a", "b", "c"], index=["row1", "row2"])
print(df)`,
          },
          { type: 'h3', text: 'Your own row labels' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame(
    {"maths": [85, 70, 92], "science": [90, 65, 88]},
    index=["Aman", "Ankit", "Neha"],
)
print(df)
print(df.loc["Neha"])`,
          },
          { type: 'h3', text: 'Series together make a DataFrame' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

maths = pd.Series([85, 70, 92], index=["Aman", "Ankit", "Neha"])
science = pd.Series([90, 65, 88], index=["Aman", "Ankit", "Neha"])

df = pd.DataFrame({"maths": maths, "science": science})
print(df)`,
          },
        ],
      },
      {
        id: 's18-generate',
        title: 'Creating data with code',
        blocks: [
          {
            type: 'p',
            text: 'You do not have to type every value. Python and NumPy can **generate** the data.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "n": range(1, 6),
    "square": [n ** 2 for n in range(1, 6)],
    "double": [n * 2 for n in range(1, 6)],
})
print(df)`,
          },
          { type: 'h3', text: 'Random data' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

rng = np.random.default_rng()
df = pd.DataFrame(rng.integers(35, 101, size=(4, 3)),
                  columns=["maths", "science", "english"])
print(df.shape)
print((df >= 35).all().all())`,
          },
          { type: 'h3', text: 'A range of dates' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

days = pd.date_range("2026-01-01", periods=4)
sales = pd.Series([120, 80, 150, 95], index=days)
print(sales)`,
          },
          { type: 'h3', text: 'From CSV text' },
          {
            type: 'p',
            text: 'Real data usually comes from a **CSV file**: `pd.read_csv("marks.csv")`. This box uses text that looks like a file.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd
from io import StringIO

text = """name,maths,science
Aman,85,90
Ankit,70,65
Neha,92,88"""

df = pd.read_csv(StringIO(text))
print(df)
print(df["maths"].mean())`,
          },
          {
            type: 'p',
            text: 'Next class we read real CSV files. Today, remember the **names**: `read_csv` to read, and `to_csv` to write.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"name": ["Aman", "Neha"], "marks": [85, 92]})

df.to_csv("marks.csv", index=False)
print(open("marks.csv").read())

back = pd.read_csv("marks.csv")
print(back.equals(df))`,
          },
          {
            type: 'p',
            text: '`index=False` stops the row numbers being saved as an extra column.',
          },
        ],
      },
      {
        id: 's18-look',
        title: 'Looking at a DataFrame',
        blocks: [
          {
            type: 'table',
            head: ['Method', 'What it shows'],
            rows: [
              ['`df.head(n)`', 'the first `n` rows (5 if you give no number)'],
              ['`df.tail(n)`', 'the last `n` rows'],
              ['`df.describe()`', 'count, mean, std, min, quartiles and max of the number columns'],
              ['`df.info()`', 'columns, types and missing values'],
              ['`df.sample(n)`', '`n` random rows'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Sara", "Tara"],
    "maths":   [85, 70, 92, 55, 78, 66],
    "science": [90, 65, 88, 60, 82, 71],
})

print(df.head(3))
print(df.tail(2))
print(df.describe())`,
          },
          {
            type: 'ul',
            items: [
              '`head` and `tail` are the first thing to run on any new data.',
              '`describe` skips the text column and summarises the numbers.',
            ],
          },
        ],
      },
      {
        id: 's18-select',
        title: 'Selecting columns and rows',
        blocks: [
          { type: 'h3', text: 'Columns' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha"],
    "maths":   [85, 70, 92],
    "science": [90, 65, 88],
})

print(df["maths"])
print(type(df["maths"]).__name__)
print(df[["name", "maths"]])
print(type(df[["name", "maths"]]).__name__)`,
          },
          {
            type: 'ul',
            items: [
              '`df["maths"]` (one name) gives a **Series**.',
              '`df[["name", "maths"]]` (a **list** of names, so **double brackets**) gives a **DataFrame**.',
              '`df.maths` also works, but only when the name has no spaces. Prefer `df["maths"]`.',
            ],
          },
          { type: 'h3', text: 'Rows with iloc and loc' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "maths":   [85, 70, 92, 55],
    "science": [90, 65, 88, 60],
}, index=["Aman", "Ankit", "Neha", "Rohit"])

print(df.iloc[0])
print(df.loc["Neha"])
print(df.iloc[1:3])
print(df.loc["Aman":"Neha", "maths"])
print(df.iloc[2, 1])`,
          },
          {
            type: 'table',
            head: ['Tool', 'Selects by', 'Example'],
            rows: [
              ['`iloc`', '**position**', '`df.iloc[0]`, `df.iloc[1:3]`, `df.iloc[2, 1]`'],
              ['`loc`', '**label**', '`df.loc["Neha"]`, `df.loc["Aman":"Neha", "maths"]`'],
            ],
          },
          {
            type: 'p',
            text: 'Both take `[rows, columns]`, just like NumPy. `iloc` slices **stop before** the end; `loc` slices **include** the end.',
          },
          { type: 'h3', text: 'Filtering rows' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Rohit"],
    "maths": [85, 70, 92, 55],
})

print(df[df["maths"] >= 80])
print(df[(df["maths"] > 60) & (df["maths"] < 90)])`,
          },
          {
            type: 'p',
            text: 'The same rules as NumPy: use `&` and `|`, with each condition in brackets.',
          },
        ],
      },
      {
        id: 's18-change',
        title: 'Adding, changing and removing columns',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha"],
    "maths":   [85, 70, 92],
    "science": [90, 65, 88],
})

df["total"] = df["maths"] + df["science"]
df["average"] = df["total"] / 2
df["passed"] = df["average"] >= 75
print(df)`,
          },
          {
            type: 'ul',
            items: [
              'Assign to a **new** column name to **add** a column.',
              'The maths is done on the **whole columns** at once, like NumPy.',
              'Assigning to an **old** name **changes** that column.',
            ],
          },
          { type: 'h3', text: 'Rename and drop' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha"],
    "maths": [85, 70, 92],
    "temp":  [0, 0, 0],
})

df = df.rename(columns={"maths": "math_marks"})
df = df.drop(columns=["temp"])
print(df)

df = df.drop(index=[1])
print(df)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'These make a new table',
            text: '`rename` and `drop` give back a **new** DataFrame. Save it with `df = ...`, or the change is lost.',
          },
          { type: 'h3', text: 'Sorting' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Rohit"],
    "maths": [85, 70, 92, 55],
})

print(df.sort_values("maths"))
print(df.sort_values("maths", ascending=False).head(2))`,
          },
        ],
      },
      {
        id: 's18-index',
        title: 'Working with the index',
        blocks: [
          {
            type: 'p',
            text: 'Any column can become the **index**, and the index can go back to being a column.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha"],
    "maths": [85, 70, 92],
})

by_name = df.set_index("name")
print(by_name)
print(by_name.loc["Neha", "maths"])

print(by_name.reset_index())`,
          },
          {
            type: 'ul',
            items: [
              '`set_index("name")` makes `name` the row labels.',
              '`reset_index()` puts them back as a normal column and numbers the rows `0, 1, 2 ...`.',
            ],
          },
        ],
      },
      {
        id: 's18-missing',
        title: 'Missing values (NaN)',
        blocks: [
          {
            type: 'p',
            text: 'Real data has gaps. pandas shows a gap as **`NaN`** (or `None`).',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha"],
    "maths": [85, np.nan, 92],
})

print(df)
print(df.isna())
print(df["maths"].isna().sum())
print(df["maths"].mean())`,
          },
          {
            type: 'ul',
            items: [
              '`isna()` gives `True` where a value is missing.',
              '`isna().sum()` counts the gaps.',
              '`mean()` **skips** the `NaN` values. The mean here is `(85 + 92) / 2`.',
            ],
          },
          { type: 'h3', text: 'Fill or drop' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha"],
    "maths": [85, np.nan, 92],
})

print(df.fillna(0))
print(df["maths"].fillna(df["maths"].mean()))
print(df.dropna())`,
          },
          {
            type: 'table',
            head: ['Method', 'What it does'],
            rows: [
              ['`fillna(value)`', 'replace each gap with `value`'],
              ['`dropna()`', 'remove every row that has a gap'],
              ['`isna()`', 'find the gaps'],
            ],
          },
        ],
      },
      {
        id: 's18-example',
        title: 'Example: a class report',
        blocks: [
          {
            type: 'p',
            text: 'Put it together: build a table, add columns, rank, and find the topper.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Sara"],
    "maths":   [85, 70, 92, 55, 78],
    "science": [90, 65, 88, 60, 82],
    "english": [78, 80, 95, 48, 74],
})

df["total"] = df["maths"] + df["science"] + df["english"]
df["average"] = (df["total"] / 3).round(1)
df["grade"] = np.where(df["average"] >= 80, "A",
              np.where(df["average"] >= 60, "B", "C"))

ranked = df.sort_values("total", ascending=False)
print(ranked[["name", "total", "average", "grade"]])

print("Topper:", ranked.iloc[0]["name"])
print("Class average:", round(df["average"].mean(), 1))
print("Students with grade A:", (df["grade"] == "A").sum())`,
          },
          {
            type: 'ul',
            items: [
              'Columns are added with simple maths on other columns.',
              '`np.where` fills the grade column, as in the NumPy class.',
              '`sort_values` ranks the table, and `iloc[0]` takes the top row.',
            ],
          },
          {
            type: 'code',
            label: 'Your turn: add a column "percent" (total out of 300, rounded to 1 decimal) and print the table',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Neha"],
    "maths":   [85, 92],
    "science": [90, 88],
    "english": [78, 95],
})
df["total"] = df["maths"] + df["science"] + df["english"]

`,
          },
        ],
      },
      {
        id: 's18-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Forgetting `import pandas as pd`.** You get `NameError: name \'pd\' is not defined`.',
              '**A wrong column name.** `df["Maths"]` is not `df["maths"]`: you get a `KeyError`.',
              '**One bracket instead of two** when choosing several columns: `df["name", "maths"]` fails. Use `df[["name", "maths"]]`.',
              '**Lists of different lengths** when making a DataFrame from a dictionary.',
              '**Forgetting to save** the result of `drop`, `rename` or `sort_values`: `df = df.drop(...)`.',
              '**Mixing up `loc` and `iloc`.** `loc` uses **labels** and includes the end; `iloc` uses **positions** and stops before the end.',
              '**Using `and` / `or`** instead of `&` / `|` when filtering rows.',
              '**Capital letters.** It is `DataFrame` and `Series`, not `Dataframe` or `series`.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"name": ["Aman"], "maths": [85]})
print(df["Maths"])`,
          },
          {
            type: 'code',
            label: 'Try it: this also fails on purpose',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5]})
print(df)`,
          },
        ],
      },
      {
        id: 's18-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: make a Series of 4 city populations (any numbers) with the city names as the index, then print the biggest city',
            runnable: true,
            code: raw`import pandas as pd

`,
          },
          {
            type: 'code',
            label: 'Your turn: make a DataFrame of 3 books with columns title, author and price, then print only the books costing more than 300',
            runnable: true,
            code: raw`import pandas as pd

`,
          },
          {
            type: 'code',
            label: 'Your turn: add a column "price_with_gst" (price times 1.18) and sort the table by it, biggest first',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "item":  ["pen", "bag", "book"],
    "price": [20, 800, 350],
})
`,
          },
        ],
      },
      {
        id: 's18-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Make a DataFrame of **6 students** with name, age, city and marks. Print `shape`, `head(3)` and `describe()`.',
              'From it, print the students **older than 20**, then only the **name and marks** columns of those students.',
              'Add a column `result` that says "Pass" or "Fail" using `np.where`, then count how many of each.',
              'Create the same table from a **list of dictionaries**, then again from a **list of lists** with `columns=`.',
              'Write your DataFrame to `students.csv` with `to_csv`, then read it back with `read_csv` and check with `equals`.',
              'Make a table with one **missing value**, find it with `isna`, then fix it with `fillna`.',
              'Revise: **Series**, **DataFrame**, `index`, `columns`, `loc`, `iloc`, `head`, `describe`, `NaN`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Pandas data analysis: reading CSV files, filtering, `groupby` and summaries.',
          },
        ],
      },
    ],
  },
  {
    slug: 'loading-and-inspecting-data',
    title: 'Loading and Inspecting Data',
    summary: 'read_csv, read_excel, head, info and describe.',
    hero: {
      file: 'load.py',
      lines: ['import pandas as pd', 'df = pd.read_csv("students.csv")', 'print(df.head(2))'],
      output: '    name    city  age  maths\n0   Aman   Delhi   20     85\n1  Ankit  Mumbai   22     90',
    },
    sections: [
      {
        id: 's19-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'What is the difference between a **Series** and a **DataFrame**?',
              'What does `df.shape` give?',
              'What is the difference between `loc` and `iloc`?',
            ],
          },
        ],
      },
      {
        id: 's19-why',
        title: 'Real data lives in files',
        blocks: [
          {
            type: 'p',
            text: 'Until now we typed our data inside the code. Real data comes in **files**: a **CSV** file from a website, an **Excel** sheet from the office. The first job of every data analysis is the same: **load the file, then look at it** before doing anything else.',
          },
          {
            type: 'table',
            head: ['Step', 'Function', 'What it does'],
            rows: [
              ['1. Load', '`pd.read_csv`, `pd.read_excel`', 'file into a DataFrame'],
              ['2. Peek', '`head`, `tail`, `sample`', 'see a few rows'],
              ['3. Size and types', '`shape`, `info`, `dtypes`', 'how big, what kind of data'],
              ['4. Summary', '`describe`', 'count, mean, min, max'],
              ['5. Quality', '`isna().sum()`, `value_counts`', 'missing values, repeats'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Files in the Try it boxes',
            text: 'The Try it boxes run in your browser and cannot see files on your computer. So in this lesson we put the CSV text inside the code with `io.StringIO`, which acts like a file. On your own computer you simply write the file name: `pd.read_csv("students.csv")`.',
          },
        ],
      },
      {
        id: 's19-read-csv',
        title: 'read_csv',
        blocks: [
          {
            type: 'p',
            text: 'A **CSV** (comma-separated values) file is plain text: one row per line, values split by commas, the first line holds the column names. `pd.read_csv` turns it into a DataFrame.',
          },
          {
            type: 'code',
            label: 'On your computer (the file must exist)',
            code: raw`import pandas as pd

df = pd.read_csv("students.csv")
print(df)`,
          },
          { type: 'h3', text: 'The same thing, runnable here' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""

df = pd.read_csv(io.StringIO(text))
print(df)
print(type(df).__name__)`,
          },
          {
            type: 'ul',
            items: [
              'The first line became the **column names**.',
              'Every other line became a **row**, numbered 0, 1, 2 ...',
              '**Empty** places in the file became **NaN** (not a number, a missing value). Look at Neha\'s science and Sana\'s maths.',
              'pandas worked out the types for you: `age` is a whole number, `name` is text.',
            ],
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'File not found',
            text: 'If `read_csv("students.csv")` says `FileNotFoundError`, Python is looking in the wrong folder. Put the file next to your script, or give the **full path**: `pd.read_csv(r"C:\\data\\students.csv")`. The `r` before the quote stops backslashes being treated as escapes.',
          },
        ],
      },
      {
        id: 's19-csv-options',
        title: 'Useful read_csv options',
        blocks: [
          {
            type: 'p',
            text: 'Not every file is tidy. `read_csv` has options for the usual surprises. The most useful ones:',
          },
          {
            type: 'table',
            head: ['Option', 'Use it when', 'Example'],
            rows: [
              ['`sep=`', 'values are not split by commas', '`sep=";"` or `sep="\\t"`'],
              ['`header=None`', 'the file has no column names line', '`header=None`'],
              ['`names=[...]`', 'you want to give the column names', '`names=["a", "b"]`'],
              ['`index_col=`', 'one column should be the row labels', '`index_col="name"`'],
              ['`usecols=`', 'you only need some columns', '`usecols=["name", "maths"]`'],
              ['`nrows=`', 'the file is huge, read only the top', '`nrows=100`'],
              ['`na_values=`', 'missing values are written some other way', '`na_values=["-", "NA"]`'],
              ['`parse_dates=`', 'a column holds dates', '`parse_dates=["joined"]`'],
            ],
          },
          { type: 'h3', text: 'sep: a different separator' },
          {
            type: 'p',
            text: 'Files from some countries use **semicolons**, and some use **tabs**. Tell pandas with `sep=`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name;maths
Aman;85
Ankit;90
"""

print(pd.read_csv(io.StringIO(text)))
print()
print(pd.read_csv(io.StringIO(text), sep=";"))`,
          },
          {
            type: 'p',
            text: 'Without `sep=";"` everything ended up squashed into one column. If a table looks like **one wide column**, the separator is wrong.',
          },
          { type: 'h3', text: 'header and names: no title line' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """Aman,85
Ankit,90
Neha,78
"""

df = pd.read_csv(io.StringIO(text), header=None, names=["name", "maths"])
print(df)`,
          },
          {
            type: 'p',
            text: '`header=None` says "the first line is data, not names", and `names=` supplies the names. Without them pandas would treat Aman and 85 as the column names!',
          },
          { type: 'h3', text: 'index_col: choose the row labels' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,maths,science
Aman,85,78
Ankit,90,88
Neha,78,70
"""

df = pd.read_csv(io.StringIO(text), index_col="name")
print(df)
print(df.loc["Ankit"])`,
          },
          { type: 'h3', text: 'usecols and nrows: read less' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths
Aman,Delhi,20,85
Ankit,Mumbai,22,90
Neha,Delhi,21,78
Rohit,Pune,23,92
"""

print(pd.read_csv(io.StringIO(text), usecols=["name", "maths"]))
print()
print(pd.read_csv(io.StringIO(text), nrows=2))`,
          },
          {
            type: 'p',
            text: 'For a file with millions of rows, `nrows=` lets you peek at the top quickly, and `usecols=` saves memory by loading only what you need.',
          },
          { type: 'h3', text: 'na_values: other ways to say missing' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,maths
Aman,85
Ankit,-
Neha,NA
"""

print(pd.read_csv(io.StringIO(text)))
print()
df = pd.read_csv(io.StringIO(text), na_values=["-"])
print(df)
print(df.dtypes)`,
          },
          {
            type: 'p',
            text: 'The dash `-` made the whole `maths` column **text** in the first table. With `na_values=["-"]` it becomes a proper **NaN**, and the column is numeric again (`float64`, because NaN is a float). pandas already treats `NA` as missing by itself.',
          },
          { type: 'h3', text: 'parse_dates: real dates' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,joined
Aman,2024-01-15
Ankit,2023-11-30
"""

plain = pd.read_csv(io.StringIO(text))
dated = pd.read_csv(io.StringIO(text), parse_dates=["joined"])
print(plain.dtypes)
print()
print(dated.dtypes)
print(dated["joined"].dt.year)`,
          },
          {
            type: 'p',
            text: 'Without `parse_dates` a date column is just text. With it, you get a real date type and tools like `.dt.year`.',
          },
        ],
      },
      {
        id: 's19-excel',
        title: 'read_excel',
        blocks: [
          {
            type: 'p',
            text: 'Excel files (`.xlsx`) work the same way with `pd.read_excel`. The extra thing: an Excel file can have **many sheets**, so you can choose one with `sheet_name=`.',
          },
          {
            type: 'code',
            label: 'On your computer',
            code: raw`import pandas as pd

df = pd.read_excel("marks.xlsx")                       # first sheet
df2 = pd.read_excel("marks.xlsx", sheet_name="Term 2") # a sheet by name
df3 = pd.read_excel("marks.xlsx", sheet_name=1)        # a sheet by position`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Excel needs one more package',
            text: 'pandas reads `.xlsx` files through a helper package called **openpyxl**. Install it once: `pip install openpyxl`. Without it, `read_excel` fails with an `ImportError`.',
          },
          { type: 'h3', text: 'Try it: write an Excel file, then read it' },
          {
            type: 'p',
            text: 'We cannot upload a file here, so we first **create** an Excel file in memory with `to_excel`, then read it back with `read_excel`. This is also how you save your own results.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import openpyxl
import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha"],
    "maths": [85, 90, 78],
})

file = io.BytesIO()                      # a pretend file in memory
df.to_excel(file, index=False)           # write it as an Excel file
file.seek(0)                             # go back to the start

back = pd.read_excel(file)
print(back)
print(back.equals(df))`,
          },
          {
            type: 'ul',
            items: [
              '`to_excel(..., index=False)` writes the table **without** the 0, 1, 2 row numbers.',
              '`file.seek(0)` rewinds the pretend file so it can be read from the start.',
              'On your computer you just give a name: `df.to_excel("marks.xlsx", index=False)`.',
              '`import openpyxl` here makes the Try it box download that package. You do not need that line on your own computer once it is installed.',
            ],
          },
          { type: 'h3', text: 'Two sheets' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import openpyxl
import pandas as pd

term1 = pd.DataFrame({"name": ["Aman", "Neha"], "maths": [85, 78]})
term2 = pd.DataFrame({"name": ["Aman", "Neha"], "maths": [90, 82]})

file = io.BytesIO()
with pd.ExcelWriter(file) as writer:
    term1.to_excel(writer, sheet_name="Term 1", index=False)
    term2.to_excel(writer, sheet_name="Term 2", index=False)
file.seek(0)

print(pd.read_excel(file, sheet_name="Term 2"))
print()
file.seek(0)
sheets = pd.read_excel(file, sheet_name=None)    # None = every sheet
print(list(sheets))
print(sheets["Term 1"])`,
          },
          {
            type: 'ul',
            items: [
              '`sheet_name="Term 2"` reads one sheet by its name.',
              '`sheet_name=None` reads **all** sheets into a dictionary: the keys are sheet names, the values are DataFrames.',
            ],
          },
          {
            type: 'table',
            head: ['', 'read_csv', 'read_excel'],
            rows: [
              ['File type', '`.csv` (plain text)', '`.xlsx`, `.xls`'],
              ['Sheets', 'no', 'yes, `sheet_name=`'],
              ['Extra package', 'none', '`openpyxl`'],
              ['Speed', 'fast', 'slower'],
              ['Save', '`to_csv`', '`to_excel`'],
            ],
          },
        ],
      },
      {
        id: 's19-peek',
        title: 'A first look: head, tail, sample',
        blocks: [
          {
            type: 'p',
            text: 'Never print a whole big table. Look at a **few rows** first.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df.head())
print()
print(df.head(2))
print()
print(df.tail(2))`,
          },
          {
            type: 'table',
            head: ['Call', 'Gives'],
            rows: [
              ['`df.head()`', 'the **first 5** rows'],
              ['`df.head(n)`', 'the first `n` rows'],
              ['`df.tail()`', 'the **last 5** rows'],
              ['`df.tail(n)`', 'the last `n` rows'],
              ['`df.sample(n)`', '`n` **random** rows'],
            ],
          },
          { type: 'h3', text: 'sample: a random peek' },
          {
            type: 'p',
            text: 'The top of a file may not be typical (it could be sorted). `sample` picks random rows. `random_state=` makes it repeatable.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,maths
Aman,85
Ankit,90
Neha,78
Rohit,92
Priya,66
Sana,70
"""
df = pd.read_csv(io.StringIO(text))

print(df.sample(2, random_state=1))`,
          },
        ],
      },
      {
        id: 's19-shape',
        title: 'Size and column names',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df.shape)
print(len(df))
print(df.columns)
print(list(df.columns))
print(df.index)
print(df.dtypes)`,
          },
          {
            type: 'table',
            head: ['Attribute', 'Meaning'],
            rows: [
              ['`df.shape`', '`(rows, columns)`'],
              ['`len(df)`', 'number of rows'],
              ['`df.columns`', 'the column names'],
              ['`df.index`', 'the row labels'],
              ['`df.dtypes`', 'the data type of each column'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Why are maths and science decimals?',
            text: 'A column that has a **NaN** cannot be stored as whole numbers, so pandas makes it `float64` (85.0, 90.0 ...). `age` has no missing values, so it stays `int64`.',
          },
        ],
      },
      {
        id: 's19-info',
        title: 'info()',
        blocks: [
          {
            type: 'p',
            text: '`df.info()` is the best one-glance **health check**. It prints (it does not return a table).',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

df.info()`,
          },
          {
            type: 'p',
            text: 'How to read it:',
          },
          {
            type: 'ul',
            items: [
              '**RangeIndex: 6 entries** means 6 rows.',
              '**Data columns (total 5 columns)**: 5 columns.',
              '**Non-Null Count** is how many values are **not missing**. `maths` has 5 of 6, so one is missing. `science` also has 5 of 6.',
              '**Dtype** is the type: `int64` whole numbers, `float64` decimals, `object` (text).',
              'The last line is how much **memory** the table uses.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Spot the problems fast',
            text: 'Look at **Non-Null Count** (any column with fewer than the number of rows has gaps) and at **Dtype** (a column that should be a number but says `object` usually has stray text in it, like the `-` we saw earlier).',
          },
        ],
      },
      {
        id: 's19-describe',
        title: 'describe()',
        blocks: [
          {
            type: 'p',
            text: '`df.describe()` gives a quick **statistical summary** of every numeric column.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df.describe())`,
          },
          {
            type: 'table',
            head: ['Row', 'Meaning'],
            rows: [
              ['`count`', 'how many values are **not missing**'],
              ['`mean`', 'the average'],
              ['`std`', 'standard deviation (how spread out)'],
              ['`min`', 'smallest value'],
              ['`25%`', 'a quarter of the values are below this'],
              ['`50%`', 'the **median** (the middle value)'],
              ['`75%`', 'three quarters of the values are below this'],
              ['`max`', 'largest value'],
            ],
          },
          {
            type: 'p',
            text: 'Notice `count` for maths is **5**, not 6: `describe` skips missing values. That is a quick way to notice gaps.',
          },
          { type: 'h3', text: 'Text columns and rounding' },
          {
            type: 'p',
            text: 'By default only numeric columns are shown. `include="object"` describes the text columns, and `.round(1)` tidies the numbers.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df.describe(include="object"))
print()
print(df.describe().round(1))
print()
print(df["maths"].describe())`,
          },
          {
            type: 'ul',
            items: [
              'For text, `describe` gives `count`, `unique` (different values), `top` (most common) and `freq` (how often the top one appears).',
              '`df["maths"].describe()` summarises **one column**.',
            ],
          },
          { type: 'h3', text: 'Single statistics' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df["maths"].mean())
print(df["maths"].median())
print(df["maths"].min(), df["maths"].max())
print(df["maths"].count())
print(df[["maths", "science"]].mean())`,
          },
        ],
      },
      {
        id: 's19-quality',
        title: 'Missing values and repeats',
        blocks: [
          { type: 'h3', text: 'How many values are missing?' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df.isna())
print()
print(df.isna().sum())
print()
print(df.isna().sum().sum())`,
          },
          {
            type: 'ul',
            items: [
              '`df.isna()` is a table of `True` / `False`: `True` where a value is missing.',
              '`.sum()` adds the `True`s (a `True` counts as 1), giving **missing values per column**.',
              'A second `.sum()` gives the total for the whole table.',
            ],
          },
          { type: 'h3', text: 'unique, nunique and value_counts' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,city,age,maths,science
Aman,Delhi,20,85,78
Ankit,Mumbai,22,90,88
Neha,Delhi,21,78,
Rohit,Pune,23,92,95
Priya,Mumbai,20,66,70
Sana,Pune,22,,81
"""
df = pd.read_csv(io.StringIO(text))

print(df["city"].unique())
print(df["city"].nunique())
print(df["city"].value_counts())
print()
print(df["age"].value_counts().sort_index())`,
          },
          {
            type: 'table',
            head: ['Call', 'Gives'],
            rows: [
              ['`s.unique()`', 'the different values'],
              ['`s.nunique()`', 'how many different values'],
              ['`s.value_counts()`', 'how often each value appears, most common first'],
              ['`df.duplicated().sum()`', 'how many rows are exact copies of an earlier row'],
            ],
          },
          { type: 'h3', text: 'Duplicate rows' },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,maths
Aman,85
Ankit,90
Aman,85
"""
df = pd.read_csv(io.StringIO(text))

print(df.duplicated())
print(df.duplicated().sum())
print(df.drop_duplicates())`,
          },
        ],
      },
      {
        id: 's19-first-look',
        title: 'Example: a first look at a new file',
        blocks: [
          {
            type: 'p',
            text: 'A new file arrives. Here is the routine most analysts follow, every time. Run it and read each part.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """order_id,item,qty,price,city
101,pen,10,5,Delhi
102,book,2,350,Mumbai
103,bag,1,800,Delhi
104,pen,5,5,Pune
105,book,,350,Pune
106,bag,2,800,Mumbai
"""
df = pd.read_csv(io.StringIO(text))

print("1. Shape:", df.shape)
print()
print("2. First rows")
print(df.head(3))
print()
print("3. Types and gaps")
df.info()
print()
print("4. Numbers")
print(df[["qty", "price"]].describe().round(1))
print()
print("5. Missing per column")
print(df.isna().sum())
print()
print("6. Items sold")
print(df["item"].value_counts())`,
          },
          {
            type: 'ul',
            items: [
              'The routine is always: **shape, head, info, describe, missing, value_counts**.',
              '`info` shows `qty` has 5 of 6 values, so order 105 has no quantity. We found a problem before doing any analysis.',
              '`value_counts` shows `pen`, `book` and `bag` each appear twice.',
            ],
          },
        ],
      },
      {
        id: 's19-save',
        title: 'Saving your work',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`import io
import pandas as pd

df = pd.DataFrame({"name": ["Aman", "Ankit"], "maths": [85, 90]})

print(df.to_csv(index=False))      # no file name: returns the text
df.to_csv("students_out.csv", index=False)   # on your computer: saves a file`,
          },
          {
            type: 'ul',
            items: [
              '`to_csv("file.csv")` saves the table. Add **`index=False`** so the 0, 1, 2 row numbers are not written as an extra column.',
              'Without a file name, `to_csv()` just returns the CSV text. That is a nice way to see exactly what would be saved.',
              '`to_excel("file.xlsx", index=False)` does the same for Excel.',
            ],
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'The index=False habit',
            text: 'Forget `index=False` and the next `read_csv` brings back an extra column called `Unnamed: 0`. If you ever see that name, this is why.',
          },
        ],
      },
      {
        id: 's19-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**A wrong path.** `FileNotFoundError`: check the folder, the spelling and the extension.',
              '**A wrong separator.** The whole table is one wide column: add `sep=";"` or `sep="\\t"`.',
              '**No header line** but forgetting `header=None`: the first row of data becomes the column names.',
              '**Missing `openpyxl`.** `read_excel` fails with an `ImportError`.',
              '**Writing `df.info` without brackets.** `df.info` is the method itself; you need `df.info()`.',
              '**Printing `info()`.** `print(df.info())` shows `None` at the end, because `info` prints by itself. Just call `df.info()`.',
              '**Forgetting `index=False`** when saving, then getting `Unnamed: 0` when reading back.',
              '**Trusting the top rows only.** Also check `tail`, `describe` and `isna().sum()`.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this prints extra None',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"a": [1, 2]})
print(df.info())`,
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose (no such file)',
            runnable: true,
            code: raw`import pandas as pd

df = pd.read_csv("not_here.csv")
print(df)`,
          },
        ],
      },
      {
        id: 's19-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: read this CSV text, then print its shape and the first 2 rows',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """product,price,stock
pen,5,100
book,350,20
bag,800,5
"""
`,
          },
          {
            type: 'code',
            label: 'Your turn: read this text with a semicolon separator and no title line, naming the columns "city" and "temp"',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """Delhi;31
Mumbai;29
Pune;27
"""
`,
          },
          {
            type: 'code',
            label: 'Your turn: read this, print how many values are missing in each column, then describe the numbers',
            runnable: true,
            code: raw`import io
import pandas as pd

text = """name,marks,attendance
Aman,85,90
Ankit,,80
Neha,78,
"""
`,
          },
        ],
      },
      {
        id: 's19-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Create a CSV file `students.csv` in a text editor (name, city, age, marks, at least 8 rows, leave 2 values empty). Load it with `read_csv`.',
              'Print its `shape`, `head(3)`, `tail(3)`, `info()` and `describe()`. Write down what each one told you.',
              'Find out how many values are missing in each column, and the number of different cities with `nunique`.',
              'Use `value_counts` to see which city has the most students.',
              'Load the file again with `usecols` to keep only name and marks, and again with `index_col="name"`.',
              'Save the table as an Excel file with `to_excel` (install `openpyxl` first), then read it back with `read_excel`.',
              'Revise: `read_csv`, `sep`, `header`, `index_col`, `usecols`, `na_values`, `read_excel`, `sheet_name`, `head`, `info`, `describe`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Selecting and filtering: `loc`, `iloc`, conditions and column operations.',
          },
        ],
      },
    ],
  },
  {
    slug: 'selecting-and-filtering',
    title: 'Selecting and Filtering',
    summary: 'loc, iloc, conditions and column operations.',
    hero: {
      file: 'filter.py',
      lines: ['import pandas as pd', 'df = pd.read_csv("students.csv")', 'print(df[df["maths"] > 80])'],
      output: '    name    city  maths\n0   Aman   Delhi     85\n1  Ankit  Mumbai     90',
    },
    sections: [
      {
        id: 's20-recap',
        title: 'Recap',
        blocks: [
          { type: 'p', text: '**Ask the class:**' },
          {
            type: 'ul',
            items: [
              'How do you load a CSV file into a DataFrame?',
              'What do `df.info()` and `df.describe()` tell you?',
              'What does `df.isna().sum()` give?',
            ],
          },
        ],
      },
      {
        id: 's20-data',
        title: 'The table we will use',
        blocks: [
          {
            type: 'p',
            text: 'In this lesson we choose **parts** of a table: some columns, some rows, rows that match a rule. Every example uses this small table of students. Run it once and look at it.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "age":     [20, 22, 21, 23, 20, 22],
    "maths":   [85, 90, 78, 92, 66, 74],
    "science": [78, 88, 70, 95, 70, 81],
})
print(df)`,
          },
          {
            type: 'table',
            head: ['Goal', 'Tool'],
            rows: [
              ['some **columns**', '`df["col"]`, `df[["a", "b"]]`'],
              ['rows and columns by **label**', '`df.loc[...]`'],
              ['rows and columns by **position**', '`df.iloc[...]`'],
              ['rows that match a **rule**', '`df[condition]`'],
              ['new or changed **columns**', '`df["new"] = ...`'],
            ],
          },
        ],
      },
      {
        id: 's20-columns',
        title: 'Selecting columns',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha"],
    "city":    ["Delhi", "Mumbai", "Delhi"],
    "maths":   [85, 90, 78],
})

print(df["name"])
print(type(df["name"]).__name__)
print()
print(df[["name", "maths"]])
print(type(df[["name", "maths"]]).__name__)
print()
print(df.maths)`,
          },
          {
            type: 'table',
            head: ['Code', 'Gives'],
            rows: [
              ['`df["name"]`', 'one column, as a **Series**'],
              ['`df[["name", "maths"]]`', 'several columns, as a **DataFrame** (two brackets!)'],
              ['`df.maths`', 'the same as `df["maths"]`, but only works for simple names'],
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Prefer df["maths"]',
            text: '`df.maths` fails when the name has a space (`"first name"`) or clashes with a pandas method (like `count`). `df["maths"]` always works.',
          },
        ],
      },
      {
        id: 's20-loc',
        title: 'loc: select by label',
        blocks: [
          {
            type: 'p',
            text: '`df.loc[rows, columns]` picks by **label**: row labels first, then column names. By default the row labels are 0, 1, 2 ...',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "maths":   [85, 90, 78, 92, 66, 74],
    "science": [78, 88, 70, 95, 70, 81],
})

print(df.loc[2])
print()
print(df.loc[2, "name"])
print()
print(df.loc[1:3])
print()
print(df.loc[1:3, ["name", "maths"]])
print()
print(df.loc[:, "name":"city"])`,
          },
          {
            type: 'table',
            head: ['Code', 'Meaning'],
            rows: [
              ['`df.loc[2]`', 'the whole row labelled 2 (a Series)'],
              ['`df.loc[2, "name"]`', 'one cell: row 2, column name'],
              ['`df.loc[1:3]`', 'rows 1, 2 **and 3** (label slices include the end)'],
              ['`df.loc[1:3, ["name", "maths"]]`', 'those rows, only these columns'],
              ['`df.loc[:, "name":"city"]`', 'all rows, columns from name **to** city'],
            ],
          },
          { type: 'h3', text: 'Names as row labels' },
          {
            type: 'p',
            text: 'It is more natural when the rows have meaningful labels. `set_index` turns a column into the labels.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha"],
    "maths": [85, 90, 78],
    "science": [78, 88, 70],
}).set_index("name")

print(df)
print()
print(df.loc["Ankit"])
print(df.loc["Ankit", "maths"])
print(df.loc[["Aman", "Neha"], "science"])`,
          },
        ],
      },
      {
        id: 's20-iloc',
        title: 'iloc: select by position',
        blocks: [
          {
            type: 'p',
            text: '`df.iloc[rows, columns]` picks by **position**: 0 is the first row, 0 is the first column. It works the same way as list slicing: the end is **not** included.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "maths":   [85, 90, 78, 92, 66, 74],
    "science": [78, 88, 70, 95, 70, 81],
})

print(df.iloc[0])
print()
print(df.iloc[0, 2])
print()
print(df.iloc[1:3])
print()
print(df.iloc[:, [0, 2]])
print()
print(df.iloc[-1])
print()
print(df.iloc[0:2, 0:2])`,
          },
          {
            type: 'table',
            head: ['Code', 'Meaning'],
            rows: [
              ['`df.iloc[0]`', 'the first row'],
              ['`df.iloc[0, 2]`', 'row 0, column 2 (maths)'],
              ['`df.iloc[1:3]`', 'rows 1 and 2 (**not** 3)'],
              ['`df.iloc[:, [0, 2]]`', 'all rows, columns 0 and 2'],
              ['`df.iloc[-1]`', 'the **last** row'],
              ['`df.iloc[0:2, 0:2]`', 'the top-left 2 by 2 block'],
            ],
          },
          { type: 'h3', text: 'loc versus iloc' },
          {
            type: 'table',
            head: ['', 'loc', 'iloc'],
            rows: [
              ['Picks by', '**labels** (names)', '**positions** (numbers)'],
              ['`1:3` gives', 'rows 1, 2, 3 (end included)', 'rows 1, 2 (end excluded)'],
              ['Remember', '**l** for label', '**i** for integer position'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"x": [10, 20, 30, 40]}, index=[3, 2, 1, 0])
print(df)
print()
print(df.loc[1])      # the row LABELLED 1
print()
print(df.iloc[1])     # the SECOND row`,
          },
          {
            type: 'p',
            text: 'Here the labels are shuffled, so `loc[1]` and `iloc[1]` give different rows. After sorting or filtering, labels and positions often differ, so know which one you want.',
          },
        ],
      },
      {
        id: 's20-conditions',
        title: 'Filtering with conditions',
        blocks: [
          {
            type: 'p',
            text: 'The most useful trick in pandas: put a **condition** inside the brackets and get only the rows where it is `True`.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "maths":   [85, 90, 78, 92, 66, 74],
})

mask = df["maths"] > 80
print(mask)
print()
print(df[mask])
print()
print(df[df["city"] == "Delhi"])`,
          },
          {
            type: 'ul',
            items: [
              '`df["maths"] > 80` makes a column of `True` / `False`, one per row. It is called a **mask**.',
              '`df[mask]` keeps only the rows where the mask is `True`.',
              'Usually we write it in one line: `df[df["maths"] > 80]`. Read it as "df, where maths is above 80".',
              'The comparison operators are the ones you know: `==`, `!=`, `>`, `<`, `>=`, `<=`.',
            ],
          },
          { type: 'h3', text: 'Rows and columns together' },
          {
            type: 'p',
            text: '`loc` accepts a condition for the rows and column names for the columns.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "maths":   [85, 90, 78, 92, 66, 74],
})

print(df.loc[df["maths"] > 80, ["name", "maths"]])
print()
print(df.loc[df["city"] == "Pune", "name"])`,
          },
          { type: 'h3', text: 'and, or, not: use & | ~' },
          {
            type: 'p',
            text: 'To combine conditions you cannot use `and`, `or`, `not`. Use the symbols below, and put **every condition in brackets**.',
          },
          {
            type: 'table',
            head: ['Want', 'Write', 'Meaning'],
            rows: [
              ['both', '`(a) & (b)`', 'AND'],
              ['either', '`(a) | (b)`', 'OR'],
              ['opposite', '`~(a)`', 'NOT'],
            ],
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "maths":   [85, 90, 78, 92, 66, 74],
    "science": [78, 88, 70, 95, 70, 81],
})

print(df[(df["maths"] > 80) & (df["science"] > 80)])
print()
print(df[(df["city"] == "Delhi") | (df["city"] == "Pune")])
print()
print(df[~(df["city"] == "Delhi")])`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Brackets are required',
            text: 'Write `(df["a"] > 1) & (df["b"] < 5)`. Without the brackets, `&` is done first and you get an error. And `and` / `or` fail with `ValueError: The truth value of a Series is ambiguous`.',
          },
        ],
      },
      {
        id: 's20-handy',
        title: 'isin, between and text filters',
        blocks: [
          { type: 'h3', text: 'isin: one of several' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name": ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "city": ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
})

print(df[df["city"].isin(["Delhi", "Pune"])])
print()
print(df[~df["city"].isin(["Delhi", "Pune"])])`,
          },
          {
            type: 'p',
            text: '`isin([...])` is the short way to write many `==` joined by `|`. Put `~` in front for "not one of these".',
          },
          { type: 'h3', text: 'between: a range' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "maths": [85, 90, 78, 92, 66, 74],
})

print(df[df["maths"].between(75, 90)])`,
          },
          {
            type: 'p',
            text: '`between(75, 90)` is the same as `(maths >= 75) & (maths <= 90)`. Both ends are **included**.',
          },
          { type: 'h3', text: 'Text columns: str methods' },
          {
            type: 'p',
            text: 'Text columns have a `.str` helper with the string methods you learned in lesson 3, working on the whole column at once.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name": ["Aman", "ankit", "Neha", "ROHIT", "Priya", "Sana"],
})

print(df["name"].str.upper())
print()
print(df["name"].str.title())
print()
print(df["name"].str.len())
print()
print(df[df["name"].str.startswith("A")])
print()
print(df[df["name"].str.lower().str.contains("an")])`,
          },
          {
            type: 'ul',
            items: [
              '`.str.upper()`, `.str.lower()`, `.str.title()`, `.str.strip()`, `.str.replace(a, b)`, `.str.len()` work like the normal string methods.',
              '`.str.startswith("A")`, `.str.endswith(...)` and `.str.contains("an")` give `True` / `False` per row, so they are filters.',
              'Capital letters count: `"ankit"` does not start with `"A"`. Lower-case the column first when you do not care.',
            ],
          },
          { type: 'h3', text: 'query: a readable shortcut' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit"],
    "city":    ["Delhi", "Mumbai", "Delhi", "Pune"],
    "maths":   [85, 90, 78, 92],
})

print(df.query("maths > 80"))
print()
print(df.query("maths > 80 and city == 'Delhi'"))

limit = 85
print()
print(df.query("maths > @limit"))`,
          },
          {
            type: 'p',
            text: '`query` takes the condition as **text**, and there you *can* write `and` / `or`. Use `@name` to bring in a normal variable. It is neat for simple filters; the bracket style works everywhere.',
          },
        ],
      },
      {
        id: 's20-count',
        title: 'Counting and sorting the result',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha", "Rohit", "Priya", "Sana"],
    "maths":   [85, 90, 78, 92, 66, 74],
})

top = df[df["maths"] > 80]
print(len(top))
print((df["maths"] > 80).sum())
print((df["maths"] > 80).mean())
print()
print(top.sort_values("maths", ascending=False))
print()
print(df.nlargest(2, "maths"))`,
          },
          {
            type: 'ul',
            items: [
              '`len(top)` counts the matching rows.',
              '`(condition).sum()` also counts them: each `True` is 1.',
              '`(condition).mean()` is the **fraction** that match (0.5 means half).',
              '`nlargest(2, "maths")` gives the top 2 rows (`nsmallest` the bottom).',
              'Row labels keep their old numbers after filtering. Add `.reset_index(drop=True)` for a fresh 0, 1, 2 ...',
            ],
          },
        ],
      },
      {
        id: 's20-new-columns',
        title: 'Column operations: new columns',
        blocks: [
          {
            type: 'p',
            text: 'Assign to a column name that does not exist yet and pandas **creates** it. Maths is done on the whole column at once, no loop needed.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha"],
    "maths":   [85, 90, 78],
    "science": [78, 88, 70],
})

df["total"] = df["maths"] + df["science"]
df["average"] = df["total"] / 2
df["bonus"] = df["maths"] + 5
df["grace"] = 2
print(df)`,
          },
          {
            type: 'ul',
            items: [
              '`df["total"] = ...` adds a new column on the right.',
              'Assigning to an **existing** name replaces that column.',
              'One value (`2`) is copied into every row.',
              'Columns of different tables line up by **row label**, not by position.',
            ],
          },
          { type: 'h3', text: 'np.where: a column from a rule' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Priya"],
    "maths": [85, 90, 78, 40],
})

df["result"] = np.where(df["maths"] >= 50, "Pass", "Fail")
print(df)
print()
print(df["result"].value_counts())`,
          },
          { type: 'h3', text: 'Many bands: np.select' },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

df = pd.DataFrame({"name": ["Aman", "Ankit", "Neha", "Priya"], "maths": [85, 92, 70, 40]})

conditions = [df["maths"] >= 90, df["maths"] >= 75, df["maths"] >= 50]
grades     = ["A", "B", "C"]
df["grade"] = np.select(conditions, grades, default="F")
print(df)`,
          },
          {
            type: 'p',
            text: '`np.select` checks the conditions **in order** and takes the first one that is true. If none is true, it uses `default`.',
          },
        ],
      },
      {
        id: 's20-change',
        title: 'Changing columns: map, apply, astype',
        blocks: [
          { type: 'h3', text: 'map: swap values using a dictionary' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"city": ["Delhi", "Mumbai", "Pune", "Delhi"]})

short = {"Delhi": "DEL", "Mumbai": "BOM", "Pune": "PNQ"}
df["code"] = df["city"].map(short)
print(df)`,
          },
          { type: 'h3', text: 'apply: run your own function on each value' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"name": ["Aman", "Ankit", "Neha"], "maths": [85, 90, 78]})

def grade(m):
    if m >= 90:
        return "A"
    if m >= 80:
        return "B"
    return "C"

df["grade"] = df["maths"].apply(grade)
df["name_len"] = df["name"].apply(len)
df["double"] = df["maths"].apply(lambda m: m * 2)
print(df)`,
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Vectorised first',
            text: 'Whole-column maths (`df["maths"] * 2`) and `np.where` are **much faster** than `apply`. Use `apply` only when the rule is too complicated for those.',
          },
          { type: 'h3', text: 'astype: change the type' },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"age": ["20", "22", "21"], "fee": [1000, 1500, 1200]})
print(df.dtypes)
print()

df["age"] = df["age"].astype(int)
df["fee"] = df["fee"].astype(float)
print(df.dtypes)
print(df["age"].sum())`,
          },
          {
            type: 'p',
            text: 'Numbers stored as text (`"20"`) cannot be added. `astype(int)` converts them. If a value cannot be converted, `pd.to_numeric(col, errors="coerce")` turns the bad ones into `NaN` instead of failing.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

s = pd.Series(["10", "20", "abc", "40"])
print(pd.to_numeric(s, errors="coerce"))`,
          },
        ],
      },
      {
        id: 's20-edit',
        title: 'Renaming, dropping and updating',
        blocks: [
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha"],
    "maths":   [85, 90, 78],
    "science": [78, 88, 70],
})

df = df.rename(columns={"maths": "math_marks"})
print(df)
print()
df = df.drop(columns=["science"])
print(df)
print()
df = df.drop(index=[1])
print(df)
print()
df.columns = ["student", "marks"]
print(df)`,
          },
          {
            type: 'table',
            head: ['Call', 'Does'],
            rows: [
              ['`rename(columns={"old": "new"})`', 'renames some columns'],
              ['`drop(columns=["a"])`', 'removes columns'],
              ['`drop(index=[1])`', 'removes rows by label'],
              ['`df.columns = [...]`', 'replaces all the names at once'],
            ],
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Save the result',
            text: '`rename` and `drop` give back a **new** table and leave the old one alone. Write `df = df.drop(...)`, or nothing changes.',
          },
          { type: 'h3', text: 'Updating selected rows' },
          {
            type: 'p',
            text: 'Put a condition and a column in `loc` on the left of `=` to change only some cells.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Priya"],
    "maths": [85, 90, 78, 40],
})

df.loc[df["maths"] < 50, "maths"] = 50          # raise failures to 50
df.loc[df["name"] == "Neha", "maths"] += 5      # add 5 to one student
print(df)`,
          },
          {
            type: 'note',
            tone: 'warn',
            title: 'Use loc to change, not chained brackets',
            text: '`df[df["maths"] < 50]["maths"] = 50` looks right but changes a **copy**, so the table stays the same (and pandas warns). Always write `df.loc[condition, "column"] = value`.',
          },
        ],
      },
      {
        id: 's20-example',
        title: 'Example: a sales report',
        blocks: [
          {
            type: 'p',
            text: 'We combine everything: new columns, a filter, a sort.',
          },
          {
            type: 'code',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

df = pd.DataFrame({
    "order": [101, 102, 103, 104, 105, 106],
    "item":  ["pen", "book", "bag", "pen", "book", "bag"],
    "qty":   [10, 2, 1, 5, 3, 2],
    "price": [5, 350, 800, 5, 350, 800],
    "city":  ["Delhi", "Mumbai", "Delhi", "Pune", "Pune", "Mumbai"],
})

df["amount"] = df["qty"] * df["price"]
df["size"] = np.where(df["amount"] >= 1000, "big", "small")

print(df)
print()
print("Big orders in Delhi or Mumbai:")
big = df[(df["size"] == "big") & (df["city"].isin(["Delhi", "Mumbai"]))]
print(big[["order", "item", "amount"]])
print()
print("Total sales:", df["amount"].sum())
print("Biggest order:", df.loc[df["amount"].idxmax(), "item"])
print()
print(df.sort_values("amount", ascending=False).head(3)[["order", "amount"]])`,
          },
          {
            type: 'ul',
            items: [
              '`qty * price` made the `amount` column with no loop.',
              '`np.where` made a `size` label from a rule.',
              'The filter used `&` with brackets, and `isin` for two cities.',
              '`idxmax()` gave the row **label** of the biggest amount, and `loc` used it to get that item.',
            ],
          },
        ],
      },
      {
        id: 's20-mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              '**`and` / `or` instead of `&` / `|`.** Gives "truth value of a Series is ambiguous".',
              '**No brackets around each condition** when combining with `&` or `|`.',
              '**One bracket for several columns.** `df["a", "b"]` fails; use `df[["a", "b"]]`.',
              '**`loc` versus `iloc` mix-up.** `loc[1:3]` has 3 rows, `iloc[1:3]` has 2.',
              '**Chained assignment.** `df[cond]["col"] = x` changes a copy; use `df.loc[cond, "col"] = x`.',
              '**Forgetting to save** `rename`, `drop`, `sort_values`: write `df = df.drop(...)`.',
              '**Comparing text with the wrong case.** `"delhi" == "Delhi"` is `False`.',
              '**Numbers stored as text.** `"20" + "5"` is `"205"`; convert with `astype(int)` first.',
            ],
          },
          {
            type: 'code',
            label: 'Try it: this fails on purpose (and instead of &)',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"maths": [85, 90, 40], "science": [70, 88, 30]})
print(df[(df["maths"] > 50) and (df["science"] > 50)])`,
          },
          {
            type: 'code',
            label: 'Try it: this also fails on purpose (wrong column name)',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({"maths": [85, 90, 40]})
print(df["Maths"])`,
          },
        ],
      },
      {
        id: 's20-practice',
        title: 'Practice',
        blocks: [
          {
            type: 'code',
            label: 'Your turn: print only the name and city of students older than 21',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name": ["Aman", "Ankit", "Neha", "Rohit"],
    "city": ["Delhi", "Mumbai", "Delhi", "Pune"],
    "age":  [20, 22, 21, 23],
})
`,
          },
          {
            type: 'code',
            label: 'Your turn: print the students from Delhi whose maths is above 80',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Rohit"],
    "city":  ["Delhi", "Mumbai", "Delhi", "Pune"],
    "maths": [85, 90, 78, 92],
})
`,
          },
          {
            type: 'code',
            label: 'Your turn: add a column "total" (maths + science) and a column "result" ("Pass" if total is at least 150, else "Fail")',
            runnable: true,
            code: raw`import numpy as np
import pandas as pd

df = pd.DataFrame({
    "name":    ["Aman", "Ankit", "Neha"],
    "maths":   [85, 90, 60],
    "science": [78, 88, 55],
})
`,
          },
          {
            type: 'code',
            label: 'Your turn: using iloc, print the last 2 rows and only the first 2 columns',
            runnable: true,
            code: raw`import pandas as pd

df = pd.DataFrame({
    "name":  ["Aman", "Ankit", "Neha", "Rohit"],
    "city":  ["Delhi", "Mumbai", "Delhi", "Pune"],
    "maths": [85, 90, 78, 92],
})
`,
          },
        ],
      },
      {
        id: 's20-homework',
        title: 'Homework and wrap-up',
        blocks: [
          {
            type: 'ul',
            items: [
              'Make a DataFrame of **8 students** with name, city, age, maths and science.',
              'Print: the `name` column; the `name` and `city` columns; row 3 with `loc`; rows 2 to 4 with `iloc`.',
              'Filter: students with maths above the class average; students from two chosen cities (use `isin`); students older than 20 **and** with science above 75.',
              'Add columns `total`, `percentage` and `grade` (use `np.select` with A, B, C, F).',
              'Use `loc` to give every student below 40 in maths a grace of 5 marks.',
              'Sort by `total` (biggest first) and print the top 3 names.',
              'Rename a column and drop another, saving the result.',
              'Revise: `loc`, `iloc`, mask, `&` `|` `~`, `isin`, `between`, `.str`, `query`, `np.where`, `np.select`, `map`, `apply`, `astype`, `rename`, `drop`.',
            ],
          },
          {
            type: 'note',
            tone: 'tip',
            title: 'Next class',
            text: 'Grouping and summaries: `groupby`, `agg` and `pivot_table`.',
          },
        ],
      },
    ],
  },
]
