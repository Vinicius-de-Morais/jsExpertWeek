export default class View {
    constructor(){
        this.buttonStart = document.getElementById("start")
        this.buttonStop = document.getElementById("stop")
        this.buttons = () => Array.from(document.querySelectorAll("button"))
        this.ignoredButtons = new Set(["unassigned"])

        async function onButtoClick() {}
        this.onButtoClick = onButtoClick

        this.DISABLE_BTN_TIMEOUT = 500
    }

    onLoad() {
        this.changeCommandVisibility()
        this.buttonStart.onclick = this.onStartClicked.bind(this)
    }

    changeCommandVisibility(hide = true) {
        Array.from(document.querySelectorAll('[name=command]'))
        .forEach( button => {
            const fn = hide ? "add" : "remove"
            button.classList[fn]('unassigned')

            function onClickReset() {}
            button.onclick = onClickReset
        })
    }

    configureOnButtonClick(fn){
        this.onButtoClick = fn
    }

    async onStartClicked({
        srcElement: {
            innerText
        }
    }){
        const buttonText = innerText
        await this.onButtoClick(buttonText)
        this.toggleButtonStar()
        this.changeCommandVisibility(false)

        this.buttons()
        .filter(btn => this.IsNotUnassignedButton(btn))
        .forEach(this.setupButtonAction.bind(this))
    }

    setupButtonAction(btn){
        const text = btn.innerText.toLowerCase()
        if(text.includes("start")) return;

        if(text.includes("stop")){
            btn.onclick = this.onStopButton.bind(this)
            return
        }

        btn.onclick = this.onCommandClick.bind(this)
    }

    async onCommandClick(btn){
        const {
            srcElement:{
                classList,
                innerText
            }
        } = btn
        
        this.toggleDisableCommandButton(classList)
        await this.onButtoClick(innerText)
        setTimeout( 
            () => this.toggleDisableCommandButton(classList),
            this.DISABLE_BTN_TIMEOUT
        )

    }

    toggleDisableCommandButton(classList){
        if(classList.contains("active")){
            classList.remove("active")
            return
        } 
        classList.add("active")
    }

    onStopButton({
        srcElement: {
            innerText
        }
    }){

        this.toggleButtonStar(false)
        this.changeCommandVisibility(true)
        return this.onButtoClick(innerText)
    }

    IsNotUnassignedButton(button){
        const classes = Array.from(button.classList)
        
        return !(!!classes.find(item => this.ignoredButtons.has(item)))
    }

    toggleButtonStar(active = true){
        if(active){
            this.buttonStart.classList.add("hidden")
            this.buttonStop.classList.remove("hidden")
        }else{
            this.buttonStart.classList.remove("hidden")
            this.buttonStop.classList.add("hidden")
        }
    }
}