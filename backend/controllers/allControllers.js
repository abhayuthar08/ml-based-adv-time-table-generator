


import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Timetable = require("../models/timetable.model");
const timetableService = require("../services/timetableService");
const mlService = require("../services/mlService");

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Temporary in-memory store for generated timetable
let generatedTimetable = {};




export const generateTimeTableController = async (req, res) => {
  console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

  try {
    const {
      collegeName,
      branchName,
      workingDays,
      classTimes,
      totalClasses,
      subjects,
      rooms,
      labLocations,
      totalClassesPerDay,
      batches,
      labTimings,
    } = req.body;

    if (
      !collegeName ||
      !branchName ||
      !workingDays?.length ||
      !totalClasses?.length ||
      !subjects?.length ||
      !classTimes?.length ||
      !rooms?.length ||
      !totalClassesPerDay ||
      !labLocations?.length ||
      !batches?.length ||
      !labTimings?.length
    ) {
      throw new Error("❌ Missing required fields.");
    }

    console.log("✅ Request Data is Valid");

    subjects.forEach((subject) => {
      if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
        throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
      }
    });

    const timetable = {};
    totalClasses.forEach((className) => {
      timetable[className] = {};
      workingDays.forEach((day) => {
        timetable[className][day] = {
          classes: [],
          lab: null,
        };
      });
    });

    console.log("✅ Timetable Structure Initialized");

    const teacherPool = {};
    subjects.forEach((subject) => {
      teacherPool[subject.name] = [...subject.teachers];
    });

    console.log("✅ Teacher Pool Initialized");

    const teacherWorkload = {};
    subjects.forEach((subject) => {
      subject.teachers.forEach((teacher) => {
        teacherWorkload[teacher] = 0;
      });
    });

    const assignSlot = (className, day, timeSlot, subject) => {
      let availableTeachers = teacherPool[subject] || [];
      availableTeachers = availableTeachers.filter(
        (teacher) =>
          !timetable[className][day].classes.some((cls) => cls.teacher === teacher)
      );
      if (availableTeachers.length === 0) {
        console.error(`❌ No teachers available for subject: ${subject}`);
        return null;
      }
      availableTeachers = availableTeachers.sort(
        (a, b) => teacherWorkload[a] - teacherWorkload[b]
      );
      const teacher = availableTeachers[0];
      const room = rooms[Math.floor(Math.random() * rooms.length)];
      teacherWorkload[teacher]++;
      return { subject, teacher, room, time: timeSlot };
    };

    totalClasses.forEach((className) => {
      const subjectAllocation = subjects.reduce((acc, subject) => {
        acc[subject.name] = subject.weeklyClasses;
        return acc;
      }, {});

      const availableSubjects = [...subjects];

      workingDays.forEach((day) => {
        const daySubjects = availableSubjects.sort(() => Math.random() - 0.5);
        const usedSubjects = new Set();

        for (let i = 0; i < totalClassesPerDay; i++) {
          let subject;
          let attempts = 0;

          while (attempts < 1000) { // Increased attempts to ensure accuracy
            subject = daySubjects.find(
              (subj) =>
                subjectAllocation[subj.name] > 0 && !usedSubjects.has(subj.name)
            );

            if (subject) break;
            attempts++;
          }

          if (subject) {
            const timeSlot = classTimes[i];
            const slot = assignSlot(className, day, timeSlot, subject.name);
            if (slot && subjectAllocation[subject.name] > 0) {
              timetable[className][day].classes.push(slot);
              subjectAllocation[subject.name]--;
              usedSubjects.add(subject.name);
            }
          }
        }
      });
    });

    console.log("✅ Regular Classes Generated");

    // **Improved Lab Assignment Logic to Ensure Unique Distribution Per Class**
    const assignLabs = (timetable) => {
      const classWiseLabSubjects = {}; // Store unique lab distributions per class

      totalClasses.forEach((className) => {
        classWiseLabSubjects[className] = [...subjects].map((subject) => subject.name);
      });

      // Function to shuffle an array (Fisher-Yates shuffle)
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };

      // Shuffle lab subjects for each class uniquely
      Object.keys(classWiseLabSubjects).forEach((className) =>
        shuffleArray(classWiseLabSubjects[className])
      );

      totalClasses.forEach((className) => {
        workingDays.forEach((day, dayIndex) => {
          const labSlots = [];
          const usedSubjects = new Set();
          let availableLabs = [...labLocations].sort(() => Math.random() - 0.5);
          let usedLabLocations = new Set(); // Track lab assignments to prevent conflicts

          batches.forEach((batch) => {
            let subjectIndex = (dayIndex + batches.indexOf(batch)) % subjects.length;
            let subject = classWiseLabSubjects[className][subjectIndex];

            // Ensure different subjects per class and avoid repetition
            while (usedSubjects.has(subject)) {
              shuffleArray(classWiseLabSubjects[className]);
              subject = classWiseLabSubjects[className][subjectIndex];
            }

            usedSubjects.add(subject);

            const subjectDetails = subjects.find((sub) => sub.name === subject);
            if (!subjectDetails) {
              throw new Error(`❌ Subject not found: ${subject}`);
            }

            const availableTeachers = subjectDetails.teachers;
            const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

            let labLocation;
            let labAttempts = 0;

            while (labAttempts < 500) { // Increased lab selection attempts to avoid conflicts
              const tempLab = availableLabs[Math.floor(Math.random() * availableLabs.length)];
              if (!usedLabLocations.has(tempLab)) {
                labLocation = tempLab;
                usedLabLocations.add(tempLab);
                break;
              }
              labAttempts++;
            }

            if (!labLocation) {
              console.error(`⚠️ No unique lab location found for ${subject} on ${day}`);
              labLocation = availableLabs[Math.floor(Math.random() * availableLabs.length)];
            }

            labSlots.push({
              batch,
              subject,
              teacher,
              lab: labLocation,
              time: labTimings[0],
            });
          });

          timetable[className][day].lab = {
            type: "Lab",
            slots: labSlots,
            time: labTimings[0],
          };
        });
      });

      return timetable;
    };

    // Generate labs
    const finalTimetable = assignLabs(timetable);

    console.log("✅ Labs Generated");

    return res.status(200).json({
      message: "✅ Timetable generated successfully!",
      timetable: finalTimetable,
      workingDays,
      classTimes,
      labTimings,
    });
  } catch (error) {
    console.error("❌ Error generating timetable:", error);
    return res.status(500).json({ error: error.message });
  }
};



export const getResultTimeTableController = async (req, res) => {
  try {
    if (!generatedTimetable || Object.keys(generatedTimetable).length === 0) {
      return res.status(404).json({ error: "❌ Timetable not found. Please generate it first." });
    }
    return res.status(200).json(generatedTimetable);
  } catch (error) {
    console.error("❌ Error fetching timetable:", error);
    res.status(500).json({ error: "❌ Failed to fetch timetable." });
  }
};

// 📌 Generate Conflict-Free Timetable Using Machine Learning
export const generateConflictFreeTimetable = async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData.collegeName || !inputData.branchName || !inputData.workingDays) {
      return res.status(400).json({ message: "❌ Missing required fields in input data" });
    }

    // Transform input for ML processing
    const transformedData = timetableService.transformDataForML(inputData);

    // Generate timetable using ML
    const conflictFreeTimetable = await mlService.generateTimetable(transformedData);

    // Save timetable in database
    const newTimetable = new Timetable({
      collegeName: inputData.collegeName,
      branchName: inputData.branchName,
      timetable: conflictFreeTimetable,
      subjects: inputData.subjects,
      teachers: inputData.teachers,
      rooms: inputData.rooms,
      classTimes: inputData.classTimes,
      workingDays: inputData.workingDays,
    });

    await newTimetable.save();

    generatedTimetable = conflictFreeTimetable; // Store in memory for quick retrieval

    res.status(200).json({
      message: "✅ Conflict-free timetable generated successfully",
      timetable: conflictFreeTimetable,
    });
  } catch (error) {
    console.error("❌ Error generating conflict-free timetable:", error);
    res.status(500).json({
      error: "❌ Failed to generate conflict-free timetable",
      message: error.message,
    });
  }
};