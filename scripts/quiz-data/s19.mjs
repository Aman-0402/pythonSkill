// Session 19: Loading and Inspecting Data
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`Which function loads a CSV file into a DataFrame?`, `pd.read_csv`, [`pd.open_csv`, `pd.load`, `df.read`], `read_csv reads the file and gives back a DataFrame.`],
  [`What does read_csv normally do with the first line of the file?`, `Uses it as the column names`, [`Skips it`, `Treats it as the first row of data`, `Uses it as the index`], `Use header=None if the file has no title line.`],
  [`What does an empty place in a CSV file become in pandas?`, `NaN`, [`0`, `An empty list`, `An error`], `NaN means a missing value.`],
  [`Which option tells read_csv that values are split by semicolons?`, `sep=";"`, [`split=";"`, `comma=";"`, `delimiter_char=";"`], `If the table looks like one wide column, the separator is probably wrong.`],
  [`What does usecols=["name", "maths"] do?`, `Loads only those columns`, [`Renames the columns`, `Sorts by those columns`, `Drops those columns`], `It saves memory on big files.`],
  [`What does nrows=100 do in read_csv?`, `Reads only the first 100 rows`, [`Reads only the last 100 rows`, `Skips 100 rows`, `Limits the file to 100 columns`], `It is a quick way to peek at a huge file.`],
  [`A column uses a dash for missing values. How do you read the dash as NaN?`, `na_values=["-"]`, [`fillna("-")`, `missing="-"`, `dropna("-")`], `Then the column can stay numeric.`],
  [`Which extra package does read_excel need for .xlsx files?`, `openpyxl`, [`numpy`, `csvkit`, `xlrd3`], `Install it once with pip install openpyxl.`],
  [`What does sheet_name=None do in read_excel?`, `Reads every sheet into a dictionary`, [`Reads no sheets`, `Reads the last sheet`, `Gives an error`], `The keys are sheet names and the values are DataFrames.`],
  [`How many rows does df.head() show by default?`, `5`, [`1`, `10`, `All of them`], `Give a number for a different count, such as df.head(2).`, `import pandas as pd
print(len(pd.DataFrame({"a": range(8)}).head()))`],
  [`Which call picks random rows from a table?`, `df.sample(3)`, [`df.random(3)`, `df.pick(3)`, `df.head(3)`], `Add random_state= to get the same rows every time.`],
  [`Which call shows column types and non-null counts in one view?`, `df.info()`, [`df.shape`, `df.head()`, `df.columns`], `It is the best one-glance health check.`],
  [`In df.describe(), what does the 50% row show?`, `The median`, [`The mean`, `Half of the maximum`, `The number of rows`], `The 50% mark is the middle value.`],
  [`Why might a marks column be float64 instead of int64?`, `It contains NaN`, [`The marks are too big`, `The file is a CSV`, `It has too many rows`], `NaN is a float, so the whole column becomes float.`],
  [`Which line counts the missing values in each column?`, `df.isna().sum()`, [`df.count_missing()`, `df.info().sum()`, `df.dropna().sum()`], `Each True counts as 1.`],
  [`Why use index=False in to_csv?`, `So the row numbers are not written as a column`, [`So the file is smaller by half`, `So the headers are removed`, `So the file is sorted`], `Otherwise you see Unnamed: 0 when you read it back.`],
]
