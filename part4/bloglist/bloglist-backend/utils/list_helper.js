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

module.exports = { dummy, totalLikes }