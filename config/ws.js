import usuarios from "../api/usuarios.js";

/* 
import skill from "../api/skill.js";
import moduloSkill from "../api/moduloSkill.js";
import evaluacion from "../api/evaluacion.js";
import buscar from "../api/buscar.js"; */
self.addEventListener("message", (e)=>{
    let res = usuarios[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});

/* 
self.addEventListener("message", (e)=>{
    let res = skill[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});
self.addEventListener("message", (e)=>{
    let res = moduloSkill[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});
self.addEventListener("message", (e)=>{
    let res = evaluacion[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});
self.addEventListener("message", (e)=>{
    let res = buscar[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
}); */