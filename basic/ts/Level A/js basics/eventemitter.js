module.exports = class EventEmiter{
    listeners={}; //master object

    addListener(eventName,fn){
        this.listeners[eventName]=this.listeners[eventName]||[];
        this.listeners[eventName].push(fn);
        return this;
    }
    
    on(eventName,fn){
        return this.addListener(eventName,fn)
    }

    once(eventName,fn){
        this.listeners[eventName]=this.listeners[eventName]||[];
        const onceWrapper =()=>{
            fn();
            this.off(eventName,onceWrapper)
        };
        this.listeners[eventName].push(onceWrapper);
        return this;
    }
    off(eventName,fn){
        return this.removeListener(eventName,fn)
    }

    removeListener(eventName,fn){
        let lis=this.listeners[eventName];
        if(!lis)return this;
        for(let i=0;i<=lis.length;i++){
            console.log(lis[i]?.toString(),'lis[i');
            console.log(fn.toString(),'fn');
            if(lis[i]?.toString()==fn.toString()){
                lis.splice(i,1);
                break;
            }
        }
    }
   emit(eventName,...args){
    let fns=this.listeners[eventName];
    if(!fns)return this;
    fns.forEach(element => {
        element(...args);
    });
    return true;
   };
   listenerCount(eventName){
    let fns=this.listeners[eventName]||[];
    return fns.length;
   }

   rawListeners(eventName){
    return this.listeners[eventName];
   }
}

//you are making use of a pattern that helps us deal with asynchronous code better.