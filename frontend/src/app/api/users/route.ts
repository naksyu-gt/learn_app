export async function GET() {
  const base = process.env.API_BASE_URL;
  if (!base) return new Response("API_BASE_URL is not set", { status: 500 });

  const res = await fetch(`${base}/users`, { cache: "no-store" });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function POST(req: Request) {
  const base = process.env.API_BASE_URL;
  if (!base) return new Response("API_BASE_URL is not set", { status: 500 });

  const body = await req.json();

  const res = await fetch(`${base}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}
