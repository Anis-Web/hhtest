const readline = require('readline').createInterface(process.stdin, process.stdout);

let placesCount = null;
let timesCount = null;
let list = [];
let totalCookies = 0;
let linesCount = 0;

const getCookiesCount = (cookie,placesList,timesCount,min,max) => {
  let m = timesCount
  let list = [...placesList]
  let i = 0
  while(min < max) {
    if(i == list.length){
      i = 0
      list = list.filter(e => e != 0)
    }

    list[i] <= min ? list[i] = 0 : list[i] -= min

    i++
    m--

    if(m >= 0 && list.filter(e => e != 0) == '') {
      cookie = min
      break
    } else if(m < 0 && list.filter(e => e != 0) != ''){
      list = [...placesList]
      m = timesCount
      min++
      i = 0
    }
  }
  return min
}


const solve = () => {
  let sort = list.sort((a,b) => a-b)
  let placesList = list.length == 1 ? [list[0]] : sort.slice(sort.findIndex(e => e > 0))

  if (placesCount > timesCount || totalCookies == 0) {
    return 0;
  }
  if(placesCount == timesCount){
    return placesList[placesList.length - 1]
  }

  let minCookie = totalCookies < timesCount ? 1 : Math.floor(totalCookies / timesCount);
  let maxCookie = placesList[placesList.length - 1];
  let cookies  = 0;

  cookies = getCookiesCount(cookies,placesList,timesCount,minCookie, maxCookie);

  return cookies
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