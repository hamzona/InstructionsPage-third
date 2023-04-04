import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
export default function SortMenu() {
  const { setSortBy } = usePostContext();
  const [localRate, setLocalRate] = useState(undefined);
  return (
    <div>
      <select value={localRate} onChange={(e) => setLocalRate(e.target.value)}>
        <option value={undefined}>unchecked</option>
        <option value={"rate"}>best rate</option>
        <option value={"date"}>newest</option>
      </select>
      <button onClick={() => setSortBy(localRate)}>submit</button>
    </div>
  );
}
