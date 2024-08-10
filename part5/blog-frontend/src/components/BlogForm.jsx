const BlogForm = ({ titleData, authorData, urlData, inChange, inSubmit }) => {
  return (
    <form onSubmit={inSubmit}>
      <label>Title:</label>
      <input 
        type="text" 
        name="title"
        value={titleData}
        onChange={inChange}  
      />
      <br />
      <label>Author:</label>
      <input 
        type="text" 
        name="author"
        value={authorData}
        onChange={inChange}  
      />   
      <br />   
      <label>URL:</label>
      <input 
        type="text" 
        name="url"
        value={urlData}
        onChange={inChange}  
      />
      <br />
      <br />
      <button type="submit">Create</button>
    </form> 
  )
}

export default BlogForm;
