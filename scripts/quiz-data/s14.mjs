// Session 14: File Handling
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`Why do programs save data in files?`, `Variables vanish when the program ends, but a file keeps the data on the disk`, [`Files make the program run faster`, `Variables cannot hold text`, `Files are needed to use print`], `A file is still there the next time you run the program.`],
  [`Which function opens a file?`, `open()`, [`file()`, `read()`, `load()`], `open(name, mode) gives back a file object.`],
  [`What is the default mode of open()?`, `r (read)`, [`w (write)`, `a (append)`, `x (create)`], `If you give no mode, the file is opened for reading.`],
  [`What does mode "w" do to a file that already has content?`, `It erases the old content`, [`It adds to the end`, `It keeps the old content`, `It gives an error`], `Opening with "w" starts the file empty.`],
  [`Which mode adds text to the end of a file?`, `a`, [`w`, `r`, `x`], `a means append.`],
  [`What does mode "x" do?`, `Creates a new file and fails if it already exists`, [`Erases the file`, `Reads the file`, `Appends to the file`], `x is for exclusive creation.`],
  [`What does the letter b in "rb" mean?`, `Binary file, such as an image`, [`Big file`, `Backup`, `Both read and write`], `Without b the file is treated as text.`],
  [`What happens when you open a file that does not exist with mode "r"?`, `FileNotFoundError`, [`It is created empty`, `ValueError`, `Nothing`], `Reading needs the file to be there.`],
  [`Does f.write("Hi") add a new line after Hi?`, `No`, [`Yes`, `Only on Windows`, `Only in append mode`], `Put \\n in the text when you want a new line.`],
  [`What does the file hold after f.write("a") and f.write("b")?`, `ab`, [`a then b on two lines`, `b`, `An error`], `write adds no newline, so both go on one line.`, `with open("t.txt", "w") as f:
    f.write("a")
    f.write("b")
print(open("t.txt").read())`],
  [`What does writelines(["x", "y"]) do about new lines?`, `It does not add them, so you must include \\n yourself`, [`It adds a newline after each item`, `It adds a blank line at the end`, `It sorts the items`], `The strings are written exactly as they are.`],
  [`Why use the with statement for files?`, `It closes the file automatically when the block ends`, [`It makes the file bigger`, `It makes the file read only`, `It is required for print`], `That stops open files being left behind.`],
  [`What is f.closed after the with block ends?`, `True`, [`False`, `None`, `An error`], `The file was closed for you.`, `with open("d.txt", "w") as f:
    f.write("hi")
print(f.closed)`],
  [`What does as f do in with open("a.txt") as f?`, `Gives the file object the name f`, [`Copies the file`, `Closes the file`, `Renames the file`], `You use f inside the block.`],
  [`What does f.read() give?`, `The whole file as one string`, [`The next line only`, `A list of lines`, `The file name`], `read gets everything at once.`],
  [`What does f.readline() give?`, `The next line, including its newline`, [`The whole file`, `All lines as a list`, `The first word`], `Each call moves to the next line.`],
  [`What does f.readlines() give?`, `A list of all the lines`, [`One long string`, `A tuple of words`, `The number of lines`], `Each item in the list ends with a newline.`],
  [`What does readlines() give for a file with the lines apple and banana?`, `['apple\\n', 'banana\\n']`, [`['apple', 'banana']`, `'apple banana'`, `('apple', 'banana')`], `Each line keeps its newline character.`, `with open("f.txt", "w") as f:
    f.write("apple\\nbanana\\n")
with open("f.txt") as f:
    print(f.readlines())`],
  [`What does this loop do?

for line in f:
    print(line)`, `Goes through the file one line at a time`, [`Reads the whole file at once`, `Reads one character at a time`, `Writes lines to the file`], `This works well even for big files.`],
  [`What does line.strip() remove?`, `The spaces and newline at both ends`, [`All the vowels`, `Only the first letter`, `Every space in the line`], `strip cleans the ends of the text.`],
  [`What type is everything read from a text file?`, `str`, [`int`, `float`, `list`], `Convert with int() or float() before doing maths.`],
  [`What is the total for a file with the lines 70, 85 and 90 after adding int(line) for each line?`, `245`, [`7085`, `0`, `An error`], `int() turns each line into a number.`, `with open("m.txt", "w") as f:
    f.write("70\\n85\\n90\\n")
total = 0
with open("m.txt") as f:
    for line in f:
        total += int(line)
print(total)`],
  [`What does repr() show for the second f.read() when the file has been read once?`, `''`, [`'abc'`, `None`, `An error`], `After reading, the position is at the end of the file.`, `with open("p.txt", "w") as f:
    f.write("abc")
with open("p.txt") as f:
    f.read()
    print(repr(f.read()))`],
  [`What does f.seek(0) do?`, `Jumps back to the start of the file`, [`Closes the file`, `Deletes the first line`, `Reads the first line`], `Then you can read the file again.`],
  [`What does f.tell() give?`, `The current position in the file`, [`The size of the file`, `The number of lines`, `The file name`], `It is how far you are into the file.`],
  [`What is in w.txt after this code?

with open("w.txt", "w") as f:
    f.write("first")
with open("w.txt", "w") as f:
    f.write("second")`, `second`, [`first and second`, `first`, `Nothing`], `The second open with w erased the file.`, `with open("w.txt", "w") as f:
    f.write("first")
with open("w.txt", "w") as f:
    f.write("second")
print(open("w.txt").read())`],
  [`What is in log.txt after this code?

with open("log.txt", "w") as f:
    f.write("Start\\n")
with open("log.txt", "a") as f:
    f.write("Step\\n")`, `Start then Step`, [`Only Step`, `Only Start`, `Nothing`], `Append keeps the old content and adds to the end.`],
  [`Which line counts the words in a line of text?`, `len(line.split())`, [`len(line)`, `line.count()`, `line.words()`], `split gives a list of words, and len counts them.`],
  [`What does enumerate(f, start=1) give while reading a file?`, `Line numbers starting at 1 with each line`, [`Only the line numbers`, `The words in each line`, `The file size`], `It pairs a counter with each line.`],
  [`Can one with statement open two files?`, `Yes, separate them with a comma`, [`No, only one`, `Only if both are text`, `Only in append mode`], `For example with open(a) as src, open(b, "w") as dst.`],
  [`What does os.path.exists("data.txt") return when the file is there?`, `True`, [`False`, `None`, `The file content`], `It answers True or False.`],
  [`Which function deletes a file?`, `os.remove()`, [`os.delete()`, `os.erase()`, `os.clear()`], `os.remove(path) deletes the file.`],
  [`What does os.listdir() give?`, `The names of the files in the folder`, [`The size of the folder`, `The Python version`, `The file content`], `It is a list of names.`],
  [`Which path style is safest on Windows?`, `Forward slashes, like C:/Users/Aman/marks.txt`, [`C:\\new\\table.txt`, `C:|Users|Aman`, `C;Users;Aman`], `Backslashes can turn into special characters such as \\n and \\t.`],
  [`What does Path("quick.txt").suffix give?`, `.txt`, [`quick`, `txt`, `quick.txt`], `suffix is the file extension with its dot.`, `from pathlib import Path
print(Path("quick.txt").suffix)`],
  [`What does Path.read_text() do?`, `Reads a whole file as a string in one call`, [`Reads one line`, `Deletes the file`, `Writes text`], `write_text and read_text are one-line helpers.`],
  [`Why add encoding="utf-8" when opening a text file?`, `So names with special letters are saved safely on every computer`, [`To make the file smaller`, `To make it read only`, `To make it faster`], `utf-8 handles letters like e with two dots and Hindi text.`],
  [`What does CSV stand for?`, `Comma separated values`, [`Computer stored values`, `Column sorted view`, `Copy save verify`], `Each line is a row and commas separate the columns.`],
  [`Why open a CSV file with newline=""?`, `To stop blank lines appearing between rows on Windows`, [`To sort the rows`, `To make the file read only`, `To add a header`], `Always use it with the csv module.`],
  [`What does writer.writerows(list_of_lists) do?`, `Writes many rows at once`, [`Writes only the first row`, `Reads many rows`, `Deletes the rows`], `writerow writes one row.`],
  [`What does next(csv.reader(f)) give for a file whose only row is a,85?`, `['a', '85']`, [`['a', 85]`, `{'a': 85}`, `('a', 85)`], `Each row is a list of strings, so the 85 is text.`, `import csv
with open("r.csv", "w", newline="") as f:
    csv.writer(f).writerows([["a", 85]])
with open("r.csv", newline="") as f:
    print(next(csv.reader(f)))`],
  [`What does next(reader) do at the start of a CSV loop?`, `Takes off the header row`, [`Closes the file`, `Reads the last row`, `Sorts the rows`], `The loop then starts at the data.`],
  [`What does csv.DictReader give for each row?`, `A dictionary using the header names as keys`, [`A list of numbers`, `A set`, `A string`], `You can write row["name"] instead of counting columns.`],
  [`What does DictWriter's writeheader() write?`, `The first line with the column names`, [`The last row`, `A blank line`, `The file name`], `The names come from fieldnames.`],
  [`What error appears for f.write(5) on a text file?`, `TypeError`, [`ValueError`, `NameError`, `FileNotFoundError`], `write needs a string, so write str(5).`],
  [`Why might all your text end up on one line?`, `You forgot to put \\n at the end of each line`, [`The file is too big`, `You used mode r`, `Python hides new lines`], `write does not add a newline for you.`],
  [`What is the size of a file after writing hi?`, `2`, [`1`, `3`, `0`], `os.path.getsize gives the size in bytes, and hi is 2 characters.`, `import os
with open("s.txt", "w") as f:
    f.write("hi")
print(os.path.getsize("s.txt"))`],
  [`What does a plain file name like "data.txt" mean?`, `A file in the current folder the program runs from`, [`A file on the desktop`, `A file on the internet`, `A file in the Python folder`], `It is a relative path.`],
  [`What is the best habit when you open a file?`, `Use with so the file always gets closed`, [`Never close it`, `Always use mode w`, `Open it twice`], `with closes the file even if the program crashes.`],
]
