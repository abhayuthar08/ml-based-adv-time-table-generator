// import random from "random";

// // Initialize the population with random timetables
// export const initialize_population = (pop_size, classes, working_days, time_slots, subjects, teachers, rooms, weekly_classes) => {
//   const population = [];

//   for (let i = 0; i < pop_size; i++) {
//     const timetable = {};

//     classes.forEach((className) => {
//       timetable[className] = {};
//       const subjectCounts = { ...weekly_classes };

//       working_days.forEach((day) => {
//         timetable[className][day] = [];

//         time_slots.forEach((slot) => {
//           // Choose a subject that hasn't exceeded its weekly limit
//           const availableSubjects = Object.keys(subjectCounts).filter((sub) => subjectCounts[sub] > 0);
//           const subject = availableSubjects.length > 0 ? random.choice(availableSubjects) : "Free Period";

//           if (subject !== "Free Period") subjectCounts[subject]--;

//           // Assign a teacher and room for the subject
//           const teacher = teachers.find((t) => t.subject === subject) || { name: "N/A" };
//           const room = subject === "Lab" ? random.choice(rooms.filter((r) => r.includes("Lab"))) : random.choice(rooms);

//           timetable[className][day].push({
//             time: slot,
//             subject,
//             teacher: teacher.name,
//             room,
//           });
//         });
//       });
//     });

//     population.push(timetable);
//   }

//   return population;
// };

// // Evaluate the fitness of a timetable
// export const fitness_function = (timetable, weekly_classes) => {
//   let score = 0;

//   for (const className in timetable) {
//     const subjectCounts = { ...weekly_classes };
//     const teacherAvailability = {};
//     const roomAvailability = {};

//     for (const day in timetable[className]) {
//       const dailySchedule = timetable[className][day];
//       const assignedSubjects = new Set();
//       let labAssigned = false;

//       dailySchedule.forEach((entry) => {
//         const { subject, teacher, room, time } = entry;

//         // Reward meeting weekly class requirements
//         if (subjectCounts[subject] > 0) {
//           score += 10;
//           subjectCounts[subject]--;
//         } else {
//           score -= 10; // Penalize exceeding weekly limits
//         }

//         // Penalize duplicate subjects on the same day
//         if (assignedSubjects.has(subject)) {
//           score -= 15;
//         } else {
//           assignedSubjects.add(subject);
//         }

//         // Ensure one lab per day
//         if (subject === "Lab") {
//           if (labAssigned) {
//             score -= 20;
//           } else {
//             labAssigned = true;
//             score += 10;
//           }
//         }

//         // Penalize teacher conflicts
//         if (!teacherAvailability[teacher]) teacherAvailability[teacher] = new Set();
//         if (teacherAvailability[teacher].has(time)) {
//           score -= 15;
//         } else {
//           teacherAvailability[teacher].add(time);
//         }

//         // Penalize room conflicts
//         if (!roomAvailability[room]) roomAvailability[room] = new Set();
//         if (roomAvailability[room].has(time)) {
//           score -= 15;
//         } else {
//           roomAvailability[room].add(time);
//         }
//       });
//     }
//   }

//   return score;
// };

// // Perform crossover between two timetables
// export const crossover = (parent1, parent2) => {
//   const child = {};

//   for (const className in parent1) {
//     child[className] = {};

//     for (const day in parent1[className]) {
//       // Randomly inherit schedules from one of the parents
//       child[className][day] =
//         Math.random() < 0.5 ? parent1[className][day] : parent2[className][day];
//     }
//   }

//   return child;
// };

// // Mutate a timetable by randomly changing an entry
// export const mutate = (timetable, subjects, teachers, rooms, mutation_rate = 0.1) => {
//   for (const className in timetable) {
//     for (const day in timetable[className]) {
//       timetable[className][day].forEach((entry) => {
//         if (Math.random() < mutation_rate) {
//           // Mutate subject, teacher, or room
//           entry.subject = random.choice(subjects);
//           const teacher = teachers.find((t) => t.subject === entry.subject);
//           entry.teacher = teacher ? teacher.name : "N/A";
//           entry.room = entry.subject === "Lab" ? random.choice(rooms.filter((r) => r.includes("Lab"))) : random.choice(rooms);
//         }
//       });
//     }
//   }

//   return timetable;
// };

// // Run the Genetic Algorithm
// export const genetic_algorithm = (classes, working_days, time_slots, subjects, teachers, rooms, weekly_classes, generations = 100, pop_size = 50) => {
//   let population = initialize_population(pop_size, classes, working_days, time_slots, subjects, teachers, rooms, weekly_classes);

//   for (let generation = 0; generation < generations; generation++) {
//     // Evaluate fitness for each timetable
//     const fitness_scores = population.map((timetable) => fitness_function(timetable, weekly_classes));

//     // Select the top-performing timetables
//     const selected_population = fitness_scores
//       .map((score, index) => ({ score, timetable: population[index] }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, Math.floor(pop_size / 2))
//       .map((item) => item.timetable);

//     // Create a new generation
//     const new_population = [...selected_population];

//     while (new_population.length < pop_size) {
//       const [parent1, parent2] = random.sample(selected_population, 2);
//       let child = crossover(parent1, parent2);
//       child = mutate(child, subjects, teachers, rooms);
//       new_population.push(child);
//     }

//     population = new_population;

//     // Log the best fitness score for the generation
//     console.log(`Generation ${generation + 1}: Best fitness = ${Math.max(...fitness_scores)}`);
//   }

//   // Return the best timetable
//   const best_timetable = population.sort((a, b) => fitness_function(b, weekly_classes) - fitness_function(a, weekly_classes))[0];
//   return best_timetable;
// };


// // import random from "random";
// const random = require("random");

// // Initialize the population with random timetables
//  const initialize_population = (
//   pop_size,
//   classes,
//   working_days,
//   time_slots,
//   subjects,
//   teachers,
//   rooms,
//   weekly_classes,
//   lab_config // Add lab configuration
// ) => {
//   const population = [];

//   for (let i = 0; i < pop_size; i++) {
//     const timetable = {};

//     classes.forEach((className) => {
//       timetable[className] = {};
//       const subjectCounts = { ...weekly_classes };

//       working_days.forEach((day) => {
//         timetable[className][day] = [];
//         let labAssigned = false;
//         let labHours = 0; // Track daily lab hours

//         time_slots.forEach((slot) => {
//           // Choose a subject that hasn't exceeded its weekly limit
//           const availableSubjects = Object.keys(subjectCounts).filter((sub) => subjectCounts[sub] > 0);
//           const subject = availableSubjects.length > 0 ? random.choice(availableSubjects) : "Free Period";

//           if (subject !== "Free Period") subjectCounts[subject]--;

//           // Handle lab sessions
//           if (subject === "Lab" && !labAssigned && labHours < lab_config.labDurationPerDay) {
//             labAssigned = true;
//             labHours += lab_config.labDurationPerDay; // Add lab duration for the day

//             // Split the class into 2 or 3 batches
//             const numBatches = lab_config.totalBatchesPerClass;
//             const batchNames = Array.from({ length: numBatches }, (_, idx) => `Batch${idx + 1}`);

//             batchNames.forEach((batchName) => {
//               const teacher = teachers.find((t) => t.subject === subject) || { name: "N/A" };
//               const room = random.choice(lab_config.labRooms);

//               timetable[className][day].push({
//                 time: slot,
//                 subject,
//                 teacher: teacher.name,
//                 room,
//                 batches: [
//                   {
//                     batchName,
//                     students: [], // Optional: Populate if needed
//                   },
//                 ],
//               });
//             });
//           } else if (subject !== "Lab") {
//             // Assign a regular class
//             const teacher = teachers.find((t) => t.subject === subject) || { name: "N/A" };
//             const room = random.choice(rooms);

//             timetable[className][day].push({
//               time: slot,
//               subject,
//               teacher: teacher.name,
//               room,
//             });
//           }
//         });
//       });
//     });

//     population.push(timetable);
//   }

//   return population;
// };

// // Evaluate the fitness of a timetable const fitness_function = (timetable, weekly_classes, lab_config) => {
//   let score = 0;

//   for (const className in timetable) {
//     const subjectCounts = { ...weekly_classes };
//     const teacherAvailability = {};
//     const roomAvailability = {};

//     for (const day in timetable[className]) {
//       const dailySchedule = timetable[className][day];
//       const assignedSubjects = new Set();
//       let labAssigned = false;
//       let labHours = 0; // Track daily lab hours

//       dailySchedule.forEach((entry) => {
//         const { subject, teacher, room, time, batches } = entry;

//         // Reward meeting weekly class requirements
//         if (subjectCounts[subject] > 0) {
//           score += 10;
//           subjectCounts[subject]--;
//         } else if (subject !== "Free Period") {
//           score -= 10; // Penalize exceeding weekly limits
//         }

//         // Penalize duplicate subjects on the same day
//         if (assignedSubjects.has(subject)) {
//           score -= 15;
//         } else {
//           assignedSubjects.add(subject);
//         }

//         // Handle lab-specific scoring
//         if (subject === "Lab") {
//           labHours += 1; // Assuming each time slot is 1 hour

//           if (!labAssigned) {
//             labAssigned = true;
//             score += 10; // Reward first lab of the day
//           } else {
//             score -= 20; // Penalize multiple labs assigned to the same class on the same day
//           }

//           // Reward proper batching
//           if (batches.length === lab_config.totalBatchesPerClass) {
//             score += 10;
//           } else {
//             score -= 10; // Penalize incorrect batching
//           }
//         }

//         // Penalize exceeding daily lab hours
//         if (labHours > lab_config.labDurationPerDay) {
//           score -= 20;
//         }

//         // Penalize teacher conflicts
//         if (!teacherAvailability[teacher]) teacherAvailability[teacher] = new Set();
//         if (teacherAvailability[teacher].has(time)) {
//           score -= 15;
//         } else {
//           teacherAvailability[teacher].add(time);
//         }

//         // Penalize room conflicts
//         if (!roomAvailability[room]) roomAvailability[room] = new Set();
//         if (roomAvailability[room].has(time)) {
//           score -= 15;
//         } else {
//           roomAvailability[room].add(time);
//         }
//       });
//     }
//   }

//   return score;
// };

// // Perform crossover between two timetables
//  const crossover = (parent1, parent2) => {
//   const child = {};

//   for (const className in parent1) {
//     child[className] = {};

//     for (const day in parent1[className]) {
//       // Randomly inherit schedules from one of the parents
//       child[className][day] =
//         Math.random() < 0.5 ? parent1[className][day] : parent2[className][day];
//     }
//   }

//   return child;
// };

// // Mutate a timetable by randomly changing an entry
//  const mutate = (timetable, subjects, teachers, rooms, mutation_rate = 0.1) => {
//   for (const className in timetable) {
//     for (const day in timetable[className]) {
//       timetable[className][day].forEach((entry) => {
//         if (Math.random() < mutation_rate) {
//           // Mutate subject, teacher, or room
//           entry.subject = random.choice(subjects);
//           const teacher = teachers.find((t) => t.subject === entry.subject);
//           entry.teacher = teacher ? teacher.name : "N/A";
//           entry.room = entry.subject === "Lab" ? random.choice(rooms.filter((r) => r.includes("Lab"))) : random.choice(rooms);
//         }
//       });
//     }
//   }

//   return timetable;
// };

// // Run the Genetic Algorithm
//  const genetic_algorithm = (classes, working_days, time_slots, subjects, teachers, rooms, weekly_classes, lab_config, generations = 100, pop_size = 50) => {
//   let population = initialize_population(pop_size, classes, working_days, time_slots, subjects, teachers, rooms, weekly_classes, lab_config);

//   for (let generation = 0; generation < generations; generation++) {
//     // Evaluate fitness for each timetable
//     const fitness_scores = population.map((timetable) => fitness_function(timetable, weekly_classes, lab_config));

//     // Select the top-performing timetables
//     const selected_population = fitness_scores
//       .map((score, index) => ({ score, timetable: population[index] }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, Math.floor(pop_size / 2))
//       .map((item) => item.timetable);

//     // Create a new generation
//     const new_population = [...selected_population];

//     while (new_population.length < pop_size) {
//       const [parent1, parent2] = random.sample(selected_population, 2);
//       let child = crossover(parent1, parent2);
//       child = mutate(child, subjects, teachers, rooms);
//       new_population.push(child);
//     }

//     population = new_population;

//     // Log the best fitness score for the generation
//     console.log(`Generation ${generation + 1}: Best fitness = ${Math.max(...fitness_scores)}`);
//   }

//   // Return the best timetable
//   const best_timetable = population.sort((a, b) => fitness_function(b, weekly_classes, lab_config) - fitness_function(a, weekly_classes, lab_config))[0];
//   return best_timetable;
// };

// module.exports = {
//   genetic_algorithm,
//   fitness_function,
//   crossover,
//   mutate,
//   initialize_population,
// }




const random = require("random");

// Helper function to get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Initialize the population with random timetables
const initializePopulation = (
  popSize,
  classes,
  workingDays,
  timeSlots,
  subjects,
  teachers,
  rooms,
  weeklyClasses,
  labConfig
) => {
  return Array.from({ length: popSize }, () => {
    const timetable = {};

    classes.forEach((className) => {
      timetable[className] = {};
      const subjectCounts = { ...weeklyClasses };

      workingDays.forEach((day) => {
        timetable[className][day] = [];
        let labAssigned = false;
        let labHours = 0; // Track daily lab hours

        timeSlots.forEach((slot) => {
          // Choose a subject that hasn't exceeded its weekly limit
          const availableSubjects = Object.keys(subjectCounts).filter(
            (sub) => subjectCounts[sub] > 0
          );
          const subject = availableSubjects.length
            ? getRandomElement(availableSubjects)
            : "Free Period";

          if (subject !== "Free Period") subjectCounts[subject]--;

          if (subject === "Lab" && !labAssigned && labHours < labConfig.labDurationPerDay) {
            labAssigned = true;
            labHours += labConfig.labDurationPerDay;

            // Split the class into batches
            const batchNames = Array.from(
              { length: labConfig.totalBatchesPerClass },
              (_, idx) => `Batch${idx + 1}`
            );

            batchNames.forEach((batchName) => {
              const teacher = teachers.find((t) => t.subject === subject) || { name: "N/A" };
              const room = getRandomElement(labConfig.labRooms);

              timetable[className][day].push({
                time: slot,
                subject,
                teacher: teacher.name,
                room,
                batches: [{ batchName, students: [] }],
              });
            });
          } else if (subject !== "Lab") {
            // Assign a regular class
            const teacher = teachers.find((t) => t.subject === subject) || { name: "N/A" };
            const room = getRandomElement(rooms);

            timetable[className][day].push({
              time: slot,
              subject,
              teacher: teacher.name,
              room,
            });
          }
        });
      });
    });

    return timetable;
  });
};

// Evaluate the fitness of a timetable
const fitnessFunction = (timetable, weeklyClasses, labConfig) => {
  let score = 0;

  for (const className in timetable) {
    const subjectCounts = { ...weeklyClasses };
    const teacherAvailability = {};
    const roomAvailability = {};

    for (const day in timetable[className]) {
      const assignedSubjects = new Set();
      let labAssigned = false;
      let labHours = 0;

      timetable[className][day].forEach(({ subject, teacher, room, time, batches }) => {
        // Reward meeting weekly class requirements
        if (subjectCounts[subject] > 0) {
          score += 10;
          subjectCounts[subject]--;
        } else if (subject !== "Free Period") {
          score -= 10;
        }

        // Penalize duplicate subjects on the same day
        if (assignedSubjects.has(subject)) {
          score -= 15;
        } else {
          assignedSubjects.add(subject);
        }

        // Handle lab-specific scoring
        if (subject === "Lab") {
          labHours += 1;

          if (!labAssigned) {
            labAssigned = true;
            score += 10;
          } else {
            score -= 20;
          }

          if (batches.length === labConfig.totalBatchesPerClass) {
            score += 10;
          } else {
            score -= 10;
          }
        }

        if (labHours > labConfig.labDurationPerDay) {
          score -= 20;
        }

        // Penalize teacher conflicts
        if (!teacherAvailability[teacher]) teacherAvailability[teacher] = new Set();
        if (teacherAvailability[teacher].has(time)) {
          score -= 15;
        } else {
          teacherAvailability[teacher].add(time);
        }

        // Penalize room conflicts
        if (!roomAvailability[room]) roomAvailability[room] = new Set();
        if (roomAvailability[room].has(time)) {
          score -= 15;
        } else {
          roomAvailability[room].add(time);
        }
      });
    }
  }

  return score;
};

// Perform crossover between two timetables
const crossover = (parent1, parent2) => {
  const child = {};

  for (const className in parent1) {
    child[className] = {};

    for (const day in parent1[className]) {
      child[className][day] = Math.random() < 0.5 ? parent1[className][day] : parent2[className][day];
    }
  }

  return child;
};

// Mutate a timetable by randomly changing an entry
const mutate = (timetable, subjects, teachers, rooms, mutationRate = 0.1) => {
  Object.values(timetable).forEach((classSchedule) => {
    Object.values(classSchedule).forEach((dailySchedule) => {
      dailySchedule.forEach((entry) => {
        if (Math.random() < mutationRate) {
          entry.subject = getRandomElement(subjects);
          const teacher = teachers.find((t) => t.subject === entry.subject);
          entry.teacher = teacher ? teacher.name : "N/A";
          entry.room =
            entry.subject === "Lab"
              ? getRandomElement(rooms.filter((r) => r.includes("Lab")))
              : getRandomElement(rooms);
        }
      });
    });
  });

  return timetable;
};

// Run the Genetic Algorithm
const geneticAlgorithm = (
  classes,
  workingDays,
  timeSlots,
  subjects,
  teachers,
  rooms,
  weeklyClasses,
  labConfig,
  generations = 100,
  popSize = 50
) => {
  let population = initializePopulation(
    popSize,
    classes,
    workingDays,
    timeSlots,
    subjects,
    teachers,
    rooms,
    weeklyClasses,
    labConfig
  );

  for (let generation = 0; generation < generations; generation++) {
    // Evaluate fitness for each timetable
    const fitnessScores = population.map((timetable) => fitnessFunction(timetable, weeklyClasses, labConfig));

    // Select top-performing timetables
    const selectedPopulation = fitnessScores
      .map((score, index) => ({ score, timetable: population[index] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.floor(popSize / 2))
      .map((item) => item.timetable);

    // Create a new generation
    const newPopulation = [...selectedPopulation];

    while (newPopulation.length < popSize) {
      const [parent1, parent2] = [getRandomElement(selectedPopulation), getRandomElement(selectedPopulation)];
      let child = crossover(parent1, parent2);
      child = mutate(child, subjects, teachers, rooms);
      newPopulation.push(child);
    }

    population = newPopulation;

    // Log best fitness score
    console.log(`Generation ${generation + 1}: Best fitness = ${Math.max(...fitnessScores)}`);
  }

  // Return the best timetable
  return population.sort((a, b) => fitnessFunction(b, weeklyClasses, labConfig) - fitnessFunction(a, weeklyClasses, labConfig))[0];
};

module.exports = {
  geneticAlgorithm,
  fitnessFunction,
  crossover,
  mutate,
  initializePopulation,
};
