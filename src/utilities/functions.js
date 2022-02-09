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
