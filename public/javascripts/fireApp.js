await setDoc(doc(blogsRef), {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    image_alt: "Cyberpunk",
    category: "Learning",
    date_published: "10-12-2022",
    tags: ["development","Gaming","learning"],
    link: "Lorem-ipsum-doro-amit-hokage",
    headline: "Lorem ipsum doro amit hokage",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, quas amet suscipit, minus beatae quod ipsam, esse vero dignissimos eaque architecto repudiandae. Sapiente quasi fugiat nemo quibusdam sint, odit cum.",
    author : "pascall de creator",
    reactions: 12,
    comments: 5,
    saves: 16
});