import { memo, useState } from "react";

function SortCompleted({ dispatch, sortByCompleted }) {
  const [checkSortCompleted, setCheckSortCompleted] = useState(true);
  return (
    <button
      onClick={() => {
        setCheckSortCompleted(!checkSortCompleted);
        dispatch(sortByCompleted(checkSortCompleted));
      }}
    >
      SortByCompleted
    </button>
  );
}

export default memo(SortCompleted);
