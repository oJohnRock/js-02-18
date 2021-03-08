const API_ROOT =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const RawGitHubRequest = (path = "", method = "GET", body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject(xhr.responseText);
      }
    };

    xhr.open(method, `${API_ROOT}/${path}`);
    xhr.send(body);
  });
};

export default RawGitHubRequest;
