type user = Record<number, { name: string; mark: makrs[] }>;
interface makrs {
  math: number;
  phy: number;
  cs: number;
  eng: number;
}
enum GradeLevel {
  O = "A+",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}
type response = Record<
  number,
  { id: number; name: string; grade: string; marks: makrs[] }
>;
class Grade {
  values: user[] = [];
  constructor(value: user) {
    this.values.push(value);
  }

  add(user: user): void {
    this.values.push(user);
  }
  getUser(): response {
    const result: response = {};

    let userId = 0;

    for (const record of this.values) {
      for (const key in record) {
        const value = record[key];

        result[userId] = {
          id: userId,
          name: value.name,
          grade: "",
          marks: value.mark,
        };

        userId++;
      }
    }

    return result;
  }
  // hasUser(id: number): response {
  //   return;
  // }
  getGrade(marks: makrs[]) {
    let getTotal = 0;
    let percentage = 0;
    let grade;
    const overAll = mark.length * 100;
    const set = new Set([marks]).forEach((itm) => {
      getTotal = itm.reduce((acc: number, curr: any) => acc + curr, 0);
      percentage = getTotal / mark.length;
      grade = this.setGrade(percentage);
    });
    return {
      getTotal,
      percentage,
      grade,
    };
  }
  setGrade(percentage: number | undefined | null) {
    if (percentage == null) return;

    switch (true) {
      case percentage === 100:
        return GradeLevel.O;
      case percentage >= 90:
        return GradeLevel.A;
      case percentage >= 80:
        return GradeLevel.B;
      case percentage >= 70:
        return GradeLevel.C;
      case percentage >= 60:
        return GradeLevel.D;
      case percentage >= 50:
        return GradeLevel.E;
      default:
        return GradeLevel.F;
    }
  }
  nextLevel() {}
}
