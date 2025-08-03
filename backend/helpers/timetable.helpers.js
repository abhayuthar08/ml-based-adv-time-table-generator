export const formatTimeSlot = (timeString) => {
  if (!timeString) return "";
  
  if (timeString.includes("AM") || timeString.includes("PM")) {
    return timeString;
  }
  
  if (timeString.includes("-")) {
    const [startStr, endStr] = timeString.split("-").map(t => t.trim());
    
    const parseTime = (time) => {
      if (time.includes(":")) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours + minutes / 60;
      }
      return Number(time);
    };
    
    const start = parseTime(startStr);
    const end = parseTime(endStr);
    
    const formatHour = (hour) => {
      const hourInt = Math.floor(hour);
      const minutes = hour % 1 ? "30" : "00";
      const period = hourInt >= 12 ? "PM" : "AM";
      const hour12 = hourInt % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    };
    
    return `${formatHour(start)} - ${formatHour(end)}`;
  }
  
  if (timeString.includes(":")) {
    const [hourStr, minuteStr] = timeString.split(":");
    const hour = parseInt(hourStr);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minuteStr || '00'} ${period}`;
  }
  
  const hour = parseInt(timeString);
  if (!isNaN(hour)) {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:00 ${period}`;
  }
  
  return timeString;
};

const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  
  const timePart = timeStr.split(' - ')[0];
  const [time, period] = timePart.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let totalMinutes = (hours % 12) * 60 + (minutes || 0);
  if (period === 'PM' && hours !== 12) {
    totalMinutes += 12 * 60;
  } else if (period === 'AM' && hours === 12) {
    totalMinutes = minutes || 0;
  }
  return totalMinutes;
};

export const transformTeacherTimetables = (teacherTimetables, workingDays, classTimes, labTimings) => {
  const result = {};
  const allTimes = [...new Set([...classTimes, ...labTimings])];
  
  Object.keys(teacherTimetables).forEach(teacher => {
    result[teacher] = {};
    
    workingDays.forEach(day => {
      const daySchedule = [];
      
      allTimes.forEach(time => {
        const slot = teacherTimetables[teacher][day][time];
        const formattedTime = formatTimeSlot(time);
        
        if (slot) {
          daySchedule.push({
            ...slot,
            displayText: slot.type === "CLASS" 
              ? `${slot.subject} - ${slot.className} (${slot.room})` 
              : `${slot.subject} Lab - Batch ${slot.batch} (${slot.location})`,
            type: slot.type,
            time: formattedTime,
            rawTime: time,
            isFree: false
          });
        } else {
          daySchedule.push({
            time: formattedTime,
            rawTime: time,
            isFree: true,
            displayText: "Free Period",
            type: "FREE"
          });
        }
      });
      
      daySchedule.sort((a, b) => {
        return timeToMinutes(a.time) - timeToMinutes(b.time);
      });
      
      result[teacher][day] = daySchedule;
    });
  });
  
  return result;
};

export const getSortedClassSchedule = (daySchedule) => {
  if (!daySchedule || !daySchedule.classes) return [];
  
  return [...daySchedule.classes].sort((a, b) => {
    return timeToMinutes(a.time) - timeToMinutes(b.time);
  });
};

export const hasTeacherAssignments = (teacherData) => {
  if (!teacherData) return false;
  
  return Object.values(teacherData).some(dayData => 
    Array.isArray(dayData) ? 
      dayData.some(slot => !slot.isFree) : 
      Object.values(dayData).some(slot => slot !== null)
  );
};

export const getTeacherStats = (teacherTimetables) => {
  const stats = {};
  
  Object.keys(teacherTimetables).forEach(teacher => {
    const teacherData = teacherTimetables[teacher];
    let classCount = 0;
    let labCount = 0;
    let freeCount = 0;
    
    Object.values(teacherData).forEach(daySchedule => {
      if (Array.isArray(daySchedule)) {
        daySchedule.forEach(slot => {
          if (slot.isFree) {
            freeCount++;
          } else if (slot.type === 'CLASS') {
            classCount++;
          } else if (slot.type === 'LAB') {
            labCount++;
          }
        });
      }
    });
    
    stats[teacher] = {
      classes: classCount,
      labs: labCount,
      free: freeCount,
      total: classCount + labCount + freeCount
    };
  });
  
  return stats;
};