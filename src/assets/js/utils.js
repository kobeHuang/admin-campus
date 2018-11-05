function jsonp(url, params, callback) {
  let script = document.createElement('script');
  let paramsStr = '';
  for (let key in params) {
    paramsStr += key + '=' + params[key] + '&';
  }
  paramsStr = paramsStr.slice(0, -1);
  script.src = `${url}?${paramsStr}`;
  document.body.appendChild(script);
  params.callback && (window[params.callback] = data => {
    callback && callback(data);
    document.body.removeChild(script);
  })
}

export default {
  jsonp
}
