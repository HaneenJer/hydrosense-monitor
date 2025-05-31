// first chek if user typed a unit id 
const send = async (
  unitId: string,
  setAlerts: React.Dispatch<React.SetStateAction<any[]>>,
  setError: Function
) => {
  if (!unitId.trim()) {
    setError("Please enter a unit ID");
    return;
  }

  // generate a random date between now and 5 years ago 
  // didn't know which date to choose start from, for test purposes added 5 years 
  // then format the date to match the requested format 
  function getRandomTimestamp(): string {
    const now = new Date();
    const past = new Date(2020, 0, 1);
    const randomTime = new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
    return randomTime.toISOString().split('.')[0] + "Z";
  }

  const newTimestamp = getRandomTimestamp();
  const randomReading = {
    timestamp: newTimestamp,
    unitId,
    readings: {
      pH: +(Math.random() * 14).toFixed(2),
      temp: +(15 + Math.random() * 20).toFixed(1),
      ec: +(0.5 + Math.random() * 2).toFixed(2),
    },
  };

  setError("");
  try {
    const res = await fetch("http://localhost:5000/api/sensor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(randomReading),
    });
    const data = await res.json();
    if (data.status === "OK") {
      alert(`Reading classification: ${data.classification}`);
      setAlerts((prev) => [
        {
          timestamp: newTimestamp,
          readings: randomReading.readings,
          classification: data.classification,
        },
        ...prev,
      ]);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch {
    alert("Network error while sending reading");
  }
};

export default {
  send,
};
