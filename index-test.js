// Extract the CSV data from the code comment block
const csvData = `
6,million
9,billion
12,trillion
15,quadrillion
18,quintillion
21,sextillion
24,septillion
27,octillion
30,nonillion
33,decillion
36,undecillion
39,duodecillion
42,tredecillion
45,quattuordecillion
48,quindecillion
51,sedecillion
54,septendecillion
57,octodecillion
60,novendecillion
63,vigintillion
66,unvigintillion
69,duovigintillion
72,tresvigintillion
75,quattuorvigintillion
78,quinvigintillion
81,sesvigintillion
84,septemvigintillion
87,octovigintillion
90,novemvigintillion
93,trigintillion
96,untrigintillion
99,duotrigintillion
102,trestrigintillion
105,quattuortrigintillion
108,quintrigintillion
111,sestrigintillion
114,septentrigintillion
117,octotrigintillion
120,noventrigintillion
123,quadragintillion
153,quinquagintillion
183,sexagintillion
213,septuagintillion
243,octogintillion
273,nonagintillion
303,centillion
306,uncentillion
333,decicentillion
336,undecicentillion
363,viginticentillion
366,unviginticentillion
393,trigintacentillion
423,quadragintacentillion
453,quinquagintacentillion
483,sexagintacentillion
513,septuagintacentillion
543,octogintacentillion
573,nonagintacentillion
603,ducentillion
903,trecentillion
1203,quadringentillion
1503,quingentillion
1803,sescentillion
2103,septingentillion
2403,octingentillion
2703,nongentillion
3003,millinillion
33002010111,undecillinilliseptuagintasescentillisestrigintillion
29629629633,nonilliseseptuagintaoctingentillitresquadragintaquingentillideciducentillion
`;

// Split the CSV data into rows
const rows = csvData.trim().split('\n');

// Create a JavaScript map and populate it with the data from the CSV
const csvMap = new Map();
rows.forEach(row => {
    const [exponent, name] = row.split(',');
    csvMap.set(Number(exponent), name);
});

function runTests() {
    const results = [];

    // Iterate over the CSV map
    csvMap.forEach((name, exponent) => {
        // Call the getNumberName function with the exponent
        const actual = getNumberName(exponent);
        const expected = name;

        // Compare the expected and actual values
        const result = { expected, actual, exponent };
        if (expected !== actual) {
            results.push(result);
        }
    });

    // Return the results
    return results;
}

  // Run the tests and print the results
  const testResults = runTests();
  console.log(testResults);
