declare module 'jest-axe' {
  export const axe: (element?: any, options?: any) => Promise<any>;
  export const toHaveNoViolations: any;
}
