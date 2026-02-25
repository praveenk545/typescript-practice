const EventEmiter = require("./eventemitter");
class Emiter extends EventEmiter{

}
const myObj=new Emiter();
myObj.on('run',(x)=>{
    console.log('event emiter 1')
})

myObj.on('run',(x)=>{
    console.log('event emiter 2')
})

myObj.on('run',(x)=>{
    console.log('event emiter 3')
})


myObj.on('run',(x)=>{
    console.log('event emiter',x=5)
})
myObj.on('run',(x)=>{
    console.log('event emiter',x)
})
myObj.on('walk',()=>{
    console.log('walk now',)
})
myObj.once('stay',()=>{
    console.log('stay',)
})

myObj.removeListener('remove',(x)=>{
    console.log('removed',x)
})



myObj.emit('run','10')
myObj.emit('walk','10')
myObj.emit('stay');
myObj.removeListener('remove',10)
myObj.emit('stay');

