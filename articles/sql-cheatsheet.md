---
title: SQL Optimizations Cheat Sheet
author: Xavier Collantes
dateWritten: 2023-09-10
articleType: BLOG
cardDescription: Quick ways to optimize SQL code.
cardPageLink: "/articles/sql-cheatsheet"
imagePath: ""
tagIds: ["sql", "data", "bi"]
---

## SQL query optimizations

### Fewer GROUP BY args

Use `ANY_VALUE` instead of:

```sql
SELECT name, age, location, SUM(salary)
FROM Table
GROUP BY name, age, location;
```

Use fewer `GROUP BY` args:

```sql
SELECT name, ANY_VALUE(age), ANY_VALUE(location), SUM(salary)
FROM Table
GROUP BY name;
```

Source: Google Engineer.

### Use LIMIT

Instead of viewing the entire table, use `LIMIT` to get a subsection of the
table.

### Avoid using too many JOINs

When possible, use `LEFT JOIN` as opposed to using `FULL JOIN`s.
