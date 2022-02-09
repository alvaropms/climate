export function formatDate(string){
    let arr = string.split('-');
    return arr[2] + '/' + arr[1];
}

export function pad(s) {
  return (s < 10) ? '0' + s : s;
}