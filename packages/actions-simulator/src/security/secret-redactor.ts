export class SecretRedactor {
  private secrets: Set<string>;

  constructor(initialSecrets?: Record<string, string> | string[]) {
    this.secrets = new Set();
    if (initialSecrets) {
      if (Array.isArray(initialSecrets)) {
        for (const s of initialSecrets) {
          this.registerSecret(s);
        }
      } else {
        for (const val of Object.values(initialSecrets)) {
          this.registerSecret(val);
        }
      }
    }
  }

  public registerSecret(value: string): void {
    if (!value || typeof value !== 'string') return;
    const trimmed = value.trim();
    // Do not redact trivial tokens like empty, 'true', 'false', numbers
    if (trimmed.length < 3) return;
    this.secrets.add(trimmed);
  }

  public redact(text: string): string {
    if (!text || typeof text !== 'string') return text;
    let redacted = text;
    for (const secret of this.secrets) {
      // Escape regex special chars
      const escaped = secret.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      redacted = redacted.replace(regex, '***');
    }
    return redacted;
  }
}
