# rebar-webhooks
https://rebarv.com/ | https://github.com/stuyk/rebar-altv | https://forge.plebmasters.de/hub?contentType=Script | https://altv.mp/

Send webhooks.

# Config
> edit your categories and webhooks in shared/config.ts
```tsx
{
  category: 'Join/Leave',
  url: 'https://discord.com/api/webhooks/12345678901234567890/X_ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
},
{
  category: 'Kill/Death',
  url: 'https://discord.com/api/webhooks/12345678901234567890/X_ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
}
 ```
# Usage

```ts
import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
const Rebar = useRebar();
await alt.Utils.waitFor(() => Rebar.useApi().isReady('webhook-api'), 30000);
const webhookApi = Rebar.useApi().get('webhook-api');

alt.on('playerConnect', (player: alt.Player) => {
    webhookApi.Send(webhookApi.Get('Join/Leave'), `${player.name} has joined.`);
});

alt.on('playerDisconnect', (player: alt.Player, reason?: string) => {
    webhookApi.Send(webhookApi.Get('Join/Leave'), `${player.name} has disconnected ${reason ? `${reason}.`: '.'}`);
});
```