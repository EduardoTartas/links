import "./assets/styles/index.css";

const container = document.querySelector<HTMLDivElement>("#container")!;
const profilePicture = document.querySelector<HTMLImageElement>("#profilePicture")!;
const profileName = document.querySelector<HTMLHeadingElement>("#profileName")!;
const qrCode = document.querySelector<HTMLImageElement>("#qrCode")!;
const allLinks = document.querySelectorAll<HTMLAnchorElement>(".link");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getUserData() {
    if (id) {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        alert("No user ID provided in the URL.");
    }
}

const data = await getUserData();

if (data) {
    profilePicture.src = data.profilePicture || "default-profile.jpg";
    profileName.textContent = data.name || "User";
    qrCode.src = data.qrCode || "default-qr.png";

    if (data.background) {
        const bgImage = data.background.image ? `url(${data.background.image})` : "none";
        container.style.boxShadow = `inset 0 0 0 2000px ${data.background.color || "rgba(0,0,0,0)"}`;
        
        if (data.background.gradient) {
            container.style.backgroundImage = `${data.background.gradient}${data.background.image ? `, ${bgImage}` : ''}`;
        } else {
            container.style.backgroundImage = bgImage;
        }
    }

    // estilo do link
    if (data.linkStyle) {
        const { defaultColor, hoverColor, linkColor, borderRadius, boderHover } = data.linkStyle;
        
        qrCode.style.backgroundColor = defaultColor;
        
        allLinks.forEach((link) => {
            link.style.backgroundColor = defaultColor;
            link.style.color = linkColor;
            link.style.borderRadius = borderRadius;
            
            if (defaultColor === 'transparent') {
                link.style.border = '1px solid white';
            }
        });
        
        // adicionando css
        const css = [
            `.link:hover { background-color: ${hoverColor} !important; }`
        ];
        
        if (linkColor === "#010101") {
            css.push(`.icon { filter: invert(1); }`);
        }
        
        if (defaultColor === 'transparent') {
            css.push(`.link:hover { border: 1px solid ${hoverColor} !important; }`);
        }
        
        if (boderHover) {
            css.push(`
                .link:hover {
                    border: 1px solid ${defaultColor} !important;
                    color: ${defaultColor} !important;
                }
                .link:hover .icon {
                    filter: invert(0);
                }
            `);
        }
        
        const style = document.createElement("style");
        style.textContent = css.join('\n');
        document.head.appendChild(style);
    }
}
