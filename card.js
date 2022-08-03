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

// dummy data. To be replaced by data requested from server
const practionersData = [
    {
        id: 1,
        img: './assets/card1.jpeg',
        name: 'Dr. J.N. Tripathi',
        degree: 'M.A. Psychology',
        specialization: 'Clinical Depression, Dream analysis',
        experience: 13,
        languages: ['English', 'Hindi'],
        availability: 'Wed',
        about: 'Expertise: Anxiety, Relationships Sanya works with adolescents and adults. Her expertise is on working with anxiety, trauma, depression, and relationship issues. She believes in working in partnership with clients, utilizing their strengths to help them sort out their challenges and achieve their goals. She also knows how important it is to identify all aspects of an individuals life that impact their well-being including their physical health, support systems (family, friends), work or school environment, and faith/spirituality in this process.\n\nMy hobbies include swimming, cycling and reading.\n\n',
    },
    {
        id: 2,
        img: './assets/card2.png',
        name: 'Dr. Poonam Joshi',
        degree: 'M.Sc. Psychology',
        specialization: 'Bipolar Disorder, Mood swings',
        experience: 8,
        languages: ['Hindi', 'Marathi'],
        availability: 'Wed',
        about: 'Expertise: Anxiety, Relationships Sanya works with adolescents and adults. Her expertise is on working with anxiety, trauma, depression, and relationship issues. She believes in working in partnership with clients, utilizing their strengths to help them sort out their challenges and achieve their goals. She also knows how important it is to identify all aspects of an individuals life that impact their well-being including their physical health, support systems (family, friends), work or school environment, and faith/spirituality in this process.\n\nMy hobbies include swimming, cycling and reading.\n\n',
    },
    {
        id: 3,
        img: './assets/card3.png',
        name: 'Neeta Singh',
        degree: 'M.A. Psychology',
        specialization: 'Clinical Depression, Dream analysis',
        experience: 12,
        languages: ['English', 'Hindi'],
        availability: 'Wed',
        about: 'Expertise: Anxiety, Relationships Sanya works with adolescents and adults. Her expertise is on working with anxiety, trauma, depression, and relationship issues. She believes in working in partnership with clients, utilizing their strengths to help them sort out their challenges and achieve their goals. She also knows how important it is to identify all aspects of an individuals life that impact their well-being including their physical health, support systems (family, friends), work or school environment, and faith/spirituality in this process.\n\nMy hobbies include swimming, cycling and reading.\n\n',
    },
    {
        id: 4,
        img: './assets/card1.jpeg',
        name: 'Dr. J.N. Tripathi',
        degree: 'M.A. Psychology',
        specialization: 'Clinical Depression, Dream analysis',
        experience: 13,
        languages: ['English', 'Hindi'],
        availability: 'Wed',
        about: 'Expertise: Anxiety, Relationships Sanya works with adolescents and adults. Her expertise is on working with anxiety, trauma, depression, and relationship issues. She believes in working in partnership with clients, utilizing their strengths to help them sort out their challenges and achieve their goals. She also knows how important it is to identify all aspects of an individuals life that impact their well-being including their physical health, support systems (family, friends), work or school environment, and faith/spirituality in this process.\n\nMy hobbies include swimming, cycling and reading.\n\n',
    },
    {
        id: 5,
        img: './assets/card2.png',
        name: 'Dr. Poonam Joshi',
        degree: 'M.Sc. Psychology',
        specialization: 'Bipolar Disorder, Mood swings',
        experience: 8,
        languages: ['Hindi', 'Marathi'],
        availability: 'Wed',
        about: 'Expertise: Anxiety, Relationships Sanya works with adolescents and adults. Her expertise is on working with anxiety, trauma, depression, and relationship issues. She believes in working in partnership with clients, utilizing their strengths to help them sort out their challenges and achieve their goals. She also knows how important it is to identify all aspects of an individuals life that impact their well-being including their physical health, support systems (family, friends), work or school environment, and faith/spirituality in this process.\n\nMy hobbies include swimming, cycling and reading.\n\n',
    },
]


function getCard(practitioner) {
    const card = `
        <profile-card data-img="${      practitioner.img}">
        <span slot="name">${            practitioner.name           }</span>
        <span slot="degree">${          practitioner.degree         }</span>
        <span slot="specialization">${  practitioner.specialization }</span>
        <span slot="experience">${      practitioner.experience     } years of experience</span>
        <span slot="languages">${       practitioner.languages.join(', ')      }</span>
        <span slot="availability">Next available on ${    practitioner.availability   }</span>
        <span slot="about">${           practitioner.about          }</span>
        </profile-card>
    `
    return card;
}

const cards = document.querySelector('.profiles');
for(const practitioner of practionersData) {
    cards.innerHTML += getCard(practitioner);
}

window.addEventListener('load', (e) => {
    const updateNavbar = event => {
        const mobileMedia = window.matchMedia('(max-width:700px)');
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        const [UP, DOWN] = [1, -1]
        let direction = UP;
        if(updateNavbar.prevScroll < scrollTop) direction = DOWN;
        if(mobileMedia.matches) {
            if(scrollTop < 40) {
                if(direction == UP) window.scrollTo({top: 0});
                else window.scrollTo({top: 50});
                header.style.paddingBlock = 'var(--padd_v)';
                header.style.height = 'initial';
            } else {
                header.style.paddingBlock = '0px';
                // header.style.height = '40px';
                header.style.height = `calc(${header.style.height} - 2*var(--padd_v))`;
            }
        } else {
            header.style.paddingBlock = 'var(--padd_v)';
            // header.style.height = '90px';
        }
        updateNavbar.prevScroll = scrollTop;
    }
    updateNavbar.prevScroll = 0;
    window.onscroll = updateNavbar;
    window.onresize = updateNavbar;
})