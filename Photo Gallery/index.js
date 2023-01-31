
async function loadPhotos() {
    let res = await fetch("photos.json")
    let photos = await res.json();
    return photos
}

function getPhotosHtml(photos) {
    let myPhotosHtml = photos.map(photo => {
        return `<img class="my-photo" src="https://picsum.photos/id/${photo.id}/100/100" alt="${photo.title}"/>`
    }).join("");
    return `<div class="my-photos"> ${myPhotosHtml} </div>`
}

loadPhotos().then(photos => {
    document.body.innerHTML = `
    <div class="my-gallery">
    <img style="display: inline" src="https://picsum.photos/id/3/300/300" alt="1" class="my-photo" id="my-selected-photo"/>
    ${getPhotosHtml(photos)} </div>
    `

    let myPhotoImgs = Array.from(document.getElementsByClassName("my-photo"));
    myPhotoImgs.forEach(photoImg => {
        photoImg.addEventListener("click", event => {
            let selectedPhotoSrc = `${photoImg.src.substr(0, photoImg.src.length - 7)}300/300`;
            let selectedPhoto = document.getElementById("my-selected-photo");
            selectedPhoto.src = selectedPhotoSrc
            selectedPhoto.style.display = "inline"
        })
    });
})