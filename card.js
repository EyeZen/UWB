class Card extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('card-template')
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(templateContent.cloneNode(true));
        this.showLess();
        const img_url = this.dataset.img;
        if(img_url) {
            this.setProfileImage(img_url);
        }
    }

    showLess() {
        const shadow = this.shadowRoot;
        const aboutContent = shadow.querySelector('.about__content');

        let aboutContentValue = aboutContent.textContent;
        aboutContentValue = aboutContentValue.substring(0, 90);
        aboutContentValue += '...';
        aboutContent.textContent = aboutContentValue;
    }
    setProfileImage(img_url) {
        const shadow = this.shadowRoot;
        const profileImg = shadow.getElementById('profile-img');
        profileImg.src = img_url;
    }
}
customElements.define('profile-card', Card);