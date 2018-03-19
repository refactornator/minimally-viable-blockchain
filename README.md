### PivotCoin

An attempt at learning blockchain by making one. This blockchain is designed to work in your browser, but use a meeting server to find other peers to communicate with. Once you know about peers, your client can send and receive coins in a secure, decentralized way.

#### Getting Started

To get started you'll need to install [Elixir](https://elixir-lang.org/install.html) and [Node](https://nodejs.org/en/download/package-manager/).

Once you've installed all the dependencies you can start the app. First start the Elixir meeting server with these commands:

```
cd meeting_server
mix phx.server
```

Then, in another tab, build the client and start a development web server with these commands:

```
cd client
yarn start
```

Navigate to http://localhost:3000/ in your favorite browser.
