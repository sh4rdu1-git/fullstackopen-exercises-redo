const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if (blogs.length === 0) return 0

  const likesArray = blogs.map(blog => {
    return blog.likes
  })

  const reducer = (sum, item) => {
    return sum  + item
  }

  return likesArray.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  let maxLikes = 0
  let favouriteBlog = null

  blogs.map(blog => {
    if (blog.likes > maxLikes){
      maxLikes = blog.likes
      favouriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })

  return favouriteBlog
}

module.exports = { dummy, totalLikes, favouriteBlog }