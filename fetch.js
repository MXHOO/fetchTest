//对fetch进行封装
import fetch from "node-fetch"
// class Request {
//     constructor(url, method, config) {
//         fetch(url, {
//             method: method,
//             ...config
//         }).then(data => console.log(data)).catch(err => console.log(err))
//     }
// }
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",//请求的模式
            cache: "force-cache"
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        
        try {
            //fetch请求
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let request;
            //ajax请求
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
            } else {
                request = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            request.open(type, url, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(sendData);

            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        let obj = request.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(request)
                    }
                }
            }
        })
    }
}