import React, { useCallback, useMemo } from "react";
import { Trash2, Trophy } from "lucide-react";
import { getGoalStatus } from "../utils/helpers";
import "../App.css";

const GoalItem = React.memo(({ goal, onUpdateProgress, onDelete }) => {
  const { status, color, borderColor, icon } = getGoalStatus(goal.progress);
  const isCompleted = goal.progress === 100;

  const handleSliderChange = useCallback(
    (e) => {
      onUpdateProgress(goal.id, Number(e.target.value));
    },
    [goal.id, onUpdateProgress]
  );

  // 진행률에 따른 동적 그라데이션 계산 (JS에서 Inline Style로 적용)
  const getProgressGradient = useMemo(() => {
    const progress = goal.progress;
    const colorRed = "#ef4444";
    const colorYellow = "#facc15";
    const colorGreen = "#22c55e";
    const colorTrack = "#525252";

    if (progress === 0) return colorTrack;

    let colorStart = colorRed;
    let colorEnd = colorYellow;

    if (progress > 50) {
      colorStart = colorYellow;
      colorEnd = colorGreen;
    }

    return `linear-gradient(90deg, ${colorStart} 0%, ${colorEnd} ${progress}%, ${colorTrack} ${progress}%)`;
  }, [goal.progress]);

  const statusClassName =
    status === "완료"
      ? "status-complete"
      : status === "진행중"
      ? "status-progress"
      : "status-pending";

  return (
    <div className={`goal-item ${isCompleted ? "goal-item-completed" : ""}`}>
      <div className="item-header">
        <span>{icon}</span>
        <div className={`item-status ${statusClassName}`}>{status}</div>
      </div>

      <div className="item-content">
        <span
          style={{ fontSize: "10px", fontWeight: "bold", color: "#ef4444" }}
          className="mb-1 block uppercase"
        >
          {goal.category}
        </span>
        <h3
          className={`text-base font-bold leading-tight mb-4 ${
            isCompleted ? "item-title-completed" : ""
          }`}
          style={{ color: isCompleted ? "#999" : "var(--color-text-light)" }}
        >
          {goal.title}
        </h3>

        <div className="slider-container">
          <div className="progress-label" style={{ fontSize: "12px" }}>
            <span>Progress</span>
            <span style={{ fontWeight: "bold" }}>{goal.progress}%</span>
          </div>

          <div className="progress-slider-bar">
            <div
              className="progress-slider-fill"
              style={{
                background: getProgressGradient,
                width: `${goal.progress}%`,
              }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={handleSliderChange}
            />
          </div>
        </div>

        {isCompleted && (
          <div className="completion-message">
            <Trophy size={16} />
            <span>목표도달 완료! 축하합니다!</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(goal.id)}
        className="delete-btn"
        title="목표 삭제"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
});

export default GoalItem;
