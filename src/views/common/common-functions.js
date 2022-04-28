export function urlToObj(url) {
  let obj = {};
  const arr1 = url.split("?");
  const arr2 = arr1[1].split("&");
  for (let i = 0; i < arr2.length; i++) {
    let res = arr2[i].split("=");
    obj[res[0]] = res[1];
  }
  return obj;
}
