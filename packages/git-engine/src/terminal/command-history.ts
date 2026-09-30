export class CommandHistory {
  private history: string[] = [];
  private pointer: number = -1;
  private tempInput: string = '';

  constructor(initialHistory: string[] = []) {
    this.history = [...initialHistory];
    this.pointer = this.history.length;
  }

  public push(command: string): void {
    const trimmed = command.trim();
    if (!trimmed) return;

    // Avoid duplicate adjacent commands
    if (this.history.length === 0 || this.history[this.history.length - 1] !== trimmed) {
      this.history.push(trimmed);
    }
    this.pointer = this.history.length;
    this.tempInput = '';
  }

  public navigateUp(currentInput: string): string {
    if (this.history.length === 0) return currentInput;

    if (this.pointer === this.history.length) {
      this.tempInput = currentInput;
    }

    if (this.pointer > 0) {
      this.pointer--;
      return this.history[this.pointer];
    }

    return this.history[0];
  }

  public navigateDown(): string {
    if (this.history.length === 0) return '';

    if (this.pointer < this.history.length - 1) {
      this.pointer++;
      return this.history[this.pointer];
    }

    this.pointer = this.history.length;
    return this.tempInput;
  }

  public getAll(): string[] {
    return [...this.history];
  }

  public clear(): void {
    this.history = [];
    this.pointer = -1;
    this.tempInput = '';
  }
}
