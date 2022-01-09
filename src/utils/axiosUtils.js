import axios from "axios";
//保存api key的文件，需自己创建
import Key from "../assets/apikey.json";
import FakeData from "./dataUtils.js";

let key = Key.key;
//是否允许使用假数据
let allowFake = true;
function request(url, params, success, error, final) {
    params.key = key;
    // console.log(params)
    let config = {
        url: url,
        baseURL: "/api/",
        method: 'get',
        params: params
    };
    axios.request(config)
        .then(response => {
            if (success == undefined) {
                console.warn("success function is " + success);
                console.log("http request success, response: " + response);
            } else {
                if (allowFake && response.data.error_code == 10012) {
                    if (url == "/index") {
                        response.data = FakeData.indexData(30);
                    } else {
                        response.data = FakeData.contentData(params.uniqueKey);
                    }
                }
                success(response)
            }
            if (error != undefined && (response.status != 200 || response.data.error_code != 0)) {
                error(response)
            }
        })
        .catch(exception => {
            if (error != undefined) {
                error(exception);
            }
        })
        .finally(() => {
            if(final != undefined){
                final();
            }
        })
}

export default {
    request
}