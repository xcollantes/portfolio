---
title: Handling JSON objects in Python
author: Xavier Collantes
dateWritten: 2024-01-26
cardDescription: Xavier's cheat sheet for working with JSON in Python.
cardPageLink: "/articles/json-python"
imagePath: ""
articleType: BLOG
tagIds: ["python", "datascience"]
---

## Reading JSON file

Instead of using `readline()` or similar command to read
a file object, use `json.load([file object])`.

```python
with open(read_file_path, "r") as read_file:
    read_json = json.load(read_file)
```

Load will return dictionary or list type object which Python can understand.

## Writing to JSON file

Instead of using `write()` output to a file object,
use `json.dump([dictionary or list object], [file object])`.

```python
with open(write_file_path, "w") as write_file:
    json.dump(write_file, indent=4, default=str)
```

Dump will write the dictionary type object to JSON type objects.

Specify `default` to be safe when writing out values that cannot translate from
Dictionary to JSON.

## Using JSON on command line

```bash
python3 -m json.tool [somefile.json] --indent 4
```

Quickly format JSON file and print out to new file:

```bash
echo [somefile.txt] | python3 -m json.tool --indent [4] > [somefile.json]
```
