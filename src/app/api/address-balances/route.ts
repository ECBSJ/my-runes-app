export async function GET() {
  const response = await fetch(
    "https://api.hiro.so/runes/v1/addresses/bc1pc9kfg2vy0u03rc79lw0jfwdy9wjef907nmhj2q8cd88sv6736jrs68sgrd/balances?offset=0&limit=60",
    {
      method: "GET",
      cache: "no-store"
    }
  )

  let data = await response.json()

  return Response.json(data)
}
