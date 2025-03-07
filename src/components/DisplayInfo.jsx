import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlertCircle,
  IconCircleDashedCheck,
  IconFolder,
  IconHourglassHigh,
  IconUserScan,
  IconHeartPlus,
  IconCalendarTime,
} from "@tabler/icons-react";
import { usePrivy } from "@privy-io/react-auth";
import MetricsCard from "./MetricsCard"; 
import { useStateContext } from "../context"; 

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { fetchUserRecords, records, fetchUserByEmail } = useStateContext();
  
  // State to hold different health metrics
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiPersonalizedTreatment: 0,
    totalScreenings: 0,
    completedScreenings: 0,
    pendingScreenings: 0,
    overdueScreenings: 0,
  });

  // Fetch user records when the component loads or user changes
  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address)
        .then(() => {
          console.log(records); // Debugging to see fetched records
          const totalFolders = records.length;
          let aiPersonalizedTreatment = 0;
          let totalScreenings = 0;
          let completedScreenings = 0;
          let pendingScreenings = 0;
          let overdueScreenings = 0;

          // Processing user records to extract relevant metrics
          records.forEach((record) => {
            if (record.kanbanRecords) {
              try {
                const kanban = JSON.parse(record.kanbanRecords);
                aiPersonalizedTreatment += kanban.columns.some(
                  (column) => column.title === "AI Personalized Treatment",
                ) ? 1 : 0;
                totalScreenings += kanban.tasks.length;
                completedScreenings += kanban.tasks.filter(
                  (task) => task.columnId === "done",
                ).length;
                pendingScreenings += kanban.tasks.filter(
                  (task) => task.columnId === "doing",
                ).length;
                overdueScreenings += kanban.tasks.filter(
                  (task) => task.columnId === "overdue",
                ).length;
              } catch (error) {
                console.error("Failed to parse kanbanRecords:", error);
              }
            }
          });

          // Updating state with calculated metrics
          setMetrics({
            totalFolders,
            aiPersonalizedTreatment,
            totalScreenings,
            completedScreenings,
            pendingScreenings,
            overdueScreenings,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, fetchUserRecords, records]);

  // List of health-related metrics to be displayed as cards
  const metricsData = [
    {
      title: "Upcoming Appointments",
      subtitle: "View Details",
      value: metrics.pendingScreenings,
      icon: IconCalendarTime,
      description: "Doctor visits scheduled for you",
      onClick: () => navigate("/appointments/pending"),
    },
    {
      title: "Your Treatment Journey",
      subtitle: "Track Progress",
      value: `${metrics.completedScreenings} of ${metrics.totalScreenings}`,
      icon: IconHeartPlus,
      description: "See how far you've come",
      onClick: () => navigate("/treatment/progress"),
    },
    {
      title: "Your Health Records",
      subtitle: "View All",
      value: metrics.totalFolders,
      icon: IconFolder,
      description: "All your medical documents",
      onClick: () => navigate("/folders"),
    },
    {
      title: "Health Assessments",
      subtitle: "View All",
      value: metrics.totalScreenings,
      icon: IconUserScan,
      description: "Total evaluations for your care",
      onClick: () => navigate("/screenings"),
    },
    {
      title: "Completed Assessments",
      subtitle: "View Results",
      value: metrics.completedScreenings,
      icon: IconCircleDashedCheck,
      description: "Tests you've finished",
      onClick: () => navigate("/screenings/completed"),
    },
    {
      title: "In-Progress Assessments",
      subtitle: "Continue",
      value: metrics.pendingScreenings,
      icon: IconHourglassHigh,
      description: "Tests waiting to be completed",
      onClick: () => navigate("/screenings/pending"),
    },
    {
      title: "Attention Needed",
      subtitle: "Take Action",
      value: metrics.overdueScreenings,
      icon: IconAlertCircle,
      description: "Tests that need your attention soon",
      onClick: () => navigate("/screenings/overdue"),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Health Dashboard</h2>
        <p className="text-gray-600">Here's a summary of your care journey</p>
      </div>

      {/* Section for Important Updates */}
      <div className="flex flex-wrap gap-[26px]">
        <div className="mt-4 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <h3 className="sm:col-span-2 text-lg font-medium text-gray-700">Important Updates</h3>
          {metricsData.slice(0, 2).map((metric) => (
            <MetricsCard 
              key={metric.title} 
              {...metric} 
              className="hover:shadow-lg transition-shadow duration-300"
            />
          ))}
        </div>

        {/* Section for Health Summary */}
        <div className="mt-2 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <h3 className="sm:col-span-2 lg:col-span-4 text-lg font-medium text-gray-700">Your Health Summary</h3>
          {metricsData.slice(2).map((metric) => (
            <MetricsCard 
              key={metric.title} 
              {...metric} 
              className="hover:shadow-lg transition-shadow duration-300"
            />
          ))}
        </div>
      </div>

      {/* Additional Help Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700 text-sm">
          Need help understanding your dashboard? Click on any card to see more details or contact your care team.
        </p>
      </div>
    </div>
  );
};

export default DisplayInfo;
