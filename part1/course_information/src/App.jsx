const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <p>{part.name} {part.exercises}</p>
      ))}
    </>
  )
}

const Total = ({ total }) => {
  return (
    <>
      <p>Number of exercises {total.reduce((acc, value) => acc + value.exercises, 0)}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header 
        course={course.name} 
      />
      <Content 
        parts={course.parts}
      />
      <Total
        total={course.parts}
      />
    </div>
  )
}

export default App;
