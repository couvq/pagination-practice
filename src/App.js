import "./App.css";
import { getUsers } from "./services/getUsers";
import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function App() {
  const [users, setUsers] = useState(getUsers());
  const [paginatedUsers, setPaginatedUsers] = useState([]); // we will do pagination with 5 user names at a time
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(5);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  useEffect(() => {
    if(leftIndex >= 0 && rightIndex < users.length) {
      setIsNextDisabled(false);
      setPaginatedUsers(users.slice(leftIndex, rightIndex));
    }

    if(rightIndex === users.length) {
      setPaginatedUsers(users.slice(leftIndex));
      setIsNextDisabled(true);
    }

    if(leftIndex === 0) {
      setIsPrevDisabled(true);
    } else {
      setIsPrevDisabled(false);
    }
  }, [leftIndex, rightIndex]);
  

  const next = () => {
    // if rightIndex + 5 <= users.length -> next 5
    if(rightIndex + 5 <= users.length) {
      setLeftIndex(leftIndex + 5);
      setRightIndex(rightIndex + 5);
    }
    // if rightIndex + 5 > users.length && rightIndex < users.length -> take the rest of users array
    else if(rightIndex + 5 > users.length && rightIndex < users.length) {
      setLeftIndex(leftIndex + 5);
      setRightIndex(users.length);
    }
    // otherwise next button should be disabled
  };

  const previous = () => {
    // if leftIndex - 5 >= 0 -> previous 5
    if(leftIndex - 5 >= 0 && rightIndex !== users.length) {
      setLeftIndex(leftIndex - 5);
      setRightIndex(rightIndex - 5);
    } else if(leftIndex - 5 >=0 && rightIndex === users.length) {
      // set right index to the highest multiple of 5
      const highestMultipleOf5 = users.length - (users.length % 5);
      setLeftIndex(leftIndex - 5);
      setRightIndex(highestMultipleOf5);
    }else { // if leftIndex < 0 -> show users 0 - 5
      setLeftIndex(0);
      setRightIndex(rightIndex - 5);
    }
    // otherwise previous button should be disabled
  };

  return (
    <>
      {paginatedUsers.map((user) => (
        <h1>{user}</h1>
      ))}
      <p>
        Showing users {leftIndex}-{rightIndex} of {users.length}
      </p>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={previous} disabled={isPrevDisabled}>
          <ChevronLeftIcon />
          Previous 5 users
        </Button>
        <Button variant="contained" onClick={next} disabled={isNextDisabled}>
          Next 5 users
          <ChevronRightIcon />
        </Button>
      </Stack>
    </>
  );
}

export default App;
