let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4001;

const postTeam = async (arg) => {
    arg.id = (arg.id) ? arg.id : Date.now();
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/teams`, config)).json();
}
const getTeamAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/teams`, config)).json();
}
const deleteTeam = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/teams/${arg.id}`, config)).json();
}
const putTeam = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/teams/${arg.id}`, config)).json();
}
const searchTeam = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/teams`);
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
    postTeam,
    getTeamAll,
    deleteTeam,
    putTeam,
    searchTeam
}