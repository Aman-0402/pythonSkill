// Session 4: Conditional Statements
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]
export default [
  [`What is a condition in Python?`, `An expression that gives True or False`, [`A loop that repeats forever`, `A comment about the code`, `A kind of variable name`], `A conditional statement runs its block only when the condition is True.`],
  [`Which statement should you use when there are several ways to go?`, `if ... elif ... else`, [`A single if only`, `while True`, `print()`], `Use elif for more than two choices.`],
  [`Which character must end the line of an if statement?`, `A colon (:)`, [`A semicolon (;)`, `A full stop (.)`, `A comma (,)`], `if age >= 18: ends with a colon.`],
  [`How does Python know which lines belong to an if block?`, `They are indented`, [`They are inside curly brackets`, `They end with a semicolon`, `They start with the word then`], `Python uses indentation instead of brackets. Use 4 spaces for each level.`],
  [`How many spaces are normally used for one level of indentation?`, `4`, [`1`, `8`, `0`], `Use the same amount for the whole block, normally 4 spaces.`],
  [`How many lines are printed? age = 20; if age >= 18: print("You can vote"); then print("Done") is written without indentation`, `2`, [`1`, `0`, `3`], `You can vote is inside the if block and Done is outside it. Both run here, because 20 >= 18. The line that is not indented runs every time.`, `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    age = 20
    if age >= 18:
        print("You can vote")
    print("Done")
print(len(buf.getvalue().splitlines()))`],
  [`How many lines are printed? marks = 30; if marks >= 40: print("Pass"); then print("Result checked") is written without indentation`, `1`, [`2`, `0`, `3`], `The if block is skipped because 30 is less than 40, but Result checked is outside the block, so it still prints.`, `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    marks = 30
    if marks >= 40:
        print("Pass")
    print("Result checked")
print(len(buf.getvalue().splitlines()))`],
  [`What error appears when the line after if age >= 18: is not indented?`, `IndentationError`, [`NameError`, `ZeroDivisionError`, `ValueError`], `Python expects an indented block after the colon.`],
  [`What happens in an if ... else statement?`, `Exactly one of the two blocks runs`, [`Both blocks always run`, `Neither block runs`, `The else block runs first`], `else runs when the condition is False.`],
  [`Does else have its own condition?`, `No`, [`Yes, it always needs one`, `Yes, but only with numbers`, `Only when it follows elif`], `else catches everything that is left. It needs no condition.`],
  [`What is printed? number = 7; if number % 2 == 0: print("Even") else: print("Odd")`, `Odd`, [`Even`, `7`, `Nothing`], `7 % 2 is 1, so the condition is False and the else block runs.`, `number = 7
if number % 2 == 0:
    print("Even")
else:
    print("Odd")`],
  [`What does elif stand for?`, `else if`, [`end if`, `else loop`, `each if`], `elif checks another condition only if the earlier ones were False.`],
  [`What grade is printed for marks = 82? The ladder is: >= 90 A+, >= 75 A, >= 60 B, >= 40 C, else Fail`, `Grade A`, [`Grade A+`, `Grade B`, `Fail`], `82 is not >= 90, but it is >= 75, so Grade A is printed and the rest is skipped.`, `marks = 82
if marks >= 90:
    print("Grade A+")
elif marks >= 75:
    print("Grade A")
elif marks >= 60:
    print("Grade B")
elif marks >= 40:
    print("Grade C")
else:
    print("Fail")`],
  [`How many blocks of an if ... elif ... else ladder run?`, `Only one`, [`All of them`, `Every block whose condition is True`, `At least two`], `Python runs the first block whose condition is True and skips the rest.`],
  [`Where does else go in an if ... elif ... else ladder?`, `Last`, [`First`, `In the middle`, `Anywhere`], `else is optional and always comes last.`],
  [`What is printed? marks = 82; if marks >= 40: print("Grade C") elif marks >= 75: print("Grade A")`, `Grade C`, [`Grade A`, `Both Grade C and Grade A`, `Nothing`], `The first test is True for 82, so the better grade is never reached. Put the most specific condition first.`, `marks = 82
if marks >= 40:
    print("Grade C")
elif marks >= 75:
    print("Grade A")`],
  [`Which condition should come first in an elif ladder for grades?`, `The most specific one, such as marks >= 90`, [`The easiest one, such as marks >= 40`, `The else block`, `It does not matter`], `Because Python stops at the first True condition, the order matters.`],
  [`x = 15. How many lines are printed by two separate if statements, if x > 10 and if x > 5, each printing a message?`, `2`, [`1`, `0`, `3`], `Separate if statements are all checked. Both conditions are True, so both messages print.`, `x = 15
count = 0
if x > 10:
    count += 1
if x > 5:
    count += 1
print(count)`],
  [`x = 15. How many lines are printed if the second check is elif x > 5 instead of a separate if?`, `1`, [`2`, `0`, `3`], `An elif is checked only if the earlier ones were False. The first one is True, so the elif is skipped.`, `x = 15
count = 0
if x > 10:
    count += 1
elif x > 5:
    count += 1
print(count)`],
  [`What is a nested condition?`, `An if inside another if`, [`Two if statements on one line`, `An if with no colon`, `A loop inside an else`], `The inner check happens only if the outer one is True.`],
  [`What is printed? age = 25; has_id = True; outer if age >= 18, inner if has_id prints Entry allowed, inner else prints Show your ID`, `Entry allowed`, [`Show your ID`, `Too young`, `Nothing`], `The outer condition is True and the inner condition is True.`, `age = 25
has_id = True
if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("Show your ID")
else:
    print("Too young")`],
  [`When is a nested if better than using and?`, `When you need a different message for each failure`, [`When you only need both checks to pass`, `Never`, `When there is only one condition`], `and is shorter when both checks simply need to pass. Nesting lets you react to each failure separately.`],
  [`What is the largest of a, b, c = 12, 45, 30 found with nested ifs?`, `45`, [`12`, `30`, `87`], `a is not the largest, and b is greater than c, so b (45) is largest.`, `a, b, c = 12, 45, 30
if a >= b:
    if a >= c:
        print(a)
    else:
        print(c)
else:
    if b >= c:
        print(b)
    else:
        print(c)`],
  [`What does print(18 <= age <= 60) show when age = 30?`, `True`, [`False`, `30`, `An error`], `Python allows a range check written like in maths.`, `age = 30
print(18 <= age <= 60)`],
  [`What is printed? letter = "e"; if letter in "aeiou": print("Vowel") else: print("Consonant")`, `Vowel`, [`Consonant`, `e`, `Nothing`], `in checks whether e is one of the characters in aeiou.`, `letter = "e"
if letter in "aeiou":
    print("Vowel")
else:
    print("Consonant")`],
  [`What is printed? name = ""; if name: print("Hello", name) else: print("Name is empty")`, `Name is empty`, [`Hello`, `Hello `, `Nothing`], `An empty string counts as False, so the else block runs.`, `name = ""
if name:
    print("Hello", name)
else:
    print("Name is empty")`],
  [`Which of these values counts as False in a condition?`, `0`, [`1`, `"False"`, `-1`], `0, an empty string, None and an empty list count as False. The text "False" is a non-empty string, so it counts as True.`],
  [`Why use answer.lower() == "yes" in a condition?`, `So that YES, Yes and yes all work`, [`To make the answer a number`, `To make the program faster`, `Because == does not work with strings`], `Text comparison is case-sensitive, so convert to lower case first.`],
  [`What is the value of status? age = 20; status = "adult" if age >= 18 else "minor"`, `adult`, [`minor`, `True`, `20`], `The one-line if picks the value before if when the condition is True.`, `age = 20
status = "adult" if age >= 18 else "minor"
print(status)`],
  [`Which line is written correctly?`, `if age == 18:`, [`if age = 18:`, `if age == 18`, `if (age == 18) then:`], `Use == to compare, and end the line with a colon.`],
  [`What error does if age = 18: cause?`, `SyntaxError`, [`NameError`, `IndentationError`, `TypeError`], `= is assignment, so it cannot be used in a condition. Use ==.`],
  [`What error appears for age = "20" followed by if age >= 18: ?`, `TypeError`, [`SyntaxError`, `IndentationError`, `NameError`], `You cannot compare text with a number. Convert with int(age) first.`],
  [`Why must you convert input() with int() before comparing it to a number?`, `Because input() always returns text`, [`Because int() makes the program faster`, `Because numbers cannot be compared`, `Because input() returns a list`], `Text and numbers cannot be compared with >= or <=.`],
  [`Which of these is a leap year rule?`, `Divisible by 4 and not by 100, or divisible by 400`, [`Divisible by 2`, `Divisible by 10`, `Divisible by 4 only`], `2024 is a leap year, 1900 is not, and 2000 is.`],
  [`What is the result of 2024 being a leap year with the rule (year % 4 == 0 and year % 100 != 0) or year % 400 == 0 ?`, `True`, [`False`, `2024`, `An error`], `2024 is divisible by 4 and not by 100.`, `year = 2024
print((year % 4 == 0 and year % 100 != 0) or year % 400 == 0)`],
  [`What is printed? x = 7; if x > 5: (if x > 10: print "A" else: print "B") else: print "C"`, `B`, [`A`, `C`, `Nothing`], `x > 5 is True, x > 10 is False, so the inner else prints B.`, `x = 7
if x > 5:
    if x > 10:
        print("A")
    else:
        print("B")
else:
    print("C")`],
]
