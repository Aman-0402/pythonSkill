// Session 5: Loops
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

// runs the code and prints everything it printed on one line, so a multi-line output can be checked as one answer
const flat = (code) => `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
${code.split('\n').map((l) => '    ' + l).join('\n')}
print(" ".join(buf.getvalue().split()))`

export default [
  [`What does a loop do?`, `Repeats a block of code`, [`Stores a value in memory`, `Ends the program`, `Compares two strings`], `A loop saves you from copying the same lines again and again.`],
  [`When is a for loop the better choice?`, `When you know how many times to repeat, or want to go through every item`, [`When you want to repeat until a condition becomes False`, `When you want to stop the program`, `When you want to define a function`], `Use for for a known count or a sequence. Use while to repeat until something happens.`],
  [`When is a while loop the better choice?`, `When you repeat until a condition becomes False, such as until the right password is typed`, [`When you want to go through every letter of a word`, `When you need exactly 10 rounds`, `When you want to print one value`], `A while loop is perfect when you do not know how many tries are needed.`],
  [`Which line is the correct start of a for loop over the letters of word?`, `for letter in word:`, [`for letter of word`, `for (letter in word)`, `loop letter in word:`], `The syntax is for variable in sequence: with a colon at the end.`],
  [`What is the value of letter in the third round of for letter in "Python": ?`, `t`, [`P`, `y`, `h`], `The first round gives P, the second y and the third t.`, `for i, letter in enumerate("Python"):
    if i == 2:
        print(letter)`],
  [`What does list(range(5)) give?`, `[0, 1, 2, 3, 4]`, [`[1, 2, 3, 4, 5]`, `[0, 1, 2, 3, 4, 5]`, `[1, 2, 3, 4]`], `range(5) starts at 0 and stops before 5.`, `print(list(range(5)))`],
  [`What does list(range(1, 6)) give?`, `[1, 2, 3, 4, 5]`, [`[1, 2, 3, 4, 5, 6]`, `[0, 1, 2, 3, 4, 5]`, `[2, 3, 4, 5, 6]`], `The stop number is never included.`, `print(list(range(1, 6)))`],
  [`What does list(range(0, 10, 2)) give?`, `[0, 2, 4, 6, 8]`, [`[2, 4, 6, 8, 10]`, `[0, 2, 4, 6, 8, 10]`, `[0, 1, 2, 3, 4]`], `The third number is the step. Here it goes up by 2.`, `print(list(range(0, 10, 2)))`],
  [`What does list(range(10, 0, -2)) give?`, `[10, 8, 6, 4, 2]`, [`[10, 8, 6, 4, 2, 0]`, `[8, 6, 4, 2, 0]`, `[10, 9, 8, 7, 6]`], `A negative step counts down, and the stop number 0 is not included.`, `print(list(range(10, 0, -2)))`],
  [`What is the last number that range(1, 5) gives?`, `4`, [`5`, `1`, `6`], `The stop number is never included, just like in slicing.`, `print(list(range(1, 5))[-1])`],
  [`In range(), what is the default start and the default step?`, `Start 0 and step 1`, [`Start 1 and step 1`, `Start 0 and step 2`, `Start 1 and step 0`], `range(5) is the same as range(0, 5, 1).`],
  [`What does the loop for i in range(1, 6): print(i, end=" ") show?`, `1 2 3 4 5`, [`12345`, `1, 2, 3, 4, 5`, `5 4 3 2 1`], `end=" " keeps the output on the same line, with a space between values.`, flat(`for i in range(1, 6):
    print(i, end=" ")`)],
  [`What is the final total? total = 0; for n in range(1, 11): total += n`, `55`, [`45`, `10`, `66`], `The loop adds the numbers 1 to 10.`, `total = 0
for n in range(1, 11):
    total += n
print(total)`],
  [`What is the sum of the numbers 1 to 100 found with a for loop?`, `5050`, [`5000`, `5051`, `4950`], `Use range(1, 101), because the stop number is not included.`, `total = 0
for n in range(1, 101):
    total += n
print(total)`],
  [`Which range prints the numbers from 10 down to 1?`, `range(10, 0, -1)`, [`range(10, 1)`, `range(1, 10, -1)`, `range(10, 1, 1)`], `Start at 10, stop before 0, and use a step of -1.`],
  [`When does Python check the condition of a while loop?`, `Before every round`, [`Only once at the end`, `Only after the first round`, `Never`], `While the condition is True the block runs again. When it becomes False the loop ends.`],
  [`What is printed? count = 1; while count <= 5: print(count); count += 1; then print("Done")`, `1 2 3 4 5 Done`, [`1 2 3 4 5`, `2 3 4 5 Done`, `Done`], `The loop prints 1 to 5, and then Done is printed after the loop ends.`, flat(`count = 1
while count <= 5:
    print(count)
    count += 1
print("Done")`)],
  [`What are the three things a counter-controlled while loop needs?`, `Start the counter, test it in the condition, change it inside the loop`, [`A colon, a bracket and a semicolon`, `A list, a string and a number`, `An else, an elif and an if`], `Without the change, the loop never ends.`],
  [`What is printed? count = 10; while count <= 5: print("This never prints"); then print("Finished")`, `Finished`, [`This never prints Finished`, `This never prints`, `Nothing`], `The condition is False at the very start, so the block runs zero times.`, flat(`count = 10
while count <= 5:
    print("This never prints")
print("Finished")`)],
  [`What is the sum of the digits of n = 1234 found with n % 10 and n //= 10 in a while loop?`, `10`, [`1234`, `24`, `4`], `1 + 2 + 3 + 4 is 10.`, `n = 1234
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)`],
  [`What is an infinite loop?`, `A loop whose condition never becomes False`, [`A loop that runs exactly once`, `A loop with no colon`, `A loop that only uses range()`], `It keeps running forever. In a terminal you can stop it with Ctrl + C.`],
  [`Which mistake usually causes an infinite while loop?`, `Forgetting to change the counter inside the loop`, [`Using a colon`, `Using 4 spaces for indentation`, `Using print()`], `If the counter never changes, the condition stays True forever.`],
  [`Which keys stop a program that is stuck in an infinite loop in a terminal?`, `Ctrl + C`, [`Ctrl + S`, `Alt + F4 only`, `Shift + Enter`], `Ctrl + C sends an interrupt to the running program.`],
  [`What does break do?`, `Stops the loop immediately`, [`Skips only the current round`, `Restarts the loop`, `Ends the whole file`], `break jumps to the first line after the loop.`],
  [`What is printed? for number in range(1, 20): if number % 7 == 0: print(number); break`, `7`, [`14`, `7 14`, `1`], `The loop stops at the first multiple of 7.`, `for number in range(1, 20):
    if number % 7 == 0:
        print(number)
        break`],
  [`What does continue do?`, `Skips the rest of the current round and goes to the next one`, [`Stops the whole loop`, `Starts the program again`, `Ends the if statement only`], `The loop does not stop with continue.`],
  [`What does this print? for i in range(1, 8): if i % 2 == 0: continue; print(i)`, `1 3 5 7`, [`2 4 6`, `1 2 3 4 5 6 7`, `1 3 5 7 9`], `Even numbers are skipped, so only the odd numbers are printed.`, flat(`for i in range(1, 8):
    if i % 2 == 0:
        continue
    print(i)`)],
  [`What does this print? for i in range(1, 10): if i == 3: continue; if i == 6: break; print(i)`, `1 2 4 5`, [`1 2 3 4 5`, `1 2 4 5 6`, `4 5`], `3 is skipped by continue, and the loop stops at 6 because of break.`, flat(`for i in range(1, 10):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)`)],
  [`What is printed at the end? count = 0; while True: count += 1; if count == 3: break; then print(count)`, `3`, [`0`, `1`, `Nothing, it never ends`], `while True runs forever, so the break inside decides when to stop.`, `count = 0
while True:
    count += 1
    if count == 3:
        break
print(count)`],
  [`Why is while True used with a break inside?`, `The loop repeats until the break runs`, [`To make the loop run exactly once`, `To avoid writing a condition ever again`, `To skip the loop`], `It is a common pattern for repeating until something happens.`],
  [`What does print("*" * 3) show?`, `***`, [`3`, `* * *`, `*3`], `String repetition does the inner loop for you.`, `print("*" * 3)`],
  [`How many times does the inner line run for i in range(1, 6): for j in range(1, 5): ?`, `20`, [`9`, `10`, `25`], `The inner loop runs 4 times for each of the 5 rounds of the outer loop.`, `count = 0
for i in range(1, 6):
    for j in range(1, 5):
        count += 1
print(count)`],
  [`What does this print? for i in range(1, 4): for j in range(1, 4): print(i * j, end=" "); print()`, `1 2 3 2 4 6 3 6 9`, [`1 4 9`, `1 2 3 4 5 6 7 8 9`, `3 6 9`], `It prints a 3 by 3 multiplication grid, row by row.`, flat(`for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end=" ")
    print()`)],
  [`What does an empty print() do after an inner loop?`, `Ends the line so the next row starts on a new line`, [`Stops the program`, `Prints the number 0`, `Deletes the loop`], `print() with nothing inside only prints a new line.`],
  [`What does for i in range(1, 5): print(i) print?`, `1 2 3 4`, [`1 2 3 4 5`, `0 1 2 3 4`, `2 3 4 5`], `This is the off-by-one mistake: to include 5, use range(1, 6).`, flat(`for i in range(1, 5):
    print(i)`)],
  [`What is printed? for i in range(3): print("inside", i); then print("outside") (not indented)`, `inside 0 inside 1 inside 2 outside`, [`inside 0 outside`, `outside inside 0 inside 1 inside 2`, `inside 3 outside`], `Only the indented line repeats. The line that is not indented runs once at the end.`, flat(`for i in range(3):
    print("inside", i)
print("outside")`)],
  [`Which loop should you use to keep asking for a password until it is correct?`, `A while loop`, [`A for loop with range(1)`, `An if statement only`, `A print statement`], `You do not know how many tries the user will need.`],
  [`Which loop should you use to repeat exactly 10 times?`, `A for loop with range(10)`, [`A while loop with no counter`, `An else block`, `A comment`], `for i in range(10): repeats 10 times.`],
  [`What error appears when the colon is missing at the end of a for line?`, `SyntaxError`, [`NameError`, `IndexError`, `ZeroDivisionError`], `The colon is part of the syntax of for and while.`],
]
