export function setSessionUserInfo(username) {
  const curTime = new Date().getTime();

  localStorage.setItem(
    "name",
    JSON.stringify({
      name: username,
      time: curTime,
    })
  );
}

export function getSessionUserIno() {
  const data = localStorage.getItem("name");
  if (data === null) {
    return "";
  }

  const dataObj = JSON.parse(data);
  const expirePeriod = 30 * 1000; //30秒

  if (new Date().getTime() - dataObj.time > expirePeriod) {
    localStorage.removeItem("name");
    return "";
  } else {
    return dataObj.name;
  }
}

export function removeSessionUserIno() {
  localStorage.removeItem("name");
}
