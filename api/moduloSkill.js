let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4001;

const postModuloSkill = async (arg) => {
    arg.id = (arg.id) ? arg.id : Date.now();
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/modulos`, config)).json();
}
const getModuloSkillAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/modulos?_expand=skill`, config)).json();
}
const deleteModuloSkill = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/modulos/${arg.id}`, config)).json();
}
const putModuloSkill = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/modulos/${arg.id}`, config)).json();
}
const searchModuloSkill = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/modulos`);
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
    postModuloSkill,
    getModuloSkillAll,
    deleteModuloSkill,
    putModuloSkill,
    searchModuloSkill,
}