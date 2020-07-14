//观察者模式
class Subject {    //被观察者
    constructor() {
        this.name = "张三"
        this.state = "nice"
        this.observerList = []
    }
    attach(observer) {    //将观察者与被观察者进行绑定
        this.observerList.push(observer)
    }
    setState(newState,name) {   //更新状态
        this.state = newState
        this.name = name
        this.observerList.forEach(o=>o.update(newState,name)
        )
    }
}

class Observer {   //观察者
    constructor(name) {
        this.name = name
    }
    update(newState,name) {
        console.log(this.name + "说" +name +newState )
    }
} 
let subject1 = new Subject()
let observer1 = new Observer("李四")
let observer2 = new Observer("王五")
subject1.attach(observer1)
subject1.attach(observer2)
subject1.setState("bad","MIKE")