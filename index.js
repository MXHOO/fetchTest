const example = {
    arr:[],
    on(fn) {  //订阅消息
        this.arr.push(fn)
    } ,
    emit() {
        this.arr.forEach(element => {
           element() 
        });
    },
    cancel() {    // 取消订阅

    }
}
example.on(function(){
    console.log("hello")
})
example.on(function(){
    console.log("hi")
})
example.emit()
console.log("---------------------------------------")
const ex1 = {
    arr1:[],
    on1(key,fn) {
        if(this.arr1.indexOf(key) === -1) {
            this.arr1[key] = []
        }else {
            this.arr1[key].push(fn)
        }
    },
    emit1() {
        this.arr1.forEach(element => {
            console.log("element",element)
        });
    },
    cancel1(key) {
        if(this.arr1[key].indexOf(key) === -1) {
            console.log("没有此类型消息")
        }else {
            for (let i = 0; i < this.arr1.length; i++) {
                if(key === i) {
                    this.arr1.splice(1,1)
                }
            }
        }
    }
} 
// ex1.on1("1",console.log(1))
// ex1.on1("2",console.log(2))
// ex1.on1("3",console.log(3))
// console.log(ex1.arr1)
// ex1.emit1()
// ex1.cancel1("1"),
// ex1.emit1()
// console.log(ex1.arr1)

const employee = {
    employer:[],　　// 存放订阅信息的缓存列表
    listen(key, fn){　　// 订阅消息
        if(this.employer.indexOf(key)==-1){
            this.employer[key] = [];　　// 如果还没有订阅过此类信息，给此类信息创建一个缓存列表
        }
        this.employer[key].push(fn);　　// 订阅的消息，添加到缓存列表中
    },
    trigger(){　　// 发布消息
        let key = Array.prototype.shift.call(arguments);　　// 取出消息类型 lt200;gt200
        let fns = this.employer[key]　　// 取出对应的方法
        if(!fns || fns.length==0){　　
            return;
        }
        fns.forEach(fn=>{
            fn(arguments);　　// 执行订阅方法(这里的arguments是已经去掉了消息类型的剩余参数)
        })
    }
}
employee.listen("lt200",(salesAmount)=>{　　// 订阅
    console.log("朋友: ",salesAmount);
})
employee.listen("gt200",(salesAmount)=>{
    console.log("我：",salesAmount);
})
employee.trigger("lt200", 80);　　// 发布
employee.trigger("gt200",600);