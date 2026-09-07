import { describe, expect, it } from 'vitest';
import { getNumberInputDisplayValue, toNumberInputText } from './number-input-value.js';

describe('toNumberInputText', () => {
  it('stringifies numbers', () => {
    expect(toNumberInputText(34)).toBe('34');
  });

  it('uses an empty string when the value is missing', () => {
    expect(toNumberInputText(undefined)).toBe('');
  });
});

describe('getNumberInputDisplayValue', () => {
  it('keeps a trailing decimal while composing a number', () => {
    expect(getNumberInputDisplayValue('34.', 34)).toBe('34.');
  });

  it('keeps a leading minus while composing a negative number', () => {
    expect(getNumberInputDisplayValue('-', 34)).toBe('-');
  });

  it('keeps decimal input that already parses to the bound value', () => {
    expect(getNumberInputDisplayValue('5.5', 5.5)).toBe('5.5');
  });

  it('uses the bound number when the draft is stale', () => {
    expect(getNumberInputDisplayValue('34', 10)).toBe('10');
  });

  it('uses the draft when the bound value is empty', () => {
    expect(getNumberInputDisplayValue('-', undefined)).toBe('-');
  });
});
