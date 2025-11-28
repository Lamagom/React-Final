import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TrendingUp, Info, Play } from "lucide-react";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateAverageProgress } from "./utils/helpers";

import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import ConfirmationModal from "./components/ConfirmationModal";
import SprintManager from "./components/SprintManager";

import "./App.css"; // 순수 CSS 파일 임포트

// 초기 스프린트 데이터
const initialSprints = [{ id: "sprint-1", name: "Sprint 1 (시작)" }];

/**
 * 메인 애플리케이션 컴포넌트
 */
function App() {
  const [sprints, setSprints] = useLocalStorage(
    "agile-sprints",
    initialSprints
  );
  const [goals, setGoals] = useLocalStorage("agile-goals", []);
  const [selectedSprintId, setSelectedSprintId] = useLocalStorage(
    "agile-selectedSprintId",
    initialSprints[0].id
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // 상세 정보 모달 상태
  const [sprintToDelete, setSprintToDelete] = useState(null);

  useEffect(() => {
    if (!sprints.find((s) => s.id === selectedSprintId)) {
      if (sprints.length > 0) {
        setSelectedSprintId(sprints[0].id);
      }
    }
  }, [sprints, selectedSprintId, setSelectedSprintId]);

  // --- 파생 상태 (useMemo) ---
  const currentSprint = useMemo(
    () => sprints.find((s) => s.id === selectedSprintId) || sprints[0],
    [sprints, selectedSprintId]
  );

  const filteredGoals = useMemo(
    () => goals.filter((g) => g.sprintId === selectedSprintId),
    [goals, selectedSprintId]
  );

  const averageProgress = useMemo(
    () => calculateAverageProgress(filteredGoals),
    [filteredGoals]
  );

  // --- 목표 관리 Actions ---
  const addGoal = useCallback(
    ({ title, category }) => {
      const newGoal = {
        id: Date.now().toString(),
        sprintId: selectedSprintId,
        title,
        category,
        progress: 0,
        createdAt: new Date().toISOString(),
      };
      setGoals((prev) => [newGoal, ...prev]);
    },
    [selectedSprintId, setGoals]
  );

  const updateGoalProgress = useCallback(
    (id, progress) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, progress } : g))
      );
    },
    [setGoals]
  );

  const deleteGoal = useCallback(
    (id) => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    },
    [setGoals]
  );

  // --- 스프린트 관리 Actions ---
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

  // 진행률 색상 결정
  const progressColor =
    averageProgress === 100
      ? "var(--color-status-complete)"
      : "var(--color-accent)";

  // 개발 연혁 및 상세 정보 내용 (JSX)
  const devHistoryContent = (
    <div
      style={{
        padding: "10px",
        color: "var(--color-text-light)",
        lineHeight: 1.6,
      }}
    >
      <h4
        style={{
          color: "var(--color-accent)",
          marginBottom: "0.75rem",
          fontSize: "1.25rem",
        }}
      >
        GOALFLIX 상세정보
      </h4>

      <ul style={{ listStyleType: "disc", marginLeft: "1.5rem" }}>
        <li style={{ marginBottom: "0.5rem" }}>
          **V 1.0.0 (2025.11.28):** 프로젝트 초기 설정 및 Redux 대신
          LocalStorage를 활용한 상태 관리 구현이 업데이트 되었습니다.
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          **V 1.1.0 (2025.11.29):** Tailwind CSS를 순수 CSS로 마이그레이션 완료.
          아키텍처 정리 및 폴더 구조 확립이 업데이트 되었습니다.
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          **V 1.2.0 (2025.11.30):** 스프린트 관리 및 목표 생성/수정/삭제 기능
          완성. lucide-react 아이콘 도입이 업데이트 되었습니다.
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          **V 1.3.0 (2025.12.01):** 상세 정보 팝업(모달) 추가 및 우측 상단 배치
          스타일 적용이 업데이트 되었습니다.
        </li>
      </ul>

      <p
        style={{
          marginTop: "1.5rem",
          color: "var(--color-text-muted)",
          borderTop: "1px solid var(--color-dark-bg-light)",
          paddingTop: "0.5rem",
          fontSize: " 0.8rem",
          textAlign: "center",
        }}
      >
        * Sprint - 애자일 방법론에서 단기 작업 주기를 의미합니다. *
      </p>

      <p
        style={{
          marginTop: "1.5rem",
          color: "var(--color-text-muted)",
          borderTop: "1px solid var(--color-dark-bg-light)",
          paddingTop: "0.5rem",
          fontSize: " 0.5rem",
          textAlign: "center",
        }}
      >
        * GOALFLIX는 연암 공과대학교 스마트소프트웨어 학과의 React 과제를 위해
        개발 되었습니다 *
      </p>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-dark-bg)",
        color: "var(--color-text-light)",
      }}
    >
      {/* 1. Header & Navigation (Fixed) */}
      <nav className="navbar">
        <div
          className="max-width-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
        {/* 2. Hero Section (Dashboard Overview) */}
        <div className="hero-section">
          {/* Background */}
          <div
            className="hero-background"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542435503-921c55004a79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')`,
            }}
          />
          <div className="hero-gradient" />

          {/* Content */}
          <div className="hero-content">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
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
              <span
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                {new Date().toLocaleDateString("ko-KR")}
              </span>
            </div>

            <h2 className="hero-title">{currentSprint?.name}</h2>

            <p className="hero-text">
              이번 스프린트의 목표 달성률을 확인하세요. 작은 진전이 모여 큰
              결과를 만듭니다.
            </p>

            {/* 전체 진행률 바 */}
            <div className="progress-container">
              <div className="progress-label">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <TrendingUp size={16} />
                  평균 목표 달성률
                </span>
                <span style={{ color: progressColor }}>{averageProgress}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${averageProgress}%`,
                    backgroundColor: progressColor,
                  }}
                />
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("goal-input-section")
                    .scrollIntoView({ behavior: "smooth" })
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
                  transition: "background-color 0.2s",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
                }}
              >
                <Play size={20} fill="black" />
                <span>목표 시작하기</span>
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
                  transition: "background-color 0.2s",
                }}
              >
                <Info size={20} />
                <span>상세 정보</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Goal Form Section */}
        <div id="goal-input-section" style={{ marginBottom: "3rem" }}>
          <GoalForm onAddGoal={addGoal} />
        </div>

        {/* 4. Goals List Section */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            className="form-title-border"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            🎯 {currentSprint?.name} 목표 목록{" "}
            <span
              style={{
                color: "var(--color-text-muted)",
                fontSize: "1rem",
                fontWeight: "normal",
                marginLeft: "0.5rem",
              }}
            >
              ({filteredGoals.length} 개)
            </span>
          </h3>
          <GoalList
            goals={filteredGoals}
            onUpdateProgress={updateGoalProgress}
            onDelete={deleteGoal}
          />
        </div>
      </div>

      {/* 5. Custom Confirmation Modal (스프린트 삭제) */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteSprint}
        title="스프린트 및 목표 삭제"
        message="선택한 스프린트와 이 스프린트에 포함된 모든 목표가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
      />

      {/* 6. 상세 정보 모달  */}
      <ConfirmationModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onConfirm={() => setIsInfoModalOpen(false)} // 확인 버튼을 닫기로 사용
        title="GOALFLIX"
        confirmText="닫기"
        hideCancel={true}
        modalClassName="top-right-modal" // CSS 클래스 적용
      >
        {devHistoryContent} {/* 공지사항 */}
      </ConfirmationModal>
    </div>
  );
}

export default App;
