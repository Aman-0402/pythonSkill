students = {}
commands = [
    "add Aman 90 80 70",
    "add Ankit 85 95 88",
    "add Aman 100",
    "report",
    "topper",
    "remove Ankit",
    "remove Zed",
    "report",
    "dance",
    "quit",
]

for command in commands:
    print(">", command)
    parts = command.split()
    action = parts[0]

    if action == "add":
        name = parts[1]
        marks = [int(x) for x in parts[2:]]
        students.setdefault(name, []).extend(marks)
        print("Added marks for", name, marks)
    elif action == "report":
        for name, marks in students.items():
            print(name, sum(marks), round(sum(marks) / len(marks), 1))
    elif action == "topper":
        best = max(students, key=lambda n: sum(students[n]) / len(students[n]))
        print("Topper:", best)
    elif action == "remove":
        name = parts[1]
        if name in students:
            del students[name]
            print("Removed", name)
        else:
            print("No such student")
    elif action == "quit":
        print("Bye")
        break
    else:
        print("Unknown command")
