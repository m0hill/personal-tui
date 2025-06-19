# My Interactive Terminal Portfolio ◆

**Live Site:** [**who.mohil.dev**](https://www.google.com/search?q=https://who.mohil.dev/)

This is my personal portfolio, reimagined as a fully interactive, retro-style terminal user interface (TUI). Instead of a traditional webpage, you can navigate my profile using keyboard commands, just like in a classic terminal application.

[](https://bun.sh/)
[](https://react.dev/)
[](https://github.com/vadimdemedes/ink)
[](https://www.cloudflare.com/products/tunnel/)

## How It Works: The Tech Stack

This project uses a unique pipeline to bring a terminal application to the web:

1.  **UI with Ink & React**: The user interface is built as a command-line app using **[Ink](https://github.com/vadimdemedes/ink)**, a framework that brings the power of React to the terminal.

2.  **Powered by Bun**: The entire application is developed and run using the **[Bun](https://bun.sh/)** runtime, a fast all-in-one JavaScript toolkit.

3.  **Single-File Binary**: Using `bun build --compile`, the entire TypeScript/React application is compiled into a single, self-contained executable binary. No `node_modules` needed to run\!

4.  **Web Terminal with ttyd**: The **[ttyd](https://github.com/tsl0922/ttyd)** utility is used to share the compiled binary's terminal output as a web application.

5.  **Exposed via Cloudflare Tunnel**: A secure **[Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/)** is established to expose the local `ttyd` server to the public internet, making it accessible worldwide through the `who.mohil.dev` domain.

**Architecture Flow:**

```
[ Ink/React App ] -> bun build -> [ Executable ] -> ttyd -> [ Cloudflare Tunnel ] -> https://who.mohil.dev
```

## Features

  * **Vim-Style Navigation**: Use arrow keys or hotkeys (`h`, `a`, `e`, `p`, `s`, `c`) to navigate sections.
  * **Interactive Components**: A fully interactive experience with loading animations and distinct sections for my profile.
  * **Non-Interactive Mode**: If the app is piped or run in a non-TTY environment, it automatically switches to a display-only mode that cycles through sections.
  * **Zero-Dependency Deployment**: The compiled binary can run on any compatible system without needing to install any dependencies.

## Accessing the Portfolio

  * **Web Browser**: The primary way to view the portfolio is at [**who.mohil.dev**](https://www.google.com/search?q=https://who.mohil.dev/).
  * **SSH**: For a true terminal experience, you can also SSH in: `ssh why.mohil.dev`.

## Local Development

### Prerequisites

  * [Bun](https://bun.sh/) (v1.1.0 or later)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/m0hill/personal-tui.git
    cd personal-tui
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

### Available Commands

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `bun start`      | Run the TUI application in your local terminal.  |
| `bun run build`  | Compile the app into a single executable binary. |
| `bun run lint`   | Lint the code using Biome.                       |
| `bun run format` | Format the code using Biome.                     |
