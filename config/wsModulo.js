import moduloSkill from "../api/moduloSkill.js";
self.addEventListener("message", (e)=>{
    let res = moduloSkill[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});