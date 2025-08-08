---
title: Streamlit Data Visualization Cheat Sheet
author: Xavier Collantes
dateWritten: 2024-01-26
cardDescription: For Streamlit data platform.
cardPageLink: "/articles/streamlit-cheatsheet"
imagePath: "/assets/images/streamlit/streamlit.gif"
articleType: BLOG
tagIds: ["frontend", "webdev", "bi", "python", "datascience"]
---

Quickly create front ends from Python data notebooks. Official cheat sheet:
[streamlit.io/library/cheatsheet](https://docs.streamlit.io/library/cheatsheet).

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

  # Generate sample data for map
  df = pd.DataFrame(
    [[(c[0] / 100) + 47.66676293891633, ((c[1] / 100) + 117.40216206237741) * -1]
     for c in np.random.randn(20, 2)],
    columns=["lat", "lon"]
  )
  st.map(df)

  if st.checkbox("Show data"):
    st.write(df)


if __name__ == "__main__":
  print("Running")
  main()
```

## Config

`.streamlit/config.toml`

```toml
[server]
port = 80

[browser]
gatherUsageStats = false
```

## Import data

Use data like you would in Python Pandas.

```python
csv_df = pd.read_csv(
  "https://raw.githubusercontent.com/xcollantes/stock_analysis_dataset/main/us_tickers.csv"
)
st.write(csv_df)
```

## Caching

Save resources on costly API calls. Streamlit runs the whole code every time a
user interacts. [Caching documentation](https://docs.streamlit.io/library/advanced-features/caching)

Use `@st.cache_data` decorator on a function to save the contents of the
function such as DataFrames and any serializable data such as ints, floats,
strings.

Streamlit will only run the function if either:

- The input params are different from subsequent runs.
- Code inside the function has changed.

`@st.cache_resource` is for database connections.

## UI Components

### Text and Display

```python
st.title("Main Title")
st.header("Header")
st.subheader("Subheader")
st.text("Fixed-width text")
st.markdown("**Bold** and *italic* text")
st.latex(r"\int_a^b x^2 dx")
st.code("print('Hello world')", language="python")
```

### Input Widgets

```python
# Text inputs
name = st.text_input("Enter your name")
message = st.text_area("Your message")
number = st.number_input("Pick a number", min_value=0, max_value=100)

# Selection widgets
option = st.selectbox("Choose option", ["Option 1", "Option 2", "Option 3"])
options = st.multiselect("Choose multiple", ["A", "B", "C"])
slider_val = st.slider("Select value", 0, 100, 50)
range_vals = st.slider("Select range", 0, 100, (25, 75))

# Boolean inputs
agree = st.checkbox("I agree")
choice = st.radio("Choose one", ["Yes", "No", "Maybe"])
```

### Buttons and Actions

```python
if st.button("Click me"):
  st.write("Button was clicked!")

# Download button
csv = df.to_csv(index=False)
st.download_button("Download CSV", csv, "data.csv", "text/csv")
```

## Charts and Visualizations

```python
import matplotlib.pyplot as plt
import altair as alt

# Line chart
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])
st.line_chart(chart_data)

# Bar chart
st.bar_chart(chart_data)

# Area chart
st.area_chart(chart_data)

# Matplotlib
fig, ax = plt.subplots()
ax.hist(np.random.normal(1, 1, size=100), bins=20)
st.pyplot(fig)

# Altair
chart = alt.Chart(chart_data.reset_index()).mark_circle().encode(
  x="index", y="a", size="b", color="c", tooltip=["index", "a", "b", "c"]
)
st.altair_chart(chart, use_container_width=True)
```

## Session State

Store data across reruns:

```python
# Initialize session state
if "counter" not in st.session_state:
  st.session_state.counter = 0

# Update state
if st.button("Increment"):
  st.session_state.counter += 1

st.write(f"Counter: {st.session_state.counter}")

# Store complex data
if "data" not in st.session_state:
  st.session_state.data = pd.DataFrame()
```

## Layout and Containers

```python
# Sidebar
st.sidebar.title("Sidebar")
sidebar_option = st.sidebar.selectbox("Choose", ["A", "B", "C"])

# Columns
col1, col2, col3 = st.columns([1, 2, 1])
with col1:
  st.write("Column 1")
with col2:
  st.write("Column 2")
with col3:
  st.write("Column 3")

# Tabs
tab1, tab2, tab3 = st.tabs(["Tab 1", "Tab 2", "Tab 3"])
with tab1:
  st.write("Content for tab 1")

# Containers
with st.container():
  st.write("This is inside a container")

# Expander
with st.expander("Click to expand"):
  st.write("Hidden content")
```

## File Operations

```python
# File upload
uploaded_file = st.file_uploader("Choose a file")
if uploaded_file is not None:
  df = pd.read_csv(uploaded_file)
  st.write(df)

# Multiple files
uploaded_files = st.file_uploader("Choose files", accept_multiple_files=True)
for uploaded_file in uploaded_files:
  st.write(f"Filename: {uploaded_file.name}")

# Image upload
image = st.file_uploader("Upload image", type=["png", "jpg", "jpeg"])
if image is not None:
  st.image(image, caption="Uploaded image")
```

## Forms

```python
with st.form("my_form"):
  name = st.text_input("Name")
  age = st.number_input("Age", min_value=0, max_value=120)
  submitted = st.form_submit_button("Submit")

  if submitted:
    st.success(f"Hello {name}, you are {age} years old!")

# Form with file upload
with st.form("file_form"):
  uploaded_file = st.file_uploader("Choose file")
  process = st.form_submit_button("Process File")
```

## Interactive data

The user can change data to affect other parts of the visualization using
`st.data_editor`.

```python
# Editable dataframe
edited_df = st.data_editor(df)

# Data editor with configuration
edited_df = st.data_editor(
  df,
  column_config={
    "price": st.column_config.NumberColumn(
      "Price ($)",
      help="The price in USD",
      min_value=0,
      max_value=1000,
      step=1,
      format="$%d",
    )
  },
  disabled=["name"],  # Make name column read-only
  hide_index=True,
)
```

## Altair library

Streamlit can use the Altair library for advanced visualizations.

## Chat interface

There is a chat UI where the format returns graphs:
[Chat message API](https://docs.streamlit.io/library/api-reference/chat/st.chat_message)

This could be useful when creating a chat bot which can show visualizations.

```python
# Chat interface example
with st.chat_message("user"):
  st.write("Hello 👋")

with st.chat_message("assistant"):
  st.write("Hello human")
  st.bar_chart(np.random.randn(30, 3))

# Chat input
prompt = st.chat_input("Say something")
if prompt:
  st.write(f"User: {prompt}")
```

## Progress and Status

```python
# Progress bar
progress_bar = st.progress(0)
for i in range(100):
  progress_bar.progress(i + 1)

# Status indicators
st.success("Success message")
st.info("Info message")
st.warning("Warning message")
st.error("Error message")

# Spinner
with st.spinner("Loading..."):
  time.sleep(2)
st.success("Done!")

# Balloons and snow
st.balloons()
st.snow()
```

## Deployment

### Streamlit Cloud

1. Push your code to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect your GitHub repository
4. Deploy with one click

### Local deployment

```bash
# Run locally
streamlit run app.py

# Run on specific port
streamlit run app.py --server.port 8080

# Run with custom config
streamlit run app.py --server.address 0.0.0.0
```

### Docker

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8501

CMD ["streamlit", "run", "app.py", "--server.address=0.0.0.0"]
```

## Web page

```python
st.set_page_config(
  page_title="Ex-stream-ly Cool App",
  page_icon="🧊",
  layout="wide",
  initial_sidebar_state="expanded",
)
```

## Key and Secrets management

Existing secrets management tools, such as [dotenv
files](https://pypi.org/project/python-dotenv/), [AWS credentials
files](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials), [Google
Cloud Secret Manager](https://pypi.org/project/google-cloud-secret-manager/),
or [Hashicorp Vault](https://www.vaultproject.io/use-cases/secrets-management),
will work fine in Streamlit. We just add native secrets management for times
when it's useful.
