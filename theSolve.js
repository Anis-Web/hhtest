const readline = require('readline').createInterface(process.stdin, process.stdout);

let placesCount = null;
let timesCount = null;
let list = [];
let totalCookies = 0;
let linesCount = 0;

const isHighEnough = (k,placesList) => {
  let m = timesCount;
  for( cookieCount of placesList ) {
    m -= Math.ceil(cookieCount/k);
  }

  return m >= 0;
}

const solve = () => {
  let sort = list.sort((a,b) => a-b)
  let placesList = list.length == 1 ? [list[0]] : sort.slice(sort.findIndex(e => e > 0))

  if (placesList.length > timesCount || totalCookies == 0) {
    return 0;
  }
  if(placesList.length == timesCount){
    return placesList[placesList.length - 1]
  }

  let minCookie = totalCookies < timesCount ? 1 : Math.floor(totalCookies / timesCount);
  let maxCookie = placesList[placesList.length - 1];
  while (minCookie < maxCookie) {
    const testk = Math.floor((minCookie + maxCookie) / 2);

    if (isHighEnough(testk,placesList)) {
      maxCookie = testk;
    } else {
      minCookie = testk+1;
    }
  }
  return minCookie
};

readline.on('line', (line) => {
  if (linesCount === 0) {
    [placesCount, timesCount] = line.split(' ').map(Number);
  } else {
    totalCookies += Number(line);
    list.push(Number(line));
  }
  if (linesCount++ === placesCount) {
    console.log(solve());
    readline.close();
  }
}).on('close', () => process.exit(0));