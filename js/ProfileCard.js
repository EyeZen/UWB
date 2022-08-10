const _card_content = `
<div class="card">
    <div class="profile-img">
        <img id="profile-img" src="./assets/card1.jpeg" alt="profile-image">
    </div>

    <div class="specializations-wrapper">
        <section class="specializations">
            <div>Clinical Depression</div>
            <div>Dream Analysis</div>
            <div>Clinical Depression</div>
        </section>
    </div>

    <section class="bio">
        <h2 class="bio__name" id="name">
            <slot name="name">Practitioner's Name</slot>
        </h2>
        <div class="bio__degree" id="degree">
            <slot name="degree">Degree/Education</slot>
        </div>

        <ul class="bio__description">
            <li class="description__item">
                <span class="icon icon-hat"></span>
                <span id="specialization">
                    <slot name="specialization">Specialization</slot>
                </span>
            </li>
            <li class="description__item">
                <span class="icon icon-star"></span>
                <span id="experience">
                    <slot name="experience">Experience</slot>
                </span>
            </li>
            <li class="description__item">
                <span class="icon icon-globe"></span>
                <span id="languages">
                    <slot name="languages">Languages known</slot>
                </span>
            </li>
            <li class="description__item">
                <span class="icon icon-calendar"></span>
                <span id="availability">
                    <slot name="availability">Availability</slot>
                </span>
            </li>
        </ul>

        <div class="bio__about">
            <span class="about__content" id="about">
                <slot name="about">A short description of Practitioner and their work.</slot>
            </span>
            <label for="show-popup" class="bio__more">read more</label for="show-popup">
        </div>
    </section>

    <button class="bio__btn">Book now</button>
</div>
`;

import PopupDialog from './PopupDialog.js';

export default class ProfileCard extends HTMLElement {
    constructor(data) {
        super();        
        // this.attachShadow({ mode: 'open' });
        // const template = document.createElement('template');
        // template.innerHTML = _card_content;
        const template = document.getElementById('card-template');

        // const this = this.shadowRoot;
        this.append(template.content.cloneNode(true));

        this.data = {
            name: "Practitioner's name",
            degree: "Practioner's Degree",
            specialization: "Specialization",
            experience: 0,
            languages: ["languages known"],
            availability: "Wed",
            about: "A short description of Practitioner and their work."
        }
        if(data) { this.data = data; }

        if(data.img) {
            this.data.img = data.img;
        } else {
            // higher preference to inline attributes
            const img = this.getAttribute('img');
            if(img) this.data.img = img;
        }
    }

    connectedCallback() {
        // const this = this.shadowRoot;
        const profile_img = this.querySelector('#profile-img');
        const name = this.querySelector('#name');
        const degree = this.querySelector('#degree');
        const specialization = this.querySelector('#specialization');
        const experience = this.querySelector('#experience');
        const languages = this.querySelector('#languages');
        const availability = this.querySelector('#availability');
        const about = this.querySelector('#about');

        
        profile_img.src = this.data.img;
        name.innerHTML = this.data.name;
        degree.innerHTML = this.data.degree;
        specialization.innerHTML = this.data.specialization;
        experience.innerHTML = `${this.data.experience} years of Experience`;
        languages.innerHTML = this.data.languages.join(', ');
        availability.innerHTML = `Next available on ${this.data.availability}`;
        about.innerHTML = this.data.about.substring(0, 90) + '...';;

        const bioMoreLink = this.querySelector('.bio__more');
        bioMoreLink.addEventListener('click', (e) => {
            // console.log(this.data);

            const popup = PopupDialog.getElement();
            popup.generatePopup(this.data);
            popup.show();
        });
    }
}

window.customElements.define('profile-card', ProfileCard);