import Part from "./Part";

const Content = (props) => {
  console.log(props.parts);
  const parts = props.parts;

  const total = parts.reduce((sum, presentVal) => {
    return sum + presentVal.exercises;
  }, 0);

  console.log("Total", total);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises}></Part>
      ))}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  );
};

export default Content;
