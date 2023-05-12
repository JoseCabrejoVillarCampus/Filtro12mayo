let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4001;

const postSkill = async (arg) => {
    arg.id = (arg.id) ? arg.id : Date.now();
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/skills`, config)).json();
}
const getSkillAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/skills`, config)).json();
}
const deleteSkill = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/skills/${arg.id}`, config)).json();
}
const putSkill = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/skills/${arg.id}`, config)).json();
}
const searchSkill = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/skills`);
    const data = await response.json();

    if (response.ok) {
        const filteredData = data.filter(user => user.nombre === arg || user.id === arg);
        return filteredData;
    } else {
        console.error("Error al obtener los usuarios del servidor.");
        return [];
    }
};
export default {
    postSkill,
    getSkillAll,
    deleteSkill,
    putSkill,
    searchSkill,
}