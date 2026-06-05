export async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
): Promise<void> {
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2JxMWE0MjI4QHZ2aXQubmV0IiwiZXhwIjoxNzgwNjM2NTg5LCJpYXQiOjE3ODA2MzU2ODksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3ZjkyNTYwNy03NGZjLTQ3NjYtODQ5ZS1jMmQ5MGU4Mzc2OTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJjaGVlcmFib3lpbmEgbG9rZXN3YXJpIiwic3ViIjoiYTBhZTE0YzgtMjY0OS00YWFlLWEyMTQtOTNhMmE1MjcyMWU5In0sImVtYWlsIjoiMjNicTFhNDIyOEB2dml0Lm5ldCIsIm5hbWUiOiJjaGVlcmFib3lpbmEgbG9rZXN3YXJpIiwicm9sbE5vIjoiMjNicTFhNDIyOCIsImFjY2Vzc0NvZGUiOiJRUWRFWXkiLCJjbGllbnRJRCI6ImEwYWUxNGM4LTI2NDktNGFhZS1hMjE0LTkzYTJhNTI3MjFlOSIsImNsaWVudFNlY3JldCI6IkNLanJkZ3N4UXVZZnR4UWcifQ.fk1y2RyYF7H5-_vl-KPyPadEgl_cwjAs94IItJfxWmg";
  const LOG_API = "http://4.224.186.213/evaluation-service/logs";
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
    const data = await response.json();
    console.log("Log created:", data);
  } catch (error) {
    console.error("Logging failed:", error);
  }
}