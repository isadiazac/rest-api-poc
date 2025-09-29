import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 20,
  duration: "30s",
};

const base = "http://localhost:3000";

export default function () {
  // Una ejecución simple: login -> listar tasks
  const loginRes = http.post(
    `${base}/api/v1/auth/login`,
    JSON.stringify({ username: "admin", password: "adminpass" }),
    { headers: { "Content-Type": "application/json" } }
  );
  check(loginRes, { "login ok": (r) => r.status === 200 });
  if (loginRes.status !== 200) {
    sleep(1);
    return;
  }
  const token = JSON.parse(loginRes.body).token;
  const res = http.get(`${base}/api/v1/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(res, { "get tasks ok": (r) => r.status === 200 });
  sleep(1);
}
