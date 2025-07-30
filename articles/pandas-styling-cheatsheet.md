---
title: Panda styling cheat sheet
author: Xavier Collantes
dateWritten: 2024-01-26
cardDescription: Xavier's published cheat sheet for styling Pandas DataFrames.
cardPageLink: "/articles/pandas-styling-cheatsheet"
imagePath: ""
articleType: BLOG
tagIds: ["bi", "python", "datascience"]
---

## Format the values in the cells

```python
show_drops_df = filtered_df[["Symbol", "Name", "PercentDayChange", "52WeekLow",
							 "ClosingPrice", "52WeekHigh", "MarketCap",
							 "Volume", "Sector", "Industry", "Type",
							 "Exchange"]]
show_drops_df.style \
			 .format(formatter={"PercentDayChange": "{:.1f}%",
							    "52WeekLow": "${:.2f}",
							    "ClosingPrice": "${:.2f}",
							    "52WeekHigh": "${:.2f}",
							    "MarketCap": "${:,.2f}", "Volume": "{:,.0f}"}) \
			 .background_gradient(subset=["PercentDayChange"], cmap="autumn") \
			 .background_gradient(subset=["MarketCap"], cmap="Greens") \
			 .highlight_null(color="gray")
```

## Add highlighting to cells in DataFrame

```python
df = pd.DataFrame(
    {
        "52WeekLow": [1.21, 0.2006, 0.161, 0.1255, 1.07, 1.46, 1.16, 1.12, 1.82, 0.27],
        "ClosingPrice": [3.15, 0.21, 0.19, 0.13, 1.73, 3.0, 1.5, 2.98, 2.09, 1.07],
        "52WeekHigh": [21.0, 13.25, 1.75, 3.45, 5.4, 7.84, 8.7, 71.5, 6.064, 1.75],
    }
)

df.style.background_gradient(subset=["52WeekLow"], cmap="autumn")
	.background_gradient(subset=["52WeekHigh"], cmap="Greens")
	.highlight_null(color="gray")
```

## Add bar chart in DataFrame by row

```python
# https://stackoverflow.com/q/77030320/8278075

df = pd.DataFrame(
    {
        "52WeekLow": [1.21, 0.2006, 0.161, 0.1255, 1.07, 1.46, 1.16, 1.12, 1.82, 0.27],
        "ClosingPrice": [3.15, 0.21, 0.19, 0.13, 1.73, 3.0, 1.5, 2.98, 2.09, 1.07],
        "52WeekHigh": [21.0, 13.25, 1.75, 3.45, 5.4, 7.84, 8.7, 71.5, 6.064, 1.75],
    }
)

for rowIdx, (low, high) in enumerate(zip(df["52WeekLow"], df["52WeekHigh"])):
	df_styler = df_styler.bar(
		subset=pd.IndexSlice[rowIdx, "ClosingPrice"], vmin=low, vmax=high
	)

# Pandas Styler object is HTML and CSS
st.markdown(df_styler.to_html(), unsafe_allow_html=True)
```
