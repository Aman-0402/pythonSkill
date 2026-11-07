PYTHON PRACTICE FILES
=====================

Keep each folder together. A script finds a file only when both are in the same folder,
or when you give the full path. Install what you need once:
    pip install pandas numpy matplotlib seaborn openpyxl notebook

PANDAS
------
pandas/students.csv  (session 18 to 20): 6 students with two blank marks: read_csv, head, info, describe, filters
pandas/marks_semicolon.csv  (session 19): values split by semicolons: use sep=";"
pandas/marks_no_header.csv  (session 19): no title line: use header=None and names=[...]
pandas/marks_tab.tsv  (session 19): values split by tabs: use sep="\t"
pandas/marks_with_dash.csv  (session 19): a dash for a missing value: use na_values=["-"]
pandas/joined_dates.csv  (session 19, 21): a date column: use parse_dates=["joined"]
pandas/marks.xlsx  (session 19): an Excel file with two sheets, Term 1 and Term 2
pandas/students_messy.csv  (session 21): the messy table to clean: blanks, repeats, spaces, mixed capitals
pandas/class_students.csv  (session 20, 22): 8 clean students: groupby, agg, pivot_table
pandas/sales.csv  (session 22): three months of sales for the sales summary
pandas/merge_students.csv  (session 23): the left table for merge
pandas/merge_marks.csv  (session 23): the right table for merge; ids 4 and 5 do not match
pandas/merge_tests.csv  (session 23): one student, many tests: a one-to-many merge
pandas/sales_jan.csv  (session 23): stack this with sales_feb.csv using concat
pandas/sales_feb.csv  (session 23): stack this with sales_jan.csv using concat

CHARTS
------
charts/monthly_sales.csv  (session 24): six months of sales: line, bar and pie charts
charts/study_hours.csv  (session 24, 25): 60 students from the Seaborn lesson: box plot, scatter plot, heatmap, correlation

FILE HANDLING
-------------
file-handling/marks.csv  (session 14, 18): read it with the csv module, then with pandas
file-handling/people.csv  (session 14): a CSV to read with csv.DictReader
file-handling/marks.txt  (session 14): one student per line: split each line
file-handling/poem.txt  (session 14): count the lines and the words
file-handling/todo.txt  (session 14): the list used by todo.py
file-handling/scores.txt  (session 15): one bad line on purpose: catch the ValueError

PROGRAMS
--------
programs/session-02/ask_name.py  (session 2): uses input()
programs/session-02/add_numbers.py  (session 2): uses input() and int()
programs/session-02/age_next_year.py  (session 2): uses input() and int()
programs/session-04/check_age.py  (session 4): uses input() with if
programs/session-05/password.py  (session 5): a while loop with input()
programs/session-10/marks_manager.py  (session 10): the marks manager project
programs/session-10/contact_book.py  (session 10): the contact book project
programs/session-11/read_number.py  (session 11): a function that keeps asking until the input is valid
programs/session-13/shapes.py  (session 13): your own module
programs/session-13/main.py  (session 13): imports shapes.py from the same folder
programs/session-13/my_project/main.py  (session 13): imports from the tools package
programs/session-14/todo.py  (session 14): a to-do list saved in todo.txt
programs/session-15/safe_input.py  (session 15): input() made safe with try and except
programs/session-13/my_project/tools/maths.py  (session 13): a module inside the tools package
programs/session-13/my_project/tools/text.py  (session 13): a module inside the tools package

CAPSTONE
--------
capstone/data/raw/orders.csv  (session 26 to 29): the messy online shop orders, 308 rows. Never edit this one by hand
capstone/data/clean/orders_clean.csv  (session 27 to 29): the same orders after clean_orders, 298 rows, to check your own result
capstone/requirements.txt  (session 29): install everything with: pip install -r requirements.txt
capstone/README.md  (session 29): a README template to fill in
capstone/notebook.ipynb  (session 27 to 29): a starter notebook in the layout from session 29
