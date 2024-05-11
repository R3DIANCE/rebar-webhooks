import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import Config from '../shared/config.js'
const Rebar = useRebar();

export function useWebhook() {
    let URLS = new Map<string, string>([]);
    Config.forEach(x => {
        URLS.set(x.category, x.url);
    });
    function Send(url: string, data: string) {
        try {
            const response = fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: data }, null, 0)
            });
            if (alt.debug) {
                if (response) {
                    alt.log(`WebhookAPI: ~g~Webhook sent successfully!`);
                } else {
                    alt.log(`WebhookAPI: ~r~Failed to send webhook.`);
                }
            }
        } catch (error) {
            alt.log(url, "WebhookAPI: ~r~An error occurred:", error.message);
        }
    }

    function Add(category: string, url: string) {
        if (URLS.get(category) == category) return alt.log(`WebhookAPI: ~r~Category '${category}' already exists.`);
        return URLS.set(category, url);
    }
    function Get(category: string): string | undefined {
        if (!URLS.has(category)) return alt.log(`WebhookAPI: ~r~Category '${category}' not found.`);
        return URLS.get(category);
    }

    return {
        Add,
        Get,
        Send,
    };
}

declare global {
    export interface ServerPlugin {
        ['webhook-api']: ReturnType<typeof useWebhook>;
    }
}

Rebar.useApi().register('webhook-api', useWebhook());
