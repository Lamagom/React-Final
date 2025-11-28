/*  진행률에 따른 상태 텍스트 및 색상 반환 */
export const getGoalStatus = (progress) => {
  if (progress === 100)
    return {
      status: "완료",
      color: "text-green-500",
      borderColor: "border-green-500",
      icon: "🏆",
    };
  if (progress > 0)
    return {
      status: "진행중",
      color: "text-yellow-500",
      borderColor: "border-yellow-500",
      icon: "🏃",
    };
  return {
    status: "예정",
    color: "text-neutral-400",
    borderColor: "border-neutral-600",
    icon: "⏳",
  };
};

/*  목표 배열의 평균 진행률 계산 */
export const calculateAverageProgress = (goals) => {
  if (!goals || goals.length === 0) return 0;
  const total = goals.reduce((sum, goal) => sum + goal.progress, 0);
  return Math.round(total / goals.length);
};
