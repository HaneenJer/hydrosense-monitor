import RandomReadingSender from "./RandomReadingSender";

test("unit id is empty", async () => {
  const setError = (msg: string) => {
    expect(msg).toBe("Please enter a unit ID");
  };
  const setAlerts = () => {
    throw new Error("Should not be called");
  };

  await RandomReadingSender.send("", setAlerts, setError);
});

test("shows alert when reading is sent", async () => {

  window.alert = jest.fn();
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      status: "OK",
      classification: "Healthy",
    }),
  });

  const setError = () => {};
  const setAlerts = () => {};
  await RandomReadingSender.send("unit123", setAlerts, setError);
  expect(window.alert).toHaveBeenCalledWith("Reading classification: Healthy");
});
