export class ClassificationTestOptions {
    public test1: boolean;
    public test2: boolean;
    public test3: number;
    public test4: number;
    public test5: boolean;
  
    constructor (test1 = false, test2 = false, test5 = false) {
      this.test1 = test1;
      this.test2 = test2;
      this.test3 = 0;
      this.test4 = 0;
      this.test5 = test5;
    }
  }
  
  export class LessorClassificationTestOptions {
    public test1: boolean;
    public test2: boolean;
    public test3: boolean;
    public test4: boolean;
    public test5: boolean;
    public test6: boolean;
    public test7: boolean;
  
    constructor(test1 = false, test2 = false, test3 = false, test4 = false, test5 = false, test6 = false, test7 = false) {
      this.test1 = test1;
      this.test2 = test2;
      this.test3 = test3;
      this.test4 = test4;
      this.test5 = test5;
      this.test6 = test6;
      this.test7 = test7;
    }
  }
  