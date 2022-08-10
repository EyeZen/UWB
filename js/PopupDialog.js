const _popup_content = `
<style>
@import url(css/popup.css);
</style>
<div class="popup-wrapper hidden">
    <div class="popup">
        <section class="bio">
            <div class="profile-img">
                <img id="profile-img" src="./assets/card1.jpeg" alt="profile-image">
            </div>

            <div class="bio__info">
                <h2 class="bio__name" id="name">
                    <slot name="name">Practitioner's Name</slot>
                </h2>
                <div class="bio__degree" id="degree">
                    <slot name="degree">Degree/Education</slot>
                </div>
                
                <ul class="bio__description">
                    <li class="description__item">
                        <span class="icon icon-hat"></span>
                        <span>
                            <slot name="specialization">Specialization</slot>
                        </span>
                    </li>
                    <li class="description__item">
                        <span class="icon icon-star"></span>
                        <span>
                            <slot name="experience">Experience</slot>
                        </span>
                    </li>
                    <li class="description__item">
                        <span class="icon icon-globe"></span>
                        <span>
                            <slot name="languages">Languages known</slot>
                        </span>
                    </li>
                    <li class="description__item">
                        <span class="icon icon-calendar"></span>
                        <span>
                            <slot name="availability">Availability</slot>
                        </span>
                    </li>
                </ul>
            </div>
        </section>
        <section class="aside">
            <div class="bio__about">
                <span class="about__content">
                    <slot name="about">
                        Expertise: Anxiety, Relationships Sanya works with adolescents and adults. Her expertise is on working with anxiety, trauma, depression, and relationship issues. She believes in working in partnership with clients, utilizing their strengths to help them sort out their challenges and achieve their goals. She also knows how important it is to identify all aspects of an individuals life that impact their well-being including their physical health, support systems (family, friends), work or school environment, and faith/spirituality in this process.\n\nMy hobbies include swimming, cycling and reading.
                    </slot>
                </span>
            </div>
            <div class="bio__btns">
                <button id="book-btn" class="bio__btn">Book now</button>
                <button id="close-btn" class="bio__btn">Close</button>
            </div>
        </section>
    </div>
</div>
`;

export default class PopupDialog extends HTMLElement{
    _self = null;
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = _popup_content;
        
        this.attachShadow({mode: 'open'});
        const shadow = this.shadowRoot;
        shadow.append(template.content.cloneNode(true));

        const close_btn = shadow.getElementById('close-btn');
        close_btn.addEventListener('click', this.hide.bind(this));

        const avatar = this.getAttribute('avatar');
        if(avatar) {
            shadow.getElementById('profile-img').src = avatar;
        }
    }
    generatePopup(obj) {
        const shadow = this.shadowRoot;
        shadow.getElementById('profile-img').src = obj.img;
        const popup_content = `
            <span slot="name">${obj.name}</span>
            <span slot="degree">${obj.degree}</span>
            <span slot="specialization">${obj.specialization}</span>
            <span slot="experience">${obj.experience} years of Experience</span>
            <span slot="languages">${obj.languages}</span>
            <span slot="availability">Next available on ${obj.availability}</span>
            <span slot="about">${obj.about}</span>
        `
        document.querySelector('popup-dialog').innerHTML = popup_content;
    }
    show() {
        const shadow = this.shadowRoot;
        const popup = shadow.querySelector('.popup-wrapper');
        if(popup.classList.contains('hidden')) {
            popup.classList.remove('hidden');
        }
        document.body.addEventListener('scroll', PopupDialog.scrollBlock);
    }
    hide() {
        const shadow = this.shadowRoot;
        const popup = shadow.querySelector('.popup-wrapper');
        if(!popup.classList.contains('hidden')) {
            popup.classList.add('hidden');
        }
        document.body.removeEventListener('scroll', PopupDialog.scrollBlock);
    }

    static getElement() {
        if(PopupDialog._self == null) {
            PopupDialog._self = document.querySelector('popup-dialog');
        }
        return PopupDialog._self;
    }
    // TODO:
    static scrollBlock(event){
        event.preventDefault();
    }
}
window.customElements.define('popup-dialog', PopupDialog);