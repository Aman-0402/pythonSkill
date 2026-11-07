def read_number(prompt):
    while True:
        text = input(prompt)
        if text.isdigit():
            return int(text)
        print("Please type a whole number")

age = read_number("Age: ")
print("Next year you will be", age + 1)
