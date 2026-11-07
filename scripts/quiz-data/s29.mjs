// Session 29: Presentation and Reporting
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What does a Jupyter notebook mix together?`, `Code, results and text`, [`Only code`, `Only text`, `Spreadsheets and email`], `That is why analysts use it.`],
  [`Which key runs a cell and moves to the next?`, `Shift + Enter`, [`Ctrl + S`, `Tab`, `Esc`], `It is the main notebook shortcut.`],
  [`Why use Restart and Run All before sharing?`, `To prove it runs from top to bottom`, [`To make the file smaller`, `To change the colours`, `To delete the outputs`], `Cells run out of order can hide bugs.`],
  [`Where should the main findings go in a notebook?`, `At the top`, [`At the very end only`, `In a hidden cell`, `In the imports`], `Most readers stop after the first screen.`],
  [`In Markdown, what does ## make?`, `A second-level heading`, [`A comment`, `Bold text`, `A table`], `One # is the largest.`],
  [`When should you keep the index in to_csv?`, `When it holds meaningful names`, [`Always`, `Never`, `Only with numbers`], `A summary by category needs its index.`],
  [`What does a CSV file NOT keep?`, `Formatting, formulas and charts`, [`Values`, `Column names`, `Rows`], `It is plain text.`],
  [`How do you write several sheets to one Excel file?`, `pd.ExcelWriter with to_excel for each sheet`, [`to_csv many times`, `pd.read_excel`, `df.save_all()`], `The file is saved when the with block ends.`],
  [`What does .to_frame("revenue") do?`, `Turns a Series into a one-column table`, [`Draws a frame on a chart`, `Renames the file`, `Adds a row`], `The name becomes the column name.`],
  [`Which picture format stays sharp at any size?`, `SVG`, [`PNG`, `JPG`, `BMP`], `A PDF also works for print.`],
  [`Which is the better chart title?`, `Gadgets bring half of the revenue`, [`Revenue by category`, `Chart 1`, `My bar chart`], `State the finding.`],
  [`Which command makes an HTML copy of a notebook?`, `jupyter nbconvert --to html notebook.ipynb`, [`pip install html`, `python notebook.html`, `jupyter save html`], `Add --no-input to hide the code.`],
  [`What does the f-string format :,.0f do?`, `Adds thousands separators with no decimals`, [`Rounds to the nearest ten`, `Adds a percent sign`, `Pads with zeros`], `For example 1,234,567.`, `print(f"{1234567.4:,.0f}" == "1,234,567" and "Adds thousands separators with no decimals")`],
  [`How many messages should one slide carry?`, `One`, [`Three`, `As many as fit`, `None`], `Remove everything that does not support it.`],
  [`What should a good README start with?`, `What the project is and its key findings`, [`A list of every file`, `Your full life story`, `The raw data`], `It is the front page of your work.`],
]
