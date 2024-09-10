export async function POST(req: Request) {
  let { address } = await req.json()

  const response = await fetch(
    `https://api.hiro.so/runes/v1/addresses/${address}/balances?offset=0&limit=60`,
    {
      method: "GET",
      cache: "no-store"
    }
  )

  let data = await response.json()

  return Response.json(data)
}
