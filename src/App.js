import { useEffect, useState } from "react";
import { weather } from "./api/connection";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    weather.get('/').then(
      resp => setMessage(resp.data)
    );
  }, []);
  return (
    <>
    <p>
      {message.temp}
    </p>
    </>
  );
}

export default App;
