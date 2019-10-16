class Container {
    constructor() {
        this.render()
    }
    render() {
        let container = require("../views/container.art");
        let html = container()
        this.container = document.querySelector("#container");
        this.container.innerHTML = html

    }
}
new Container()