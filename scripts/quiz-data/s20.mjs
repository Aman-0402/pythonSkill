// Session 20: Selecting and Filtering
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What does df["name"] give you?`, `One column, as a Series`, [`One row`, `A DataFrame with one row`, `The column names`], `One pair of brackets gives a Series.`],
  [`How do you select two columns?`, `df[["name", "maths"]]`, [`df["name", "maths"]`, `df.name.maths`, `df("name", "maths")`], `A list of names inside the brackets gives a DataFrame.`],
  [`What does loc use to pick rows and columns?`, `Labels`, [`Positions`, `Colours`, `Sizes`], `Remember: l for label.`],
  [`What does iloc use to pick rows and columns?`, `Positions`, [`Labels`, `Column names`, `Conditions only`], `Remember: i for integer position.`],
  [`How many rows does df.loc[1:3] give with the default index?`, `3`, [`2`, `4`, `1`], `Label slices include the end.`, `import pandas as pd
print(len(pd.DataFrame({"a": range(6)}).loc[1:3]))`],
  [`How many rows does df.iloc[1:3] give?`, `2`, [`3`, `4`, `1`], `Position slices stop before the end.`, `import pandas as pd
print(len(pd.DataFrame({"a": range(6)}).iloc[1:3]))`],
  [`Which gives the last row of a table?`, `df.iloc[-1]`, [`df.loc[-1]`, `df[-1]`, `df.last()`], `Negative positions count from the end.`],
  [`What is a mask in pandas?`, `A column of True and False used to filter rows`, [`A hidden column`, `A chart style`, `A kind of index`], `df[mask] keeps the rows where the mask is True.`],
  [`Which symbol means AND between two conditions?`, `&`, [`and`, `+`, `&&`], `The word and fails with a Series.`],
  [`Which symbol means OR between two conditions?`, `|`, [`or`, `||`, `/`], `Put each condition in brackets.`],
  [`Which symbol reverses a condition?`, `~`, [`!`, `not`, `-`], `~(a) means NOT a.`],
  [`Why are brackets needed in (df["a"] > 1) & (df["b"] < 5)?`, `Because & is done before > and <`, [`They only make it look neat`, `They make it faster`, `Brackets turn it into a list`], `Without them you get an error.`],
  [`What is the short way to check for one of several cities?`, `df["city"].isin(["Delhi", "Pune"])`, [`df["city"].among("Delhi", "Pune")`, `df["city"] == ["Delhi", "Pune"]`, `df["city"].contains("Delhi", "Pune")`], `isin replaces many == joined with |.`],
  [`Does between(75, 90) include 75 and 90?`, `Yes, both ends`, [`No, neither end`, `Only 75`, `Only 90`], `Both ends are included by default.`],
  [`Which line changes cells safely?`, `df.loc[df["maths"] < 50, "maths"] = 50`, [`df[df["maths"] < 50]["maths"] = 50`, `df.maths < 50 = 50`, `df.change("maths", 50)`], `Chained brackets may change a copy, not the table.`],
  [`Which function turns numbers stored as text into NaN when they cannot convert?`, `pd.to_numeric(col, errors="coerce")`, [`col.astype(int)`, `col.fillna(0)`, `pd.to_text(col)`], `astype(int) would crash instead.`],
]
