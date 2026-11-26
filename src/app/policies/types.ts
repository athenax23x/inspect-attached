export type PolicyBody = string | { pending: string };

export type PolicySection = { heading: string; body: PolicyBody[] };

export type RelatedLink = { href: string; label: string };
