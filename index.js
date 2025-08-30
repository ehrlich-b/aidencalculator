/*
The naming procedure for large numbers is based on taking the number n occurring in 103n+3 (short scale) or 106n (long scale) and concatenating Latin roots for its units, tens, and hundreds place, together with the suffix -illion. In this way, numbers up to 103·999+3 = 103000 (short scale) or 106·999 = 105994 (long scale) may be named. The choice of roots and the concatenation procedure is that of the standard dictionary numbers if n is 9 or smaller. For larger n (between 10 and 999), prefixes can be constructed based on a system described by Conway and Guy.[15] Today, sexdecillion and novemdecillion are standard dictionary numbers and, using the same reasoning as Conway and Guy did for the numbers up to nonillion, could probably be used to form acceptable prefixes. The Conway–Guy system for forming prefixes:

Units	Tens	Hundreds
1	Un	N Deci	NX Centi
2	Duo	MS Viginti	N Ducenti
3	Tre (*)	NS Triginta	NS Trecenti
4	Quattuor	NS Quadraginta	NS Quadringenti
5	Quinqua	NS Quinquaginta	NS Quingenti
6	Se (*)	N Sexaginta	N Sescenti
7	Septe (*)	N Septuaginta	N Septingenti
8	Octo	MX Octoginta	MX Octingenti
9	Nove (*)	Nonaginta	Nongenti
(*) ^ When preceding a component marked S or X, "tre" changes to "tres" and "se" to "ses" or "sex"; similarly, when preceding a component marked M or N, "septe" and "nove" change to "septem" and "novem" or "septen" and "noven".
Since the system of using Latin prefixes will become ambiguous for numbers with exponents of a size which the Romans rarely counted to, like 106,000,258, Conway and Guy co-devised with Allan Wechsler the following set of consistent conventions that permit, in principle, the extension of this system indefinitely to provide English short-scale names for any integer whatsoever.[15] The name of a number 103n+3, where n is greater than or equal to 1000, is formed by concatenating the names of the numbers of the form 103m+3, where m represents each group of comma-separated digits of n, with each but the last "-illion" trimmed to "-illi-", or, in the case of m = 0, either "-nilli-" or "-nillion".[15] For example, 103,000,012, the 1,000,003rd "-illion" number, equals one "millinillitrillion"; 10^33,002,010,111, the 11,000,670,036th "-illion" number, equals one "undecillinilli­septua­ginta­ses­centi-lli,­sestrigint­illion"; and 10^29,629,629,633, the 9,876,543,210th "-illion" number, equals one "nonilli,se­-septua­ginta-­octingent-illi,tres­quadra­ginta­quingentillideciducent­illion".
*/

function normalizeExponent(exponent) {
    return Math.floor((exponent - 3) / 3);
}

function processTriple(triple) {
    if (triple === 0) {
        return "nilli";
    }

    // Special cases for small triples, for example "9" needs to return "non" as in "nonillion" and not "nove".
    // All of these will be suffixed with "illi" or "illion" as appropriate.
    let numberPrefix = "";

    switch (triple) {
        case 1:
            numberPrefix = "m";
            break;
        case 2:
            numberPrefix = "b";
            break;
        case 3:
            numberPrefix = "tr";
            break;
        case 4:
            numberPrefix = "quadr";
            break;
        case 5:
            numberPrefix = "quint";
            break;
        case 6:
            numberPrefix = "sext";
            break;
        case 7:
            numberPrefix = "sept";
            break;
        case 8:
            numberPrefix = "oct";
            break;
        case 9:
            numberPrefix = "non";
            break;
        default:
    }

    if (numberPrefix !== "") {
        return numberPrefix + "illi";
    }

    // Use the `numberPrefix` variable as needed in your code
    //Quinqua has been changed to quin, this seems to be an inconsistency in the wikipedia article - we're told to use quinqua for 5 in the units place but then all the examples use quin.
    const units = ["un", "duo", "tre", "quattuor", "quin", "se", "septe", "octo", "nove"];
    const tens = ["deci", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"];
    const hundreds = ["centi", "ducenti", "trecenti", "quadringenti", "quingenti", "sescenti", "septingenti", "octingenti", "nongenti"];
    const treSeSpecialEnding = new Set([1,2,3,4,5,7]); // The indexes for which we postfix tre and se with "s"
    const septeNoveSpecialEnding = new Set([0,1,2,3,4,5,6,7,8]); // The indexes for which we postfix septe and nove with "n"

    const tripleString = triple.toString();
    let result = "";

    const numbers = tripleString.split("").reverse().map((num) => parseInt(num));
    for (let i = 0; i < numbers.length; i++) {
        const normalizedLookupIndex = numbers[i] - 1;
        const current = numbers[i];
        if (current === 0) {
            // Don't add anything for 0
            continue;
        }
        const unitsSpecialEndingsProcessor = (i) => {
            if ((normalizedLookupIndex === 2 || normalizedLookupIndex === 5) && treSeSpecialEnding.has(numbers[i + 1] - 1)) {
                return "s";
            } else if ((normalizedLookupIndex === 6 || normalizedLookupIndex === 8) && septeNoveSpecialEnding.has(numbers[i + 1] - 1)) {
                return "n";
            }
            return "";
        }
        switch (i) {
            case 0:
                if (numbers.length == 3) {
                    result = units[normalizedLookupIndex];
                    result += unitsSpecialEndingsProcessor(i);
                } else {
                    result = units[normalizedLookupIndex];
                    result += unitsSpecialEndingsProcessor(i);
                }
                break;
            case 1:
                result += tens[normalizedLookupIndex];
                break;
            case 2:
                result += hundreds[normalizedLookupIndex];
                break;
            default:
        }
    }

    // Now, we always end up with a string with one extra character at the end, so we need to remove it. For example "trentriginta" needs to be "tretrigintillion", not "tretrigintaillion".
    result = result.slice(0, -1);

    return result + "illi";
}

// Converts an exponent 10^[exponent] to a number name, 12 -> "trillion", 48 -> "quindecillion", 303 -> "centillion"
function getNumberName(exponent) {
    const illionNumber = normalizeExponent(exponent);
    const illionString = illionNumber.toString();
    const paddedString = illionString.padStart(Math.ceil(illionString.length / 3) * 3, '0');
    const triples = [];
    for (let i = 0; i < paddedString.length; i += 3) {
        triples.push(paddedString.slice(i, i + 3));
    }
    const processedTriples = triples.map((triple) => processTriple(parseInt(triple)));
    const result = processedTriples.join("");

    return result + "on";
}

function measureMonospaceCharWidth(elem) {
    const testSpan = document.createElement('span');
    testSpan.style.fontFamily = elem.style.fontFamily;
    testSpan.style.fontSize = elem.style.fontSize;
    testSpan.style.fontWeight = elem.style.fontWeight; // Ensure font weight is considered
    testSpan.style.letterSpacing = elem.style.letterSpacing; // Consider letter spacing if any
    testSpan.style.position = 'absolute';
    testSpan.style.whiteSpace = 'nowrap'; // Ensure the span does not wrap
    testSpan.style.visibility = 'hidden';
    testSpan.textContent = '0'; // Use a single '0' character
    document.body.appendChild(testSpan);
    const width = testSpan.offsetWidth + 2;
    document.body.removeChild(testSpan);
    return width;
}

const element = document.getElementById('display');
var displayWidthInCharacters = 0;

function updateDisplayWidth() {
    displayWidthInCharacters = Math.floor(element.offsetWidth / measureMonospaceCharWidth(element));
}

window.addEventListener('resize', updateDisplayWidth);
updateDisplayWidth();

const scientificFmt = {
    notation: 'scientific',
    maximumFractionDigits: 10,
};

var currentValue = 0n;
var currentOperator = null;
function displayCurrentValue() {
    let maxValue = BigInt("9".repeat(displayWidthInCharacters));
    let toDisplay = currentValue;
    if (displayOperator) {
        toDisplay = operator;
    }

    if (BigInt(toDisplay) > maxValue) {
        element.textContent = toDisplay.toLocaleString( 'en-US', scientificFmt );
    } else {
        element.textContent = toDisplay.toString();
    }
    sayIt();
}

function formatBigIntWithDecimal(bigint) {
    let str = bigint.toString();

    // Ensure the string is at least 12 characters long, padding with zeros if necessary
    // This is to handle cases where bigint is smaller and needs padding to get 10 decimal places
    str = str.padEnd(12, '0');

    // Insert the decimal point after the first digit
    const result = str.slice(0, 1) + '.' + str.slice(1, 11);

    return result;
  }

function clearDisplay() {
    currentValue = 0n;
    currentOperator = null;
    displayOperator = false;
    displayCurrentValue();
}

function sayIt() {
    // getNumberName
    // Call get number name on the current value, and display it in <div class="display" id="num_display">12345678901234567890123456789012345678901234567890</div>
    const numDisplay = document.getElementById('num_display');
    numDisplay.textContent = formatBigIntWithDecimal(currentValue) + " " + getNumberName(currentValue.toString().length);
}

var operator = 0n;
var displayOperator = false;
function appendOperator(newOperator) {
    currentOperator = newOperator;
    displayOperator = true;
    operator = 0n;
    displayCurrentValue();
}

function appendNumber(number) {
    if (displayOperator) {
        operator = operator * 10n + BigInt(number);
    } else {
        currentValue = currentValue * 10n + BigInt(number);
    }
    displayCurrentValue();
}

function calculate() {
    switch (currentOperator) {
        case "+":
            currentValue = currentValue + operator;
            break;
        case "-":
            currentValue = currentValue - operator;
            break;
        case "*":
            currentValue = currentValue * operator;
            break;
        case "/":
            currentValue = currentValue / operator;
            break;
        default:
            return; // No operator, nothing to do
    }
    displayOperator = false;
    displayCurrentValue();
}

clearDisplay();

