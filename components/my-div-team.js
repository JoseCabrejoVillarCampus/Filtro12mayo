import config from "../config/config.js";
import {
    GET_TEAM_ALL,
    POST_TEAM,
    DELETE_TEAM,
    PUT_TEAM,
    SEARCH_TEAM
} from '../constants/requestTypes.js'


export default class myTabla extends HTMLElement {
    static url =
        import.meta.url
    static async components() {
        return await (await fetch(config.uri(myTabla.url))).text();
    }
    constructor() {
        console.log('constructor running')

        super();
        this.attachShadow({
            mode: "open"

        });
        this.content(
            Promise.resolve(myTabla.components()).then(html => {

                console.log('constructor')
                this.shadowRoot.innerHTML = html;
                this.form = this.shadowRoot.querySelector("#myForm");
                this.form.addEventListener("submit", this.handleEvent.bind(this))
            }))
    }


    _shadowRoot = () => {
        let asyncContent = null
        let content = null
        return async (html) => {
            if (content) return content
            if (!asyncContent) {
                asyncContent = html
                return null
            }
            content = await asyncContent
            return content
        }

    }

    content = this._shadowRoot()

    handleEvent(e) {
        e.preventDefault();
        (e.type === "submit") ? this.myworker(e): undefined;
    }
    myworker(e) {
        let ws = new Worker("../config/wsTeam.js", {
            type: "module"
        });
        let wsa = new Worker("../config/wsTeam.js", {
            type: "module"
        });
        let wsb = new Worker("../config/wsTeam.js", {
            type: "module"
        });
        let wsc = new Worker("../config/wsTeam.js", {
            type: "module"
        });
        let data = Object.fromEntries(new FormData(e.target));
        const {
            valor
        } = e.submitter.dataset;

        if (valor === "get") {
            ws.postMessage({
                type: GET_TEAM_ALL,
            });
        } else if (valor === "get2") {
            wsa.postMessage({
                type: GET_TEAM_ALL,
            });
        } else if (valor === "get3") {
            wsb.postMessage({
                type: GET_TEAM_ALL,
            })
        } else if (valor === "get4") {
            wsc.postMessage({
                type: GET_TEAM_ALL,
            })
        } else if (valor === "post") {
            ws.postMessage({
                type: POST_TEAM,
                arg: data
            });
        } else if (valor === "delete") {
            ws.postMessage({
                type: DELETE_TEAM,
                arg: data
            });
        } else if (valor === "put") {
            ws.postMessage({
                type: PUT_TEAM,
                arg: data
            });
        } else if (valor === "search") {
            ws.postMessage({
                type: SEARCH_TEAM,
                arg: data.id
            });
        }

        ws.addEventListener("message", (e) => {
            this.displayDataInTable(e.data);
            ws.terminate();
        });
        wsa.addEventListener("message", (e) => {
            this.displayDataInTable2(e.data);
            wsa.terminate();
        });
        wsb.addEventListener("message", (e) => {
            this.displayDataInTable3(e.data);
            wsb.terminate();
        });
        wsc.addEventListener("message", (e) => {
            this.displayDataInTable4(e.data);
            wsb.terminate();
        });
    }

    async displayDataInTable(data) {
        try {
            await this.content()
            const tableBody = this.shadowRoot.querySelector("#myData");
            /* tableBody.innerHTML = ""; */

            if (!Array.isArray(data)) {
                throw new Error("Datos inválidos proporcionados. Se esperaba un array.");
            }

            const sortedData = data.sort((a, b) => a.id - b.id);

            let plantilla = `
            <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Trainer</th>
            </tr>
        </thead>
        `;
            sortedData.forEach((user) => {
                console.log();
                plantilla += `
                <tr>
                <th>${user.id}</th>
                <th>${user.nombre}</th>
                <th>${user.trainer_asociado}</th>
            </tr> 
            `;
                tableBody.innerHTML = plantilla;
            });
        } catch (error) {}
    }
    async displayDataInTable2(data) {
        try {
            await this.content()
            const tableBody = this.shadowRoot.querySelector("#myData");

            if (!Array.isArray(data)) {
                throw new Error("Datos inválidos proporcionados. Se esperaba un array.");
            }

            const filteredData = data.filter(user => user.nombre === "sputnik");

            let plantilla = `
            <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Trainer</th>
            </tr>
        </thead>
            `;

            filteredData.forEach((user) => {
                plantilla += `
                    <tr>
                        <th>${user.id}</th>
                        <th>${user.nombre}</th>
                        <th>${user.trainer_asociado}</th>
                    </tr> 
                `;
            });

            tableBody.innerHTML = plantilla;
        } catch (error) {
            console.error(error);
        }
    }
    async displayDataInTable3(data) {
        try {
            await this.content()
            const tableBody = this.shadowRoot.querySelector("#myData");
            /* tableBody.innerHTML = ""; */

            if (!Array.isArray(data)) {
                throw new Error("Datos inválidos proporcionados. Se esperaba un array.");
            }

            const filteredData1 = data.filter(user => user.nombre === "artemis");

            let plantilla = `
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Trainer</th>
                </tr>
            </thead>
        `;


            filteredData1.forEach((user) => {
                plantilla += `
            <tr>
            <th>${user.id}</th>
            <th>${user.nombre}</th>
            <th>${user.trainer_asociado}</th>
        </tr> 
            `;
                tableBody.innerHTML = plantilla;
            });
        } catch (error) {}

    }

    async displayDataInTable4(data) {
        try {
            await this.content()
            const tableBody = this.shadowRoot.querySelector("#myData");
            /* tableBody.innerHTML = ""; */

            if (!Array.isArray(data)) {
                throw new Error("Datos inválidos proporcionados. Se esperaba un array.");
            }

            const filteredData2 = data.filter(user => user.nombre === "apolo");

            let plantilla = `
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Trainer</th>
                </tr>
            </thead>
        `;


            filteredData2.forEach((user) => {
                plantilla += `
            <tr>
            <th>${user.id}</th>
            <th>${user.nombre}</th>
            <th>${user.trainer_asociado}</th>
        </tr> 
            `;
                tableBody.innerHTML = plantilla;
            });
        } catch (error) {}

    }

static get observedAttributes() {
    return ['data-accion'];
}
attributeChangedCallback(name, old, now) {
    console.log(name, old, now);
    console.log(this.dataset.accion);
}
connectedCallback() {
    /* const table = new myTabla();
    table.displayDataInTable(); */
    /* Promise.resolve(myTabla.components()).then((html) => {
        this.shadowRoot.innerHTML = html;
        this.form = this.shadowRoot.querySelector("#myForm");
        this.form.addEventListener("submit", this.handleEvent.bind(this));
    });

     */
}

}
customElements.define(config.name(myTabla.url), myTabla);