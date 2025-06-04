import './assets/styles/index.css';

const container = document.querySelector<HTMLDivElement>('#container')!;
const profilePicture = document.querySelector<HTMLImageElement>('#profilePicture')!;
const profileName = document.querySelector<HTMLHeadingElement>('#profileName')!;
const links = document.querySelector<HTMLDivElement>('#links')!;
const link = document.querySelector<HTMLAnchorElement>('#link')!;
const qrCode = document.querySelector<HTMLImageElement>('#qrCode')!;


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
    profilePicture.src = data.profilePicture;
    profileName.textContent = data.name;
    qrCode.src = data.QRcode;
}

container.innerHTML = `
<style>

</style>
`;




