type uniqueId = Record<string, string>;
interface Marks {
  math: number;
  phy: number;
  cs: number;
  eng: number;
}
interface user {
  id: number;
  user: {
    name: string;
    marks: number[];
  };
}
const enum GradeLevel {
  O = "A+",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

interface pass {
  pass: () => string;
}
interface fail {
  fail: () => string;
}

type status = {
  pass: pass;
  fail: fail;
};
interface UserDetails {
  name: string;
  grade: GradeLevel;
  percentage: number;
  marks: Marks;
  result: { status: string };
}
type response = Record<number, UserDetails>;
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

    for (const v of this.values) {
      const gradeDetails = this.getGrade(v.user.marks);
      const [math, phy, cs, eng] = gradeDetails.marks;
      const userStatus = this.getStatus(gradeDetails.grade);

      result[v.id] = {
        name: v.user.name,
        grade: this.setGrade(gradeDetails.percentage),
        percentage: gradeDetails.percentage || 0,
        marks: { math, phy, cs, eng },
        result: userStatus,
      };
    }

    return result;
  }
  // hasUser(id: number): response {
  //   return;
  // }
  getGrade(marks: number[]) {
    const total = marks.reduce((acc: number, curr: any) => acc + curr, 0);
    const percentage = total / marks.length;
    const grade = this.setGrade(percentage);

    return {
      total: total,
      percentage: percentage,
      grade: grade,
      marks,
    };
  }
  setGrade(percentage: number): GradeLevel {
    if (percentage == null) return GradeLevel.F;
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
  getStatus(grade: string) {
    const s: status = {
      pass: {
        pass: () => "Pass",
      },
      fail: {
        fail: () => "Fail",
      },
    };
    return grade !== "F"
      ? { status: s.pass.pass() }
      : { status: s.fail.fail() };
  }
  nextLevel() {}
}
let sampleObj = {
  id: 1,
  user: {
    name: "el",
    marks: [99, 95, 95, 88],
  },
};
let sampleObj_2 = {
  id: 2,
  user: {
    name: "kal",
    marks: [99, 95, 95, 88],
  },
};
const test = new Grade(sampleObj);
test.add(sampleObj_2);
console.log(test.getUser());
