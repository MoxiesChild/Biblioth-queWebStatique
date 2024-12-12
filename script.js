async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];
    if (!file) return alert("Veuillez sélectionner une image");

    const formData = new FormData();
    formData.append("file", file);

    try {
        // Appel à l'API backend pour envoyer l'image à Azure Blob Storage
        const response = await fetch("https://europe-north1-cybernetic-pact-444213-i0.cloudfunctions.net/main_afficher_livre", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
        if (data == 1) {
            alert("Livre ajouté avec succès");
            loadBooks();
        } else {
            alert("Erreur lors de l'ajout du livre");
        }
    } catch (error) {
        alert("Erreur: " + error);
    }
}
 
async function deleteBook(id){
    await fetch("https://gestionbibliotheque.azurewebsites.net/api/SupprimerLivre?id="+id+"&code=Mj000k0ILDk-ZrEm5BHFka6MoNld8giaRCoCWELXvs5dAzFuRbXsfA%3D%3D");
    loadBooks();
}

async function loadBooks(){
    const response = await fetch("https://gestionbibliotheque.azurewebsites.net/api/AfficherLivre?code=Mj000k0ILDk-ZrEm5BHFka6MoNld8giaRCoCWELXvs5dAzFuRbXsfA%3D%3D");
    const books = await response.json();
    console.log(books);
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach(book => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${book[2]}" alt="${book[1]}" width="100" />
            <p>${book[1]}</p>
            <button onClick= "deleteBook(${book[0]})"> Supprimer </button>
        `;
        bookList.appendChild(div);
    });
}

// Charger les livres au démarrage
window.onload = loadBooks;
