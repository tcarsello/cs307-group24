import React, { useState } from 'react';

function ViewLaborCosts() {
  const [weeklyCost, setWeeklyCost] = useState('');
  const [showWeeklyLabel, setShowWeeklyLabel] = useState(false);
  const [showDailyLabel, setShowDailyLabel] = useState(false);

  const handleWeeklyCostChange = (event) => {
    setWeeklyCost(event.target.value);
  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    setShowWeeklyLabel(true);
    setShowDailyLabel(true);
  }

  return (
    <form>
      <p><strong>Weekly Labor Cost: </strong>{showWeeklyLabel && <label>$21</label>}</p>
      <p><strong>Daily Labor Cost: </strong>{showDailyLabel && <label>$21</label>}</p>
      <br />
      <button onClick={handleButtonClick}>Calculate</button>
    </form>
  );
}

export default ViewLaborCosts;
