// Session 25: Seaborn
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is Seaborn built on top of?`, `Matplotlib`, [`Excel`, `SQL`, `Django`], `So plt.title and plt.savefig still work.`],
  [`How do we normally import Seaborn?`, `import seaborn as sns`, [`import seaborn as sb`, `import sea as sns`, `from seaborn import plt`], `sns is the convention.`],
  [`What does sns.set_theme() do?`, `Gives charts a cleaner look`, [`Draws a chart`, `Loads the data`, `Saves the chart`], `Call it once at the top.`],
  [`How do you give Seaborn its data?`, `data=df with column names as text`, [`A list of lists only`, `A file name`, `A dictionary of charts`], `For example x="marks".`],
  [`What does the line inside a box plot show?`, `The median`, [`The mean`, `The maximum`, `The minimum`], `It is the middle value.`],
  [`What does the box itself show?`, `The middle half of the values`, [`All the values`, `Only the outliers`, `The average`], `From the 25% mark to the 75% mark.`],
  [`What are the dots beyond the whiskers?`, `Outliers`, [`The median`, `Missing values`, `Errors in the chart`], `Unusually high or low values.`],
  [`What does hue="city" do?`, `Colours the marks by city`, [`Sorts by city`, `Filters to one city`, `Removes the city`], `A legend is added as well.`],
  [`What does sns.regplot add to a scatter plot?`, `A best-fit line`, [`A title`, `A grid`, `A second chart`], `It makes the trend easy to see.`],
  [`What range can a correlation take?`, `-1 to +1`, [`0 to 100`, `0 to 1`, `Any number`], `0 means no straight-line link.`],
  [`Days absent and marks show -0.7. What does that mean?`, `More absences go with lower marks`, [`More absences cause higher marks`, `There is no link`, `The data is wrong`], `A negative correlation means one rises as the other falls.`],
  [`What is always on the diagonal of a correlation table?`, `1`, [`0`, `-1`, `The mean`], `A column compared with itself.`],
  [`Which option writes the numbers on a heatmap?`, `annot=True`, [`numbers=True`, `text=True`, `show=True`], `fmt=".2f" sets the decimals.`],
  [`Why is df.corr(numeric_only=True) useful?`, `It skips text columns`, [`It rounds the answers`, `It sorts the table`, `It removes blanks`], `Newer pandas fails on text otherwise.`],
  [`What does sns.countplot need?`, `Only a category column`, [`A number column`, `Two number columns`, `A correlation table`], `It does the counting for you.`],
  [`What does correlation prove about cause?`, `Nothing by itself`, [`That one causes the other`, `That the data is random`, `That the chart is right`], `Two things moving together does not prove cause.`],
]
