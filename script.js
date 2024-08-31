// Example: Animation on scroll
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    let scrollPosition = window.scrollY;

    hero.style.backgroundPositionY = -scrollPosition / 2 + 'px';
});
if (!name || !address || !phone) {
    alert("Please complete all fields.");
    return;
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_7Fi3aMsOgKWFRaRtZbSlOAmCl6NSATc",
    authDomain: "d2enterprices.firebaseapp.com",
    databaseURL: "https://d2enterprices-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "d2enterprices",
    storageBucket: "d2enterprices.appspot.com",
    messagingSenderId: "148686257825",
    appId: "1:148686257825:web:59b9c7ff26690658ecfae0",
    measurementId: "G-TTKC4ESDYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// References
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productsCollection = collection(db, 'products');

// Add/Edit Product
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;
    const imageFile = document.getElementById('productImage').files[0];

    if (imageFile) {
        const storageRef = ref(storage, 'images/' + imageFile.name);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(productsCollection, {
            name,
            price,
            description,
            imageUrl
        });
    }
    productForm.reset();
});

// Display Products
onSnapshot(productsCollection, (snapshot) => {
    productList.innerHTML = '';
    snapshot.forEach(async (doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${data.name}</h3>
            <img src="${data.imageUrl}" alt="${data.name}" width="100">
            <p>${data.description}</p>
            <p>$${data.price.toFixed(2)}</p>
            <button onclick="deleteProduct('${doc.id}')">Delete</button>
        `;
        productList.appendChild(li);
    });
});

async function deleteProduct(id) {
    await deleteDoc(doc(db, 'products', id));
}

