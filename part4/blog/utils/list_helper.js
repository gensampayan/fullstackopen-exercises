
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (posts) => {
  return posts.reduce((acc, cur) => acc + cur.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0; 
  return Math.max(...blogs.map(blog => blog.likes));
}

const mostBlogs = (blogs) => {
  const authorWithHighestBlogs = {}

  blogs.forEach((blog) => {
    const author = blog.author
    if (!authorWithHighestBlogs[author]) {
      authorWithHighestBlogs[author] = 0;
    }
      authorWithHighestBlogs[author]++;
  })

  let maxBlogs = 0;
  let nameOfAuthor = "";

  for (let author in authorWithHighestBlogs) {
    if (authorWithHighestBlogs[author] > maxBlogs) {
      maxBlogs = authorWithHighestBlogs[author];
      nameOfAuthor = author;
    }
  }

  return {
    author: nameOfAuthor,
    blogs: maxBlogs,
  };
}

const mostLikes = (blogs) => {  
  const authorWithHighestLikes = {};

  blogs.forEach((blog) => {
    const author = blog.author;
    if (!authorWithHighestLikes[author]) {
      authorWithHighestLikes[author] = 0;
    }
      authorWithHighestLikes[author] += blog.likes;
  })

  let maxLikes = 0;
  let authorWithMostLikes = "";

  for (const [author, likes] of Object.entries(authorWithHighestLikes)) {
    if (likes > maxLikes) {
      maxLikes = likes;
      authorWithMostLikes = author;
    }
  }

  return {
    author: authorWithMostLikes,
    likes: maxLikes
  }
}

const list_helper = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

export default list_helper;
