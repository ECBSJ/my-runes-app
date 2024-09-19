# How to build a custom Runes Dashboard

This tutorial and sample application is meant for all levels of developers learning to build bitcoin applications.

You can either clone this repo locally and tinker with it or watch the full fledged step-by-step tutorial to learn how this was built.

## Getting Started

After cloning the repo locally to your computer:

Navigate to project folder:

```bash
cd my-runes-app
```

Install project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Watch the tutorial

The full video tutorial on how you can build this application is out on the [Hiro Youtube](https://www.youtube.com/@HiroSystems) channel. Eric Choy, Developer Advocate at Hiro, will be walking you through the building process. You'll also get to learn what Runes are on Bitcoin and how do the Runes API works behind the scenes with Rafael Cárdenas, Senior Software Engineer at Hiro.

You'll need to occassionally grab pre-built code snippets [here](https://gist.github.com/ECBSJ/0cd822062a998ada1393a830a48c1043) during the step-by-step tutorial process.

## Tools Used

To learn more about Hiro's Runes APIs:

- [Hiro Documentation](https://docs.hiro.so/bitcoin/runes/api) - learn about the different Runes API endpoints.
- [Hiro Blog](https://www.hiro.so/blog/introducing-the-runes-api) - learn about why Hiro built the Runes API endpoints.
- [Runehook](https://github.com/hirosystems/runehook) - learn about the mechanics behind the Runes API endpoints.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Stacks Connect:

- [Stacks Connect Docs](https://docs.hiro.so/stacks/connect) - learn how you can connect Bitcoin Web3 wallets, such as [Leather](https://leather.io) to your app.

## Deploy on Vercel

The easiest way to deploy your Next.js Runes app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## App Enhancements/Suggestions

Here are some suggestions you can further implement to this application. Just fork the code and start building!

- Add connect compatibility with other Bitcoin wallets
- Implement new cards or route segments for viewing data from other Runes API endpoints such as:
  - Get rune holders `/runes/v1/etchings/{etching}/holders`
  - Get all activity for a rune `/runes/v1/etchings/{etching}/activity`
  - Get etchings `/runes/v1/etchings`
- Display market price of a rune
- A separate but similar dashboard for Ordinals data using Hiro's [Ordinals API](https://docs.hiro.so/bitcoin/ordinals/api).
