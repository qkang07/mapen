export class SortedMap<T> {
    private obj:{[key:number]:T} = {}
    set(k:number,v:T){
        this.obj[k] = v
    }
    get(k:number):T{
        return this.obj[k]
    }
    forEach(cb:(item:T, key)=>boolean|void, reverse?:boolean){  
        let keys = Object.keys(this.obj)
        if(reverse){
            keys.reverse()
        }
        for(let k of keys){
            let flag = cb(this.obj[k], k)
            if(flag === false){
                break
            }
        }
    }
    map(cb:(item:T,key)=>any){
        let res = []
        for(let k in this.obj){
            res.push(cb(this.obj[k],k))
        }
        return res
    }
}