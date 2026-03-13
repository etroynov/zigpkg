# zigpkg.dev

Open source package registry for the [Zig](https://ziglang.org/) programming language.

Browse, search, and discover Zig libraries and applications at [zigpkg.dev](https://zigpkg.dev).

## Stack

- [SvelteKit](https://kit.svelte.dev/) — framework
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL — database
- [Bun](https://bun.sh/) — runtime & package manager

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- PostgreSQL database

### Install

```sh
bun install
```

### Environment

Create `.env` and set the required variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/zigpkg
```

### Develop

```sh
bun run dev
```

### Build

```sh
bun run build
bun run preview
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
