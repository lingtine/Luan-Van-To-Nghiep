function set_cookie(name: string, value: string) {
  document.cookie = name + "=" + value + "; Path=/;";
}

function getCookie(cName: string) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
function delete_cookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export { set_cookie, getCookie, delete_cookie };
