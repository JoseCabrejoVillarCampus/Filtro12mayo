import evaluacion from "../api/evaluacion.js";
self.addEventListener("message", (e)=>{
    let res = evaluacion[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});