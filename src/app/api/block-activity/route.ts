export async function POST(req: Request) {
  let { block_height } = await req.json()

  let response = await fetch(
    `https://api.hiro.so/runes/v1/blocks/${block_height}/activity?offset=0&limit=60`,
    {
      method: "GET",
      cache: "no-store"
    }
  )

  let data = await response.json()

  return Response.json(data)
}
