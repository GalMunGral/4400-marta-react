export function checkDateFormat(time) {
  if (time.match(
    /[0-9]{4}-((0[1-9])|(1[0-2]))-(([1-2][0-9])|(3[01])|(0[1-9])) (([01][0-9])|2[0-3])(:([0-5][0-9])){2}/
  )) {
    let month = parseInt(time.substring(5, 7));
    let day = parseInt(time.substring(8, 10));
    switch (month) {
      case 4:
      case 6:
      case 9:
      case 11: {
        return day < 31
      }
      case 2: {
        if (day < 30) {
          let year = parseInt(time.substring(0, 4));
          if (year % 4 !== 0 || year % 100 === 0) return day < 29
          return true;
        }
        return false;
      }
      
      default:
        return true;
    }
  }
  return false;
}