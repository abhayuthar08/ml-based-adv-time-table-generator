import React from 'react';

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-400">
      <div className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">About SchedulifyX</h1>
        <p className="mt-4 text-lg text-center text-gray-700">
          SchedulifyX is an advanced, AI-powered timetable generator designed to help schools and colleges optimize their scheduling.
          The platform offers a seamless experience for administrators to generate conflict-free and efficient timetables while balancing the teacher's workload and optimizing resource allocation.
        </p>
        <p className="mt-4 text-lg text-center text-gray-700">
          It uses machine learning algorithms to ensure proper scheduling, enabling conflict-free class timetables for different departments and branches.
          With features like real-time updates, customizable views, and detailed performance analytics, SchedulifyX aims to reduce the administrative workload and improve the management of academic resources.
        </p>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-blue-600">Key Features:</h2>
          <ul className="mt-4 text-lg text-gray-600 list-disc list-inside">
            <li>AI-powered conflict-free timetable generation</li>
            <li>Real-time updates and customizable views</li>
            <li>Seamless integration with school and college systems</li>
            <li>Analytics and insights for improved resource management</li>
            <li>Personalized views for students, teachers, and administrators</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
