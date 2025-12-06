import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TrendingUp, Info, Play } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateAverageProgress, getGoalStatus } from "./utils/helpers";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import ConfirmationModal from "./components/ConfirmationModal";
import SprintManager from "./components/SprintManager";
import "./App.css";

const initialSprints = [{ id: "sprint-1", name: "Sprint 1 (시작)" }];
const initialCategories = ["공부", "운동", "생활", "기타"];

function App() {
  const [sprints, setSprints] = useLocalStorage("agile-sprints", initialSprints);
  const [goals, setGoals] = useLocalStorage("agile-goals", []);
  const [categories, setCategories] = useLocalStorage("agile-categories", initialCategories);
  const [selectedSprintId, setSelectedSprintId] = useLocalStorage("agile-selectedSprintId", initialSprints[0].id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [sprintToDelete, setSprintToDelete] = useState(null);

  useEffect(() => {
    if (!sprints.find((s) => s.id === selectedSprintId) && sprints.length > 0) {
      setSelectedSprintId(sprints[0].id);
    }
  }, [sprints, selectedSprintId, setSelectedSprintId]);

  const currentSprint = useMemo(
    () => sprints.find((s) => s.id === selectedSprintId) || sprints[0],
    [sprints, selectedSprintId]
  );
  const filteredGoals = useMemo(
    () => goals.filter((g) => g.sprintId === selectedSprintId),
    [goals, selectedSprintId]
  );
  const averageProgress = useMemo(() => calculateAverageProgress(filteredGoals), [filteredGoals]);

  const addGoal = useCallback(
    ({ title, category, dueDate }) => {
      const newGoal = {
        id: Date.now().toString(),
        sprintId: selectedSprintId,
        title,
        category,
        dueDate,
        progress: 0,
        createdAt: new Date().toISOString(),
      };
      setGoals((prev) => [newGoal, ...prev]);
    },
    [selectedSprintId, setGoals]
  );

  const addCategory = useCallback(
    (newCategory) => {
      setCategories((prev) => (prev.includes(newCategory) ? prev : [...prev, newCategory]));
    },
    [setCategories]
  );

  const deleteCategory = useCallback(
    (category) => setCategories((prev) => prev.filter((c) => c !== category)),
    [setCategories]
  );

  const updateGoalProgress = useCallback(
    (id, progress) => {
      setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, progress } : g)));
    },
    [setGoals]
  );

  const deleteGoal = useCallback((id) => setGoals((prev) => prev.filter((g) => g.id !== id)), [setGoals]);

  const addSprint = useCallback(
    (name) => {
      const newSprint = { id: `sprint-${Date.now()}`, name };
      setSprints((prev) => [...prev, newSprint]);
      setSelectedSprintId(newSprint.id);
    },
    [setSprints, setSelectedSprintId]
  );

  const handleDeleteSprintClick = useCallback(
    (id) => {
      if (id === "sprint-1" && sprints.length === 1) {
        alert("최소한 하나의 스프린트는 존재해야 합니다.");
        return;
      }
      setSprintToDelete(id);
      setIsModalOpen(true);
    },
    [sprints.length]
  );

  const confirmDeleteSprint = useCallback(() => {
    if (sprintToDelete) {
      setSprints((prev) => prev.filter((s) => s.id !== sprintToDelete));
      setGoals((prev) => prev.filter((g) => g.sprintId !== sprintToDelete));
      setSelectedSprintId("sprint-1");
    }
    setIsModalOpen(false);
    setSprintToDelete(null);
  }, [sprintToDelete, setSprints, setGoals, setSelectedSprintId]);

  const progressColor = averageProgress === 100 ? "var(--color-status-complete)" : "var(--color-accent)";

  const devHistoryContent = (
    <div style={{ padding: "10px", color: "var(--color-text-light)", lineHeight: 1.6 }}>
      <h4 style={{ color: "var(--color-accent)", marginBottom: "0.75rem", fontSize: "1.25rem" }}>GOALFLIX 정보</h4>
      <ul style={{ listStyleType: "disc", marginLeft: "1.5rem" }}>
        <li style={{ marginBottom: "0.5rem" }}><strong>버전:</strong> 1.4.0 (Agile Features)</li>
        <li style={{ marginBottom: "0.5rem" }}><strong>기능:</strong> D-Day, 커스텀 카테고리 추가, 목표 진행률 관리</li>
        <li style={{ marginBottom: "0.5rem" }}><strong>스프린트 관리:</strong> 생성, 삭제, 선택 가능</li>
        <li style={{ marginBottom: "0.5rem" }}><strong>목표 상태:</strong> 완료/진행중/보류 색상 표시</li>
        <li style={{ marginBottom: "0.5rem" }}><strong>사용자 편의:</strong> 슬라이더, 모달, 히어로 배너</li>
      </ul>
      <p style={{ fontSize: "0.75rem", color: "#777", marginTop: "0.5rem" }}>이번 프로젝트는 연암공대 REACT 기말 과제를 위해 구축되었습니다.</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-dark-bg)", color: "var(--color-text-light)" }}>
      <nav className="navbar">
        <div className="max-width-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 className="logo">GOALFLIX</h1>
          <SprintManager
            sprints={sprints}
            selectedSprintId={selectedSprintId}
            onSelectSprint={setSelectedSprintId}
            onAddSprint={addSprint}
            onDeleteSprint={handleDeleteSprintClick}
          />
        </div>
      </nav>

      <div className="max-width-container">
        <div className="hero-section">
          <div
            className="hero-background"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542435503-921c55004a79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')`,
            }}
          />
          <div className="hero-gradient" />
          <div className="hero-content">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "0.25rem",
                  textTransform: "uppercase",
                }}
              >
                CURRENT SPRINT
              </span>
              <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", fontWeight: "500" }}>
                {new Date().toLocaleDateString("ko-KR")}
              </span>
            </div>
            <h2 className="hero-title">{currentSprint?.name}</h2>
            <p className="hero-text">이번 스프린트의 목표 달성률을 확인하세요.</p>
            <div className="progress-container">
              <div className="progress-label">
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <TrendingUp size={16} /> 평균 목표 달성률
                </span>
                <span style={{ color: progressColor }}>{averageProgress}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${averageProgress}%`, backgroundColor: progressColor }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button
                onClick={() =>
                  document.getElementById("goal-input-section").scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Play size={20} fill="black" /> <span>목표 시작하기</span>
              </button>
              <button
                onClick={() => setIsInfoModalOpen(true)}
                style={{
                  backgroundColor: "rgba(107, 114, 128, 0.7)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Info size={20} /> <span>상세 정보</span>
              </button>
            </div>
          </div>
        </div>

        <div id="goal-input-section" style={{ marginBottom: "3rem" }}>
          <GoalForm
            onAddGoal={addGoal}
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h3 className="form-title-border" style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            🎯 {currentSprint?.name} 목표 목록
            <span style={{ color: "var(--color-text-muted)", fontSize: "1rem", fontWeight: "normal", marginLeft: "0.5rem" }}>
              ({filteredGoals.length} 개)
            </span>
          </h3>
          <GoalList goals={filteredGoals} onUpdateProgress={updateGoalProgress} onDelete={deleteGoal} />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteSprint}
        title="스프린트 삭제"
        message="정말 삭제하시겠습니까?"
      />
      <ConfirmationModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onConfirm={() => setIsInfoModalOpen(false)}
        title="GOALFLIX"
        confirmText="닫기"
        hideCancel={true}
        modalClassName="top-right-modal"
      >
        {devHistoryContent}
      </ConfirmationModal>
    </div>
  );
}

export default App;
