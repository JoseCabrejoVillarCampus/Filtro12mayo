import skill from "../api/skill.js";
self.addEventListener("message", (e)=>{
    let res = skill[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});