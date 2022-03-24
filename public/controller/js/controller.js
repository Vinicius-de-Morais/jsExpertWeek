export default class Controller {
    constructor({view, service}){
        this.view = view
        this.service = service
    }

    static initialize(dependecies){

        const controller = new Controller(dependecies)
        controller.onLoad()

        return controller
    }

    async commadReceived(text){
        return this.service.makeRequest({
            command: text.toLowerCase()
        })
    }

    onLoad(){
        this.view.configureOnButtonClick(this.commadReceived.bind(this))
        this.view.onLoad()
    }
}