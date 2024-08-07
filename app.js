// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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

    // Reference to the document in the Firestore collection
    const docRef = doc(db, 'abilities', abilityName);

    try {
        // Check if the document already exists
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Document exists, update it
            console.log('Document exists, updating it.');
        } else {
            // Document does not exist, create it
            console.log('Document does not exist, creating it.');
        }

        // Create or overwrite the document in the Firestore collection
        await setDoc(docRef, {
            desc: abilityDesc,
            dmgRoll: dmgRoll,
            dmgType: dmgType,
            level: abilityLvl,
            type: abilityType
        });

        console.log('Document written with ID: ', abilityName);

        // Clear the input fields
        document.getElementById('abilityName').value = "";
        document.getElementById('abilityType').value = "";
        document.getElementById('abilityLvl').value = "";
        document.getElementById('dmgType').value = "";
        document.getElementById('abilityDesc').value = "";
        document.getElementById('dmgRoll').value = "";

        alert("Ability Submitted");
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

// Add event listener to the submit button
document.getElementById('submitAbility').addEventListener('click', submitAbility);

// Add event listener to the submit button
document.getElementById('submitAbility').addEventListener('click', submitAbility);

//Reset Button
let resetButton = document.getElementById('resetData')

resetButton.onclick = function () {
    if (confirm('Do you want to clear the ability editor?')) {
        document.getElementById('abilityName').value = ""
        document.getElementById('abilityType').value = ""
        document.getElementById('abilityLvl').value = ""
        document.getElementById('dmgType').value = ""
        document.getElementById('abilityDesc').value = ""
        document.getElementById('dmgRoll').value = ""
    }
}

//Grab Existing spell
let grabAbilityButton = document.getElementById('updateAbility');

grabAbilityButton.onclick = async function () {
    let contentElements = document.getElementsByClassName('content');
    for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].style.display = "none";
    }
    document.getElementById('modal').style.display = 'flex';

    // Fetch abilities from Firestore
    const abilityListContainer = document.getElementById('abilityList');
    abilityListContainer.innerHTML = ''; // Clear existing options

    const querySnapshot = await getDocs(collection(db, 'abilities'));
    querySnapshot.forEach((doc) => {
        let abilityOption = document.createElement('div');
        abilityOption.className = 'ability-option';
        abilityOption.textContent = doc.id;
        abilityOption.onclick = () => {
            fillAbilityData(doc.id);
        };
        abilityListContainer.appendChild(abilityOption);
    });
};

async function fillAbilityData(abilityName) {
    document.getElementById('characterList').innerHTML = ""
    document.getElementById('abilityList').innerHTML = ""
    document.getElementById('expandedCard').innerHTML = ""
    const docRef = doc(db, 'abilities', abilityName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('abilityName').value = abilityName;
        document.getElementById('abilityType').value = data.type;
        document.getElementById('abilityLvl').value = data.level;
        document.getElementById('dmgType').value = data.dmgType;
        document.getElementById('abilityDesc').value = data.desc;
        document.getElementById('dmgRoll').value = data.dmgRoll;
        document.getElementById('modal').style.display = 'none'; // Close the modal after selection
        let contentElements = document.getElementsByClassName('content');
        for (let i = 0; i < contentElements.length; i++) {
            contentElements[i].style.display = "flex"; // Show the main content again
        }
    } else {
        console.log('No such document!');
    }
}
