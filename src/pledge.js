'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise{
    constructor(executor){
        /* executor = (resolve,reject) => {
            if(resolve){
                this._internalResolve(resolve)
            }
            if(reject){
                this._internalReject(reject)
            }
            else{
                const error = new TypeError("executor is not a function")
                throw error
            }
        } */
        if(typeof executor === 'function'){
            this.executor = executor
        }else{
            const error = new TypeError("executor is not a function")
            throw error
        }
        this._state = "pending"
        this._value = undefined
        this.pending = true 
        this._handlerGroups = []// {successCb: ()=>{}, errorCb: ()=>{}}
        executor((resolve)=> this._internalResolve(resolve),(reject)=> this._internalReject(reject))
    }
    _internalResolve(data){
        if(this.pending){
            this._state = "fulfilled"
            this._value = data
            this.pending = false
            while(this._handlerGroups.length > 0){
                this._callHandlers(this._handlerGroups.shift())
            }
        }
    }
    _internalReject(data){
        if(this.pending){
            this._state = "rejected"
            this._value = data
            this.pending = false
            while(this._handlerGroups.length > 0){
                this._callHandlers(this._handlerGroups.shift())
            }
        }
    }
    _callHandlers(obj){
        if(this._state === "fulfilled"){
            obj.successCb(this._value)
        }else if(this._state === "rejected"){
            obj.errorCb(this._value)
        }
        
    }
    then(successHandler,errorHandler){
        const downstreamPromise = new $Promise(()=>{})
        
        let handlerObj = {
        successCb: null,
            errorCb: null,
            downstreamPromise: downstreamPromise
        }

        if(typeof successHandler === "function" && this._state !=="rejected"){
            handlerObj.successCb = successHandler
        }
        if(typeof errorHandler === "function"){
            handlerObj.errorCb = errorHandler
        }
        this._handlerGroups.push(handlerObj)
        if(handlerObj.successCb || handlerObj.errorCb){
            this._callHandlers(handlerObj)
        }
        return downstreamPromise
    }
    catch(errorHandlerCatch){
        this.then(null,errorHandlerCatch)
    }
}



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
