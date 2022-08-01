function change() {
    console.log("Hello i get called")
    const idadd = document.getElementById('blur');
    idadd.classList.toggle('active')
    const popup = document.getElementById('popup');
    popup.classList.toggle('active')
}