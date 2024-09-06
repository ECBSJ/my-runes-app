export async function GET() {
  let response = await fetch("https://api.hiro.so/runes/v1/")
  let data = await response.json()

  return Response.json(data)
}
