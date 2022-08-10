const _card_content = `
<style>
@import url(css/ProfileCard.css);
</style>
<div class="card">
    <div class="profile-img">
        <img id="profile-img" src="./assets/card1.jpeg" alt="profile-image">
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
        </ul>
    </section>

    <button class="bio__btn">Book now</button>
</div>
`;

export default class ProfileCardShort extends HTMLElement {
    constructor(data) {
        super();        
        this.attachShadow({ mode: 'open' });        
        const template = document.createElement('template');
        template.innerHTML = _card_content;

        const shadow = this.shadowRoot;
        shadow.append(template.content.cloneNode(true));

        this.data = {
            name: "Practitioner's name",
            degree: "Practioner's Degree",
            specialization: "Specialization",
            experience: 0,
            languages: ["languages known"],
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
        const shadow = this.shadowRoot;
        const profile_img = shadow.getElementById('profile-img');
        const name = shadow.getElementById('name');
        const degree = shadow.getElementById('degree');
        const specialization = shadow.getElementById('specialization');
        const experience = shadow.getElementById('experience');
        const languages = shadow.getElementById('languages');

        
        profile_img.src = this.data.img;
        name.innerHTML = this.data.name;
        degree.innerHTML = this.data.degree;
        specialization.innerHTML = this.data.specialization;
        experience.innerHTML = `${this.data.experience} years of Experience`;
        languages.innerHTML = this.data.languages.join(', ');
    }
}

window.customElements.define('profile-card-short', ProfileCardShort);