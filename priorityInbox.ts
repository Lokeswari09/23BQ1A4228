const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2JxMWE0MjI4QHZ2aXQubmV0IiwiZXhwIjoxNzgwNjM4MDQ0LCJpYXQiOjE3ODA2MzcxNDQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4NjU0MmIzMS0xNzg1LTQzODctYTA0Yi00YmE2NjBiZjgyODQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJjaGVlcmFib3lpbmEgbG9rZXN3YXJpIiwic3ViIjoiYTBhZTE0YzgtMjY0OS00YWFlLWEyMTQtOTNhMmE1MjcyMWU5In0sImVtYWlsIjoiMjNicTFhNDIyOEB2dml0Lm5ldCIsIm5hbWUiOiJjaGVlcmFib3lpbmEgbG9rZXN3YXJpIiwicm9sbE5vIjoiMjNicTFhNDIyOCIsImFjY2Vzc0NvZGUiOiJRUWRFWXkiLCJjbGllbnRJRCI6ImEwYWUxNGM4LTI2NDktNGFhZS1hMjE0LTkzYTJhNTI3MjFlOSIsImNsaWVudFNlY3JldCI6IkNLanJkZ3N4UXVZZnR4UWcifQ.Ltw3Q4vzuzespTHXaJ2IFlbU4CsyzotV4sSRsSdlCyc";
const LOG_API = "http://4.224.186.213/evaluation-service/logs";
const NOTIF_API = "http://4.224.186.213/evaluation-service/notifications";

const WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
): Promise<void> {
  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
    const data = await res.json();
    console.log("Log:", data);
  } catch (e) {
    console.error("Log failed:", e);
  }
}

async function main(): Promise<void> {
  await Log("backend", "info", "service", "priority inbox started");

  const res = await fetch(NOTIF_API, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const data = await res.json();
  const notifications: Notification[] = data.notifications;

  await Log("backend", "info", "service", `fetched ${notifications.length} notifications`);

  const top10 = [...notifications]
    .sort((a, b) => {
      const w = (WEIGHTS[b.Type] || 0) - (WEIGHTS[a.Type] || 0);
      if (w !== 0) return w;
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, 10);

  await Log("backend", "info", "service", "top 10 notifications calculated");

  console.log("\n✅ Top 10 Priority Notifications:\n");
  top10.forEach((n, i) => {
    console.log(`${i + 1}. [${n.Type}] ${n.Message} — ${n.Timestamp}`);
  });
}

main();