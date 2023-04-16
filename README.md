### Analysis of First Fit and CBIP Algorithms on Online Graph Coloring - COMP-6651 Project Winter 2023

*Interactive GUI for this project can be found [here](https://akshitdesai.github.io/gc).* 

# Contents

1. [File Structure](#File-Structure)
2. [How to Run](#How-to-Run)
   - [Analysis](#Analysis) 
   - [GUI](#Animal-With-Attributes-2)


# File Structure

We implmented the graph generation, first fit and CBIP in bothe `Jasvscript` and `C++`. One for the GUI and one for the analysis purposes. You can find the desired find through the below table:

|              | Graph Geneartion | First Fit | CBIP     | Benchmarking |
|--------------|------------------|-----------|----------|--------------|
| `C++`        | [link](https://github.com/akshitdesai/gc/blob/main/cpp/analysis.cpp#L176)         | [link](https://github.com/akshitdesai/gc/blob/main/cpp/analysis.cpp#L77)  | [link](https://github.com/akshitdesai/gc/blob/main/cpp/analysis.cpp#L107) | [link](https://github.com/akshitdesai/gc/blob/main/cpp/analysis.cpp#L346)     |
| `JavaScript` | [link](https://github.com/akshitdesai/gc/blob/main/src/generator.js#L22)         | [link](https://github.com/akshitdesai/gc/blob/main/src/first_fit.js)  | [link](https://github.com/akshitdesai/gc/blob/main/src/cbip.js) | -    |

# How to Run

The project can be divided into mainly two parts. One being GUI and second being `C++` program to perform analysis. Instructions to run both are below:

## Analysis

In the [cpp](https://github.com/akshitdesai/gc/tree/main/cpp) directory you can find two programs: [`main.cpp`](https://github.com/akshitdesai/gc/tree/main/cpp) and [`analysis.cpp`](https://github.com/akshitdesai/gc/blob/main/cpp/analysis.cpp). `main.cpp` implmentes the first fit and CBIP algorithm and runs it on a sample given in the project defination document. `analysis.cpp` contains random graph generation in addition to first fit and CBIP algorithm. Running `analysis.cpp` will create `csv` files in `csvs/` directory containing average competitive ratio over `100` runs for a random k-colrable graph with probabilty `p` of adding edges. To run any of the file you will need `g++` installed. **Please note that `stdc++17` is required to compile and run `analysis.cpp`**.

## GUI

It is a react app and it can be run like anyother react project. In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

