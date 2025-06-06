import './assets/styles/index.css';

const container = document.querySelector<HTMLDivElement>('#container')!;
const profilePicture = document.querySelector<HTMLImageElement>('#profilePicture')!;
const profileName = document.querySelector<HTMLHeadingElement>('#profileName')!;
const qrCode = document.querySelector<HTMLImageElement>('#qrCode')!;
const link = document.querySelector<HTMLAnchorElement>('.link')!;

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function getUserData() {
    if (id){
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
    }
    else{
        alert('No user ID provided in the URL.');
    }
}

const data = await getUserData();

if (data) {
  profilePicture.src = data.profilePicture || 'default-profile.jpg';
  profileName.textContent = data.name || 'User';
  qrCode.src = data.QRcode || 'default-qr.png';
  
  if(data.background){
    const image = data.background.find((item: { image?: string }) => 'image' in item)?.image;
    const color = data.background.find((item: { color?: string }) => 'color' in item)?.color;

    container.style.backgroundImage = image ? `url(${image})` : 'none';
    container.style.boxShadow = `inset 0 0 0 2000px ${color}`;
    
  }


  //estilo do link
  if (data.linkStyle) {

    const defaultColor = data.linkStyle.find((item: { defaultColor?: string }) => 'defaultColor' in item)?.defaultColor;
    const hoverColor = data.linkStyle.find((item: { hoverColor?: string }) => 'hoverColor' in item)?.hoverColor;
    const linkColor = data.linkStyle.find((item: { linkColor?: string }) => 'linkColor' in item)?.linkColor;
    const borderRadius = data.linkStyle.find((item: { borderRadius?: string }) => 'borderRadius' in item)?.borderRadius;
    
    qrCode.style.backgroundColor = defaultColor;

    const allLinks = document.querySelectorAll<HTMLAnchorElement>('.link');
    
    allLinks.forEach(linkElement => {
      linkElement.style.backgroundColor = defaultColor;
      linkElement.style.color = linkColor;
      linkElement.style.borderRadius = borderRadius;
    });
    
    const style = document.createElement('style');
    style.textContent = `
      .link:hover {
        background-color: ${hoverColor} !important;
      }
    `;
    document.head.appendChild(style);
  }
}
