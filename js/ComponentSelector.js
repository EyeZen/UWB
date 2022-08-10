const _selector_content = `
<style>
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        transition: 0.2s ease-in-out;
    }
    .component-selector {
        position: fixed;
        right: 0;
        top: 0;
        z-index: 100;
    }

    .component-selector-body {
        width: 300px;
        height: 400px;
        background-color: rgba(0,0,0, 0.5);
        border-radius: 5px;
        padding: 10px;
        color: white;
    }

    .component-switch {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .component-switch > .component-switch-toggle {
        /* border: 1px solid white; */
        width: 40px;
        height: 20px;
        border-radius: 10px;
        /* background-color: rgba(255, 255, 255, 0.5); */
        background-color: white;
        box-shadow: inset 0 0 2px black;

        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .component-switch > .component-switch-toggle::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        /* background-color: red; */
        box-shadow: inset 0 0 1px black;

        border: 1px solid white;
        border-radius: 10px;
        margin-left: 0px;
    }
    .component-switch > input:checked ~ .component-switch-toggle::before {
        margin-left: 20px;
        /* background-color: green; */
        box-shadow: inset 0 0 10px black;
    }

    .component-selector-display {
        background-color: white;
        border: 1px solid black;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;

        position: absolute;
        left: -15px;
        top: 50%;

    }
    .component-selector-display:hover {
        transform: scale(1.5);
    }
    .component-selector-display > .display-toggle-switch{
        width: 100%;
        height: 100%;
        background: url(assets/icons/arrow-left.svg) no-repeat center center/contain;
        background-size: 50%;
        transform: rotate(180deg);
    }
    .component-selector-display > input:checked ~ .display-toggle-switch {
        transform: rotate(0deg);
    }
    
    .selector-hidden {
        left: calc( 100% - 10px );
        opacity: 0.1;
    }
</style>
<div class="component-selector selector-hidden">
    <label for="display-toggle" class="component-selector-display">
        <input type="checkbox" id="display-toggle" checked hidden>
        <div class="display-toggle-switch"></div>
    </label>
    <div class="component-selector-body">
        
    </div>
</div>
`;

const _component_selector = `
<label for="__component_id" class="component-switch">
    <span>__component_name</span>
    <input type="checkbox" id="__component_id" checked hidden>
    <div class="component-switch-toggle"></div>
</label>
`;

export default class ComponentSelector extends HTMLElement {
    static switch_count = 0
    static switch_map = {}
    constructor(opened=false) {
        super();

        this.attachShadow({mode: 'open'});
        const shadow = this.shadowRoot;

        const template = document.createElement('template');
        template.innerHTML = _selector_content;

        const toggleSelector = (event) => {
            const selector = shadow.querySelector('.component-selector');
            selector.classList.toggle('selector-hidden');
        };

        shadow.appendChild(template.content.cloneNode(true));
        const display_toggle = shadow.getElementById('display-toggle')
        display_toggle.addEventListener('click', toggleSelector);

        if(opened) display_toggle.click();
    }
    updateElements(switch_id, checked, css_updates_class='utility__hidden') {
        // console.log('updated called on ', switch_id);
        const shadow = this.shadowRoot;
        for(const elem_selector of ComponentSelector.switch_map[switch_id]) {
            // console.log(elem_selector);
            let htmlElements = document.querySelectorAll(elem_selector);
            htmlElements.forEach(element => {
                if(
                    (checked && element.classList.contains(css_updates_class)) || 
                    (!checked && !element.classList.contains(css_updates_class))
                ) {
                    element.classList.toggle(css_updates_class);
                }
            });
        }
    }
    addElement(selector, switch_id, switch_name, checked=true) {
        const shadow = this.shadowRoot;
        let component_switch = shadow.getElementById(switch_id);

        if(!component_switch) {
            ComponentSelector.switch_count++;
            const component_switch_list = shadow.querySelector('.component-selector-body');
            let new_switch = _component_selector.replaceAll('__component_id', switch_id);
            if(switch_name) new_switch = new_switch.replace('__component_name', switch_name);
            else new_switch = new_switch.replace('__component_name', switch_id);

            const template = document.createElement('template');
            template.innerHTML = new_switch;

            component_switch_list.appendChild(template.content.cloneNode(true));
            component_switch = shadow.getElementById(switch_id);
            component_switch.addEventListener('click', event => {
                this.updateElements(switch_id, event.target.checked);
            });
        }
        if(ComponentSelector.switch_map[switch_id] === undefined) {
            ComponentSelector.switch_map[switch_id] = [];
        }
        ComponentSelector.switch_map[switch_id].push(selector);
        // console.log(ComponentSelector.switch_map);
        if(!checked) {
            component_switch.click();
        }
    }
}
window.customElements.define('component-selector', ComponentSelector);