---
title: Streamlit data visualization cheat sheet
author: Xavier Collantes
dateWritten: 2024-01-26
cardDescription: Xavier's published cheat sheet for Streamlit data platform.
cardPageLink: "/articles/streamlit-cheatsheet"
imagePath: ""
articleType: BLOG
tagIds: ["frontend", "ux", "ui", "webdev", "bi", "python", "datascience"]
---

Quickly create front ends from Python data notebooks. Official cheat sheet:
https://docs.streamlit.io/library/cheatsheet.

## Quick start

```bash
# Install streamlit
python3 -m venv env
env/bin/pip install pip --upgrade
env/bin/pip install streamlit

# Create Python files
touch main.py

# Add contents to file

# Run file
env/bin/streamlit run main.py
```

## Example

```python
import streamlit as st
import pandas as pd
import numpy as np

def main() -> None:
	st.title("Quick start example")
	st.header("Show graphs")
	st.subheader("Graphs")
	st.write("**Markdown supported**")

	df = pd.DataFrame(
		[[(c[0] / 100) + 47.66676293891633, ((c[1] / 100) + 117.40216206237741) * -1] for c in np.random.randn(20, 2)],
		columns=["lat", "lon"])
	st.map(df)

	if st.checkbox("Show data"):
		st.write(df)


if __name__ == "__main__":
	print("Running")
	main()
```

## Config

`.streamlit/config.toml`

```
[server]
port = 80

[browser]
gatherUsageStats = false
```

## Import data

Use data like you would in Python Pandas.

```python
csv_df = pd.read_csv("https://raw.githubusercontent.com/xcollantes/stock_analysis_dataset/main/us_tickers.csv")
st.write(csv_df)
```

## Caching

Save resources on costly API calls. Streamlit runs the whole code every time a
user interacts. https://docs.streamlit.io/library/advanced-features/caching

Use `@st.cache_data` decorator on a function to save the contents of the
function such as DataFrames and any serializable data such as ints, floats,
strings.

Streamlit will only run the function if either:

- The input params are different from subsequent runs.
- Code inside the function has changed.

`@st.cache_resource` is for database connections.

## Interactive data

The user can change data to affect other parts of the visualization using
`st.data_editor`.

![](streamlit_cheatsheet-1692314810496.jpeg)

## Altair library

Streamlit can use the Altair library.

## Chat interface

There is a chat UI where the format returns graphs:
https://docs.streamlit.io/library/api-reference/chat/st.chat_message

This could be useful when creating a chat bot which can show visualizations.

## Web page

```python
st.set_page_config(
   page_title="Ex-stream-ly Cool App",
   page_icon="🧊",
   layout="wide",
   initial_sidebar_state="expanded",
)
```

## Key and Secrets managements

Existing secrets management tools, such as [dotenv
files](https://pypi.org/project/python-dotenv/), [AWS credentials
files](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials), [Google
Cloud Secret Manager](https://pypi.org/project/google-cloud-secret-manager/),
or [Hashicorp Vault](https://www.vaultproject.io/use-cases/secrets-management),
will work fine in Streamlit. We just add native secrets management for times
when it's useful.
