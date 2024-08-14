---
title: A simple way to get the dominant color of an image in python
excerpt: Get the dominant color from an object image 
publishDate: 'Aug 9 2024'
tags:
  - Guide
seo:
  image:
    src: '/dominant-color.jpg'
    alt: A person standing at the window
---

![A person standing at the window](/dominant-color.jpg)

## Overview

In this post, we'll explore how to extract the dominant color from an object in an image using three open-source Python libraries. We'll guide you through the following steps:

1. **Remove the background** of the image, isolating the object of interest.
2. **Extract the dominant color code** from the object.
3. **Retrieve the color name** corresponding to the extracted color code.

## Execution

### 1. Setting Up the Environment

First, let's create a virtual environment to isolate our dependencies. We'll use Python 3.9 for this example:

```bash
pyenv virtualenv 3.9 dominant-color
```

### 2. Removing the Background

To begin, we'll use the `rembg` library to remove the background from the image.

**Install the `rembg` package**:

```bash
pip install rembg
```

**Remove the background** from the image:

```python
from rembg import remove

input_path = 'input.png'
output_path = 'output.png'

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input = i.read()
        output = remove(input)
        o.write(output)
```

You can also run this process directly from the terminal. For more details, visit the [`rembg` repository](https://github.com/danielgatis/rembg).

### 3. Retrieving the Dominant Color Code

Next, we'll use the `colorthief` library to extract the dominant color code from the object.

**Install the `colorthief` package**:

```bash
pip install colorthief
```

**Get the dominant color code**:

```python
from colorthief import ColorThief

color_thief = ColorThief('/path/to/imagefile')
# get the dominant color
dominant_color = color_thief.get_color(quality=1)
```

The `colorthief` library can also generate a color palette. For more details, visit the [ColorThief project page](https://github.com/fengsp/color-thief-py).

### 4. Retrieving the Color Name

Finally, we'll use the `colornamer` library to retrieve the color name corresponding to the dominant color code.

**Install the `colornamer` package**:

```bash
pip install colornamer
```

**Get the color name**:

```python
from colornamer import get_color_from_rgb

get_color_from_rgb([5, 135, 210])
```

For more information on how to interpret the results, visit the [`colornamer` repository](https://github.com/kevinwuhoo/colornamer).

## Acknowledgments

This post was inspired by the excellent work found in the [`rembg`](https://github.com/danielgatis/rembg), [`ColorThief`](https://github.com/fengsp/color-thief-py), and [`colornamer`](https://github.com/kevinwuhoo/colornamer) repositories.
