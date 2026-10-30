export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; code: string; output?: string; label?: string; runnable?: boolean }
  | { type: 'note'; tone: 'tip' | 'warn'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }

export type Section = { id: string; title: string; blocks: Block[] }

export type Lesson = {
  slug: string
  title: string
  summary: string
  sections: Section[]
}

const raw = String.raw

export const lessons: Lesson[] = [
  {
    slug: 'introduction-to-python-and-setup',
    title: 'Introduction to Python and Setup',
    summary: 'Install Python, set up your editor, and run your first program.',
    sections: [
      {
        id: 'what-is-python',
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
          { type: 'h3', text: 'What Python is used for' },
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
]
