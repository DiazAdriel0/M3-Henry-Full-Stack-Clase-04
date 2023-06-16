// class $Promise{
//     constructor(executor){
//         /* executor = (resolve,reject) => {
//             if(resolve){
//                 this._internalResolve(resolve)
//             }
//             if(reject){
//                 this._internalReject(reject)
//             }
//             else{
//                 const error = new TypeError("executor is not a function")
//                 throw error
//             }
//         } */
//         if(typeof executor === 'function'){
//             this.executor = executor
//         }else{
//             const error = new TypeError("executor is not a function")
//             throw error
//         }
//         this._state = "pending"
//         this._value = undefined
//         this.pending = true 
//         this._handlerGroups = [{successCb: ()=>{}, errorCb: ()=>{}}]
//         executor((resolve)=> this._internalResolve(resolve),(reject)=> this._internalReject(reject))
//     }
//     _internalResolve(data){
//         if(this.pending){
//             this._state = "fulfilled"
//             this._value = data
//             this.pending = false
//         }
//     }
//     _internalReject(data){
//         if(this.pending){
//             this._state = "rejected"
//             this._value = data
//             this.pending = false
//         }
//     }
//     then(successHandler,errorHandler){
//         if(successHandler){
//            this._handlerGroups[0].successCb = successHandler
//         }
//         if (errorHandler) {
//            this._handlerGroups[0].errorCb = errorHandler
//         }
//     }
// }

// function noop () {}


//   var promise, s1, e1, s2, e2;
//     promise = new $Promise(noop);
//     s1 = function (/* data */)   { /* use data */ };
//     e1 = function (/* reason */) { /* handle reason */ };
//     s2 = function (/* data */)   { /* use data */ };
//     e2 = function (/* reason */) { /* handle reason */ };


//     promise.then( s1, e1 )
//     console.log(promise._handlerGroups[0].successCb)
//     console.log(promise._handlerGroups[0].errorCb)

_handlerGroups = []
let handlerObj = {
    successCb: null,
    errorCb: null,
}
if(typeof successHandler !== "function"){
    handlerObj.successCb = ()=>{}
}
if(typeof errorHandler !== "function"){
    handlerObj.errorCb = ()=>{}
}
_handlerGroups.push(handlerObj)
console.log(_handlerGroups);