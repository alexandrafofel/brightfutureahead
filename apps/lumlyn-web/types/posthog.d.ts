// apps/lumlyn-web/types/posthog.d.ts
// Minimal PostHog typings to avoid TS errors when calling window.posthog on the client.

export {};

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify?: (distinctId: string, properties?: Record<string, any>) => void;
      reset?: () => void;
      group?: (groupType: string, groupKey: string, properties?: Record<string, any>) => void;
      opt_in_capturing?: () => void;
      opt_out_capturing?: () => void;
      isFeatureEnabled?: (key: string) => boolean;
      onFeatureFlags?: (cb: () => void) => void;
      getFeatureFlag?: (key: string) => string | boolean | null | undefined;
      getProperty?: (key: string) => any;
      people?: {
        set: (props: Record<string, any>) => void;
        set_once?: (props: Record<string, any>) => void;
        increment?: (prop: string, by?: number) => void;
      };
    };
  }
}
