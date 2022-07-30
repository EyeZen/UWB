/*
    usage:
    <div data-component="component-name"></div>

    @component-name: should be the name of component html file
    e.g.,
    // loads header from header.html
    <div data-component="header"></div>

*/


// function to include html components
async function loadComponent(element) {
    const res = await fetch(element + '.html');
    const data = await res.text()
    return data;
}

// load all components
document.querySelectorAll('[data-component]')
.forEach(componentContainer => {
    const componentName = componentContainer.dataset.component;
    loadComponent(componentName)
    .then(data => {
        componentContainer.innerHTML = data
    });
});