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
function openAccordion(id){
    var arccontent = document.getElementById(id)
    if(arccontent.style.display == "flex"){
        arccontent.style.display = "none"
    } else {
        arccontent.style.display = "flex"
    }
}
function toggleSideBar() {
    let sidebar = document.getElementById('sidebarAccordion')
    if(sidebar.style.display == "flex"){
        sidebar.style.display = "none"
    } else {
        sidebar.style.display = "flex"
    }
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
var storage = firebase.storage();

function uploadFile(){
    const ref = storage.ref();

    const file = document.getElementById('fileInput').files[0]

    const name = new Date() + '-' + file.name
    
    const metadata = {
        contentType: file.type
    }

    const task = ref.child(name)
    .put(file, metadata)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        if( url != undefined || url != "" || url != null){
            var fileUrlElement = document.getElementById('fileurl')
            fileUrlElement.value = url
            console.log(url)
        }
    })
}

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

    if(blogId == null && blogCollection == null){
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
                // window.location.href = '/'
            )
            .catch((error) => {
                console.error("Error writing document: ", error);
            });   
        } else {
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
                // window.location.href = '/'
            )
            .catch((error) => {
                console.error("Error writing document: ", error);
            });   
        } 
    } else {
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
            // window.location.href = '/'
        )
        .catch((error) => {
            console.error("Error updating document: ", error);
        });   
    }
}
function saveAsDraft(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blogId = urlParams.get('id')
    const blogCollection = urlParams.get('collection')
    
    titleInput = document.getElementById('titleInput').value
    contentInput = document.getElementById('contentInput').value
    categoryInput = document.getElementById('categoryInput').value
    tagsInput = document.getElementById('tagsInput').value.split(',')
    const publishDateTime = Date.now()

    if(blogId == null && blogCollection == null){
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
            // window.location.href = '/'
        )
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
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
            // window.location.href = '/'
        )
        .catch((error) => {
            console.error("Error updating document: ", error);
        });   
    }
}
function getDraftData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blogId = urlParams.get('id')
    const blogCollection = urlParams.get('collection')

    titleInput = document.getElementById('titleInput')
    contentInput = document.getElementById('contentInput')
    categoryInput = document.getElementById('categoryInput')
    tagsInput = document.getElementById('tagsInput')
    
    if(blogId != null || blogCollection != null){
        var docRef = db.collection(blogCollection).doc(blogId);

        docRef.get().then((doc) => {
            if (doc.exists) {
                titleInput.value = doc.data().headline
                contentInput.value = doc.data().content
                categoryInput.value = doc.data().category
                tagsInput.value = doc.data().tags.toString()
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    } else {
    }
}
function createTable(doc, collection) {
    let table = document.getElementsByClassName('table')[0]
    let row = document.createElement('div')
    let headline = document.createElement('p')
    let status = document.createElement('p')
    let insight = document.createElement('div')
    let info = document.createElement('div')
    let viewIcon = document.createElement('i')
    let views = document.createElement('span')
    let editIcon = document.createElement('a')
    let deleteIcon = document.createElement('a')

    row.setAttribute('data-id', doc.id)
    row.setAttribute('data-collection', collection)

    headline.innerText = doc.data().headline

    if(collection == "blogs"){
        status.innerText = "Posted"
        status.classList.add("text-sm");
        status.classList.add("text-green-900");
        status.classList.add("bg-green-200");
        status.classList.add("border-green-500");
        status.classList.add("border-2");
        status.classList.add("px-2");
        status.classList.add("mx-2");
        status.classList.add("py-1");
        status.classList.add("rounded-full");
    } else {
        status.innerText = "Draft"
        status.classList.add("text-sm");
        status.classList.add("text-red-900");
        status.classList.add("bg-red-200");
        status.classList.add("border-red-500");
        status.classList.add("border-2");
        status.classList.add("px-2");
        status.classList.add("py-1");
        status.classList.add("mx-2");
        status.classList.add("rounded-full");
    }

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
            // window.location.href = '/manage'
        )
    })
    insight.appendChild(deleteIcon)

    headline.classList.add("text-gray-900");
    headline.classList.add("dark:text-gray-200");

    info.classList.add("flex");
    info.classList.add("items-center");
    info.appendChild(headline)
    info.appendChild(status)

    row.appendChild(info)
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
function generateLink(){
    let content = document.getElementById('linkContentEl').value
    let to = document.getElementById('linkToEl').value
    let navtype = document.getElementById('navigateOptions').value
    let outputElement = document.getElementById('linkOutput')

    outputElement.value = `<a href="${to}" target="${navtype}" rel="noopener noreferrer">${content}</a>`
}
function tooglePreviewPanel(){
    let contentInput = document.getElementById('contentInput')
    let previewPanel = document.getElementById('previewPanel')

    if(contentInput.style.width == "50%"){
        previewPanel.style.display = "none"
        contentInput.style.width = "100%"
    } else {
        previewPanel.style.display = "block"
        contentInput.style.width = "50%"
    }
}
function updatePreview(){
    let contentInput = document.getElementById('contentInput')
    let previewPanel = document.getElementById('previewPanel')

    let parser = new DOMParser();
    const doc = parser.parseFromString(contentInput.value, 'text/html');
    previewPanel.innerHTML = doc
}
function renderBlog(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blogId = urlParams.get('id')

    console.log(blogId)
    if(blogId == null && blogCollection == null){
        console.log("nothing here")
    } 
    else {
        var docRef = db.collection("blogs").doc(blogId);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let dbThumbnail = doc.data().image
                let dbHeadline = doc.data().headline
                let dbContent = doc.data().content
                let dbDate = doc.data().date_published.toDate().toDateString()
                let dbCategory = doc.data().category
                let dbTagList = doc.data().tags

                var blogThumbnail = document.getElementById("blogThumbnail").setAttribute("src", dbThumbnail)
                var blogHeadline = document.getElementById("blogHeadline").innerText = dbHeadline
                var blogContent = document.getElementById("blogContent").innerText = dbContent
                var blogDate = document.getElementById("date").innerText = dbDate
                var blogCategory = document.getElementById("category").innerText = dbCategory
                var blogTagList = document.getElementById("blogTagList")

                dbTagList.forEach(tag => {
                    let tagEl = document.createElement('span')
                    tagEl.classList.add('tagBadge')
                    tagEl.innerText = `#${tag}  `
                    blogTagList.appendChild(tagEl)
                })
            } 
            else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}
function renderTopBlog(doc) {
    let image = document.getElementsByClassName('top-blogImage')[0]
    let blogCategory = document.getElementsByClassName('top-blogCategory')[0]
    let blogDate = document.getElementsByClassName('top-blogDate')[0]
    let badge1 = document.getElementsByClassName('tag-badge')[0]
    let badge2 = document.getElementsByClassName('tag-badge')[1]
    let badge3 = document.getElementsByClassName('tag-badge')[2]
    let blogHeadline = document.getElementsByClassName('top-blogHeadline')[0]
    let blogContent = document.getElementsByClassName('top-blogContent')[0]

    image.setAttribute('src', doc.data().image)
    blogCategory.innerHTML = `${doc.data().category} -•- `
    blogDate.innerText = doc.data().date_published.toDate().toDateString()

    if(doc.data().tags[0] != undefined){
        badge1.innerText = `#${doc.data().tags[0]}`
        badge1.style.display = "block"
        badge1.href = `/search?tag=${doc.data().tags[0]}`
    } else {
        badge1.style.display = "none"
    }
    if(doc.data().tags[1] != undefined){
        badge2.innerText = `#${doc.data().tags[1]}`
        badge2.style.display = "block"
        badge2.href = `/search?tag=${doc.data().tags[1]}`
    } else {
        badge2.style.display = "none"
    }
    if(doc.data().tags[2] != undefined){
        badge3.innerText = `#${doc.data().tags[2]}`
        badge3.style.display = "block"
        badge3.href = `/search?tag=${doc.data().tags[2]}`
    } else {
        badge3.style.display = "none"
    }

    blogHeadline.innerText = doc.data().headline
    blogHeadline.href = `/read?id=${doc.id}`
    blogContent.innerText = doc.data().content
    blogContent.href = `/read?id=${doc.id}`

}
function fetchBlogs() {
    let topBlogsList = []

    db.collection("blogs").orderBy('views').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            topBlogsList.push(doc)
            renderTopBlog(topBlogsList[0])
        })
    })

}
