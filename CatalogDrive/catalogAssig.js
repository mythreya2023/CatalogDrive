fetch("values.json")
  .then((response) => response.json())
  .then((data) => main(data))
  .catch((error) => console.error("Error fetching the JSON:", error));

// Function to decode the y value from a specified base
function decodeValue(base, value) {
  return parseInt(value, base);
}

// Function to parse the input from a JSON file
function parseInput(data_V) {
  //   const data = JSON.parse(data_V);
  const data = data_V;
  const keys = data.keys;
  const n = keys.n;
  const k = keys.k;
  const points = [];

  for (const key in data) {
    if (key !== "keys") {
      const x = parseInt(key); // x is the key in integer form
      const y = decodeValue(parseInt(data[key].base), data[key].value); // Decode y value
      points.push({ x, y });
    }
  }

  return { n, k, points };
}

// Function to calculate the constant term using Lagrange interpolation
function lagrangeInterpolation(points, k) {
  let polynomial = 0;

  // Implement Lagrange interpolation formula
  for (let i = 0; i < k; i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        const xj = points[j].x;
        term *= (0 - xj) / (xi - xj); // We evaluate at x = 0
      }
    }

    polynomial += term;
  }

  return polynomial;
}

// Main function to execute the process
function main(data) {
  const { n, k, points } = parseInput(data);

  // Calculate the constant term (secret)
  const secret = lagrangeInterpolation(points, k);

  // Print the result
  console.log("Secret (constant term c):", secret);
}

// Run the main function
