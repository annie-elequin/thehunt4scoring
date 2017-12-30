export function htmlToJsDate(dateIn){
  if(dateIn){
    var dateList = dateIn.split('-');
    const year = parseInt(dateList[0], 10);
    const month = parseInt(dateList[1], 10);
    const day = parseInt(dateList[2], 10);

    //Create a date object set to the beginning of the day
    const jsDate = new Date(year, month, day, 0, 0, 0, 0);

    return jsDate;
  }
  else{
    return undefined;
  }
}

export function fbToJsDate(inDate){
  if(inDate){
    const splitDate = inDate.split('T');
    const newDate = htmlToJsDate(splitDate[0]);
    const timeString = splitDate[1].split('+')[0];
    const timeList = timeString.split(':');
    newDate.setUTCHours(parseInt(timeList[0], 10));
    newDate.setUTCMinutes(parseInt(timeList[1], 10));
    newDate.setUTCSeconds(parseInt(timeList[2], 10));
    return newDate;
  }
  else{
    return undefined;
  }

}
