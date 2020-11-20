export class EventManager<T> {
    listeners:Map<string,((ev:T)=>any)[]> = new Map()
    on(eventName:string, handler: (ev:T)=>any){
        let evList =this.listeners.get(eventName)
        if(!evList){
            evList = []
            this.listeners.set(eventName, evList)
        }
        if(evList.indexOf(handler)<0){
            evList.push(handler)
        }
    }
    off(eventName:string, handler?:(ev:T)=>any){
        let evList =this.listeners.get(eventName)
        if(evList){
            if(handler){
                let index = evList.indexOf(handler)
                if(index>=0){
                    evList.splice(index,1)
                }
            }else {
                this.listeners.delete(eventName)
            }
        }
    }
    trigger(eventName:string,ev:T, beforeTrigger?:(ev:T)=>any){
        let evList =this.listeners.get(eventName)
        if(evList && evList.length){
            if(beforeTrigger){
                beforeTrigger(ev)
            }
            evList.forEach(h=>h(ev))
            return true
        }
        return false
        
    }
}