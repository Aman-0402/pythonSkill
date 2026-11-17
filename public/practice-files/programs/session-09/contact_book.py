contacts = {}
commands = [
    "add Aman 9876543210 aman@mail.com",
    "add Ankit 9123456780 riya@mail.com",
    "add Amit 9000000001 amit@mail.com",
    "search am",
    "update Aman phone 9000000000",
    "list",
    "delete Ankit",
    "delete Zed",
    "list",
    "quit",
]

for command in commands:
    print(">", command)
    parts = command.split()
    action = parts[0]

    if action == "add":
        contacts[parts[1]] = {"phone": parts[2], "email": parts[3]}
        print("Saved", parts[1])
    elif action == "search":
        found = [n for n in contacts if parts[1].lower() in n.lower()]
        print(sorted(found) if found else "Nothing found")
    elif action == "update":
        name, field, value = parts[1], parts[2], parts[3]
        if name in contacts and field in contacts[name]:
            contacts[name][field] = value
            print("Updated", name)
        else:
            print("Cannot update")
    elif action == "delete":
        if contacts.pop(parts[1], None) is None:
            print("No such contact")
        else:
            print("Deleted", parts[1])
    elif action == "list":
        for name in sorted(contacts):
            info = contacts[name]
            print(f"{name:<8}{info['phone']:<12}{info['email']}")
    elif action == "quit":
        print("Bye")
        break
