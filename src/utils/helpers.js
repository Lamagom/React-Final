export const calculateAverageProgress = (goals) => {
  if (!goals || goals.length === 0) return 0;
  const total = goals.reduce((acc, goal) => acc + goal.progress, 0);
  return Math.round(total / goals.length);
};

export const getGoalStatus = (progress) => {
  if (progress === 100) return { status: "완료", color: "#22c55e", icon: "🏆" };
  if (progress > 0) return { status: "진행중", color: "#facc15", icon: "🔥" };
  return { status: "보류", color: "#a1a1aa", icon: "💤" };
};