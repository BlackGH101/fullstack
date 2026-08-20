const Header = ({course}) => {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}


/* exercise 2.2 and 2.3 */
const TotalExercises = ({parts}) =>{
   const total = parts.reduce((sum, part) => sum + part.exercises , 0)
  return (
    <div>
     <p><b>total of {total} exercises</b></p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <p key={part.id}> {part.name} {part.exercises}</p> )}
    </div>
  )
}



const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <TotalExercises parts={course.parts} />
    </div>
  )
}

export default Course