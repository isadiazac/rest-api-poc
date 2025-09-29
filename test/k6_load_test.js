import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10, // 10 usuarios virtuales simultáneos
  duration: "30s", // durante 30 segundos
};

const BASE_URL = "http://host.docker.internal:3000";

export default function () {
  const loginRes = http.post(
    `${BASE_URL}/api/v1/auth/login`,
    JSON.stringify({ username: "isabela", password: "123456" }),
    { headers: { "Content-Type": "application/json" } }
  );

  check(loginRes, { "login ok": (r) => r.status === 200 });
  if (loginRes.status !== 200) {
    sleep(1);
    return;
  }

  const token = JSON.parse(loginRes.body).token;

  const tasksRes = http.get(`${BASE_URL}/api/v1/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(tasksRes, { "get tasks ok": (r) => r.status === 200 });

  sleep(1);
}
