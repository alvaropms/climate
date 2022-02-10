export function formatDate(string){
    let arr = string.split('-');
    return arr[2] + '/' + arr[1];
}

export function pad(s) {
  return (s < 10) ? '0' + s : s;
}

export function timestampToHour(timestamp){
  let date = new Date(timestamp * 1000);
  return [date.getHours(), date.getMinutes()].map(pad).join(':');
}

export function timestampToDate(timestamp){
  let date = new Date(timestamp * 1000);
  return [date.getDate(), date.getMonth() + 1].map(pad).join('/');
}

export function epaColor(i){
  switch (i) {
    case 1:
      return('success');
    
    case 2:
      return('info');
    
    case 3:
      return('secondary');
    
    case 4:
      return('warning');
    
    default:
      return('danger');
  }
}

export function defraColor(i){
  if(i >= 1 && i <=3){
    return('success');
  }
  if(i <= 6){
    return('secondary');
  }
  if(i <= 9){
    return('warning');
  }
  return('danger');
}
