fetch("values.json")
  .then((response) => response.json())
  .then((data) => main(data))
  .catch((error) => console.error("Error fetching the JSON:", error));


function decodeValue(base, value) {
  return parseInt(value, base);
}


function parseInput(data_V) {
  const data = data_V;
  const keys = data.keys;
  const n = keys.n;
  const k = keys.k;
  const points = [];

  for (const key in data) {
    if (key !== "keys") {
      const x = parseInt(key); 
      const y = decodeValue(parseInt(data[key].base), data[key].value); 
      points.push({ x, y });
    }
  }

  return { n, k, points };
}


function lagrangeInterpolation(points, k) {
  let polynomial = 0;

  
  for (let i = 0; i < k; i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        const xj = points[j].x;
        term *= (0 - xj) / (xi - xj); 
      }
    }

    polynomial += term;
  }

  return polynomial;
}


function main(data) {
  const { n, k, points } = parseInput(data);
  const secret = lagrangeInterpolation(points, k);
  console.log("Secret (constant term c):", secret);
}

