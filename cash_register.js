function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  //determine how much change the register has
  const registerChange = Math.round(100*cid.reduce((a,b)=>a + b[1],0))/100;
  if(change > registerChange) {
    var obj = {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
    return obj;
  } else if(change == registerChange) {
    var obj = {
      status: "CLOSED",
      change: cid
    };
    return obj;
  };
  //determine change given the register has more change than needed
  const bills = [100,20,10,5,1,0.25,0.1,0.05,0.01];
  let i = 0;  //iterate over each bill
  let k = bills.length - 1; //use this variable to extract string name of bill
  var answer = [];
  for(i;i < bills.length;i++) {
    if(change > bills[i] && cid[k-i][1] != 0) {
      const billChange = change >= cid[k-i][1] ? [cid[k-i][0],cid[k-i][1]]: [cid[k-i][0],bills[i]*Math.floor(change/bills[i])];
      change = Math.round(100*(change - billChange[1]))/100
      answer.push(billChange);
    }
  }
  if(change != 0) {
    var obj = {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
    return obj;
  }
  var obj = {
    status: "OPEN",
    change: answer
  };
  return obj;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]
