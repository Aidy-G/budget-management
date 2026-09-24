import { buildSharedAmounts, getBudgetStatus } from './addExpenditure';

describe('buildSharedAmounts', () => {
  it('splits a total amount equally when no custom values are provided', () => {
    expect(buildSharedAmounts(1000)).toEqual({ first: 500, second: 500 });
  });

  it('keeps the total consistent when one amount is adjusted manually', () => {
    expect(buildSharedAmounts(1000, 700)).toEqual({ first: 700, second: 300 });
  });

  it('returns zeros for non-positive totals', () => {
    expect(buildSharedAmounts(0)).toEqual({ first: 0, second: 0 });
    expect(buildSharedAmounts(-10)).toEqual({ first: 0, second: 0 });
  });
});

describe('getBudgetStatus', () => {
  it('allows a valid addition within the school budget', () => {
    expect(getBudgetStatus({ budget: 1000, currentTotal: 700, newTotal: 250 })).toEqual({
      isExceeded: false,
      message: '',
      projectedTotal: 950,
      remainingBudget: 50,
    });
  });

  it('flags a warning when the new expenditure exceeds the school budget', () => {
    expect(getBudgetStatus({ budget: 1000, currentTotal: 700, newTotal: 500 })).toEqual({
      isExceeded: true,
      message: 'הסכום הכולל של ההוצאות חורג מהתקציב של המוסד הנבחר',
      projectedTotal: 1200,
      remainingBudget: -200,
    });
  });
});
