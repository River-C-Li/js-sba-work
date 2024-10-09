// // The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
//   // The provided assignment group.
const AssignmentGroup = [{
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  }];
//   // The provided learner submission data.
const LearnerSubmissions = [
     {learner_id: 125, assignment_id: 1, submission: {submitted_at: "2023-01-25", score: 47}
    },
    {learner_id: 125, assignment_id: 2, submission: {submitted_at: "2023-02-12", score: 150}
    },
    {learner_id: 125, assignment_id: 3,
      submission: {submitted_at: "2023-01-25", score: 400}
    },
    {learner_id: 132, assignment_id: 1,
      submission: {submitted_at: "2023-01-24", score: 39}
    },
    { learner_id: 132, assignment_id: 2,
      submission: {submitted_at: "2023-03-07",score: 140 }
    }
  ];

// /////////////////////////////////////////////////////data end, function start here
AssignmentGroup[0].assignments.pop()
const removedFruits = LearnerSubmissions.splice(2, 1);             /////////////////////////cut useless data

// for (const assgroup of AssignmentGroup) {
//   assgroup.assignments.forEach(due => {
// // console.log([`${due.id}, ${due.due_at}, ${due.points_possible}`]);  
// }); }      
// for (const learnsubmi of LearnerSubmissions) {        
//   //  console.log([`id: ${learnsubmi.learner_id} , ${learnsubmi.assignment_id}: ${learnsubmi.submission.score} , subat: ${learnsubmi.submission.submitted_at}`]);         
//   }    
                                                                ///////////////////above, first try to loop needed data
try{
LearnerSubmissions[0].submission.forEach(obj => {
    obj.forEach(item => {
        if (item.submitted_at > AssignmentGroup[0].assignments[0].due_at) {
            item.score -= 15; // conditional detuct 15 /////////hard to access to "submitted_at" and "score",  catch error.
        }else {
          item.score == item.score
        }
    });
  });
  console.log(LearnerSubmissions[0].submission.score)      
} catch (error) {
  console.log("erro")     
} finally{
  console.log("OOPS! Hard to access to your submitted time, so your later submission still scores original.")
}

const totPoint =AssignmentGroup[0].assignments.reduce(
  (sum, item) => sum + item.points_possible, 0);
// console.log(totPoint);                      /////////////////////////////////////////total points finished

const totScoreById = {};
LearnerSubmissions.forEach(item => {
if (totScoreById[item.learner_id]) {
totScoreById[item.learner_id] += item.submission.score;
} else {
totScoreById[item.learner_id] = item.submission.score;
}
});
// console.log(totScoreById);   /////////////////////////////////////////////////total score by ID,finished

//////////first try avg, finished
// const values = Object.values(totScoreById)
// // console.log(values); 
// const avg = values.map(number => number/totPoint)
// console.log(avg)    

 //////// second try avg, unfinished
// const avg = Object.entries(totScoreById); 
// for (const [key, value] of avg) {
//   console.log(key + ": " + value); 
// }

const avg = Object.entries(totScoreById).reduce((acc, [key, value]) => {
  acc[key] = value /totPoint;  
  return acc;
}, {});
// console.log(avg)          /////////////////////////////////////// total average, last try, finished         

const sglscoreId = {};
LearnerSubmissions.forEach((item) => {
  if (!sglscoreId[item.learner_id]) {
    sglscoreId[item.learner_id] = [];
  }
  sglscoreId[item.learner_id].push(item.submission.score/(AssignmentGroup[0].assignments[0].points_possible));  
});
// console.log(sglscoreId);           /////////////////////////////single score by ID, finished, but something wrong,


// const sglValue = Object.values(sglscoreId)    /////////////////////single score by ID, tried.
// // console.log(values); 
// const sglAvg = sglValue.map(number => number/AssignmentGroup[0].assignments[0].points_possible )
// console.log(sglAvg)  


function idPairScores(objects) {
    const result = {}; 
    for (const obj of objects) {
      for (const [key, value] of Object.entries(obj)) {
        if (!result[key]) {
          result[key] = new Set();
        }
        result[key].add(value);
      }
    }
    for (const key in result) {
      result[key] = Array.from(result[key]);
    }
    return result;
  }
  const result = idPairScores([avg, sglscoreId]);
  // console.log(result);                             /////////////////////merge averages by ID, finished.


  function flattenArraysInObject(result) {
    const finaldata = {};
  
    function flatten(result, prefix = "") {
      for (const key in result) {
        const value = result[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
  
        if (Array.isArray(value)) {
            finaldata[newKey] = value.flat(Infinity);  
        } else if (typeof value === "object" && value !== null) {
          flatten(value, newKey);  
        } else {
            finaldata[newKey] = value;
        }
      }
    }
    flatten(result);
    return finaldata;
  }
  const flattenedObj = flattenArraysInObject(result);
  console.log(flattenedObj);                   ///////////////////////////////flatten results, finished.


  // const entries = Object.entries(flattenedObj);
  // // console.log(entries)
  // const flatArray = entries.flat(Infinity)
  // console.log(flatArray)
  // const finaltranscript= {
  //   id: flatArray[0],
  //   aver: flatArray[1],
  //   1: flatArray[2],
  //   2: flatArray[3],
  //   id: flatArray[4],
  //   aver: flatArray[5],
  //   1: flatArray[6],
  //   2: flatArray[7]
  // };
  // console.log(finaltranscript) /////// try to make a format with key name, but still unfinished, -.


   // final output: 
 //  { '125': [ 0.985, 0.94, 3 ], 
  //   '132': [ 0.895, 0.78, 2.8 ] }

// ------The End


  







// function getLearnerData(course, asg, submi) {
// }  
//     return result;
//   }
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//   console.log(result);
  
  // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    // ];

