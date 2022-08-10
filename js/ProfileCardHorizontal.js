const _card_content = `
<style>
@import url(css/ProfileCard.css);

.card {
    // --card-width: 400px;
}
.card__content {
    display: flex;
}
.profile-img {
    flex: 1;
}
.bio {
    flex: 2;
}
.bio__btn {
    margin-bottom: 0.8em;
}


.specializations-wrapper {
    width: 100%;
    height: 3em;
    overflow: hidden;
    /* margin-inline: 2em; */
    /* border: 1px solid black; */
    margin-top: 10px;

    position: relative;
}
.specializations-wrapper::before, 
.specializations-wrapper::after {
    content: '';
    position: absolute;
    /* z-index: 100; */
    /* background-color: lime; */
    width: 15%;
    height: 100%;
    top: 0;                
}
.specializations-wrapper::before {
    left: 0;
    background-image: linear-gradient(to right, white, rgb(255,255,255, 0.4));
}
.specializations-wrapper::after {
    right: 0;
    background-image: linear-gradient(to left, white, rgb(255,255,255, 0.4));
}
.specializations {
    /* border: 1px solid black; */
    height: 4.5em;
    width: 85%;
    margin-inline: auto;
    overflow: auto;
    white-space: nowrap;
    padding-top: 0.5em;

    padding-inline-start: 10%;
}
.specializations::after {
    content: '';
    display: inline-block;
    width: 40px;
}
.specializations > * {
    border: 1px solid var(--col-accent);
    color: var(--col-accent);
    border-radius: 15px;
    padding-inline: 0.5em;
    padding-block: 0.2em;

    display: inline;
}

</style>
<div class="card">
    <main class="card__content">
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
    </main>

    <div class="specializations-wrapper">
        <section class="specializations">
            <div>Clinical Depression</div>
            <div>Dream Analysis</div>
            <div>Clinical Depression</div>
        </section>
    </div>

    <button class="bio__btn">Book now</button>
</div>
`;

export default class ProfileCardHorizontal extends HTMLElement {
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
        const experience = shadow.getElementById('experience');
        const languages = shadow.getElementById('languages');

        
        profile_img.src = this.data.img;
        name.innerHTML = this.data.name;
        degree.innerHTML = this.data.degree;
        experience.innerHTML = `${this.data.experience} years of Experience`;
        languages.innerHTML = this.data.languages.join(', ');
    }
}

window.customElements.define('profile-card-horizontal', ProfileCardHorizontal);