import team from "../api/team.js";
self.addEventListener("message", (e)=>{
    let res = team[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
});