const _navbar_content = `
<style>
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: 0.2s ease-in-out;
}

.header {
    --padd_h: 40px;
    --padd_v: 14px;
    --col-accent: #67B0D1;

    position: sticky;
    z-index: 10;
    top: 0;    
    background-color: var(--col-accent);
    display: flex;
    align-items: center;
    padding-left: var(--padd_h);
    padding-block: var(--padd_v);
    gap: 40px;

    height: 90px;
}

.header__btn-back {
    --btn-size: 32px;
    width: var(--btn-size);
    aspect-ratio: 1;
    min-width: var(--btn-size);
    cursor: pointer;
    /* background: url(./assets/icons/arrow-left.svg) no-repeat center center/cover;
    background-size: 80%; */
    background-color: white;
    -webkit-mask: url(./assets/icons/arrow-left.svg) no-repeat center center/cover;
    mask: url(./assets/icons/arrow-left.svg) no-repeat center center/cover;
}

.header__logo {
    --logo-size: 60px;
    width: var(--logo-size);
    height: var(--logo-size);
    min-width: var(--logo-size);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
	background: url(./assets/logo.jpeg) no-repeat center center/cover;
	background-size: 130%;
    box-shadow: 0 0 15px rgba(68, 68, 68, 0.4);
}

@media only screen and (max-width: 700px) {
    /* .header__logo { --logo-size: 48px; } */
    /* .header__logo { transform: scale(0.6); }
    .header__btn-back { transform: scale(0.6); } */
    .header__logo { transform: scale(0.8); }
    .header__btn-back { transform: scale(0.8); }
    .header { 
        --padd_v: 8px;
        --padd_h: 20px;
        gap: 10px;

        height: 65px;
    }
}

</style>
<header class="header">
    <div class="header__btn-back" onclick="history.back()"></div>
    <a href="http://unitedwell-being.org/" class="header__logo"></a>
</header>
`;

export default class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const template = document.createElement('template');
        template.innerHTML = _navbar_content;

        this.shadowRoot.append(template.content.cloneNode(true));
    }
    connectedCallback() {
        window.onload = () => {        
            // Responsive Navbar
            const updateNavbar = () => {
                const mobileMedia = window.matchMedia('(max-width:700px)');
                const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                const header = this.shadowRoot.querySelector('.header');
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
        } 
    }
}
customElements.define('nav-bar', Navbar);