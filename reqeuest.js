import request from './fetch'
const url = "https://fe-mock.shanyishanmei.com/mock/5eb671500100aa1dacc00b59/example/testRequest"
async function getData() {
    const {
        data
    } = await request(url, {
        id: 123
    })
}
let btn =document.getElementById("test_btn");
btn.addEventListener("click",()=>getData())
