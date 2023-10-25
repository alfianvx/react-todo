import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div className="w-full md:max-w-lg min-h-screen mx-auto mt-16 px-5">
      <h1 className="font-bold text-3xl mb-6">What's the plan for today ?</h1>
      <InputTodo />
      <ListTodo />
    </div>
  );
}

export default App;
