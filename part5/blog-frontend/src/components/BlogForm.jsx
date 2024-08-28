import { forwardRef } from "react"
import PropTypes from 'prop-types'

const BlogForm = forwardRef(({ titleData, authorData, urlData, inChange, inSubmit }, ref) => {
  return (
    <form onSubmit={inSubmit} ref={ref}>
      <label>Title:</label>
      <input 
        type="text" 
        name="title"
        role="textbox"
        value={titleData}
        onChange={inChange}  
      />
      <br />
      <label>Author:</label>
      <input 
        type="text" 
        name="author"
        role="textbox"
        value={authorData}
        onChange={inChange}  
      />   
      <br />   
      <label>URL:</label>
      <input 
        type="text" 
        name="url"
        role="textbox"
        value={urlData}
        onChange={inChange}  
      />
      <br />
      <br />
      <button type="submit">Create</button>
    </form> 
  )
})

BlogForm.propTypes = {
  titleData: PropTypes.string.isRequired,
  authorData: PropTypes.string.isRequired,
  urlData: PropTypes.string.isRequired,
  inChange: PropTypes.func.isRequired,
  inSubmit: PropTypes.func.isRequired
}

export default BlogForm;
