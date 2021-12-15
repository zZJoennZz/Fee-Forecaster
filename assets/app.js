var formatter = new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',
//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
//populate the table for 10% increase
function computeTable () {
var tenPerYr = document.getElementsByClassName("tenPYr")[0];
var fifPerYr = document.getElementsByClassName("fifPYr")[0];
var tenWkIn = document.getElementsByClassName("tenWkIn")[0];
var fifWkIn = document.getElementsByClassName("fifWkIn")[0];

var numOfYr = [1, 2, 3, 4, 5, 6, 7, 8];
var multiplyBy = 1.1;
var multiplyBy1 = 1.15;

var ctPerWk = document.getElementById("ct-per-week").value;
var noOfWks = document.getElementById("num-of-weeks").value;
var feePerSs = document.getElementById("fee-per-session").value;

var toBeRendered = [];
var tblObj = [];

for (let i = 0; i < 8; i++) {
    let loopBefore = i-1;
    let computeNext;
    let computedNext;
    if (i === 0) {
    computeNext = feePerSs * multiplyBy;
    //computedNext = roundToTwo(computeNext);
    tblObj.push({'current' : parseFloat(feePerSs), 'next' : parseFloat(computeNext)});
    } else {
    let nextBefore = tblObj[loopBefore]["next"];
    computeNext = nextBefore * multiplyBy;
    //computedNext = roundToTwo(computeNext, 1);
    tblObj.push({'current' : parseFloat(nextBefore), 'next' : parseFloat(computeNext)});
    }
}

for (let i = 0; i < 8; i++) {
    toBeRendered += "<tr><td>" + numOfYr[i] + "</td><td>" + roundToTwo(tblObj[i]["current"]) + "</td><td>" + roundToTwo(tblObj[i]["next"]) + "</td></tr>";
}

tenPerYr.innerHTML = toBeRendered;

var incomeComp = [];
for (let i = 0; i < 8; i++) {
    let weeklyIncome = parseFloat(tblObj[i]["current"]) * parseFloat(ctPerWk);
    let yearlyIncome = parseFloat(weeklyIncome) * parseFloat(noOfWks);
    incomeComp += "<tr><td>" + numOfYr[i] + "</td><td>" + roundToTwo(weeklyIncome) + "</td><td>" + roundToTwo(yearlyIncome) + "</td></tr>";
}

tenWkIn.innerHTML = incomeComp;

var toBeRendered1 = [];
var tblObj1 = [];

for (let i = 0; i < 8; i++) {
    let loopBefore = i-1;
    let computeNext;
    let computedNext;
    if (i === 0) {
    computeNext = feePerSs * multiplyBy1;
    //computedNext = roundToTwo(computeNext);
    tblObj1.push({'current' : parseFloat(feePerSs), 'next' : parseFloat(computeNext)});
    } else {
    let nextBefore = tblObj1[loopBefore]["next"];
    computeNext = nextBefore * multiplyBy1;
    //computedNext = roundToTwo(computeNext, 1);
    tblObj1.push({'current' : parseFloat(nextBefore), 'next' : parseFloat(computeNext)});
    }
}

for (let i = 0; i < 8; i++) {
    toBeRendered1 += "<tr><td>" + numOfYr[i] + "</td><td>" + roundToTwo(tblObj1[i]["current"]) + "</td><td>" + roundToTwo(tblObj1[i]["next"]) + "</td></tr>";
}

fifPerYr.innerHTML = toBeRendered1;

var incomeComp1 = [];
for (let i = 0; i < 8; i++) {
    let weeklyIncome = parseFloat(tblObj1[i]["current"]) * parseFloat(ctPerWk);
    let yearlyIncome = parseFloat(weeklyIncome) * parseFloat(noOfWks);
    incomeComp1 += "<tr><td>" + numOfYr[i] + "</td><td>" + roundToTwo(weeklyIncome) + "</td><td>" + roundToTwo(yearlyIncome) + "</td></tr>";
}
fifWkIn.innerHTML = incomeComp1;
}

//round decimals
function roundToTwo(num, precision = 2) {
precision = Math.pow(10, precision)
return formatter.format(Math.ceil(num * precision) / precision);
// let theWhole = num;
// n = (num + "").split(".");
// //console.log("theWhole - " + theWhole);
// let wholeNum = n[0];
// let decimalNum = n[1];
// if (decimalNum) {
//   let forChecking = decimalNum.substr(0, 3);
//   //console.log(forChecking.length);
//   if (forChecking.substr(2) === "0" || forChecking.length === 1) {
//     return parseFloat(theWhole);
//   } else {
//     let ifRounding = parseInt(forChecking.substr(2)) > 4 ? parseInt(forChecking.substr(0,2)) + 1 : parseInt(forChecking.substr(0,2));
//     //console.log("ifRounding - " + ifRounding);
//     return parseFloat(wholeNum + "." + ifRounding);
//   }
// } else {
//   return parseFloat(theWhole);
// }
}