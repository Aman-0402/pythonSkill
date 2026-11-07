# Builds the practice files students download: public/practice-files/ and one zip of everything.
#
# usage (from the project root):   python scripts/practice-files.py
# needs:                           pandas, numpy, openpyxl (and node, to read the programs out of src/content.ts)
#
# The data here is the same data the lessons type into their code boxes, so a student's own computer gives the same
# answers as the website. The programs are copied from the lessons, never rewritten, so they cannot drift apart.
# It also writes src/practice-list.json, the list shown on the website's Practice files page.
import json
import shutil
import subprocess
import zipfile
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'practice-files'
ZIP_NAME = 'python-practice-files.zip'
ZIP_DATE = (2026, 1, 1, 0, 0, 0)  # a fixed date, so rebuilding gives the same zip

files = []  # (group, path, sessions, what it is)


def add(group, path, sessions, what):
    files.append({'group': group, 'path': path, 'sessions': sessions, 'what': what})


def write(path, text):
    full = OUT / path
    full.parent.mkdir(parents=True, exist_ok=True)
    full.write_text(text, encoding='utf-8', newline='\n')


def csv(df, path):
    full = OUT / path
    full.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(full, index=False, lineterminator='\n')


# ---------- the online shop data from lessons 26 to 29, read from the lesson itself so it can never differ ----------
lessons = json.loads(subprocess.run(
    ['node', '--no-warnings', '--experimental-strip-types', '-e',
     "import('./src/content.ts').then((m) => process.stdout.write(JSON.stringify(m.lessons)))"],
    cwd=ROOT, capture_output=True, encoding='utf-8', check=True).stdout)


def blocks(session):
    return [b for s in lessons[session - 1]['sections'] for b in s['blocks'] if b['type'] == 'code']


def program(session, label):
    return next(b['code'] for b in blocks(session) if b.get('label', '').startswith(label)).rstrip() + '\n'


shop = next(b['code'] for b in blocks(26) if 'def make_orders' in b['code']).split('orders = make_orders()')[0]
clean = next(b['code'] for b in blocks(27) if 'def clean_orders' in b['code'])
clean = clean[clean.index('def clean_orders'):clean.index('raw_orders = make_orders()')]
space = {}
exec(shop + '\n' + clean, space)
orders_raw = space['make_orders']()
orders_clean = space['clean_orders'](orders_raw)

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

# ---------- pandas ----------
csv(pd.DataFrame({
    'name': ['Aman', 'Ankit', 'Neha', 'Rohit', 'Priya', 'Sana'],
    'city': ['Delhi', 'Mumbai', 'Delhi', 'Pune', 'Mumbai', 'Pune'],
    'age': [20, 22, 21, 23, 20, 22],
    'maths': [85, 90, 78, 92, 66, np.nan],
    'science': [78, 88, np.nan, 95, 70, 81],
}).astype({'maths': 'Int64', 'science': 'Int64'}), 'pandas/students.csv')
add('Pandas', 'pandas/students.csv', '18 to 20', '6 students with two blank marks: read_csv, head, info, describe, filters')

write('pandas/marks_semicolon.csv', 'name;maths\nAman;85\nAnkit;90\nNeha;78\n')
add('Pandas', 'pandas/marks_semicolon.csv', '19', 'values split by semicolons: use sep=";"')
write('pandas/marks_no_header.csv', 'Aman,85\nAnkit,90\nNeha,78\n')
add('Pandas', 'pandas/marks_no_header.csv', '19', 'no title line: use header=None and names=[...]')
write('pandas/marks_tab.tsv', 'name\tmaths\nAman\t85\nAnkit\t90\nNeha\t78\n')
add('Pandas', 'pandas/marks_tab.tsv', '19', 'values split by tabs: use sep="\\t"')
write('pandas/marks_with_dash.csv', 'name,maths\nAman,85\nAnkit,-\nNeha,NA\n')
add('Pandas', 'pandas/marks_with_dash.csv', '19', 'a dash for a missing value: use na_values=["-"]')
write('pandas/joined_dates.csv', 'name,joined\nAman,2024-01-15\nAnkit,2023-11-30\nNeha,2024-03-02\n')
add('Pandas', 'pandas/joined_dates.csv', '19, 21', 'a date column: use parse_dates=["joined"]')

with pd.ExcelWriter(OUT / 'pandas/marks.xlsx') as writer:
    pd.DataFrame({'name': ['Aman', 'Ankit', 'Neha', 'Rohit'], 'maths': [85, 90, 78, 92], 'science': [78, 88, 70, 95]}).to_excel(writer, sheet_name='Term 1', index=False)
    pd.DataFrame({'name': ['Aman', 'Ankit', 'Neha', 'Rohit'], 'maths': [90, 95, 82, 89], 'science': [80, 91, 74, 97]}).to_excel(writer, sheet_name='Term 2', index=False)
add('Pandas', 'pandas/marks.xlsx', '19', 'an Excel file with two sheets, Term 1 and Term 2')

csv(pd.DataFrame({
    'Student Name': ['Aman', 'ankit ', 'Neha', 'Aman', 'ROHIT', 'Priya', 'Sana', 'Neha'],
    'City': [' delhi', 'Mumbai', 'DELHI', ' delhi', 'pune', 'Mumbai', None, 'DELHI'],
    'Age': ['20', '22', '21', '20', '23', '20', '22', '21'],
    'Maths': [85, 90, np.nan, 85, 92, 66, np.nan, np.nan],
    'Science': [78, 88, 70, 78, 95, 70, 81, 70],
}), 'pandas/students_messy.csv')
add('Pandas', 'pandas/students_messy.csv', '21', 'the messy table to clean: blanks, repeats, spaces, mixed capitals')

csv(pd.DataFrame({
    'name': ['Aman', 'Ankit', 'Neha', 'Rohit', 'Priya', 'Sana', 'Kabir', 'Isha'],
    'city': ['Delhi', 'Mumbai', 'Delhi', 'Pune', 'Mumbai', 'Pune', 'Delhi', 'Mumbai'],
    'gender': ['M', 'M', 'F', 'M', 'F', 'F', 'M', 'F'],
    'maths': [85, 90, 78, 92, 66, 74, 81, 95],
    'science': [78, 88, 70, 95, 70, 81, 79, 91],
}), 'pandas/class_students.csv')
add('Pandas', 'pandas/class_students.csv', '20, 22', '8 clean students: groupby, agg, pivot_table')

sales = pd.DataFrame({
    'month': ['Jan', 'Jan', 'Jan', 'Feb', 'Feb', 'Feb', 'Mar', 'Mar', 'Mar'],
    'item': ['pen', 'book', 'bag'] * 3,
    'qty': [10, 2, 1, 15, 3, 2, 12, 4, 1],
    'price': [5, 350, 800] * 3,
})
csv(sales, 'pandas/sales.csv')
add('Pandas', 'pandas/sales.csv', '22', 'three months of sales for the sales summary')

csv(pd.DataFrame({'id': [1, 2, 3, 4], 'name': ['Aman', 'Ankit', 'Neha', 'Rohit'], 'city': ['Delhi', 'Mumbai', 'Delhi', 'Pune']}), 'pandas/merge_students.csv')
add('Pandas', 'pandas/merge_students.csv', '23', 'the left table for merge')
csv(pd.DataFrame({'id': [1, 2, 3, 5], 'maths': [85, 90, 78, 60]}), 'pandas/merge_marks.csv')
add('Pandas', 'pandas/merge_marks.csv', '23', 'the right table for merge; ids 4 and 5 do not match')
csv(pd.DataFrame({'id': [1, 1, 2, 2, 2], 'test': ['T1', 'T2', 'T1', 'T2', 'T3'], 'score': [80, 90, 70, 75, 95]}), 'pandas/merge_tests.csv')
add('Pandas', 'pandas/merge_tests.csv', '23', 'one student, many tests: a one-to-many merge')
csv(pd.DataFrame({'item': ['pen', 'book'], 'qty': [10, 2]}), 'pandas/sales_jan.csv')
add('Pandas', 'pandas/sales_jan.csv', '23', 'stack this with sales_feb.csv using concat')
csv(pd.DataFrame({'item': ['pen', 'bag'], 'qty': [15, 1]}), 'pandas/sales_feb.csv')
add('Pandas', 'pandas/sales_feb.csv', '23', 'stack this with sales_jan.csv using concat')

# ---------- charts ----------
csv(pd.DataFrame({
    'month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    'pens': [40, 45, 38, 50, 55, 60],
    'books': [20, 25, 30, 28, 35, 40],
    'bags': [10, 8, 12, 15, 11, 18],
}), 'charts/monthly_sales.csv')
add('Charts', 'charts/monthly_sales.csv', '24', 'six months of sales: line, bar and pie charts')

rng = np.random.default_rng(7)
n = 60
hours = rng.uniform(1, 8, n).round(1)
study = pd.DataFrame({'city': rng.choice(['Delhi', 'Mumbai', 'Pune'], n), 'gender': rng.choice(['F', 'M'], n), 'hours': hours, 'absent': rng.integers(0, 10, n)})
study['marks'] = (35 + hours * 6 - study['absent'] * 1.5 + rng.normal(0, 6, n)).clip(0, 100).round(0).astype(int)
csv(study, 'charts/study_hours.csv')
add('Charts', 'charts/study_hours.csv', '24, 25', '60 students from the Seaborn lesson: box plot, scatter plot, heatmap, correlation')

# ---------- file handling (session 14 and 15) ----------
write('file-handling/marks.csv', 'name,maths,science\nAman,85,78\nAnkit,90,88\nNeha,78,70\n')
add('File handling', 'file-handling/marks.csv', '14, 18', 'read it with the csv module, then with pandas')
write('file-handling/people.csv', 'name,age,city\nAman,20,Delhi\nNeha,21,Pune\n')
add('File handling', 'file-handling/people.csv', '14', 'a CSV to read with csv.DictReader')
write('file-handling/marks.txt', 'Aman 85\nAnkit 90\nNeha 78\nRohit 92\n')
add('File handling', 'file-handling/marks.txt', '14', 'one student per line: split each line')
write('file-handling/poem.txt', 'Twinkle twinkle little star\nHow I wonder what you are\nUp above the world so high\nLike a diamond in the sky\n')
add('File handling', 'file-handling/poem.txt', '14', 'count the lines and the words')
write('file-handling/todo.txt', 'buy milk\nfinish homework\ncall a friend\n')
add('File handling', 'file-handling/todo.txt', '14', 'the list used by todo.py')
write('file-handling/scores.txt', '85\n90\nabsent\n78\n')
add('File handling', 'file-handling/scores.txt', '15', 'one bad line on purpose: catch the ValueError')

# ---------- programs that need your own computer ----------
programs = [
    ('session-02/ask_name.py', 2, 'Run this one in VS Code or a terminal', 0, 'uses input()'),
    ('session-02/add_numbers.py', 2, 'Run this one in VS Code or a terminal', 1, 'uses input() and int()'),
    ('session-02/age_next_year.py', 2, 'Run this one in VS Code or a terminal', 2, 'uses input() and int()'),
    ('session-04/check_age.py', 4, 'Run this one in VS Code or a terminal', 0, 'uses input() with if'),
    ('session-05/password.py', 5, 'Run this one in VS Code or a terminal', 0, 'a while loop with input()'),
]
for path, session, label, nth, what in programs:
    code = [b['code'] for b in blocks(session) if b.get('label', '').startswith(label)][nth].rstrip() + '\n'
    write(f'programs/{path}', code)
    add('Programs', f'programs/{path}', str(session), what)
for path, session, label, what in [
    ('session-10/marks_manager.py', 10, 'marks_manager.py', 'the marks manager project'),
    ('session-10/contact_book.py', 10, 'contact_book.py', 'the contact book project'),
    ('session-11/read_number.py', 11, 'read_number.py', 'a function that keeps asking until the input is valid'),
    ('session-13/shapes.py', 13, 'File 1: shapes.py', 'your own module'),
    ('session-13/main.py', 13, 'File 2: main.py', 'imports shapes.py from the same folder'),
    ('session-13/my_project/main.py', 13, 'main.py', 'imports from the tools package'),
    ('session-14/todo.py', 14, 'todo.py', 'a to-do list saved in todo.txt'),
    ('session-15/safe_input.py', 15, 'safe_input.py', 'input() made safe with try and except'),
]:
    write(f'programs/{path}', program(session, label))
    add('Programs', f'programs/{path}', str(session), what)
write('programs/session-13/my_project/tools/__init__.py', '')
write('programs/session-13/my_project/tools/maths.py', 'def double(x):\n    return x * 2\n')
add('Programs', 'programs/session-13/my_project/tools/maths.py', '13', 'a module inside the tools package')
write('programs/session-13/my_project/tools/text.py', 'def shout(text):\n    return text.upper() + "!"\n')
add('Programs', 'programs/session-13/my_project/tools/text.py', '13', 'a module inside the tools package')

# ---------- capstone ----------
csv(orders_raw, 'capstone/data/raw/orders.csv')
add('Capstone', 'capstone/data/raw/orders.csv', '26 to 29', 'the messy online shop orders, 308 rows. Never edit this one by hand')
csv(orders_clean, 'capstone/data/clean/orders_clean.csv')
add('Capstone', 'capstone/data/clean/orders_clean.csv', '27 to 29', 'the same orders after clean_orders, 298 rows, to check your own result')
write('capstone/requirements.txt', 'pandas\nnumpy\nmatplotlib\nseaborn\nopenpyxl\nnotebook\n')
add('Capstone', 'capstone/requirements.txt', '29', 'install everything with: pip install -r requirements.txt')
write('capstone/README.md', next(b['code'] for b in blocks(29) if b.get('label', '').startswith('README.md')).rstrip() + '\n')
add('Capstone', 'capstone/README.md', '29', 'a README template to fill in')


def md(*lines):
    return {'cell_type': 'markdown', 'metadata': {}, 'source': [l + '\n' for l in lines[:-1]] + [lines[-1]]}


def code(text):
    lines = text.strip('\n').split('\n')
    return {'cell_type': 'code', 'execution_count': None, 'metadata': {}, 'outputs': [], 'source': [l + '\n' for l in lines[:-1]] + [lines[-1]]}


notebook = {
    'nbformat': 4, 'nbformat_minor': 5,
    'metadata': {'kernelspec': {'display_name': 'Python 3', 'language': 'python', 'name': 'python3'}, 'language_info': {'name': 'python'}},
    'cells': [
        md('# Project title', '', 'Your name, the date.', '', '**Summary:** write your three main findings here last of all.'),
        md('## Questions', '', '1. Which category earns the most money, and is it also the most ordered?', '2. Which city brings the most revenue?', '3. How does revenue change month by month?', '4. Do discounts change how much people buy, or how happy they are?', '5. How do customers pay?'),
        md('## Data', '', 'Source, licence, and what each column means (the data dictionary).'),
        md('## Imports and settings'),
        code('import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nsns.set_theme()'),
        md('## Load and first look', '', 'Write down every problem you find.'),
        code('raw_orders = pd.read_csv("data/raw/orders.csv", parse_dates=["date"])\nprint(raw_orders.shape)\nraw_orders.info()\nraw_orders.head()'),
        code('print(raw_orders.isna().sum())\nprint("duplicate rows:", raw_orders.duplicated().sum())\nprint(raw_orders["city"].value_counts())\nraw_orders.describe().round(1)'),
        md('## Cleaning', '', '| Problem | Decision | Why |', '|---------|----------|-----|', '| 8 repeated rows | drop them | the same order counted twice |', '| write the rest | | |'),
        code(clean.strip() + '\n\norders = clean_orders(raw_orders)\nprint("rows before:", len(raw_orders), "after:", len(orders))'),
        code('def check(df):\n    assert df["order_id"].is_unique, "repeated order ids"\n    assert df["qty"].between(1, 20).all(), "qty out of range"\n    assert df["payment"].notna().all(), "blank payment"\n    print("all checks passed")\n\ncheck(orders)'),
        md('## Analysis', '', '### Question 1: which category earns the most?'),
        code('cat = orders.groupby("category").agg(orders=("order_id", "count"), revenue=("amount", "sum")).sort_values("revenue", ascending=False)\ncat["revenue"].plot(kind="bar", title="Revenue by category")\nplt.ylabel("Rupees")\nplt.show()\ncat'),
        md('Write one sentence with a number. Then add a section for each of your other questions.'),
        md('## Conclusions', '', '**Key insights:** what you found, why it matters, what to do.', '', '**Limits:** what this analysis cannot tell you.', '', '**Next steps:** what you would do next.'),
    ],
}
write('capstone/notebook.ipynb', json.dumps(notebook, indent=1) + '\n')
add('Capstone', 'capstone/notebook.ipynb', '27 to 29', 'a starter notebook in the layout from session 29')

# ---------- the guide, the website's list, and the zip ----------
lines = ['PYTHON PRACTICE FILES', '=====================', '',
         'Keep each folder together. A script finds a file only when both are in the same folder,',
         'or when you give the full path. Install what you need once:',
         '    pip install pandas numpy matplotlib seaborn openpyxl notebook', '']
for group in dict.fromkeys(f['group'] for f in files):
    lines += [group.upper(), '-' * len(group)]
    lines += [f"{f['path']}  (session {f['sessions']}): {f['what']}" for f in files if f['group'] == group]
    lines.append('')
write('README.txt', '\n'.join(lines))

zip_path = OUT / ZIP_NAME
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(OUT.rglob('*')):
        if p.is_file() and p != zip_path:
            info = zipfile.ZipInfo(str(Path('python-practice-files') / p.relative_to(OUT)).replace('\\', '/'), ZIP_DATE)
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, p.read_bytes())

for f in files:
    f['bytes'] = (OUT / f['path']).stat().st_size
    if f['path'].endswith('.xlsx'):  # a browser cannot read Excel by itself, so the website's viewer gets the cells here
        sheets = pd.read_excel(OUT / f['path'], sheet_name=None)
        f['sheets'] = {name: [list(df.columns)] + df.astype(object).where(df.notna(), None).values.tolist() for name, df in sheets.items()}
(ROOT / 'src' / 'practice-list.json').write_text(json.dumps({'zip': ZIP_NAME, 'zipBytes': zip_path.stat().st_size, 'files': files}, indent=1) + '\n', encoding='utf-8', newline='\n')
print(f'{len(files)} files listed, zip {zip_path.stat().st_size / 1024:.0f} KB')
