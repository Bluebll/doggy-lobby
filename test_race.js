async function run() {
  const payload = {
    customer_name: "Race Test",
    customer_phone: "1234567890",
    customer_address: "123 Street",
    items: [{ id: 7, name: "Premium Dog Bed", price: 1499, quantity: 1 }]
  };
  
  console.log("Sending two concurrent requests...");
  const [res1, res2] = await Promise.all([
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }),
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  ]);
  
  console.log("Res 1:", res1.status, await res1.text());
  console.log("Res 2:", res2.status, await res2.text());
}
run();
