<!-- 
Instuction
Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.
-->

sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server-->>browser: {content: "[]", date: "2024-07-23T17:24:33.409Z"}
  deactivate server

  Note right of browser: The browser executes the callback function that renders the notes
    