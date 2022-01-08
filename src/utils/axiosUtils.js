import axios from "axios";
//保存api key的文件，需自己创建
import Key from "../assets/apikey.json";

let key = Key.key;

function request(url, params, success, error) {
    params.key = key;
    let config = {
        url: url,
        baseURL: "/api/",
        method: 'get',
        params: params
    };
    axios.request(config)
        .then(function (response) {
            if (success == undefined) {
                console.warn("success function is " + success);
                console.log("http request success, response: " + response);
            } else {
                success(response)
            }
            if (error != undefined && (response.status != 200 || response.data.error_code != 0)) {
                error(response)
            }
        })
        .catch(function (exception) {
            if (error != undefined) {
                error(exception);
            }
        })
}

export default {
    request
}