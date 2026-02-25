const fn=function(marks){
     let getTotal;
     let percentage;
     let grade;
     const overAll=mark.length*100
    const set =new Set([marks]).forEach((itm)=>{
        getTotal = itm.reduce((acc,curr)=>acc+curr,0)
        percentage=getTotal/mark.length;
        grade=setGrade(percentage)
        
    })
   return {
    getTotal,
    percentage,
    grade,
    mark,
   }
}

  setGrade=(percentage) =>{
    if (percentage == null) return;

    switch (true) {
      case percentage === 100:
        return "A+";
      case percentage >= 90:
        return "A";
      case percentage >= 80:
        return "B";
      case percentage >= 70:
        return "C";
      case percentage >= 60:
        return "D";
      case percentage >= 50:
        return "E";
      default:
        return "F";
    }
  }

let mark=[99,95,95,88]
const v=fn(mark)
console.log(v)