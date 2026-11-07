// Session 21: Data Cleaning
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`Why work on df.copy() while cleaning?`, `So the original table stays safe`, [`It makes the code faster`, `It removes blanks`, `pandas requires it`], `If you make a mistake you can start again from df.`],
  [`What does df.isna().mean() give?`, `The fraction of missing values per column`, [`The average of each column`, `The number of rows`, `The missing rows`], `0.5 means half of the column is missing.`],
  [`What is usually a good fill value for a text category such as city?`, `The mode, the most common value`, [`The mean`, `Zero`, `The maximum`], `A mean makes no sense for text.`],
  [`For money data with a few huge values, which fill is usually better?`, `The median`, [`The mean`, `The maximum`, `The first value`], `The median is not pulled by extreme values.`],
  [`What does ffill() do?`, `Copies the previous value forward`, [`Fills blanks with zero`, `Fills blanks with the mean`, `Removes the blanks`], `It suits ordered data such as daily readings.`],
  [`What does dropna(subset=["maths"]) remove?`, `Rows where maths is blank`, [`The maths column`, `All blank rows in any column`, `Rows where maths is not blank`], `Other columns may still have blanks.`],
  [`What does df.duplicated() mark as True?`, `Rows identical to an earlier row`, [`The first copy of each row`, `Rows with blanks`, `Every row`], `The first copy is False.`],
  [`What does keep="last" do in drop_duplicates?`, `Keeps the last copy of each duplicate`, [`Keeps every copy`, `Removes every copy`, `Keeps only the last row of the table`], `The default is keep="first".`],
  [`Why clean the text before dropping duplicates?`, `Spaces and capitals can hide real duplicates`, [`It is faster`, `drop_duplicates only works on numbers`, `Text must be sorted first`], `Delhi and " delhi" are different strings until cleaned.`],
  [`What is the sum of the text values "20", "22" in a pandas column?`, `2022`, [`42`, `An error`, `0`], `Text is joined, not added.`, `import pandas as pd
print(pd.Series(["20", "22"]).sum())`],
  [`Why does astype(int) fail on a column with NaN?`, `NaN cannot be stored as a whole number`, [`NaN is text`, `int only works on strings`, `It never fails`], `Fill the blanks first or use astype(float).`],
  [`What does .str.strip() do?`, `Removes spaces at both ends`, [`Removes all letters`, `Splits the text`, `Changes capitals`], `It does not touch spaces in the middle.`],
  [`What does expand=True do in str.split?`, `Returns the pieces as separate columns`, [`Makes the text longer`, `Adds more rows`, `Sorts the pieces`], `Without it you get lists.`],
  [`What does clip(lower=0, upper=100) do?`, `Squeezes values into the range 0 to 100`, [`Removes rows outside the range`, `Rounds the values`, `Counts the values`], `-5 becomes 0 and 120 becomes 100.`],
]
