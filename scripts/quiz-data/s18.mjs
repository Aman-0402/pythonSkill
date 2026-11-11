// Session 18: Pandas Introduction
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is pandas mainly used for?`, `Working with tables of data`, [`Drawing animals`, `Playing sound`, `Making web pages`], `It is like a spreadsheet inside Python.`],
  [`How do we normally import pandas?`, `import pandas as pd`, [`import pd as pandas`, `from pandas import pd`, `include pandas`], `pd is the common short name.`],
  [`Which command installs pandas on your computer?`, `pip install pandas`, [`import pandas`, `python pandas`, `pd install`], `pip is run in the terminal.`],
  [`What are the two main building blocks of pandas?`, `Series and DataFrame`, [`List and Tuple`, `Array and Matrix`, `Row and Cell`], `A Series is one column and a DataFrame is a whole table.`],
  [`What is a Series?`, `One column of data with labels`, [`A whole table`, `A kind of loop`, `A Python module`], `Each value has a label called the index.`],
  [`What is a DataFrame?`, `A table of rows and columns`, [`A single number`, `A list of text`, `A kind of function`], `Each column of a DataFrame is a Series.`],
  [`What is the index of a Series?`, `The labels of its values`, [`Its biggest value`, `Its length`, `Its data type`], `By default the labels are 0, 1, 2 and so on.`],
  [`What does pd.Series([85, 90, 78]) use as the index by default?`, `0, 1, 2`, [`a, b, c`, `85, 90, 78`, `1, 2, 3`], `Without index=, the labels are numbered from 0.`],
  [`How do you give a Series your own labels?`, `Use index= when creating it`, [`Use name=`, `Use label=`, `You cannot`], `For example pd.Series([85, 90], index=["Aman", "Ankit"]).`],
  [`What does name="maths" do in pd.Series(..., name="maths")?`, `Names the Series, which becomes the column name in a table`, [`Names the index`, `Sets the data type`, `Sorts the values`], `The name is shown at the bottom of the printed Series.`],
  [`What do the keys of a dictionary become when it is turned into a Series?`, `The index`, [`The values`, `The name`, `Nothing`], `The dictionary values become the data.`],
  [`What does pd.Series({"apples": 30, "bananas": 12})["apples"] give?`, `30`, [`12`, `apples`, `An error`], `You pick a value by its label.`, `import pandas as pd
print(pd.Series({"apples": 30, "bananas": 12})["apples"])`],
  [`What does marks.iloc[0] give for a Series?`, `The first value, picked by position`, [`The value with label 0`, `The index`, `The last value`], `iloc always uses positions.`],
  [`What is the difference between loc and iloc?`, `loc uses labels and iloc uses positions`, [`loc uses positions and iloc uses labels`, `They are the same`, `loc is for columns only`], `Remember: i for integer position.`],
  [`Does a label slice like marks["Ankit":"Rohit"] include Rohit?`, `Yes, label slices include the end`, [`No, it stops before Rohit`, `Only if Rohit is first`, `It gives an error`], `This is different from a normal slice.`],
  [`What does marks[marks > 85] do?`, `Keeps only the values above 85`, [`Sets every value to 85`, `Sorts the values`, `Counts the values`], `A condition works as a filter, just like in NumPy.`],
  [`What does marks.idxmax() give?`, `The label of the biggest value`, [`The biggest value`, `The position of the biggest value`, `The sum`], `For example the name of the topper.`],
  [`What is the sum of the Series [85, 90, 78, 92]?`, `345`, [`86`, `92`, `335`], `85 + 90 + 78 + 92 is 345.`, `import pandas as pd
print(pd.Series([85, 90, 78, 92]).sum())`],
  [`When you add two Series, how does pandas line up the values?`, `By label`, [`By position only`, `By value size`, `It cannot add them`], `That is why a + b works even when the labels are in a different order.`],
  [`How is a DataFrame easiest to make from a dictionary?`, `Each key is a column name and each value is a list for that column`, [`Each key is a row`, `Each key is a value`, `The dictionary must have one key`], `All the lists must be the same length.`],
  [`What must be true about the lists in a dictionary used for a DataFrame?`, `They must all be the same length`, [`They must all be sorted`, `They must contain numbers`, `They must be tuples`], `Otherwise you get a ValueError.`],
  [`What does df.shape give for 4 rows and 3 columns?`, `(4, 3)`, [`(3, 4)`, `12`, `7`], `shape is (rows, columns).`, `import pandas as pd
print(pd.DataFrame({"a": [1, 2, 3, 4], "b": [1, 2, 3, 4], "c": [1, 2, 3, 4]}).shape)`],
  [`What does df.size give for 4 rows and 3 columns?`, `12`, [`(4, 3)`, `7`, `3`], `size is rows times columns.`, `import pandas as pd
print(pd.DataFrame({"a": [1, 2, 3, 4], "b": [1, 2, 3, 4], "c": [1, 2, 3, 4]}).size)`],
  [`What does list(df.columns) give for a DataFrame with columns name and maths?`, `['name', 'maths']`, [`[0, 1]`, `['maths', 'name']`, `('name', 'maths')`], `columns holds the column names.`, `import pandas as pd
print(list(pd.DataFrame({"name": ["Aman"], "maths": [85]}).columns))`],
  [`What does a missing value show as in a pandas table?`, `NaN`, [`0`, `Empty`, `None always`], `NaN means not a number, the sign of a gap.`],
  [`What happens when one dictionary in a list of dictionaries lacks a key?`, `That cell becomes NaN`, [`pandas raises an error`, `The row is dropped`, `The cell becomes 0`], `pandas fills the gap with NaN.`],
  [`What is the use of columns=["name", "maths"] in pd.DataFrame(rows, columns=[...])?`, `It names the columns when the data is a list of lists`, [`It selects two rows`, `It sorts the data`, `It sets the index`], `A list of lists has no names of its own.`],
  [`What does pd.date_range("2026-01-01", periods=4) make?`, `Four consecutive dates`, [`Four random dates`, `Four years`, `One date four times`], `It is often used as an index.`],
  [`Which function reads a CSV file into a DataFrame?`, `pd.read_csv`, [`pd.open_csv`, `pd.load_table`, `pd.csv`], `read_csv("marks.csv") returns a DataFrame.`],
  [`Which method writes a DataFrame to a CSV file?`, `to_csv`, [`write_csv`, `save_csv`, `csv_out`], `df.to_csv("marks.csv").`],
  [`Why add index=False in df.to_csv("marks.csv", index=False)?`, `So the row numbers are not saved as an extra column`, [`To sort the file`, `To make the file smaller by half`, `To save only one column`], `Otherwise you read back an extra unnamed column.`],
  [`What does df.head(3) show?`, `The first 3 rows`, [`The last 3 rows`, `3 random rows`, `The 3rd row only`], `With no number, head shows 5 rows.`],
  [`What does df.describe() summarise?`, `Count, mean, std, min, quartiles and max of the number columns`, [`The column names only`, `The text columns`, `The row labels`], `It skips text columns by default.`],
  [`What does df["maths"] give?`, `A Series`, [`A DataFrame`, `A list`, `A number`], `One column name gives one Series.`],
  [`What does df[["name", "maths"]] give?`, `A DataFrame`, [`A Series`, `A list`, `An error`], `A list of names, so double brackets, gives a table.`],
  [`What error appears for df["Maths"] when the column is called maths?`, `KeyError`, [`NameError`, `ValueError`, `TypeError`], `Column names are case sensitive.`],
  [`What does df.iloc[1:3] give?`, `Rows at positions 1 and 2`, [`Rows at positions 1, 2 and 3`, `Columns 1 and 2`, `Only row 3`], `iloc slices stop before the end.`],
  [`Which operators combine row conditions in pandas?`, `& for and, | for or, with each condition in brackets`, [`and, or`, `&& and ||`, `+ and -`], `The same rule as in NumPy.`],
  [`How many rows does the filter keep?

import pandas as pd

df = pd.DataFrame({"maths": [85, 70, 92, 55]})
df[df["maths"] >= 80]`, `2`, [`1`, `3`, `4`], `85 and 92 are 80 or more.`, `import pandas as pd
df = pd.DataFrame({"maths": [85, 70, 92, 55]})
print(len(df[df["maths"] >= 80]))`],
  [`How do you add a new column called total?`, `Assign to it: df["total"] = ...`, [`df.add("total")`, `df.append("total")`, `You cannot`], `Assigning to a new name adds a column.`],
  [`What is df["total"] after df["total"] = df["maths"] + df["science"] for maths 85 and science 90 in the first row?`, `175 in the first row`, [`85 in the first row`, `90 in the first row`, `An error`], `The maths is done on whole columns at once.`],
  [`Does df.drop(columns=["temp"]) change df itself?`, `No, it gives back a new DataFrame you must save`, [`Yes, it changes df in place`, `It deletes the file`, `It raises an error`], `Write df = df.drop(...).`],
  [`What does df.rename(columns={"maths": "math_marks"}) do?`, `Gives back a new table with maths renamed to math_marks`, [`Renames the index`, `Deletes the maths column`, `Sorts the columns`], `Save it with df = ....`],
  [`What does df.sort_values("maths", ascending=False) do?`, `Sorts the rows by maths, biggest first`, [`Sorts the columns`, `Sorts by name`, `Sorts smallest first`], `ascending=False reverses the order.`],
  [`What does df.set_index("name") do?`, `Makes the name column the row labels`, [`Deletes the name column`, `Sorts by name`, `Renames the index`], `reset_index() puts it back.`],
  [`What does df.isna().sum() count for a column?`, `The number of missing values`, [`The sum of the values`, `The number of rows`, `The number of columns`], `isna gives True for each gap, and True counts as 1.`],
  [`What does df["maths"].mean() do with NaN values?`, `Skips them`, [`Returns NaN`, `Counts them as 0`, `Raises an error`], `The mean uses only the values that are there.`],
  [`What does df.fillna(0) do?`, `Replaces each missing value with 0`, [`Deletes the rows with gaps`, `Fills the index with 0`, `Counts the gaps`], `It gives back a new DataFrame.`],
  [`What does df.dropna() do?`, `Removes every row that has a missing value`, [`Fills the gaps with 0`, `Removes every column`, `Counts the gaps`], `It gives back a new DataFrame.`],
]
