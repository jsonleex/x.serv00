# Script for Serv00

## Scripts

- [X] Auto login every Saturday at 10:38

## How to Install PM2?

> [!IMPORTANT]
> Serv00 don't allow you to use `sudo` command
>
> So before install PM2, you need change `npm global prefix` to `~/.npm-global` by run `npm config set prefix ~/.npm-global`
>
> And after change `npm global prefix`, you need add the line `export PATH=~/.npm-global/bin:$PATH` to `~/.profile`
>
> Then **reconnect** your server and run `npm install -g pm2`

## How to start vless server?

> [!IMPORTANT]
> Before start vless server, you need set two environment variables: `UUID` and `PORT` which include in [scripts/vless.mjs](./scripts/vless.mjs#L8-L9)
>
> you can generate `UUID` by run `uuidgen` or `openssl rand -hex 16`
>

- Run `pm2 start ./scripts/vless.mjs --name vless`
- Run `pm2 save` to save pm2 snapshot
- Run `pm2 startup` to start pm2 on reboot
- Run `pm2 logs` to see logs
