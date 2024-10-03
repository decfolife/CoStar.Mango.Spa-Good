export class ObjectTypeTemplates {
  private constructor() {}

  static None: number = 0;
  static Expense: number = 2;
  static Income: number = 3;
  static Accounting: number = 3400;
  static Calendar: number = 3401;
  static OptionChargeExpense: number = 2;
  static OptionChargeIncome: number = 3;
  static Allocations: number = 15600;

  static getAll(): { id: number; name: string }[] {
    return [
      { id: ObjectTypeTemplates.None, name: 'None' },
      { id: ObjectTypeTemplates.Expense, name: 'Expense' },
      { id: ObjectTypeTemplates.Income, name: 'Income' },
      { id: ObjectTypeTemplates.Accounting, name: 'Accounting' },
      {
        id: ObjectTypeTemplates.OptionChargeExpense,
        name: 'Option Charge Expense',
      },
      {
        id: ObjectTypeTemplates.OptionChargeIncome,
        name: 'Option Charge Income',
      },
      { id: ObjectTypeTemplates.Allocations, name: 'Allocations' },
    ];
  }
}
