interface IAction {
    name:string,
    status
}
export class AsyncQueue {
    private queue: any[] = []
    private status:'pending'|'ready' = 'pending'
    pending(){
        this.status = 'pending'
    }
    ready(){
        this.status = 'ready'
        while(this.queue.length){
            let cb = this.queue.shift()
            cb()
        }
    }
    call(cb){
        if(this.status === 'pending'){
            this.queue.push(cb)
        } else {
            cb()
        }
    }
}