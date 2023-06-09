let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4001;

const postEvaluacion = async (arg) => {
    arg.user.evaluacion.id = (arg.user.evaluacion.id) ? arg.user.evaluacion.id : Date.now();
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones`, config)).json();
}
const getEvaluacionAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones?_expand=recluta&_expand=modulo`, config)).json();
}
const deleteEvaluacion = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones/${arg.id}`, config)).json();
}
const putEvaluacion = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones/${arg.id}`, config)).json();
}
const searchEvaluacion = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/evaluaciones`);
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
    postEvaluacion,
    getEvaluacionAll,
    deleteEvaluacion,
    putEvaluacion,
    searchEvaluacion,
}