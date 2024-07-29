const Course = ({ courses }) => {
  return (
    <>
      <ul>
        {courses.map((course, courseIndex) => (
          <li key={courseIndex}>
            {course.name}
            <ul>
              {course.parts.map((part, partIndex) => (
                <li key={`${courseIndex}-${partIndex}`}>
                  {part.name} {part.exercises}
                </li>
              ))}
              <p>total of {course.parts.reduce((acc, value) => acc + value.exercises, 0)} exercises</p>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Course;
