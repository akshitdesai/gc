import pandas as pd
import matplotlib.pyplot as plt

# Load the csv file into a pandas dataframe
df = pd.read_csv('/content/sample_data/table_firstfit_4.csv')

# Extract the values of n and probabilities
n_values = df['n']
p25_values = df['0.25']
p50_values = df['0.5']
p75_values = df['0.75']

# Plot the graph
plt.plot(n_values, p25_values, label='p=0.25')
plt.plot(n_values, p50_values, label='p=0.50')
plt.plot(n_values, p75_values, label='p=0.75')
plt.xlabel('Number of vertices (n)')
plt.ylabel('Competitve ratio')
plt.title('n versus competitve ratio for different Values of p')
plt.legend()

plt.grid(True, which='both', linestyle='--')

plt.show()