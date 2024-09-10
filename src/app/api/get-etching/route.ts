export async function POST(req: Request) {
  let { id } = await req.json()
  let response = await fetch(`https://api.hiro.so/runes/v1/etchings/${id}`, {
    method: "GET",
    cache: "no-store"
  })

  let data = await response.json()

  return Response.json(data)
}
