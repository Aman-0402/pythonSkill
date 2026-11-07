// Session 24: Matplotlib
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`How do we normally import Matplotlib's drawing module?`, `import matplotlib.pyplot as plt`, [`import matplotlib as plot`, `import plt`, `from pyplot import matplotlib`], `plt is the common short name.`],
  [`Which chart suits change over time?`, `Line`, [`Pie`, `Histogram`, `Box plot`], `Lines show a trend.`],
  [`Which chart suits comparing categories?`, `Bar`, [`Line`, `Scatter`, `Histogram`], `One bar per category.`],
  [`What does plt.show() do on your own computer?`, `Displays the chart`, [`Saves the chart`, `Deletes the chart`, `Adds a title`], `Everything before it is drawing on the page.`],
  [`Which pair names the axes?`, `plt.xlabel and plt.ylabel`, [`plt.title and plt.legend`, `plt.grid and plt.show`, `plt.xaxis and plt.yaxis`], `Always add them, with units.`],
  [`What must you add for plt.legend() to show names?`, `label= in each plot call`, [`title= in plt.show`, `name= in plt.legend only`, `Nothing at all`], `The legend reads the labels.`],
  [`What does the format string "ro--" mean?`, `Red, circle markers, dashed line`, [`Round orange line`, `Rows and columns`, `Red outline only`], `Colour, marker, line style.`],
  [`Why should bars start at 0?`, `Otherwise small differences look huge`, [`Matplotlib requires it`, `It makes them load faster`, `Bars cannot be negative`], `Use plt.ylim(0, 100) to fix the range.`],
  [`Which call makes horizontal bars?`, `plt.barh`, [`plt.hbar`, `plt.bar(side=True)`, `plt.flatbar`], `It is easier to read with long names.`],
  [`What does autopct="%1.1f%%" do in a pie?`, `Prints each slice's percentage`, [`Rotates the pie`, `Colours the slices`, `Makes the pie round`], `One decimal place and a percent sign.`],
  [`When is a pie a poor choice?`, `With many categories`, [`With 3 categories`, `When parts add up to a whole`, `When you have labels`], `Use a bar chart instead.`],
  [`What does bins=5 do in plt.hist?`, `Cuts the range into 5 pieces`, [`Draws 5 charts`, `Keeps 5 values`, `Makes the bars 5 wide`], `Each bar counts the values in one piece.`],
  [`How does a histogram differ from a bar chart?`, `It shows how one number is spread`, [`It has no bars`, `It compares categories`, `It only shows time`], `A bar chart compares categories.`],
  [`What does plt.subplots(1, 2) make?`, `One row and two columns of charts`, [`Two rows and one column`, `Twelve charts`, `One chart with two lines`], `axes[0] and axes[1] are the two charts.`],
  [`On an ax object, which sets the title?`, `ax.set_title("...")`, [`ax.title("...")`, `ax.plt_title("...")`, `ax.head("...")`], `Likewise set_xlabel and set_ylabel.`],
  [`When should you call savefig on your own computer?`, `Before plt.show()`, [`After plt.show()`, `Before plotting`, `Only inside a loop`], `After show you may save a blank picture.`],
]
