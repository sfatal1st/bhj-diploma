const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    let url, method, data, responseType, err;
    if (options.method) {
        method = options.method;
        url = options.url;
        if (method === 'GET') {
            if (options.data) {
                data = Object.entries(options.data);
                for ([key, value] of data) {
                url += '?' + key + '=' + value;
                }
            }
        }
    }      
    xhr.responseType = responseType || 'json';
    try {
        xhr.open(method, url);
        if (method === 'GET') {
            xhr.send();
        } else if (method === 'DELETE') {
            for (let key in options.data) {
                formData.append(key, options.data[key]);
            };
            xhr.send(formData);
        } else {
            xhr.send(options.data);
        }
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                options.callback(err, xhr.response);   
            };
        });
        xhr.addEventListener('error', () => {
            options.callback(err, xhr.response);
        });
    }
    catch (err) {
       options.callback(err);
    }
}