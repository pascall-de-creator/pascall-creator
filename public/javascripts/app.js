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

function flash(message, status = "error", duration){
    alert(message)
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blogId = urlParams.get('id')
    const blogCollection = urlParams.get('collection')
    
    titleInput = document.getElementById('titleInput').value
    contentInput = document.getElementById('contentInput').value
    categoryInput = document.getElementById('categoryInput').value
    tagsInput = document.getElementById('tagsInput').value.split(',')
    const publishDateTime = Date.now()

    if(blogId == "" && blogCollection == ""){
        if(contentInput == "" || titleInput == ""){
            db.collection("DraftBlogs").doc().set({
                headline: titleInput,
                content: contentInput,
                category: categoryInput,
                date_published: new Date(publishDateTime),
                tags: tagsInput,
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
                views: 0,
            })
            .then(
                window.location.href = '/'
            )
            .catch((error) => {
                console.error("Error writing document: ", error);
            });   
        } 
        else {
            db.collection("blogs").doc().set({
                headline: titleInput,
                content: contentInput,
                category: categoryInput,
                date_published: new Date(publishDateTime),
                tags: tagsInput,
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
                views: 0,
            })
            .then(
                window.location.href = '/'
            )
            .catch((error) => {
                console.error("Error writing document: ", error);
            });   
        } 
    }
    else {
        db.collection(blogCollection).doc(blogId).update({
            headline: titleInput,
            content: contentInput,
            category: categoryInput,
            date_published: new Date(publishDateTime),
            tags: tagsInput,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
            views: 0,
        })
        .then(
            window.location.href = '/'
        )
        .catch((error) => {
            console.error("Error updating document: ", error);
        });   
    }
}
function createTable(doc, collection) {
    let table = document.getElementsByClassName('table')[0]
    let row = document.createElement('div')
    let headline = document.createElement('p')
    let insight = document.createElement('div')
    let viewIcon = document.createElement('i')
    let views = document.createElement('span')
    let editIcon = document.createElement('a')
    let deleteIcon = document.createElement('a')

    row.setAttribute('data-id', doc.id)
    row.setAttribute('data-collection', collection)
    headline.innerText = doc.data().headline
    views.innerText = doc.data().views

    viewIcon.classList.add("fa-solid");
    viewIcon.classList.add("fa-eye");
    viewIcon.classList.add("px-2");
    viewIcon.classList.add("text-gray-900");
    viewIcon.classList.add("hover:text-gray-700");
    viewIcon.classList.add("dark:text-gray-200");
    viewIcon.classList.add("dark:hover:text-gray-300");
    viewIcon.classList.add("cursor-pointer");
    insight.appendChild(viewIcon)

    
    views.classList.add("text-gray-900");
    views.classList.add("dark:text-gray-200");
    insight.appendChild(views)

    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen");
    editIcon.classList.add("px-2");
    editIcon.classList.add("text-gray-900");
    editIcon.classList.add("dark:text-gray-200");
    editIcon.classList.add("hover:text-gray-700");
    editIcon.classList.add("dark:hover:text-gray-300");
    editIcon.classList.add("cursor-pointer");
    editIcon.addEventListener('click', (e) => {
        let id = e.target.parentElement.parentElement.getAttribute("data-id")
        let coll = e.target.parentElement.parentElement.getAttribute("data-collection")
        endpoint = `/create?id=${id}&collection=${coll}`
        window.location.href = endpoint
    })
    insight.appendChild(editIcon)

    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.classList.add("px-2");
    deleteIcon.classList.add("text-gray-900");
    deleteIcon.classList.add("hover:text-gray-700");
    deleteIcon.classList.add("dark:text-gray-200");
    deleteIcon.classList.add("dark:hover:text-gray-300");
    deleteIcon.classList.add("cursor-pointer");
    deleteIcon.addEventListener('click', (e) => {
        let id = e.target.parentElement.parentElement.getAttribute("data-id")
        let coll = e.target.parentElement.parentElement.getAttribute("data-collection")
        db.collection(coll).doc(id).delete().then(
            window.location.href = '/manage'
        )
    })
    insight.appendChild(deleteIcon)

    headline.classList.add("text-gray-900");
    headline.classList.add("dark:text-gray-200");
    row.appendChild(headline)
    row.appendChild(insight)

    row.classList.add("row");
    table.appendChild(row)
}
function getAllBlogsTable() {
    db.collection("blogs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            createTable(doc, "blogs")
        });
    });
    db.collection("DraftBlogs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            createTable(doc, "DraftBlogs")
        });
    });
}