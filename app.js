// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn4VF9q_ALn5nGHoL9BW3HRir1YeUrtco",
    authDomain: "dungeonapp-3f80a.firebaseapp.com",
    projectId: "dungeonapp-3f80a",
    storageBucket: "dungeonapp-3f80a.appspot.com",
    messagingSenderId: "532180053044",
    appId: "1:532180053044:web:8bf63c2be8f651010aee61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Firestore initialized');

// Navbar handling
let navbar = document.getElementsByClassName('header')[0];

navbar.onclick = function () {
    // Toggle between 'expanded' and 'shrunk' classes
    if (navbar.classList.contains('expanded')) {
        navbar.classList.remove('expanded');
        navbar.classList.add('shrunk');
        navbar.children[1].style.display = 'none';
        navbar.children[2].style.display = 'none';
    } else {
        navbar.classList.remove('shrunk');
        navbar.classList.add('expanded');
        navbar.children[1].style.display = 'block';
        navbar.children[2].style.display = 'block';
    }
};

async function submitAbility() {
    const abilityName = document.getElementById('abilityName').value;
    const abilityType = document.getElementById('abilityType').value;
    const abilityLvl = parseInt(document.getElementById('abilityLvl').value);
    const dmgType = document.getElementById('dmgType').value;
    const abilityDesc = document.getElementById('abilityDesc').value;
    const dmgRoll = document.getElementById('dmgRoll').value;

    // Create or overwrite a document in the Firestore collection with the abilityName as the document ID
    try {
        const docRef = doc(db, 'abilities', abilityName);
        await setDoc(docRef, {
            desc: abilityDesc,
            dmgRoll: dmgRoll,
            dmgType: dmgType,
            level: abilityLvl,
            type: abilityType
        });
        console.log('Document written with ID: ', abilityName);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

// Add event listener to the submit button
document.getElementById('submitAbility').addEventListener('click', submitAbility);
