var pageref = document.getElementsByTagName("html")[0];

const toogleTheme = () => {
    if( pageref.className == "dark") {
        pageref.classList.remove('dark');
        pageref.classList.add('light');
    } else {
        pageref.classList.remove('light');
        pageref.classList.add('dark');
    }
}

function flash(message, status = "error"){
    prompt(message)
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
  .then((register) => console.log('registeres', register))
  .catch((error) => console.log('not registered', error))
}


const firebaseConfig = {
    apiKey: "AIzaSyDgaeSwQjkrQSh4ZQ7LrJJVWJ8ZyibKits",
    authDomain: "pascall-creator-web.firebaseapp.com",
    projectId: "pascall-creator-web",
    storageBucket: "pascall-creator-web.appspot.com",
    messagingSenderId: "522420559947",
    appId: "1:522420559947:web:f349a646a2ca9c36d6adce",
    measurementId: "G-NLCXL4PR37"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app)

function postBlog(){
    titleInput = document.getElementById('titleInput').value
    contentInput = document.getElementById('contentInput').value
    categoryInput = document.getElementById('categoryInput').value
    tagsInput = document.getElementById('tagsInput').value.split(',')
    const publishDateTime = Date.now()

    if(titleInput == ""){
        flash("Title must be Provided")
    } else {
        if(contentInput == ""){
            if(titleInput == ""){
                flash("Title must be Provided")
            } else {
                db.collection("DraftBlogs").doc(titleInput).set({
                    headline: titleInput,
                    content: contentInput,
                    category: categoryInput,
                    date_published: new Date(publishDateTime),
                    tags: tagsInput,
                    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
                    views: 0,
                    reactions: 0,
                })
                .then(
                    // window.Location('/')
                )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });   
            }
        } else {
            db.collection("blogs").doc(titleInput).set({
                headline: titleInput,
                content: contentInput,
                category: categoryInput,
                date_published: new Date(publishDateTime),
                tags: tagsInput,
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
                views: 0,
                reactions: 0,
            })
            .then(
                // window.Location('/')
            )
            .catch((error) => {
                console.error("Error writing document: ", error);
            });   
        }
    }
}

function getAllBlogs() {
    
}