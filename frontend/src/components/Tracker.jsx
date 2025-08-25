// File: src/components/Tracker.jsx

import React from 'react';

const planData = [
    {
        phase: "Phase 1: Core Skills & Array/String Techniques",
        description: "This phase focuses on programming fundamentals and common techniques used with arrays and strings, building a strong base for all future topics.",
        days: [
            { day: 1, date: "Aug 2", topic: "Basics", goal: "Lec 1: Things to Know (First half)" },
            { day: 2, date: "Aug 3", topic: "Basics", goal: "Lec 1: Things to Know (Second half)" },
            { day: 3, date: "Aug 4", topic: "Basics", goal: "Lec 2 & 3: Logical Thinking & STL/Collections" },
            { day: 4, date: "Aug 5", topic: "Basics", goal: "Lec 4: Basic Maths" },
            { day: 5, date: "Aug 6", topic: "Basics", goal: "Lec 5 & 6: Basic Recursion & Hashing" },
            { day: 6, date: "Aug 7", topic: "Sorting", goal: "Lec 1: Sorting-I (Selection, Bubble, Insertion)" },
            { day: 7, date: "Aug 8", topic: "Sorting", goal: "Lec 2: Sorting-II (Merge, Quick Sort)" },
            { day: 8, date: "Aug 9", topic: "Arrays", goal: "Lec 1: Easy Problems (Solve 7 problems)" },
            { day: 9, date: "Aug 10", topic: "Arrays", goal: "Lec 1: Easy Problems (Solve remaining 7)" },
            { day: 10, date: "Aug 11", topic: "Arrays", goal: "Lec 2: Medium Problems (Solve 7 problems)" },
            { day: 11, date: "Aug 12", topic: "Arrays", goal: "Lec 2: Medium Problems (Solve remaining 7)" },
            { day: 12, date: "Aug 13", topic: "Arrays", goal: "Lec 3: Hard Problems (Solve 6 problems)" },
            { day: 13, date: "Aug 14", topic: "Arrays", goal: "Lec 3: Hard Problems (Solve remaining 6)" },
            { day: 14, date: "Aug 15", topic: "Review", goal: "Review Basics, Sorting & Arrays." },
            { day: 15, date: "Aug 16", topic: "Binary Search", goal: "Lec 1: BS on 1D Arrays (Solve 7 problems)" },
            { day: 16, date: "Aug 17", topic: "Binary Search", goal: "Lec 1: BS on 1D Arrays (Solve remaining 6)" },
            { day: 17, date: "Aug 18", topic: "Binary Search", goal: "Lec 2: BS on Answers (Solve 7 problems)" },
            { day: 18, date: "Aug 19", topic: "Binary Search", goal: "Lec 2: BS on Answers (Solve remaining 7)" },
            { day: 19, date: "Aug 20", topic: "Binary Search", goal: "Lec 3: BS on 2D Arrays" },
            { day: 20, date: "Aug 21", topic: "Sliding Window", goal: "Lec 1: Medium Problems" },
            { day: 21, date: "Aug 22", topic: "Sliding Window", goal: "Lec 2: Hard Problems" },
            { day: 22, date: "Aug 23", topic: "Strings", goal: "Lec 1: Basic and Easy String Problems" },
            { day: 23, date: "Aug 24", topic: "Strings", goal: "Lec 2: Medium String Problems" },
            { day: 24, date: "Aug 25", topic: "Review", goal: "Review BS, Sliding Window & Strings." },
        ]
    },
    {
        phase: "Phase 2: Core Data Structures",
        description: "This phase provides a deep dive into fundamental linear data structures, which are the backbone of many complex algorithms.",
        days: [
            { day: 25, date: "Aug 26", topic: "LinkedList", goal: "Lec 1 & 2: 1D LinkedList & Doubly LinkedList" },
            { day: 26, date: "Aug 27", topic: "LinkedList", goal: "Lec 3: Medium Problems of LL (Solve 8 problems)" },
            { day: 27, date: "Aug 28", topic: "LinkedList", goal: "Lec 3: Medium Problems of LL (Solve remaining 7)" },
            { day: 28, date: "Aug 29", topic: "LinkedList", goal: "Lec 4 & 5: Medium DLL & Hard LL Problems" },
            { day: 29, date: "Aug 30", topic: "Stack & Queues", goal: "Lec 1 & 2: Learning Concepts and Prefix .. conversions" },
            { day: 30, date: "Aug 31", topic: "Stack & Queues", goal: "Lec 3: Monotonic Stack/Queue (First half)" },
            { day: 31, date: "Sep 1", topic: "Stack & Queues", goal: "Lec 3: Monotonic Stack/Queue (Second half)" },
            { day: 32, date: "Sep 2", topic: "Stack & Queues", goal: "Lec 4: Implementation Problems" },
            { day: 33, date: "Sep 3", topic: "Heaps", goal: "Lec 1: Learning (Concepts, Priority Queue)" },
            { day: 34, date: "Sep 4", topic: "Heaps", goal: "Lec 2: Medium Problems" },
            { day: 35, date: "Sep 5", topic: "Heaps", goal: "Lec 3: Hard Problems" },
            { day: 36, date: "Sep 6", topic: "Review", goal: "Review LinkedList, Stacks, Queues & Heaps." },
        ]
    },
    {
        phase: "Phase 3: Recursion & Trees",
        description: "Here you will master advanced recursion patterns before applying them to non-linear tree data structures, a common topic in top-tier interviews.",
        days: [
            { day: 37, date: "Sep 7", topic: "Recursion", goal: "Lec 1: Get a Strong Hold" },
            { day: 38, date: "Sep 8", topic: "Recursion", goal: "Lec 2: Subsequences Pattern (First half)" },
            { day: 39, date: "Sep 9", topic: "Recursion", goal: "Lec 2: Subsequences Pattern (Second half)" },
            { day: 40, date: "Sep 10", topic: "Recursion", goal: "Lec 3: Trying out all Combos / Hard" },
            { day: 41, date: "Sep 11", topic: "Binary Trees", goal: "Lec 1: Traversals (Concepts & Practice)" },
            { day: 42, date: "Sep 12", topic: "Binary Trees", goal: "Lec 1: Traversal Problems" },
            { day: 43, date: "Sep 13", topic: "Binary Trees", goal: "Lec 2: Medium Problems (Solve 6 problems)" },
            { day: 44, date: "Sep 14", topic: "Binary Trees", goal: "Lec 2: Medium Problems (Solve remaining 6)" },
            { day: 45, date: "Sep 15", topic: "Binary Trees", goal: "Lec 3: Hard Problems (Solve 7 problems)" },
            { day: 46, date: "Sep 16", topic: "Binary Trees", goal: "Lec 3: Hard Problems (Solve remaining 7)" },
            { day: 47, date: "Sep 17", topic: "BST", goal: "Lec 1: Concepts (Intro, Search, Insert, Delete)" },
            { day: 48, date: "Sep 18", topic: "BST", goal: "Lec 2: Practice Problems (Solve 7 problems)" },
            { day: 49, date: "Sep 19", topic: "BST", goal: "Lec 2: Practice Problems (Solve remaining 6)" },
            { day: 50, date: "Sep 20", topic: "Review", goal: "Review Recursion, Binary Trees & BSTs." },
        ]
    },
    {
        phase: "Phase 4: Advanced Algorithms & Topics",
        description: "The final phase tackles complex but crucial topics like graphs and dynamic programming, preparing you for the toughest interview challenges.",
        days: [
            { day: 51, date: "Sep 21", topic: "Greedy", goal: "Lec 1: Easy Problems" },
            { day: 52, date: "Sep 22", topic: "Greedy", goal: "Lec 2: Medium/Hard Problems (First half)" },
            { day: 53, date: "Sep 23", topic: "Greedy", goal: "Lec 2: Medium/Hard Problems (Second half)" },
            { day: 54, date: "Sep 24", topic: "Graphs", goal: "Lec 1: Learning (Representation, BFS, DFS)" },
            { day: 55, date: "Sep 25", topic: "Graphs", goal: "Lec 2: Problems on BFS/DFS (Solve 7)" },
            { day: 56, date: "Sep 26", topic: "Graphs", goal: "Lec 2: Problems on BFS/DFS (Solve 7)" },
            { day: 57, date: "Sep 27", topic: "Graphs", goal: "Lec 3: Topo Sort and Problems" },
            { day: 58, date: "Sep 28", topic: "Graphs", goal: "Lec 4: Shortest Path Algos & Problems" },
            { day: 59, date: "Sep 29", topic: "Graphs", goal: "Lec 5: MST / Disjoint Set" },
            { day: 60, date: "Sep 30", topic: "Graphs", goal: "Lec 5: Problems on MST/DSU" },
            { day: 61, date: "Oct 1", topic: "Graphs", goal: "Lec 6: Other Algorithms" },
            { day: 62, date: "Oct 2", topic: "Review", goal: "Review Greedy Algorithms & Graphs." },
            { day: 63, date: "Oct 3", topic: "DP", goal: "Lec 1 & 2: Intro & 1D DP" },
            { day: 64, date: "Oct 4", topic: "DP", goal: "Lec 3: 2D/3D DP and DP on Grids" },
            { day: 65, date: "Oct 5", topic: "DP", goal: "Lec 4: DP on Subsequences (First half)" },
            { day: 66, date: "Oct 6", topic: "DP", goal: "Lec 4: DP on Subsequences (Second half)" },
            { day: 67, date: "Oct 7", topic: "DP", goal: "Lec 5: DP on Strings" },
            { day: 68, date: "Oct 8", topic: "DP", goal: "Lec 6 & 7: DP on Stocks & LIS" },
            { day: 69, date: "Oct 9", topic: "DP", goal: "Lec 8: MCM / Partition DP (First half)" },
            { day: 70, date: "Oct 10", topic: "DP", goal: "Lec 8: MCM / Partition DP (Second half)" },
            { day: 71, date: "Oct 11", topic: "DP", goal: "Lec 9: DP on Squares" },
            { day: 72, date: "Oct 12", topic: "Review", goal: "Review Dynamic Programming." },
            { day: 73, date: "Oct 13", topic: "Tries", goal: "Lec 1: Theory" },
            { day: 74, date: "Oct 14", topic: "Tries", goal: "Lec 2: Problems" },
            { day: 75, date: "Oct 15", topic: "Bit Manipulation", goal: "Lec 1: Learn Bit Manipulation" },
            { day: 76, date: "Oct 16", topic: "Bit Manipulation", goal: "Lec 2 & 3: Interview Problems & Advanced Maths" },
            { day: 77, date: "Oct 17", topic: "Strings", goal: "Lec 1: Hard Problems (Solve 5)" },
            { day: 78, date: "Oct 18", topic: "Strings", goal: "Lec 1: Hard Problems (Solve 4)" },
            { day: 79, date: "Oct 19", topic: "Review", goal: "Review weak topics. Solve mixed problems." },
            { day: 80, date: "Oct 20", topic: "Review", goal: "Mock interviews. Timed problem-solving." },
        ]
    }
];

const Tracker = ({ completedDays, onProgressUpdate }) => {

  const handleCheckboxChange = (dayId, isChecked) => {
    let updatedDays;
    if (isChecked) {
      updatedDays = [...completedDays, dayId];
    } else {
      updatedDays = completedDays.filter(id => id !== dayId);
    }
    onProgressUpdate(updatedDays);
  };

  return (
    <div className="space-y-4">
      {planData.map((phase, phaseIndex) => (
        <details key={phaseIndex} className="bg-white rounded-xl shadow-md overflow-hidden" open={phaseIndex === 0}>
          <summary className="p-5 cursor-pointer flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-stone-800">{phase.phase}</h3>
              <p className="text-sm text-stone-500">{phase.description}</p>
            </div>
            <svg className="w-6 h-6 text-stone-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </summary>
          <div className="p-5 border-t border-stone-200">
            {phase.days.map(day => (
              <div key={day.day} className={`flex items-center p-3 my-2 border-l-4 rounded-r-lg ${completedDays.includes(day.day) ? 'bg-green-50 border-green-500' : 'bg-stone-50 border-stone-200'}`}>
                <input 
                  type="checkbox" 
                  id={`day-${day.day}`}
                  checked={completedDays.includes(day.day)}
                  onChange={(e) => handleCheckboxChange(day.day, e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor={`day-${day.day}`} className="ml-4 flex-grow cursor-pointer">
                  <p className={`font-semibold ${completedDays.includes(day.day) ? 'line-through text-gray-500' : ''}`}>
                    {day.topic}: <span className="font-normal">{day.goal}</span>
                  </p>
                  <p className="text-xs text-stone-500">Day {day.day} &middot; {day.date}</p>
                </label>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};

export default Tracker;
