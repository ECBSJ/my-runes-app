export async function GET() {
  let response = await fetch("https://api.hiro.so/runes/v1/", {
    method: "GET",
    cache: "no-store"
  })
  let data = await response.json()

  return Response.json(data)
}
