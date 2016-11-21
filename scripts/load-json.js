export default function loadJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    if (xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };

  xhr.send();
}
